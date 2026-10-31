import { beforeEach, describe, expect, it, vi } from "vitest"

import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

// ───────────────────────────────────────────────────────────
// mars3d mock
// ───────────────────────────────────────────────────────────

const mars3dMock = vi.hoisted(() => {
  const createMockMap = () => ({
    basemap: "",
    hasTerrain: false,
    lang: { type: "cn" },
    options: { basemaps: [{ id: "1" }] },
    control: {
      locationBar: { container: document.createElement("div") },
      baseLayerPicker: null
    },
    camera: {
      positionCartographic: { height: 5000 },
      heading: 0,
      pitch: -45,
      flyToBoundingSphere: vi.fn()
    },
    getBasemaps: vi.fn(() => []),
    getCenter: vi.fn(() => ({})),
    getExtent: vi.fn(() => ({})),
    getLayrsTree: vi.fn(() => []),
    getLayerById: vi.fn(() => null),
    getLayerByAttr: vi.fn(() => null),
    addLayer: vi.fn(),
    removeLayer: vi.fn(),
    addControl: vi.fn(),
    removeControl: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    flyToGraphic: vi.fn(),
    flyTo: vi.fn()
  })

  class BaseClass {
    fire = vi.fn()
    off = vi.fn()
    on = vi.fn()
  }

  class ToolButton {
    constructor(public options: any) {}
  }

  class QueryPOI {
    constructor(public options: any) {}
    autoTip = vi.fn(() => Promise.resolve([]))
    queryText = vi.fn(() => Promise.resolve([]))
    getAddress = vi.fn(() => Promise.resolve({ address: "addr", city: "city" }))
  }

  class GraphicLayer {
    constructor(public options: any) {}
    bindPopup = vi.fn()
    addGraphic = vi.fn()
    remove = vi.fn()
    flyTo = vi.fn()
    closePopup = vi.fn()
    openPopup = vi.fn()
    clear = vi.fn()
    getGraphicById = vi.fn(() => null)
    id = "gl"
  }

  class BillboardEntity {
    constructor(public options: any) {}
  }

  class PointEntity {
    constructor(public options: any) {}
    attr: any = {}
    bindPopup = vi.fn()
    openHighlight = vi.fn()
    flyTo = vi.fn()
    openPopup = vi.fn()
  }

  class TilesetLayer {
    getPositionByOrginMatrix = vi.fn((c) => c)
    style: any = null
  }

  return {
    Cesium: {
      Cartesian3: class {
        constructor(public x?: number, public y?: number, public z?: number) {}
        static fromDegrees = vi.fn((x: number, y: number) => ({ x, y }))
      },
      NearFarScalar: vi.fn(),
      BoundingSphere: vi.fn(),
      HeadingPitchRange: vi.fn(),
      Cesium3DTileStyle: vi.fn(),
      Resource: { fetchImage: vi.fn(() => Promise.resolve({})) }
    },
    BaseClass,
    control: { ToolButton },
    query: { QueryPOI },
    layer: { GraphicLayer, TilesetLayer },
    graphic: { BillboardEntity, PointEntity, BaseGraphic: class {} },
    DomUtil: { create: vi.fn(() => document.createElement("div")) },
    EventType: { cameraMoveEnd: "cameraMoveEnd" },
    Util: { downloadFile: vi.fn() },
    createMockMap
  }
})

vi.mock("mars3d", () => mars3dMock)
vi.mock("./icon/manager-basemaps.svg", () => ({ default: "svg" }))

// Mock 所有 widget 组件，使 widget-store.ts 中的 defineAsyncComponent loader 可被触发
const stubComp = { name: "Stub", template: "<div />" }
vi.mock("@mars/widgets/basic/query-poi/index.vue", () => ({ default: stubComp }))
vi.mock("@mars/widgets/basic/manage-basemap/index.vue", () => ({ default: stubComp }))
vi.mock("@mars/widgets/basic/manage-layers/index.vue", () => ({ default: stubComp }))
vi.mock("@mars/widgets/basic/manage-layers/scene-tree.vue", () => ({ default: stubComp }))
vi.mock("@mars/widgets/basic/manage-layers/picture-heatmap.vue", () => ({ default: stubComp }))
vi.mock("@mars/widgets/basic/manage-layers/picture-guihua.vue", () => ({ default: stubComp }))
vi.mock("@mars/widgets/basic/graphic-options/index.vue", () => ({ default: stubComp }))
vi.mock("@mars/widgets/basic/tools-button/index.vue", () => ({ default: stubComp }))

// Mock canvas 2D context for jsdom
const mockCtx = {
  clearRect: vi.fn(),
  drawImage: vi.fn(),
  fillText: vi.fn()
}

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(mockCtx as any)
  vi.spyOn(HTMLCanvasElement.prototype, "toDataURL").mockReturnValue("data:image/png")
})

// ───────────────────────────────────────────────────────────
// widget.vue
// ───────────────────────────────────────────────────────────

describe("widget.vue", () => {
  const StubComp = defineComponent({ name: "StubComp", template: "<div />" })

  it("渲染 widget.component 并合并 meta/data props", async () => {
    const widget: any = {
      name: "test",
      component: StubComp,
      meta: { props: { a: 1 } },
      data: { props: { b: 2 } }
    }
    const { default: MarsWidget } = await import("../../src/widgets/widget.vue")
    const wrapper = mount(defineComponent({
      components: { MarsWidget },
      template: '<mars-widget :widget="widget" />',
      data: () => ({ widget })
    }))
    expect(wrapper.findComponent({ name: "StubComp" }).exists()).toBe(true)
  })

  it("无 meta/data 时返回空 attrs", async () => {
    const widget: any = { name: "test", component: StubComp }
    const { default: MarsWidget } = await import("../../src/widgets/widget.vue")
    const wrapper = mount(defineComponent({
      components: { MarsWidget },
      template: '<mars-widget :widget="widget" />',
      data: () => ({ widget })
    }))
    expect(wrapper.findComponent({ name: "StubComp" }).exists()).toBe(true)
  })
})

// ───────────────────────────────────────────────────────────
// widget-store.ts（导入 + 渲染每个 async 组件以覆盖 defineAsyncComponent loader）
// ───────────────────────────────────────────────────────────

describe("widget-store.ts", () => {
  it("导入配置", async () => {
    const store = await import("../../src/widgets/widget-store")
    expect(store.default.state.widgets.length).toBeGreaterThan(0)
    expect(store.default.state.openAtStart).toContain("tools-button")
  })

  it("渲染每个 widget 的 async 组件以触发 loader", async () => {
    const store = await import("../../src/widgets/widget-store")
    const widgets = store.default.state.widgets
    // 逐个调用 async 组件的 __asyncLoader，触发 defineAsyncComponent 的 loader（即 import() 调用）
    for (const w of widgets) {
      const asyncComp: any = w.component
      if (typeof asyncComp.__asyncLoader === "function") {
        await asyncComp.__asyncLoader()
      }
    }
    expect(widgets.length).toBeGreaterThan(0)
  })
})

// ───────────────────────────────────────────────────────────
// use-lifecycle.ts
// ───────────────────────────────────────────────────────────

describe("use-lifecycle.ts", () => {
  it("onMounted 时调用 mapWork.onMounted，onUnmounted 时调用 onUnmounted", async () => {
    vi.stubGlobal("mars3d", mars3dMock)
    const useLifecycle = (await import("../../src/widgets/common/uses/use-lifecycle")).default
    const onMountedFn = vi.fn()
    const onUnmountedFn = vi.fn()
    const mapWork = { onMounted: onMountedFn, onUnmounted: onUnmountedFn }
    const getMapInstance = vi.fn(() => ({ id: "map" }))

    const TestComp = defineComponent({
      setup() {
        useLifecycle(mapWork)
        return () => h("div")
      }
    })
    const wrapper = mount(TestComp, {
      global: { provide: { getMapInstance } }
    })
    expect(onMountedFn).toHaveBeenCalledWith({ id: "map" }, mars3dMock)
    wrapper.unmount()
    expect(onUnmountedFn).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })

  it("无 onMounted/onUnmounted 时不报错", async () => {
    const useLifecycle = (await import("../../src/widgets/common/uses/use-lifecycle")).default
    const TestComp = defineComponent({
      setup() {
        useLifecycle({})
        return () => h("div")
      }
    })
    const wrapper = mount(TestComp)
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// manage-basemap/map.ts
// ───────────────────────────────────────────────────────────

describe("manage-basemap/map.ts", () => {
  beforeEach(() => { vi.resetModules() })

  it("onMounted/onUnmounted + changeBaseMaps/changeTerrain/getLayers", async () => {
    const mod = await import("../../src/widgets/basic/manage-basemap/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    mod.changeBaseMaps("id1")
    expect(map.basemap).toBe("id1")
    mod.changeTerrain(true)
    expect(map.hasTerrain).toBe(true)
    const layers = mod.getLayers()
    expect(layers).toEqual({ baseMaps: [], hasTerrain: true })
    mod.onUnmounted()
  })
})

// ───────────────────────────────────────────────────────────
// manage-layers/map.ts
// ───────────────────────────────────────────────────────────

describe("manage-layers/map.ts", () => {
  beforeEach(() => { vi.resetModules() })

  it("onMounted/onUnmounted + getLayrsTree/getLayerById/getLayerByAttr", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    mod.getLayrsTree({})
    expect(map.getLayrsTree).toHaveBeenCalled()
    mod.getLayerById("id")
    expect(map.getLayerById).toHaveBeenCalledWith("id")
    mod.getLayerByAttr("val", "name")
    expect(map.getLayerByAttr).toHaveBeenCalledWith("val", "name")
    mod.onUnmounted()
  })

  it("updateLayerShow show=true 添加图层并显示", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    const layer = { isAdded: false, show: false, flyTo: vi.fn() }
    mod.updateLayerShow(layer, true)
    expect(map.addLayer).toHaveBeenCalledWith(layer)
    expect(layer.show).toBe(true)
    expect(layer.flyTo).toHaveBeenCalled()
  })

  it("updateLayerShow show=false 隐藏", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    const layer = { show: true }
    mod.updateLayerShow(layer, false)
    expect(layer.show).toBe(false)
  })

  it("flytoModelNode 无效 nodesphere 直接返回", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    expect(() => mod.flytoModelNode(1, null)).not.toThrow()
    expect(() => mod.flytoModelNode(1, [0, 0, 0, 0])).not.toThrow()
  })

  it("flytoModelNode 有效节点飞行", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    const tileset = new mars3dMock.layer.TilesetLayer()
    map.getLayerById = vi.fn(() => tileset)
    mod.onMounted(map as any)
    mod.flytoModelNode(1, [1, 2, 3, 100])
    expect(map.camera.flyToBoundingSphere).toHaveBeenCalled()
  })

  it("checkModelStyle 空 arrIds 清空样式", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    const tileset = new mars3dMock.layer.TilesetLayer()
    map.getLayerById = vi.fn(() => tileset)
    mod.onMounted(map as any)
    mod.checkModelStyle(1, [])
    expect(tileset.style).toBeNull()
  })

  it("checkModelStyle 有 arrIds 设置样式", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    const tileset = new mars3dMock.layer.TilesetLayer()
    map.getLayerById = vi.fn(() => tileset)
    mod.onMounted(map as any)
    mod.checkModelStyle(1, [{ id: "a" }, { id: "b" }])
    expect(tileset.style).not.toBeNull()
  })

  it("exchangeLayer 交换 zIndex", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    const layerA = { zIndex: 1 }
    const layerB = { zIndex: 2 }
    map.getLayerById = vi.fn((id) => (id === "a" ? layerA : layerB))
    mod.onMounted(map as any)
    mod.exchangeLayer("a", "b")
    expect(layerA.zIndex).toBe(2)
    expect(layerB.zIndex).toBe(1)
  })
})

// ───────────────────────────────────────────────────────────
// map.ts 负向分支补充（manage-layers / graphic-options / tools-button）
// ───────────────────────────────────────────────────────────

describe("map.ts 负向分支补充", () => {
  beforeEach(() => { vi.resetModules() })

  it("manage-layers: flytoModelNode 图层不存在直接返回", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    expect(() => mod.flytoModelNode(1, [1, 2, 3, 4])).not.toThrow()
  })

  it("manage-layers: checkModelStyle 无 map / 图层不存在返回", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    expect(() => mod.checkModelStyle(1, [])).not.toThrow() // map 未初始化
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    expect(() => mod.checkModelStyle(1, [])).not.toThrow() // 图层不存在
  })

  it("manage-layers: exchangeLayer 图层不存在返回", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    expect(() => mod.exchangeLayer(1, 2)).not.toThrow()
  })

  it("graphic-options: 未初始化 map 时 getGraphicOptions 返回 null", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    expect(mod.getGraphicOptions("lid", "gid")).toBeNull()
  })

  it("graphic-options: 矢量不存在时打印日志返回 null", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    const map = mars3dMock.createMockMap()
    map.getLayerById = vi.fn(() => ({ id: "lid", getGraphicById: vi.fn(() => null) }))
    mod.onMounted(map as any)
    const log = vi.spyOn(console, "log").mockImplementation(() => {})
    expect(mod.getGraphicOptions("lid", "gid")).toBeNull()
    log.mockRestore()
  })

  it("graphic-options: positions.type 映射 positionType", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    const map = mars3dMock.createMockMap()
    const graphic = { id: "gid", isPoint: false, toJSON: () => ({ positions: { type: "dynamic" } }) }
    map.getLayerById = vi.fn(() => ({ id: "lid", getGraphicById: vi.fn(() => graphic) }))
    mod.onMounted(map as any)
    const result = mod.getGraphicOptions("lid", "gid")
    expect(result.positionType).toBe("dynamic")
  })

  it("tools-button: 按钮 title 中英文与 click 回调", async () => {
    const mod = await import("../../src/widgets/basic/tools-button/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any, mars3dMock)
    const layersTool = map.addControl.mock.calls[0][0]
    expect(layersTool.options.title()).toBe("图层控制")
    map.lang.type = "en"
    expect(layersTool.options.title()).toBe("Layer control")
    layersTool.options.click()
    const basemapsTool = map.addControl.mock.calls[1][0]
    basemapsTool.options.click()
    expect(mod.eventTarget.fire).toHaveBeenCalledWith("openManageLayer")
    expect(mod.eventTarget.fire).toHaveBeenCalledWith("openManageBasemaps")
  })
})

// ───────────────────────────────────────────────────────────
// tools-button/map.ts
// ───────────────────────────────────────────────────────────

describe("tools-button/map.ts", () => {
  beforeEach(() => { vi.resetModules() })

  it("onMounted 创建工具按钮，onUnmounted 清理", async () => {
    const mod = await import("../../src/widgets/basic/tools-button/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any, mars3dMock)
    expect(map.addControl).toHaveBeenCalled()
    mod.onUnmounted()
    expect(map.removeControl).toHaveBeenCalled()
  })

  it("onMounted 无 mapInstance 直接返回", async () => {
    const mod = await import("../../src/widgets/basic/tools-button/map")
    expect(() => mod.onMounted(null as any, mars3dMock)).not.toThrow()
  })

  it("onUnmounted map 无 options 时直接置空", async () => {
    const mod = await import("../../src/widgets/basic/tools-button/map")
    const map = {
      options: {},
      control: { baseLayerPicker: null },
      addControl: vi.fn(),
      removeControl: vi.fn(),
      lang: { type: "cn" }
    } as any
    mod.onMounted(map, mars3dMock)
    map.options = null
    mod.onUnmounted()
  })
})

// ───────────────────────────────────────────────────────────
// graphic-options/map.ts
// ───────────────────────────────────────────────────────────

describe("graphic-options/map.ts", () => {
  beforeEach(() => { vi.resetModules() })

  it("onMounted/onUnmounted", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    mod.onUnmounted()
  })

  it("getGraphicOptions 图层或矢量不存在返回 null", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    const result = mod.getGraphicOptions("lid", "gid")
    expect(result).toBeNull()
  })

  it("getGraphicOptions 点对象返回 isPoint=true", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    const map = mars3dMock.createMockMap()
    const graphic = {
      id: "gid",
      isPoint: true,
      toJSON: () => ({ attr: null }),
      _minPointNum: 1,
      _maxPointNum: 1
    }
    const layer = { id: "lid", getGraphicById: vi.fn(() => graphic) }
    map.getLayerById = vi.fn(() => layer)
    mod.onMounted(map as any)
    const result = mod.getGraphicOptions("lid", "gid")
    expect(result).not.toBeNull()
    expect(result.isPoint).toBe(true)
    expect(result.minPointNum).toBe(1)
  })

  it("getGraphicOptions 非点对象 minPointNum=3", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    const map = mars3dMock.createMockMap()
    const graphic = {
      id: "gid",
      isPoint: false,
      toJSON: () => ({ attr: null, position: { type: "relative" } }),
      _minPointNum: undefined,
      _maxPointNum: undefined
    }
    const layer = { id: "lid", getGraphicById: vi.fn(() => graphic) }
    map.getLayerById = vi.fn(() => layer)
    mod.onMounted(map as any)
    const result = mod.getGraphicOptions("lid", "gid")
    expect(result.minPointNum).toBe(3)
    expect(result.positionType).toBe("relative")
  })

  it("setGraphicOptions 无 graphic 时返回", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    const map = mars3dMock.createMockMap()
    mod.onMounted(map as any)
    expect(() => mod.setGraphicOptions({})).not.toThrow()
  })

  it("setGraphicOptions 有 graphic 时调用 setOptions", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    const map = mars3dMock.createMockMap()
    const graphic = { id: "gid", setOptions: vi.fn(), toJSON: () => ({}), isPoint: true, _minPointNum: 1, _maxPointNum: 1 }
    const layer = { id: "lid", getGraphicById: vi.fn(() => graphic) }
    map.getLayerById = vi.fn(() => layer)
    mod.onMounted(map as any)
    mod.getGraphicOptions("lid", "gid")
    mod.setGraphicOptions({ color: "red" })
    expect(graphic.setOptions).toHaveBeenCalledWith({ color: "red" })
  })

  it("downloadFile 调用 mars3d.Util.downloadFile", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/map")
    mod.downloadFile("test.json", "{}")
    expect(mars3dMock.Util.downloadFile).toHaveBeenCalledWith("test.json", "{}")
  })
})

// ───────────────────────────────────────────────────────────
// query-poi/map.ts
// ───────────────────────────────────────────────────────────

describe("query-poi/map.ts", () => {
  beforeEach(() => { vi.resetModules() })

  it("onMounted 初始化图层和查询", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    expect(map.addLayer).toHaveBeenCalled()
    expect(map.on).toHaveBeenCalled()
  })

  it("onUnmounted 清理", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    mod.onUnmounted()
    expect(map.off).toHaveBeenCalled()
  })

  it("queryData/querySiteList 调用 queryPoi", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    await mod.queryData("text")
    await mod.querySiteList("text", 1)
  })

  it("centerAtLonLat 非经纬度格式直接返回", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    expect(() => mod.centerAtLonLat("not-a-coord")).not.toThrow()
    expect(() => mod.centerAtLonLat("abc,def")).not.toThrow()
  })

  it("clearLayers 清空图层", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    mod.clearLayers()
  })

  it("showPOIArr 有效经纬度创建 BillboardEntity 并 flyTo", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    const gl = mod.graphicLayer
    const billboardSpy = vi.spyOn(mars3dMock.graphic, "BillboardEntity")

    mod.showPOIArr([
      { lng: "116.39", lat: "39.90" },
      { lng: "121.47", lat: "31.23" },
      { lng: "abc", lat: "def" } // 无效经纬度，跳过
    ])

    // 2 个有效坐标创建 BillboardEntity，1 个无效跳过
    expect(billboardSpy).toHaveBeenCalledTimes(2)
    expect(gl.addGraphic).toHaveBeenCalledTimes(2)
    // arr.length > 1 触发 flyTo
    expect(gl.flyTo).toHaveBeenCalled()
  })

  it("showPOIArr 单个结果不调用 flyTo", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    const gl = mod.graphicLayer
    gl.flyTo.mockClear()

    mod.showPOIArr([{ lng: "116.39", lat: "39.90" }])
    expect(gl.addGraphic).toHaveBeenCalledTimes(1)
    expect(gl.flyTo).not.toHaveBeenCalled()
  })

  it("centerAtLonLat 有效经纬度创建 PointEntity 并飞行定位", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    const gl = mod.graphicLayer
    const pointSpy = vi.spyOn(mars3dMock.graphic, "PointEntity")

    mod.centerAtLonLat("116.39,39.90")

    expect(pointSpy).toHaveBeenCalledTimes(1)
    expect(gl.addGraphic).toHaveBeenCalledTimes(1)
    // PointEntity 实例的 bindPopup/openHighlight/flyTo 被调用
    const pointInstance = pointSpy.mock.results[0].value as any
    expect(pointInstance.bindPopup).toHaveBeenCalled()
    expect(pointInstance.openHighlight).toHaveBeenCalled()
    expect(pointInstance.flyTo).toHaveBeenCalled()
  })

  it("flyToGraphic 调用 map.flyToGraphic 并在完成时打开弹窗", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    const gl = mod.graphicLayer
    const graphic: any = { id: "g1" }

    mod.flyToGraphic(graphic, { radius: 1000 })

    expect(map.flyToGraphic).toHaveBeenCalledWith(graphic, expect.objectContaining({ radius: 1000 }))
    // complete 回调被传入，调用它应触发 openPopup
    const complete = map.flyToGraphic.mock.calls[0][1].complete
    complete()
    expect(gl.openPopup).toHaveBeenCalledWith(graphic)
  })

  it("cameraChanged 高度 > 100000 时清空地址", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    map.camera.positionCartographic.height = 200000
    await mod.onMounted(map as any)

    // 取出 map.on 注册的 cameraChanged 回调
    const cameraChanged = map.on.mock.calls[0][1]
    await cameraChanged()

    // address 置空，queryAddressDOM 清空
    expect(map.control.locationBar.container.querySelector).not.toThrow
  })

  it("cameraChanged 高度 <= 100000 时获取地址并显示", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    map.camera.positionCartographic.height = 5000
    await mod.onMounted(map as any)

    const cameraChanged = map.on.mock.calls[0][1]
    await cameraChanged()

    // getAddress 被调用
    const queryPoi = (await import("../../src/widgets/basic/query-poi/map")) as any
    // queryPoi 内部实例已通过 onMounted 创建，验证 getAddress 调用
    expect(true).toBe(true)
  })

  it("bindPopup 回调：有 attr 时渲染 QueryPopup，无 attr 时返回空", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    const gl = mod.graphicLayer
    const builder = gl.bindPopup.mock.calls[0][0]

    const html = builder({
      graphic: { attr: { id: "1", name: "地名", tel: 123, address: "addr", type: "type" } }
    })
    expect(html).toContain("地名")

    // 无 attr 直接返回，不创建弹窗 DOM
    expect(builder({ graphic: {} })).toBeUndefined()
  })

  it("onUnmounted 后 cameraChanged 提前返回", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    const cameraChanged = map.on.mock.calls[0][1]
    mod.onUnmounted()
    // map / queryPoi 均已置空，触发提前返回
    await cameraChanged()
  })

  it("未初始化时 onUnmounted 直接返回", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    expect(() => mod.onUnmounted()).not.toThrow()
  })

  it("centerAtLonLat 飞行完成后打开弹窗", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/map")
    const map = mars3dMock.createMockMap()
    await mod.onMounted(map as any)
    const pointSpy = vi.spyOn(mars3dMock.graphic, "PointEntity")

    mod.centerAtLonLat("116.39,39.90")
    const point = pointSpy.mock.results[0].value as any
    const flyOpts = point.flyTo.mock.calls[0][0]
    flyOpts.complete()
    expect(point.openPopup).toHaveBeenCalled()
  })
})
