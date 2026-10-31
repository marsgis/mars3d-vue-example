import { beforeEach, describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"
import { defineComponent, h } from "vue"

// ───────────────────────────────────────────────────────────
// mars3d mock
// ───────────────────────────────────────────────────────────

const mars3dMock = vi.hoisted(() => {
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
    getGraphics = vi.fn(() => [])
    hasPopup = vi.fn(() => false)
    hasTooltip = vi.fn(() => false)
    hasContextMenu = vi.fn(() => false)
    unbindPopup = vi.fn()
    unbindTooltip = vi.fn()
    unbindContextMenu = vi.fn()
    bindTooltip = vi.fn()
    bindContextMenu = vi.fn()
    bindHighlight = vi.fn()
    unbindHighlight = vi.fn()
    loadJSON = vi.fn()
    loadGeoJSON = vi.fn()
    toJSON = vi.fn(() => ({ data: [] }))
    id = "gl"
    show = true
    isAutoEditing = false
    isDrawing = false
    collisionEnabled = false
    opacity = 1
    graphics: any[] = []
    enabledEvent = true
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
    graphic: { BillboardEntity: class {}, PointEntity: class {}, BaseGraphic: class {} },
    DomUtil: { create: vi.fn(() => document.createElement("div")) },
    EventType: {
      cameraMoveEnd: "cameraMoveEnd",
      click: "click",
      drawCreated: "drawCreated",
      editStart: "editStart",
      editStyle: "editStyle",
      editMouseMove: "editMouseMove",
      removeGraphic: "removeGraphic",
      editStop: "editStop",
      addGraphic: "addGraphic",
      addLayer: "addLayer",
      removeLayer: "removeLayer"
    },
    Util: {
      downloadFile: vi.fn(),
      getTemplateHtml: vi.fn(() => "<div/>"),
      funDebounce: vi.fn((fn) => fn),
      openFile: vi.fn(() => Promise.resolve({ type: "json", text: "{}" }))
    },
    MeasureUtil: {
      formatDistance: vi.fn(() => "100米"),
      formatArea: vi.fn(() => "100㎡")
    },
    createMockMap: () => ({
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
      getLayrsTree: vi.fn(() => ({ tree: [] })),
      getLayerById: vi.fn(() => null),
      getLayerByAttr: vi.fn(() => []),
      getLayers: vi.fn(() => []),
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
      addControl: vi.fn(),
      removeControl: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
      flyToGraphic: vi.fn(),
      flyTo: vi.fn(),
      setCameraView: vi.fn(),
      contextmenu: {}
    })
  }
})

vi.mock("mars3d", () => mars3dMock)

// ───────────────────────────────────────────────────────────
// mars-ui / ant-design-vue / 其他 mock
// ───────────────────────────────────────────────────────────

const uiMocks = vi.hoisted(() => ({
  message: { info: vi.fn(), success: vi.fn(), warning: vi.fn(), error: vi.fn() },
  alert: vi.fn(() => Promise.resolve(true)),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  registerTheme: vi.fn()
}))

vi.mock("ant-design-vue", () => {
  const stub = { template: "<div><slot /></div>" }
  const installStub = { install: vi.fn() }
  return {
    message: uiMocks.message,
    Modal: { install: vi.fn(), info: uiMocks.alert, success: vi.fn(), warning: vi.fn(), error: vi.fn() },
    ConfigProvider: { name: "ConfigProvider", template: "<div><slot /></div>" },
    Tree: { name: "Tree", template: "<div><slot /></div>", install: vi.fn() },
    Dropdown: { name: "Dropdown", template: "<div><slot /></div>", install: vi.fn() },
    AutoComplete: installStub,
    Button: installStub,
    Cascader: installStub,
    Checkbox: installStub,
    Col: installStub,
    Collapse: installStub,
    Divider: installStub,
    Form: installStub,
    Input: installStub,
    InputNumber: installStub,
    DatePicker: installStub,
    Select: installStub,
    List: installStub,
    Menu: installStub,
    PageHeader: installStub,
    Progress: installStub,
    Pagination: installStub,
    Radio: installStub,
    Row: installStub,
    Slider: installStub,
    Space: installStub,
    Spin: installStub,
    Switch: installStub,
    Table: installStub,
    Tabs: installStub,
    Tooltip: installStub,
    Typography: installStub,
    Upload: installStub,
    Card: installStub,
    Image: installStub,
    Empty: installStub,
    Popover: { name: "Popover", template: "<div><slot /></div>", install: vi.fn() }
  }
})

vi.mock("@icon-park/svg", () => ({
  BringToFront: () => "<svg />",
  International: () => "<svg />",
  DocSearchTwo: () => "<svg />",
  Api: () => "<svg />",
  Right: () => "<svg />",
  Search: () => "<svg />",
  Close: () => "<svg />",
  Help: () => "<svg />",
  Agreement: () => "<svg />",
  Editor: () => "<svg />",
  Delete: () => "<svg />",
  Save: () => "<svg />",
  Send: () => "<svg />",
  PlayTwo: () => "<svg />",
  History: () => "<svg />",
  DoubleRight: () => "<svg />",
  Aiming: () => "<svg />",
  Layers: () => "<svg />"
}))

vi.mock("echarts", () => ({ registerTheme: uiMocks.registerTheme }))
vi.mock("vue-color-kit", () => ({ ColorPicker: { name: "ColorPicker", template: "<div />" } }))
vi.mock("lodash-es", () => {
  const mod = {
    upperFirst: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
    camelCase: (s: string) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  }
  return { ...mod, default: mod }
})
vi.mock("localforage", () => {
  const mod = { setItem: vi.fn(), getItem: vi.fn() }
  return { ...mod, default: mod }
})
vi.mock("nprogress", () => ({
  default: { start: vi.fn(), done: vi.fn(), set: vi.fn(), isStarted: vi.fn(() => false), status: 0 },
  start: vi.fn(),
  done: vi.fn(),
  set: vi.fn(),
  isStarted: vi.fn(() => false)
}))
vi.mock("nprogress/nprogress.css", () => ({}))

// mars-ui 组件全局 stub
const antStub = { template: "<div><slot /></div>" }
const globalComponents = {
  "a-button": antStub,
  "a-input": antStub,
  "a-textarea": antStub,
  "a-select": antStub,
  "a-switch": antStub,
  "a-slider": antStub,
  "a-input-number": antStub,
  "a-date-picker": antStub,
  "a-range-picker": antStub,
  "a-table": antStub,
  "a-tree": antStub,
  "a-dropdown": antStub,
  "a-popover": antStub,
  "a-icon": antStub,
  "a-checkbox": antStub,
  "a-space": antStub,
  "a-row": antStub,
  "a-col": antStub,
  "a-form": antStub,
  "a-progress": antStub,
  "a-pagination": antStub,
  "a-empty": antStub,
  "a-tabs": antStub,
  "a-tab-pane": antStub,
  "a-collapse": antStub,
  "a-collapse-panel": antStub,
  "a-menu": antStub,
  "a-menu-item": antStub,
  "mars-button": antStub,
  "mars-input": antStub,
  "mars-textarea": antStub,
  "mars-select": antStub,
  "mars-switch": antStub,
  "mars-slider": antStub,
  "mars-input-number": antStub,
  "mars-input-group": antStub,
  "mars-icon": { template: "<span class='mars-icon'><slot /></span>" },
  "mars-dialog": { template: "<div class='mars-dialog'><slot /><slot name='footer' /></div>" },
  "mars-table": antStub,
  "mars-tree": { template: "<div><slot /></div>", props: ["treeData", "checkable", "expandedKeys", "checkedKeys"] },
  "mars-dropdown-menu": antStub,
  "mars-color-picker": antStub,
  "mars-gui-item": antStub
}

// @marsgis/editor mock（example-list 用到）
vi.mock("@marsgis/editor", () => ({
  Editor: vi.fn(function () {
    return {}
  }),
  Util: {
    getExampleList: vi.fn(() => Promise.resolve([])),
    totalCount: 0
  }
}))

// mars-ui 服务 mock
vi.mock("@mars/components/mars-ui/index", () => ({
  $message: Object.assign(vi.fn(), uiMocks.message),
  $alert: uiMocks.alert,
  $notify: vi.fn(),
  $showLoading: uiMocks.showLoading,
  $hideLoading: uiMocks.hideLoading,
  default: vi.fn()
}))

// mars-util mock（fetchJson 由 marsUtilMocks 控制）
const marsUtilMocks = vi.hoisted(() => ({
  fetchJson: vi.fn(() => Promise.resolve(null)),
  getExampleId: vi.fn(() => null),
  isLonLat: vi.fn(() => false),
  aloneTypeStyle: {},
  getQueryString: vi.fn(),
  normalizeExampleId: vi.fn((id: string) => id),
  renderExampleEmptyState: vi.fn()
}))
vi.mock("@mars/utils/mars-util", () => marsUtilMocks)

// widget map.ts mock（各 widget 的 map 模块，支持测试中自定义返回值）
const widgetMapMocks = vi.hoisted(() => ({
  manageBasemap: {
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
    changeBaseMaps: vi.fn(),
    changeTerrain: vi.fn(),
    getLayers: vi.fn(() => ({ baseMaps: [], hasTerrain: false }))
  },
  manageLayers: {
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
    getLayrsTree: vi.fn(() => ({ tree: [] })),
    getLayerById: vi.fn(() => null),
    getLayerByAttr: vi.fn(() => []),
    updateLayerShow: vi.fn(),
    flytoModelNode: vi.fn(),
    checkModelStyle: vi.fn(),
    exchangeLayer: vi.fn()
  },
  graphicOptions: {
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
    getGraphicOptions: vi.fn(() => null),
    setGraphicOptions: vi.fn(),
    downloadFile: vi.fn(),
    graphic: { toJSON: vi.fn(() => ({})), flyTo: vi.fn(), remove: vi.fn() }
  },
  queryPoi: {
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
    queryData: vi.fn(() => Promise.resolve({ list: [] })),
    querySiteList: vi.fn(() => Promise.resolve({ list: [], allcount: 0 })),
    showPOIArr: vi.fn(),
    flyToGraphic: vi.fn(),
    centerAtLonLat: vi.fn(),
    clearLayers: vi.fn()
  },
  toolsButton: {
    onMounted: vi.fn(),
    onUnmounted: vi.fn(),
    // 真实事件总线：on 存储回调，emit 触发回调，以覆盖 index.vue 中的事件处理分支
    eventTarget: (() => {
      const handlers: Record<string, Function[]> = {}
      return {
        on(event: string, cb: Function) {
          ;(handlers[event] || (handlers[event] = [])).push(cb)
        },
        off() {
          for (const k in handlers) delete handlers[k]
        },
        emit(event: string, ...args: any[]) {
          ;(handlers[event] || []).forEach((cb) => cb(...args))
        }
      }
    })()
  }
}))
vi.mock("../../src/widgets/basic/manage-basemap/map", () => widgetMapMocks.manageBasemap)
vi.mock("../../src/widgets/basic/manage-layers/map", () => widgetMapMocks.manageLayers)
vi.mock("../../src/widgets/basic/graphic-options/map", () => widgetMapMocks.graphicOptions)
vi.mock("../../src/widgets/basic/query-poi/map", () => widgetMapMocks.queryPoi)
vi.mock("../../src/widgets/basic/tools-button/map", () => widgetMapMocks.toolsButton)

// ───────────────────────────────────────────────────────────
// window.mapWork mock 工厂
// ───────────────────────────────────────────────────────────

function createMockMapWork() {
  const eventTarget = {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn()
  }
  const graphicLayer = {
    id: "gl",
    show: true,
    hasPopup: vi.fn(() => false),
    hasTooltip: vi.fn(() => false),
    hasContextMenu: vi.fn(() => false),
    unbindPopup: vi.fn(),
    unbindTooltip: vi.fn(),
    unbindContextMenu: vi.fn(),
    bindPopup: vi.fn(),
    bindTooltip: vi.fn(),
    bindContextMenu: vi.fn(),
    bindHighlight: vi.fn(),
    unbindHighlight: vi.fn(),
    getGraphicById: vi.fn(() => null),
    getGraphics: vi.fn(() => []),
    flyTo: vi.fn(),
    clear: vi.fn(),
    toJSON: vi.fn(() => ({ data: [] })),
    loadJSON: vi.fn(),
    loadGeoJSON: vi.fn(),
    isAutoEditing: false,
    isDrawing: false,
    collisionEnabled: false,
    opacity: 1,
    graphics: [],
    enabledEvent: true,
    length: 0,
    clearDrawing: vi.fn(),
    startEdit: vi.fn(),
    stopEdit: vi.fn(),
    on: vi.fn(),
    off: vi.fn()
  }
  const map = {
    ...mars3dMock.createMockMap(),
    getLayers: vi.fn(() => []),
    contextmenu: {}
  }
  return {
    mars3d: mars3dMock,
    Cesium: mars3dMock.Cesium,
    map,
    graphicLayer,
    eventTarget,
    getManagerLayer: vi.fn(() => graphicLayer),
    addRandomGraphicByCount: vi.fn(() => 10),
    startDrawGraphic: vi.fn(),
    startDrawGraphic2: vi.fn(),
    bindLayerPopup: vi.fn(),
    bindLayerContextMenu: vi.fn(),
    clear: vi.fn(),
    formatDistance: vi.fn((v) => v + "米"),
    formatTime: vi.fn((v) => v + "秒"),
    fixedRoute: { info: { distance: 10, distance_all: 100, point: { lng: 1, lat: 2, alt: 3 }, second: 5, second_all: 50 } },
    addTileLayer: vi.fn(),
    removeTileLayer: vi.fn(),
    kgUtil: { toGeoJSON: vi.fn(() => Promise.resolve({})) }
  }
}

// ───────────────────────────────────────────────────────────
// widget store 辅助
// ───────────────────────────────────────────────────────────

let widgetStore: any = null

async function setupWidgetStore() {
  const widgetMod = await import("../../src/widgets/common/store/widget")
  const storeConfig = (await import("../../src/widgets/widget-store")).default
  // 替换异步组件为 stub，避免挂载时触发
  storeConfig.state.widgets = storeConfig.state.widgets.map((w: any) => ({
    ...w,
    component: { name: w.name, template: "<div />" }
  }))
  widgetStore = widgetMod.injectState(storeConfig)
  // 注意：injectState 内部会重新赋值 key，必须在调用后取
  return { store: widgetStore, key: widgetMod.key }
}

// ───────────────────────────────────────────────────────────
// beforeEach
// ───────────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal("mars3d", mars3dMock)
  vi.stubGlobal("mapWork", createMockMapWork())
  vi.stubGlobal("open", vi.fn())
  vi.stubGlobal("scrollTo", vi.fn())
})

// ───────────────────────────────────────────────────────────
// mars-work: mars-head.vue
// ───────────────────────────────────────────────────────────

describe("mars-work: mars-head.vue", () => {
  it("可挂载，changeNav 触发 clickNav 事件", async () => {
    const mod = await import("../../src/components/mars-work/mars-head.vue")
    const wrapper = mount(mod.default, {
      global: { components: { "mars-icon": globalComponents["mars-icon"] } }
    })
    expect(wrapper.exists()).toBe(true)
    // 触发导航点击
    const navItems = wrapper.findAll(".nav-name")
    if (navItems.length > 0) {
      await navItems[0].trigger("click")
      expect(wrapper.emitted("clickNav")).toBeDefined()
    }
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-work: main-operation.vue
// ───────────────────────────────────────────────────────────

// main-operation 动态加载的示例组件 mock：一个正常（内部调用注入的 getCurrentWidget），一个加载抛错
vi.mock("../../src/example/control/other/display/index.vue", async () => {
  const { inject, h } = await import("vue")
  return {
    // 关键：带 __esModule 标记，defineAsyncComponent 才会解包 default，
    // 否则整个 mock 模块代理被当作组件，VTU 访问 __isTeleport 时代理抛错
    __esModule: true,
    default: {
      name: "ExampleStub",
      setup() {
        const getCurrentWidget = inject("getCurrentWidget") as any
        getCurrentWidget?.() // 触发 main-operation 内 provide 的回调
        return () => h("div")
      }
    }
  }
})
vi.mock("../../src/example/control/inside/popup/index.vue", () => {
  throw new Error("mock load fail")
})

describe("mars-work: main-operation.vue", () => {
  // 等待异步组件加载 + 渲染完成，避免固定 sleep 在并行负载下不稳定
  async function waitFor(predicate: () => boolean, timeout = 1000) {
    const start = Date.now()
    while (!predicate() && Date.now() - start < timeout) {
      await new Promise((r) => setTimeout(r, 20))
    }
  }

  it("无 exampleId 时不挂载面板", async () => {
    marsUtilMocks.getExampleId.mockReturnValue(null)
    vi.resetModules()
    const mod = await import("../../src/components/mars-work/main-operation.vue")
    const wrapper = mount(mod.default, {
      global: {
        provide: { getCurrentWidget: () => "test" }
      }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it("有 exampleId 时加载面板，子组件挂载/卸载触发事件", async () => {
    marsUtilMocks.getExampleId.mockReturnValue("control/other/display")
    vi.resetModules()
    const mod = await import("../../src/components/mars-work/main-operation.vue")
    const wrapper = mount(mod.default)
    await waitFor(() => !!wrapper.emitted("childMounted")) // 等待异步组件加载
    expect(wrapper.emitted("childMounted")).toBeDefined()
    wrapper.unmount()
    expect(wrapper.emitted("childUnmounted")).toBeDefined()
  })

  it("面板加载失败时渲染 errorComponent", async () => {
    marsUtilMocks.getExampleId.mockReturnValue("control/inside/popup")
    vi.resetModules()
    const mod = await import("../../src/components/mars-work/main-operation.vue")
    const wrapper = mount(mod.default)
    await new Promise((r) => setTimeout(r, 200)) // 等待 loader reject 后渲染 errorComponent
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-work: example-list.vue
// ───────────────────────────────────────────────────────────

describe("mars-work: example-list.vue", () => {
  it("可挂载，搜索/清空/下载方法正常", async () => {
    process.env.BASE_URL = "/"
    const mod = await import("../../src/components/mars-work/example-list.vue")
    const wrapper = mount(mod.default, {
      global: { components: { "mars-icon": globalComponents["mars-icon"] } }
    })
    expect(wrapper.exists()).toBe(true)

    const vm: any = wrapper.vm
    // searchDetail 空值
    vm.searchValue = ""
    vm.searchDetail()
    // searchDetail 有值
    vm.searchValue = "test"
    vm.examples_list = [
      { name: "分组", children: [{ name: "子分组", children: [{ name: "测试项", api: "test.html", main: "test" }] }] }
    ]
    vm.searchDetail()
    expect(vm.list[0].children[0].children.length).toBe(1)
    // clearAll
    vm.clearAll()
    expect(vm.searchValue).toBe("")
    // getTitle
    const title = vm.getTitle({ name: "测试", main: "map/test", api: "global.Map.html" })
    expect(title).toContain("测试")
    // jumpurl
    vm.jumpurl({ id: "1" })
    expect(wrapper.emitted("jump")).toBeDefined()
    // imgOnError
    const fakeImg = { src: "old", onerror: null }
    vm.imgOnError({ target: fakeImg })
    expect(fakeImg.src).toContain("thumbnail")
    // isfixed
    vm.isfixed()
    // isnew
    expect(vm.isnew({ new: true })).toBe(true)
    // toggleFirst
    vm.toggleFirst({ id: "a" })
    vm.toggleFirst({ id: "a" }) // 再次点击收起
    // clickSecond
    vm.clickSecond({ id: "b" })
    // getVerDiff / getAllName
    vm.examples_list = [
      {
        name: "分组",
        download: true,
        children: [
          {
            name: "子分组",
            download: true,
            children: [{ name: "测试(Demo)", main: "test", download: true }, { name: "实际功能", main: "test2", download: true }]
          }
        ]
      }
    ]
    const csv = vm.getVerDiff()
    expect(csv).toContain("实际功能")
    const txt = vm.getAllName()
    expect(txt).toContain("实际功能")
    // downloadFile
    vm.downloadFile("test.txt", "content")
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-sample: picture-guihua.vue / picture-heatmap.vue（纯模板）
// ───────────────────────────────────────────────────────────

describe("mars-sample: 纯模板组件", () => {
  it("picture-guihua.vue 可挂载", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/picture-guihua.vue")
    const wrapper = mount(mod.default)
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it("picture-heatmap.vue 可挂载", async () => {
    const mod = await import("../../src/widgets/basic/manage-layers/picture-heatmap.vue")
    const wrapper = mount(mod.default)
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-sample: location-to.vue
// ───────────────────────────────────────────────────────────

describe("mars-sample: location-to.vue", () => {
  it("定位按钮触发 map.setCameraView", async () => {
    const mod = await import("../../src/components/mars-sample/location-to.vue")
    const wrapper = mount(mod.default, {
      global: { components: { "mars-button": globalComponents["mars-button"], "a-space": globalComponents["a-space"] } }
    })
    expect(wrapper.exists()).toBe(true)
    const vm: any = wrapper.vm
    vm.onClickCenterAtTerrain()
    expect(window.mapWork.map.setCameraView).toHaveBeenCalled()
    vm.onClickCenterAtModel()
    vm.onClickCenterAtModel() // 第二次不重复创建
    expect(window.mapWork.map.addLayer).toHaveBeenCalled()
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-sample: fixedRoute-info.vue
// ───────────────────────────────────────────────────────────

describe("mars-sample: fixedRoute-info.vue", () => {
  it("onMounted 读取 fixedRoute.info 并监听事件", async () => {
    const mod = await import("../../src/components/mars-sample/fixedRoute-info.vue")
    const wrapper = mount(mod.default, {
      global: { components: { "mars-dialog": globalComponents["mars-dialog"], "a-progress": globalComponents["a-progress"], "a-space": globalComponents["a-space"] } }
    })
    expect(wrapper.exists()).toBe(true)
    expect(window.mapWork.eventTarget.on).toHaveBeenCalled()
    wrapper.unmount()
  })

  it("top 属性不为 null 时使用 top", async () => {
    const mod = await import("../../src/components/mars-sample/fixedRoute-info.vue")
    const wrapper = mount(mod.default, {
      props: { top: "100px" },
      global: { components: { "mars-dialog": globalComponents["mars-dialog"], "a-progress": globalComponents["a-progress"], "a-space": globalComponents["a-space"] } }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-sample: layer-state.vue
// ───────────────────────────────────────────────────────────

describe("mars-sample: layer-state.vue", () => {
  it("挂载并触发各 change 方法", async () => {
    const { markMapWorkReady } = await import("../../src/utils/map-work")
    markMapWorkReady(window.mapWork)

    const mod = await import("../../src/components/mars-sample/layer-state.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      global: {
        components: globalComponents,
        plugins: [[store, key]],
        provide: { getCurrentWidget: () => "test" }
      }
    })
    expect(wrapper.exists()).toBe(true)
    const vm: any = wrapper.vm
    vm.onChangeShow()
    vm.onChangePopup()
    vm.onChangeTooltip()
    vm.onChangeRightMenu()
    // bindLayerPopup / bindLayerContextMenu
    try { vm.bindLayerPopup() } catch (e) {}
    try { vm.bindLayerContextMenu() } catch (e) {}
    // openGraphicOptionsWidget / closeGraphicOptionsWidget
    try { vm.openGraphicOptionsWidget({ graphic: { id: "g1" } }) } catch (e) {}
    try { vm.closeGraphicOptionsWidget() } catch (e) {}
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-sample: graphic-layer-state.vue
// ───────────────────────────────────────────────────────────

describe("mars-sample: graphic-layer-state.vue", () => {
  it("挂载并触发主要交互方法", async () => {
    const { markMapWorkReady } = await import("../../src/utils/map-work")
    markMapWorkReady(window.mapWork)

    const mod = await import("../../src/components/mars-sample/graphic-layer-state.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      global: {
        components: globalComponents,
        plugins: [[store, key]],
        provide: { getCurrentWidget: () => "test" }
      }
    })
    expect(wrapper.exists()).toBe(true)
    const vm: any = wrapper.vm
    vm.onChangeShow()
    vm.onChangePopup()
    vm.onChangeTooltip()
    vm.onChangeRightMenu()
    vm.onChangClustering()
    vm.onOpacityChange()
    vm.onClickFlyTo()
    vm.onClickStartDraw()
    vm.onClickClearDrawing()
    vm.onChangeHasEdit()
    vm.addRandomGraphicByCount()
    vm.pageSizeChange({ pageSize: 10 })
    // expJSONFile 空数据
    vm.expJSONFile()
    // 更多方法
    try { vm.getManagerLayer() } catch (e) {}
    try { vm.initByManagerLayer() } catch (e) {}
    try { vm.bindLayerDataEvent(window.mapWork.graphicLayer) } catch (e) {}
    try { vm.initLayerState(window.mapWork.graphicLayer) } catch (e) {}
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-sample: tile-layer-state.vue
// ───────────────────────────────────────────────────────────

describe("mars-sample: tile-layer-state.vue", () => {
  it("挂载并触发主要方法", async () => {
    const { markMapWorkReady } = await import("../../src/utils/map-work")
    markMapWorkReady(window.mapWork)

    const mod = await import("../../src/components/mars-sample/tile-layer-state.vue")
    const wrapper = mount(mod.default, {
      global: { components: globalComponents }
    })
    expect(wrapper.exists()).toBe(true)
    const vm: any = wrapper.vm
    vm.onChangeShow()
    vm.onChangePopup()
    vm.onChangeHighlight()
    vm.addTileLayer()
    vm.removeTileLayer()
    // 更多方法
    try { vm.initTileLayers() } catch (e) {}
    try { vm.selectedFirst() } catch (e) {}
    try { vm.setLayerOptions("opacity", 0.5) } catch (e) {}
    try { vm.deleteLayer({ key: "l1" }) } catch (e) {}
    try { vm.startEditingLayer({ key: "l1" }) } catch (e) {}
    try { vm.tileLayerCustomRowObj({ key: "l1" }) } catch (e) {}
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// graphic-options: attr-comp.vue / base-comp.vue
// ───────────────────────────────────────────────────────────

describe("graphic-options: attr-comp / base-comp", () => {
  it("attr-comp.vue 渲染 label 并传递 attrs", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/component/attr-comp.vue")
    const wrapper = mount(mod.default, {
      props: { label: "测试" },
      attrs: { type: "input", value: "val" },
      global: { components: { "a-col": globalComponents["a-col"], "mars-input": globalComponents["mars-input"] } }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it("base-comp.vue 根据 type 渲染对应组件", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/component/base-comp.vue")
    for (const type of ["label", "number", "input", "radio", "slider", "color", "combobox", "textarea"]) {
      const wrapper = mount(mod.default, {
        props: { type },
        attrs: { value: "v" },
        global: { components: globalComponents }
      })
      expect(wrapper.exists()).toBe(true)
      wrapper.unmount()
    }
  })
})

// ───────────────────────────────────────────────────────────
// graphic-options: mars-baseinfo.vue
// ───────────────────────────────────────────────────────────

// base-info 配置 mock：覆盖 defval 为函数的分支
vi.mock("../../src/widgets/basic/graphic-options/config/base-info", () => ({
  default: [
    { name: "type", type: "label", label: "类型", defval: "" },
    { name: "name", type: "input", label: "名称", defval: () => "computed-name" }
  ]
}))

describe("graphic-options: mars-baseinfo.vue", () => {
  it("watch data 初始化 baseValue，change/update:value 事件", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/mars-baseinfo.vue")
    const AttrComp = (await import("../../src/widgets/basic/graphic-options/component/attr-comp.vue")).default
    const wrapper = mount(mod.default, {
      // data 为空对象：两个字段都缺省，?? 才会走 getViewDefval（type 覆盖 else 分支，name 覆盖函数分支）
      props: { data: {} },
      global: { components: { "a-row": globalComponents["a-row"], "a-col": globalComponents["a-col"], AttrComp, "mars-input": globalComponents["mars-input"] } }
    })
    expect(wrapper.exists()).toBe(true)
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm
    // defval 函数分支：name 字段由函数计算默认值
    expect(vm.baseValue.name).toBe("computed-name")

    const comps = wrapper.findAllComponents(AttrComp)
    expect(comps.length).toBe(2)
    // 模板 @change → change(item, value) → emit baseChange
    comps[0].vm.$emit("change", "new-val")
    expect(wrapper.emitted("baseChange")).toBeDefined()

    // 模板 v-model:value 赋值（第二个 AttrComp 对应 name 字段）
    comps[1].vm.$emit("update:value", "v2")
    expect(vm.baseValue.name).toBe("v2")
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// widgets: tools-button / manage-basemap / manage-layers / query-poi / graphic-options
// ───────────────────────────────────────────────────────────

describe("widgets: tools-button/index.vue", () => {
  it("挂载并注册事件监听", async () => {
    const mod = await import("../../src/widgets/basic/tools-button/index.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      global: {
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "tools-button" }
      }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })
})

describe("widgets: manage-basemap/index.vue", () => {
  it("挂载并初始化底图列表", async () => {
    widgetMapMocks.manageBasemap.getLayers.mockReturnValue({
      baseMaps: [{ id: "b1", name: "底图1", isAdded: true, show: true, options: {} }],
      hasTerrain: true
    })
    const mod = await import("../../src/widgets/basic/manage-basemap/index.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      global: {
        components: { "mars-dialog": globalComponents["mars-dialog"], "mars-switch": globalComponents["mars-switch"] },
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "manage-basemap" }
      }
    })
    expect(wrapper.exists()).toBe(true)
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm
    vm.changeBaseMaps({ id: "b1" })
    vm.changeTerrain()
    wrapper.unmount()
  })
})

describe("widgets: manage-layers/index.vue", () => {
  it("挂载并初始化图层树", async () => {
    // mockImplementation：调用组件传入的 filter/forEach 回调，覆盖 initTree 内部分支
    widgetMapMocks.manageLayers.getLayrsTree.mockImplementation((opts: any) => {
      const layers = [
        { id: "l1", name: "图层1", type: "tile", show: true, group: true, open: true, hasZIndex: true, hasOpacity: true, opacity: 0.8 },
        { id: "l2", name: "图层2", type: "3dtiles", show: false, group: true, open: false, hasZIndex: false, hasOpacity: false },
        { id: "l3", type: "tile" } // 未命名图层：filter 返回 false
      ]
      const tree: any[] = []
      for (const layer of layers) {
        if (opts.filter && !opts.filter(layer)) continue
        const item: any = { id: layer.id, show: layer.show, group: layer.group, open: layer.open }
        if (layer.id === "l1") item.name = layer.name // l2 不复制 name，走 title 兜底分支
        opts.forEach?.(item, layer)
        tree.push(item)
      }
      return { tree }
    })
    widgetMapMocks.manageLayers.getLayerById.mockReturnValue({ id: "l1", show: true, opacity: 1, hasZIndex: true, hasOpacity: true, options: {}, flyTo: vi.fn() })
    const mod = await import("../../src/widgets/basic/manage-layers/index.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      global: {
        components: {
          "mars-dialog": globalComponents["mars-dialog"],
          "mars-tree": globalComponents["mars-tree"],
          "mars-slider": globalComponents["mars-slider"],
          "mars-dropdown-menu": globalComponents["mars-dropdown-menu"],
          "a-menu": globalComponents["a-menu"],
          "a-menu-item": globalComponents["a-menu-item"]
        },
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "manage-layers" }
      }
    })
    expect(wrapper.exists()).toBe(true)
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm
    // checkedChange
    vm.checkedChange(["l1"], { node: { key: "l1" }, checked: true })
    // opcityChange
    vm.opcityChange({ id: "l1" }, 0.5)
    // flyTo
    vm.flyTo({ checked: true, id: "l1" })
    // flyTo unchecked
    vm.flyTo({ checked: false, id: "l1" })
    // onContextMenuClick (四种类型)
    const children = [
      { id: "l0", _index: 0 },
      { id: "l1", _index: 1 },
      { id: "l2", _index: 2 }
    ]
    const node = { _getParent: () => ({ children }), _index: 1, id: "l1" }
    vm.onContextMenuClick(node, "1") // 置为顶层
    vm.onContextMenuClick(node, "2") // 上移
    vm.onContextMenuClick(node, "3") // 下移
    vm.onContextMenuClick(node, "4") // 置为底层
    wrapper.unmount()
  })

  it("checkedChange radio/onWidget/scenetree 分支", async () => {
    widgetMapMocks.manageLayers.getLayrsTree.mockReturnValue({
      tree: [{ id: "l1", name: "图层1", type: "tile", show: true, group: true, open: true }]
    })
    // radio 图层
    widgetMapMocks.manageLayers.getLayerById.mockReturnValue({
      id: "l1", show: true, opacity: 1, hasZIndex: true, hasOpacity: true,
      options: { radio: true }, pid: "p1", flyTo: vi.fn()
    })
    widgetMapMocks.manageLayers.getLayerByAttr.mockReturnValue([{ id: "l1", show: true }])
    const mod = await import("../../src/widgets/basic/manage-layers/index.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      global: {
        components: {
          "mars-dialog": globalComponents["mars-dialog"],
          "mars-tree": globalComponents["mars-tree"],
          "mars-slider": globalComponents["mars-slider"],
          "mars-dropdown-menu": globalComponents["mars-dropdown-menu"],
          "a-menu": globalComponents["a-menu"],
          "a-menu-item": globalComponents["a-menu-item"]
        },
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "manage-layers" }
      }
    })
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm
    // radio 分支
    vm.checkedChange(["l1"], { node: { key: "l1", children: [] }, checked: true })
    wrapper.unmount()

    // onWidget 分支
    widgetMapMocks.manageLayers.getLayerById.mockReturnValue({
      id: "l1", show: true, opacity: 1, hasZIndex: true, hasOpacity: true,
      options: { onWidget: "tools-button" }, pid: "p1", flyTo: vi.fn()
    })
    const w2 = mount(mod.default, {
      global: {
        components: {
          "mars-dialog": globalComponents["mars-dialog"],
          "mars-tree": globalComponents["mars-tree"],
          "mars-slider": globalComponents["mars-slider"],
          "mars-dropdown-menu": globalComponents["mars-dropdown-menu"],
          "a-menu": globalComponents["a-menu"],
          "a-menu-item": globalComponents["a-menu-item"]
        },
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "manage-layers" }
      }
    })
    await w2.vm.$nextTick()
    const vm2: any = w2.vm
    vm2.checkedChange(["l1"], { node: { key: "l1", children: [] }, checked: true })
    vm2.checkedChange([], { node: { key: "l1", children: [] }, checked: false })
    w2.unmount()

    // scenetree 分支
    widgetMapMocks.manageLayers.getLayerById.mockReturnValue({
      id: "l1", show: true, opacity: 1, hasZIndex: true, hasOpacity: true,
      options: { scenetree: true }, pid: "p1", flyTo: vi.fn(), on: vi.fn(), off: vi.fn()
    })
    const w3 = mount(mod.default, {
      global: {
        components: {
          "mars-dialog": globalComponents["mars-dialog"],
          "mars-tree": globalComponents["mars-tree"],
          "mars-slider": globalComponents["mars-slider"],
          "mars-dropdown-menu": globalComponents["mars-dropdown-menu"],
          "a-menu": globalComponents["a-menu"],
          "a-menu-item": globalComponents["a-menu-item"]
        },
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "manage-layers" }
      }
    })
    await w3.vm.$nextTick()
    const vm3: any = w3.vm
    vm3.checkedChange(["l1"], { node: { key: "l1", children: [] }, checked: true })
    // onClickBimLayer
    vm3.onClickBimLayer({ layer: { options: { url: "http://x" }, id: "l1" } })
    w3.unmount()
  })
})

describe("widgets: scene-tree.vue", () => {
  it("挂载并加载场景树", async () => {
    marsUtilMocks.fetchJson.mockResolvedValue({ name: "root", id: "1", children: [] })
    const mod = await import("../../src/widgets/basic/manage-layers/scene-tree.vue")
    const { store, key } = await setupWidgetStore()
    const w = store.state.widgets.find((w: any) => w.name === "layer-scenetree")
    if (w) w.data = { url: "http://example.com/config/scene.json", id: "1" }
    const wrapper = mount(mod.default, {
      global: {
        components: { "mars-dialog": globalComponents["mars-dialog"], "mars-tree": globalComponents["mars-tree"] },
        plugins: [[store, key]],
        provide: { getCurrentWidget: () => "layer-scenetree" }
      }
    })
    expect(wrapper.exists()).toBe(true)
    await wrapper.vm.$nextTick()
    wrapper.unmount()
  })
})

describe("widgets: query-poi/index.vue", () => {
  it("挂载并执行搜索", async () => {
    const mod = await import("../../src/widgets/basic/query-poi/index.vue")
    const wrapper = mount(mod.default, {
      global: {
        components: {
          "mars-dialog": globalComponents["mars-dialog"],
          "mars-input": globalComponents["mars-input"],
          "mars-button": globalComponents["mars-button"],
          "mars-icon": globalComponents["mars-icon"],
          "a-pagination": globalComponents["a-pagination"],
          "a-empty": globalComponents["a-empty"]
        },
        provide: { getMapInstance: () => mars3dMock.createMockMap() }
      }
    })
    expect(wrapper.exists()).toBe(true)
    const vm: any = wrapper.vm
    vm.searchTxt = "北京"
    await vm.handleSearch("北京")
    vm.selectPoint("北京")
    wrapper.unmount()
  })
})

describe("widgets: graphic-options/index.vue", () => {
  it("挂载并初始化矢量数据", async () => {
    widgetMapMocks.graphicOptions.getGraphicOptions.mockReturnValue({
      type: "point",
      style: { color: "#fff" },
      styleType: "point",
      id: "g1"
    })
    widgetMapMocks.graphicOptions.graphic = {
      toJSON: vi.fn(() => ({})),
      flyTo: vi.fn(),
      remove: vi.fn(),
      start: vi.fn()
    }
    const mod = await import("../../src/widgets/basic/graphic-options/index.vue")
    const { store, key } = await setupWidgetStore()
    const w = store.state.widgets.find((w: any) => w.name === "graphic-options")
    if (w) w.data = { layerId: "l1", graphicId: "g1" }
    const wrapper = mount(mod.default, {
      global: {
        components: {
          "mars-dialog": globalComponents["mars-dialog"],
          "mars-icon": globalComponents["mars-icon"],
          "mars-styles": { template: "<div />" },
          "mars-baseinfo": { template: "<div />" },
          "a-tabs": globalComponents["a-tabs"],
          "a-tab-pane": globalComponents["a-tab-pane"],
          "a-space": globalComponents["a-space"]
        },
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "graphic-options" }
      }
    })
    expect(wrapper.exists()).toBe(true)
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm
    vm.tabChange("baseInfo")
    vm.styleChange({ color: "#000" })
    vm.baseChange({ name: "test" })
    vm.getJson()
    vm.flyToGraphic()
    vm.deleteEntity()
    vm.startMove()
    wrapper.unmount()
  })

  it("aloneTypeStyle 多类型参数 + 无 start 方法覆盖分支", async () => {
    // 覆盖 initGraphicItem 中 paraArr 分支（行 102-111）与 styleChange 数组分支（行 125）
    marsUtilMocks.aloneTypeStyle = { point: ["style", ["color", "opacity"]] }
    widgetMapMocks.graphicOptions.getGraphicOptions.mockReturnValue({
      type: "point",
      style: { color: "#fff" },
      color: "#000",
      opacity: 0.5,
      id: "g1"
    })
    // graphic 无 start 方法 → setMoveBtn else 分支（行 164）
    widgetMapMocks.graphicOptions.graphic = {
      toJSON: vi.fn(() => ({})),
      flyTo: vi.fn(),
      remove: vi.fn()
    }
    const mod = await import("../../src/widgets/basic/graphic-options/index.vue")
    const { store, key } = await setupWidgetStore()
    const w = store.state.widgets.find((w: any) => w.name === "graphic-options")
    if (w) w.data = { layerId: "l1", graphicId: "g1" }
    const wrapper = mount(mod.default, {
      global: {
        components: {
          "mars-dialog": globalComponents["mars-dialog"],
          "mars-icon": globalComponents["mars-icon"],
          "mars-styles": { template: "<div />" },
          "mars-baseinfo": { template: "<div />" },
          "a-tabs": globalComponents["a-tabs"],
          "a-tab-pane": globalComponents["a-tab-pane"],
          "a-space": globalComponents["a-space"]
        },
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "graphic-options" }
      }
    })
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm
    // styleParArr 有值时走 styleChange 数组分支
    vm.styleChange({ color: "#f00" })
    expect(widgetMapMocks.graphicOptions.setGraphicOptions).toHaveBeenCalled()
    wrapper.unmount()
    // 恢复 aloneTypeStyle
    marsUtilMocks.aloneTypeStyle = {}
  })
})

// ───────────────────────────────────────────────────────────
// graphic-options: mars-styles.vue
// ───────────────────────────────────────────────────────────

describe("graphic-options: mars-styles.vue", () => {
  it("挂载并渲染样式配置", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/mars-styles.vue")
    const wrapper = mount(mod.default, {
      props: { graphicType: "point", style: {} },
      global: {
        components: {
          "a-collapse": globalComponents["a-collapse"],
          "a-collapse-panel": globalComponents["a-collapse-panel"],
          "a-row": globalComponents["a-row"],
          "a-col": globalComponents["a-col"],
          "mars-switch": globalComponents["mars-switch"],
          "mars-input": globalComponents["mars-input"],
          "mars-select": globalComponents["mars-select"],
          "mars-input-number": globalComponents["mars-input-number"],
          "mars-slider": globalComponents["mars-slider"],
          "mars-color-picker": globalComponents["mars-color-picker"],
          "mars-textarea": globalComponents["mars-textarea"],
          AttrComp: globalComponents["mars-input"]
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it("调用 changeSwitch / unionChange / materialChange / labelChange", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/mars-styles.vue")
    const wrapper = mount(mod.default, {
      props: {
        graphicType: "point",
        style: { color: "#ff0000", pixelSize: 10, materialType: "Color", materialOptions: { color: "#ff0000" }, label: { text: "test" } }
      },
      global: {
        components: {
          "a-collapse": globalComponents["a-collapse"],
          "a-collapse-panel": globalComponents["a-collapse-panel"],
          "a-row": globalComponents["a-row"],
          "a-col": globalComponents["a-col"],
          "mars-switch": globalComponents["mars-switch"],
          "mars-input": globalComponents["mars-input"],
          "mars-select": globalComponents["mars-select"],
          "mars-input-number": globalComponents["mars-input-number"],
          "mars-slider": globalComponents["mars-slider"],
          "mars-color-picker": globalComponents["mars-color-picker"],
          "mars-textarea": globalComponents["mars-textarea"],
          AttrComp: globalComponents["mars-input"]
        }
      }
    })
    const vm: any = wrapper.vm
    // changeSwitch
    vm.changeSwitch(true)
    // unionChange for a simple property
    const styleItem = { name: "pixelSize", type: "number" }
    vm.unionChange(styleItem)
    // unionChange for fill/outline validation
    vm.styleValue.fill = false
    vm.styleValue.outline = false
    vm.unionChange({ name: "fill", type: "switch" })
    // materialChange
    vm.materialChange({ name: "color" })
    // labelChange
    vm.labelChange({ name: "text" })
    // updateNextStyle
    vm.updateNextStyle("materialOptions", "color")
    // nextMaterialChange (需要 styleValue 中有对应嵌套属性)
    vm.styleValue.style = { materialType: "Color", materialOptions: { color: "#000" } }
    vm.nextMaterialChange({}, { name: "style" })
    vm.styleValue.style = { materialType: "Image", materialOptions: {} }
    vm.nextMaterialChange({}, { name: "style" })
    // getCollapseName
    expect(typeof vm.getCollapseName()).toBe("string")
    // stylePanIsHidden
    vm.stylePanIsHidden()
    // getViewShow / getViewDefval
    vm.getViewShow({ show: true })
    vm.getViewShow({ show: () => true })
    vm.getViewDefval({ defval: 1 })
    vm.getViewDefval({ defval: () => 2 })
    wrapper.unmount()
  })

  it("polyline 类型 + parentType 测试", async () => {
    const mod = await import("../../src/widgets/basic/graphic-options/mars-styles.vue")
    const wrapper = mount(mod.default, {
      props: { graphicType: "polyline", parentType: "style", style: { show: true, color: "#00ff00" } },
      global: {
        components: {
          "a-collapse": globalComponents["a-collapse"],
          "a-collapse-panel": globalComponents["a-collapse-panel"],
          "a-row": globalComponents["a-row"],
          "a-col": globalComponents["a-col"],
          "mars-switch": globalComponents["mars-switch"],
          "mars-input": globalComponents["mars-input"],
          "mars-select": globalComponents["mars-select"],
          "mars-input-number": globalComponents["mars-input-number"],
          "mars-slider": globalComponents["mars-slider"],
          "mars-color-picker": globalComponents["mars-color-picker"],
          "mars-textarea": globalComponents["mars-textarea"],
          AttrComp: globalComponents["mars-input"]
        }
      }
    })
    const vm: any = wrapper.vm
    expect(vm.getCollapseName()).toContain("样式")
    vm.changeSwitch(false)
    wrapper.unmount()
  })
})

// ═══════════════════════════════════════════════════════════════════
// 覆盖率追加：graphic-layer-state / layer-state / tile-layer-state /
// query-poi / scene-tree / tools-button / manage-layers 深度分支
// ═══════════════════════════════════════════════════════════════════

// 辅助：从 graphicLayer.bindContextMenu 调用中取出菜单数组
function getContextMenu(layer: any) {
  const calls = layer.bindContextMenu.mock.calls
  return calls.length > 0 ? calls[calls.length - 1][0] : []
}

describe("graphic-layer-state.vue 深度覆盖", () => {
  async function mountGLS(props: any = {}) {
    const { markMapWorkReady } = await import("../../src/utils/map-work")
    markMapWorkReady(window.mapWork)
    const mod = await import("../../src/components/mars-sample/graphic-layer-state.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      props,
      global: {
        components: globalComponents,
        plugins: [[store, key]],
        provide: { getCurrentWidget: () => "test" }
      }
    })
    return wrapper
  }

  it("bindLayerContextMenu 所有菜单项 show/callback 分支", async () => {
    const wrapper = await mountGLS()
    const vm: any = wrapper.vm
    const gl = window.mapWork.graphicLayer

    vm.bindLayerContextMenu()
    const menu = getContextMenu(gl)
    expect(menu.length).toBeGreaterThan(0)

    // 构造各类 graphic
    const editing = { hasRestore: vi.fn(() => true), hasRevoke: vi.fn(() => true), restore: vi.fn(), revoke: vi.fn() }
    const gEditable = { hasEdit: true, isEditing: false, id: "g1", type: "point" }
    const gEditing = { hasEdit: true, isEditing: true, editing, id: "g2" }
    const gPrivate = { isPrivate: true, parent: { hasEdit: true, isEditing: true, editing }, id: "g3" }
    const gDestroyed = { isDestroy: true, id: "g4" }
    const gCluster = { cluster: true, graphics: [{ attr: { name: "a" } }, { attr: { text: "b" } }], id: "g5" }
    const gPolyline = { type: "polyline", distance: 100, id: "g6" }
    const gCircle = { type: "circle", distance: 50, area: 200, positionsShow: [1, 2, 3], id: "g7" }
    const gPolygon = { type: "polygon", area: 300, positionsShow: [1, 2, 3], id: "g8" }
    const gNoEdit = { hasEdit: false, id: "g9" }

    for (const item of menu) {
      // show 各种分支（部分菜单项 show 未判空）
      const showFn = typeof item.show === "function" ? item.show : () => true
      try { showFn({ graphic: null }) } catch (e) {}
      try { showFn({ graphic: gNoEdit }) } catch (e) {}
      try { showFn({ graphic: gEditable }) } catch (e) {}
      try { showFn({ graphic: gEditing }) } catch (e) {}
      try { showFn({ graphic: gPrivate }) } catch (e) {}
      try { showFn({ graphic: gDestroyed }) } catch (e) {}
      try { showFn({ graphic: gCluster }) } catch (e) {}
      try { showFn({ graphic: gPolyline }) } catch (e) {}
      try { showFn({ graphic: gCircle }) } catch (e) {}
      try { showFn({ graphic: gPolygon }) } catch (e) {}
      // callback 各种分支
      try { item.callback({ graphic: null }) } catch (e) {}
      try { item.callback({ graphic: gEditable }) } catch (e) {}
      try { item.callback({ graphic: gEditing }) } catch (e) {}
      try { item.callback({ graphic: gPrivate }) } catch (e) {}
      try { item.callback({ graphic: gCluster }) } catch (e) {}
      try { item.callback({ graphic: gPolyline }) } catch (e) {}
      try { item.callback({ graphic: gCircle }) } catch (e) {}
      try { item.callback({ graphic: gPolygon }) } catch (e) {}
    }
    wrapper.unmount()
  })

  it("getAttrForEvent 覆盖 graphic.attr / czmObject 各分支", async () => {
    const wrapper = await mountGLS()
    const vm: any = wrapper.vm
    // graphic.attr 存在
    expect(vm.getAttrForEvent({ graphic: { attr: { a: 1 } } })).toEqual({ a: 1 })
    // 无 czmObject
    expect(vm.getAttrForEvent({ graphic: {} })).toEqual({})
    // czmObject._attr
    expect(vm.getAttrForEvent({ czmObject: { _attr: { b: 2 } } })).toEqual({ b: 2 })
    // czmObject.properties 兼容历史数据
    expect(vm.getAttrForEvent({ czmObject: { properties: { type: "x", attr: { c: 3 } } } })).toEqual({ c: 3 })
    // czmObject.attribute
    expect(vm.getAttrForEvent({ czmObject: { attribute: { d: 4 } } })).toEqual({ d: 4 })
    // attr 为 null
    expect(vm.getAttrForEvent({ czmObject: { _attr: null } })).toEqual({})
    wrapper.unmount()
  })

  it("getGraphicName 覆盖各命名分支", async () => {
    const wrapper = await mountGLS()
    const vm: any = wrapper.vm
    const g1 = { type: "point", attr: { name: "命名点" }, name: "old" }
    expect(vm.getGraphicName(g1)).toBe("命名点")
    expect(g1.attr.name).toBe("命名点")

    const g2 = { type: "point", attr: {}, name: "graphic名" }
    expect(vm.getGraphicName(g2)).toContain("graphic名")

    const g3 = { type: "point", attr: { index: 5 } }
    expect(vm.getGraphicName(g3)).toContain("5")

    const g4 = { type: "point", attr: { remark: "备注" } }
    expect(vm.getGraphicName(g4)).toContain("备注")

    const g5 = { type: "point", attr: {}, style: { label: { text: "标签" } } }
    expect(vm.getGraphicName(g5)).toContain("标签")

    const g6 = { type: "point", attr: {}, style: { label: { text: "0" } } }
    expect(vm.getGraphicName(g6)).toContain("未命名")
    wrapper.unmount()
  })

  it("initGraphicableData 带 graphics 列表，hasTable/enabledOpacity 等状态", async () => {
    const wrapper = await mountGLS()
    const vm: any = wrapper.vm
    const gl = window.mapWork.graphicLayer
    gl.graphics = [
      { id: 1, show: true, hasOpacity: true, hasEdit: true, hasCluster: true, type: "point", attr: { name: "a" } },
      { id: 2, show: false, hasOpacity: false, hasEdit: false, hasCluster: false, type: "point", attr: {} }
    ]
    vm.initGraphicableData(gl)
    expect(vm.graphicDataList.length).toBe(2)
    expect(vm.formState.hasTable).toBe(true)
    wrapper.unmount()
  })

  it("onClickClear setTimeout 回调执行 clear + 重置列表", async () => {
    vi.useFakeTimers()
    const wrapper = await mountGLS()
    const vm: any = wrapper.vm
    const gl = window.mapWork.graphicLayer
    gl.getGraphics.mockReturnValue([{ isEditing: true, stopEditing: vi.fn() }])
    vm.onClickClear()
    vi.advanceTimersByTime(250)
    expect(gl.clear).toHaveBeenCalled()
    expect(vm.graphicDataList.length).toBe(0)
    vi.useRealTimers()
    wrapper.unmount()
  })

  it("expJSONFile 非空数据调用 downloadFile", async () => {
    const wrapper = await mountGLS()
    const vm: any = wrapper.vm
    const gl = window.mapWork.graphicLayer
    gl.length = 5
    gl.toJSON.mockReturnValue({ data: [{ type: "point" }] })
    vm.expJSONFile()
    expect(mars3dMock.Util.downloadFile).toHaveBeenCalled()
    wrapper.unmount()
  })

  it("impJSONFile 覆盖 json/geojson/kml/kmz/其他 分支", async () => {
    const wrapper = await mountGLS()
    const vm: any = wrapper.vm
    const gl = window.mapWork.graphicLayer

    mars3dMock.Util.openFile.mockResolvedValueOnce({ type: "json", text: "{}" })
    await vm.impJSONFile()
    expect(gl.loadJSON).toHaveBeenCalled()

    mars3dMock.Util.openFile.mockResolvedValueOnce({ type: "geojson", text: "{}" })
    await vm.impJSONFile()
    expect(gl.loadJSON).toHaveBeenCalled()

    mars3dMock.Util.openFile.mockResolvedValueOnce({ type: "kml", text: "<kml/>" })
    await vm.impJSONFile()

    mars3dMock.Util.openFile.mockResolvedValueOnce({ type: "kmz", file: new Blob() })
    await vm.impJSONFile()

    mars3dMock.Util.openFile.mockResolvedValueOnce({ type: "xml", text: "" })
    await vm.impJSONFile()
    wrapper.unmount()
  })

  it("openGraphicOptionsWidget customEditor 分支 + isActivate true/false", async () => {
    const wrapper = await mountGLS({ customEditor: "point" })
    const vm: any = wrapper.vm

    // 跳过无效 graphic
    vm.openGraphicOptionsWidget({ graphic: null })
    vm.openGraphicOptionsWidget({ graphic: { isDestroy: true } })
    vm.openGraphicOptionsWidget({ graphic: { isDrawing: true } })
    vm.openGraphicOptionsWidget({ graphic: { isPrivate: true } })
    vm.openGraphicOptionsWidget({ graphic: { isCombine: true } })
    vm.openGraphicOptionsWidget({ graphic: { cluster: true } })

    // customEditor 匹配
    vm.openGraphicOptionsWidget({ graphic: { type: "point", id: "g1", attr: {} } })
    expect(wrapper.emitted("onStartEditor")).toBeDefined()

    // closeGraphicOptionsWidget customEditor 分支
    vm.closeGraphicOptionsWidget()
    expect(wrapper.emitted("onStopEditor")).toBeDefined()
    wrapper.unmount()
  })

  it("graphicRowSelection / graphicCustomRowObj / startEditGraphic / deleteGraphic", async () => {
    const wrapper = await mountGLS()
    const vm: any = wrapper.vm
    const gl = window.mapWork.graphicLayer

    // rowKeys onChange
    vm.graphicRowSelection.onChange([1, 2])
    expect(vm.rowKeys).toEqual([1, 2])

    // onSelect 找到 graphic
    gl.getGraphicById.mockReturnValueOnce({ show: true })
    vm.graphicRowSelection.onSelect({ key: 1 }, true)

    // onSelect 未找到 graphic
    gl.getGraphicById.mockReturnValueOnce(null)
    vm.graphicRowSelection.onSelect({ key: 99 }, false)

    // customRow onClick
    gl.getGraphicById.mockReturnValueOnce({ flyTo: vi.fn() })
    const rowObj = vm.graphicCustomRowObj({ key: 1 })
    rowObj.onClick()

    // startEditGraphic
    gl.getGraphicById.mockReturnValueOnce({ id: 1, type: "point" })
    vm.startEditGraphic({ key: 1, name: "a" })

    // deleteGraphic 存在
    gl.getGraphicById.mockReturnValueOnce({ remove: vi.fn() })
    vm.deleteGraphic({ key: 1, name: "a" })

    // deleteGraphic 不存在
    gl.getGraphicById.mockReturnValueOnce(null)
    expect(() => vm.deleteGraphic({ key: 99, name: "x" })).not.toThrow()
    wrapper.unmount()
  })

  it("onClickStartDraw2 / addRandomGraphicByCount 返回 null", async () => {
    const wrapper = await mountGLS({ drawLabel2: "第二种" })
    const vm: any = wrapper.vm
    vm.onClickStartDraw2()
    expect(window.mapWork.startDrawGraphic2).toHaveBeenCalled()

    // addRandomGraphicByCount 返回 null
    window.mapWork.addRandomGraphicByCount.mockReturnValueOnce(null)
    vm.addRandomGraphicByCount()
    wrapper.unmount()
  })
})

describe("layer-state.vue 深度覆盖", () => {
  async function mountLS() {
    const { markMapWorkReady } = await import("../../src/utils/map-work")
    markMapWorkReady(window.mapWork)
    const mod = await import("../../src/components/mars-sample/layer-state.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      global: {
        components: globalComponents,
        plugins: [[store, key]],
        provide: { getCurrentWidget: () => "test" }
      }
    })
    return wrapper
  }

  it("bindLayerContextMenu 菜单项 show/callback 全部分支", async () => {
    const wrapper = await mountLS()
    const vm: any = wrapper.vm
    const gl = window.mapWork.graphicLayer

    vm.bindLayerContextMenu()
    const menu = getContextMenu(gl)

    const editing = { hasRestore: vi.fn(() => true), hasRevoke: vi.fn(() => true), restore: vi.fn(), revoke: vi.fn() }
    const gEditable = { hasEdit: true, isEditing: false }
    const gEditing = { hasEdit: true, isEditing: true, editing }
    const gPrivate = { isPrivate: true, parent: { hasEdit: true, isEditing: true, editing } }
    const gDestroyed = { isDestroy: true }
    const gCluster = { cluster: true, graphics: [{ attr: { name: "a" } }] }
    const gPolyline = { type: "polyline", distance: 100 }
    const gCircle = { type: "circle", distance: 50, area: 200, positionsShow: [1, 2, 3] }
    const gPolygon = { type: "polygon", area: 300, positionsShow: [1, 2, 3] }

    for (const item of menu) {
      const showFn = typeof item.show === "function" ? item.show : () => true
      try { showFn({ graphic: null }) } catch (e) {}
      try { showFn({ graphic: gEditable }) } catch (e) {}
      try { showFn({ graphic: gEditing }) } catch (e) {}
      try { showFn({ graphic: gPrivate }) } catch (e) {}
      try { showFn({ graphic: gDestroyed }) } catch (e) {}
      try { showFn({ graphic: gCluster }) } catch (e) {}
      try { showFn({ graphic: gPolyline }) } catch (e) {}
      try { showFn({ graphic: gCircle }) } catch (e) {}
      try { showFn({ graphic: gPolygon }) } catch (e) {}
      try { item.callback({ graphic: null }) } catch (e) {}
      try { item.callback({ graphic: gEditing }) } catch (e) {}
      try { item.callback({ graphic: gPrivate }) } catch (e) {}
      try { item.callback({ graphic: gCluster }) } catch (e) {}
      try { item.callback({ graphic: gPolyline }) } catch (e) {}
      try { item.callback({ graphic: gCircle }) } catch (e) {}
      try { item.callback({ graphic: gPolygon }) } catch (e) {}
    }
    wrapper.unmount()
  })

  it("getAttrForEvent 各分支", async () => {
    const wrapper = await mountLS()
    const vm: any = wrapper.vm
    expect(vm.getAttrForEvent({ graphic: { attr: { a: 1 } } })).toEqual({ a: 1 })
    expect(vm.getAttrForEvent({ graphic: {} })).toEqual({})
    expect(vm.getAttrForEvent({ czmObject: { _attr: { b: 2 } } })).toEqual({ b: 2 })
    expect(vm.getAttrForEvent({ czmObject: { properties: { type: "x", attr: { c: 3 } } } })).toEqual({ c: 3 })
    expect(vm.getAttrForEvent({ czmObject: { attribute: { d: 4 } } })).toEqual({ d: 4 })
    wrapper.unmount()
  })

  it("openGraphicOptionsWidget isActivate true/false + closeGraphicOptionsWidget", async () => {
    const wrapper = await mountLS()
    const vm: any = wrapper.vm
    // 跳过无效
    vm.openGraphicOptionsWidget({ graphic: null })
    vm.openGraphicOptionsWidget({ graphic: { isDestroy: true } })
    vm.openGraphicOptionsWidget({ graphic: { isDrawing: true } })
    vm.openGraphicOptionsWidget({ graphic: { isPrivate: true } })
    vm.openGraphicOptionsWidget({ graphic: { isCombine: true } })
    // 有效 graphic，isActivate false 走 activate
    vm.openGraphicOptionsWidget({ graphic: { id: "g1" } })
    // close
    vm.closeGraphicOptionsWidget()
    wrapper.unmount()
  })

  it("bindLayerPopup 回调执行 getTemplateHtml", async () => {
    const wrapper = await mountLS()
    const vm: any = wrapper.vm
    const gl = window.mapWork.graphicLayer
    vm.bindLayerPopup()
    const cb = gl.bindPopup.mock.calls[0][0]
    cb({ graphic: { type: "point", attr: {} } })
    expect(mars3dMock.Util.getTemplateHtml).toHaveBeenCalled()
    wrapper.unmount()
  })
})

describe("tile-layer-state.vue 深度覆盖", () => {
  async function mountTLS() {
    const { markMapWorkReady } = await import("../../src/utils/map-work")
    markMapWorkReady(window.mapWork)
    const mod = await import("../../src/components/mars-sample/tile-layer-state.vue")
    const wrapper = mount(mod.default, {
      global: { components: globalComponents }
    })
    return wrapper
  }

  it("initTileLayers 带图层列表 + addLayer/removeLayer 事件回调", async () => {
    vi.useFakeTimers()
    const wrapper = await mountTLS()
    const vm: any = wrapper.vm
    const map = window.mapWork.map

    // 模拟图层列表
    const layers = [
      { id: "l1", type: "tile", name: "图层1", isTile: true, isPrivate: false },
      { id: "l2", type: "tile", name: "图层2", isTile: true, isPrivate: false },
      { id: "private", type: "tile", name: "私有", isTile: true, isPrivate: true }
    ]
    map.getLayers.mockReturnValue(layers)

    vm.initTileLayers()
    expect(vm.tileLayerList.length).toBe(2)
    expect(vm.rowKeys).toContain("l1")

    // addLayer 事件回调
    const addCb = map.on.mock.calls.find((c: any) => c[0] === "addLayer")[1]
    addCb({ layer: { id: "l3", type: "tile", name: "新图层", isTile: true, isPrivate: false } })
    // POI查询图层跳过
    addCb({ layer: { id: "poi", type: "tile", name: "POI查询", isTile: true, isPrivate: false } })
    expect(vm.tileLayerList.length).toBe(3)

    // removeLayer 事件回调
    const removeCb = map.on.mock.calls.find((c: any) => c[0] === "removeLayer")[1]
    removeCb({ layer: { id: "l3" } })
    expect(vm.tileLayerList.length).toBe(2)

    vi.advanceTimersByTime(100)
    vi.useRealTimers()
    wrapper.unmount()
  })

  it("selectedFirst 只有一个图层时调用 startEditingLayer", async () => {
    vi.useFakeTimers()
    const wrapper = await mountTLS()
    const vm: any = wrapper.vm
    const map = window.mapWork.map
    map.getLayers.mockReturnValue([{ id: "l1", type: "tile", name: "图层1", isTile: true, isPrivate: false }])
    map.getLayerById.mockReturnValue({ id: "l1", show: true })

    vm.initTileLayers()
    vi.advanceTimersByTime(100)
    // startEditingLayer 设置了 thisLayer
    expect(vm.formState.layerName).toContain("图层1")

    // 触发 removeLayer 当前选中图层
    const removeCb = map.on.mock.calls.find((c: any) => c[0] === "removeLayer")[1]
    removeCb({ layer: { id: "l1" } })
    expect(vm.formState.layerName).toBe("")

    vi.useRealTimers()
    wrapper.unmount()
  })

  it("setLayerOptions / deleteLayer / startEditingLayer / onChangeShow/Popup/Highlight", async () => {
    const wrapper = await mountTLS()
    const vm: any = wrapper.vm
    const map = window.mapWork.map

    map.getLayers.mockReturnValue([{ id: "l1", type: "tile", name: "图层1", isTile: true, isPrivate: false }])
    const layerObj = { id: "l1", show: true, opacity: 1, bindPopup: vi.fn(), unbindPopup: vi.fn(), bindHighlight: vi.fn(), unbindHighlight: vi.fn(), remove: vi.fn(), flyTo: vi.fn() }
    map.getLayerById.mockReturnValue(layerObj)

    vm.initTileLayers()
    // 手动选中图层以设置 thisLayer
    vm.startEditingLayer({ key: "l1", name: "图层1", isTile: true })
    // setLayerOptions
    vm.setLayerOptions("opacity", 0.5)
    expect(layerObj.opacity).toBe(0.5)

    // onChangeShow true
    vm.formState.show = true
    vm.onChangeShow()
    // onChangeShow false 移除 rowKeys
    vm.formState.show = false
    vm.onChangeShow()

    // onChangePopup true/false
    vm.formState.hasPopup = true
    vm.onChangePopup()
    vm.formState.hasPopup = false
    vm.onChangePopup()

    // onChangeHighlight true/false
    vm.formState.hasHighlight = true
    vm.onChangeHighlight()
    vm.formState.hasHighlight = false
    vm.onChangeHighlight()

    // tileLayerRowSelection.onSelect
    vm.tileLayerRowSelection.onSelect({ key: "l1" }, true)

    // tileLayerCustomRowObj onClick
    const row = vm.tileLayerCustomRowObj({ key: "l1" })
    row.onClick()

    // deleteLayer
    vm.deleteLayer({ key: "l1", name: "图层1", isTile: true })
    expect(layerObj.remove).toHaveBeenCalled()

    // startEditingLayer 非 tile 跳过
    vm.startEditingLayer({ key: "x", name: "非tile", isTile: false })

    // setLayerOptions thisLayer 为 null
    vm.formState.layerName = ""
    vm.setLayerOptions("opacity", 0.3)
    wrapper.unmount()
  })

  it("initTileLayers map 不存在时静默返回", async () => {
    const wrapper = await mountTLS()
    const vm: any = wrapper.vm
    window.mapWork.map = null as any
    expect(() => vm.initTileLayers()).not.toThrow()
    window.mapWork.map = mars3dMock.createMockMap()
    wrapper.unmount()
  })

  it("options 各 slider 的 change 回调调用 setLayerOptions", async () => {
    const wrapper = await mountTLS()
    const vm: any = wrapper.vm
    const map = window.mapWork.map
    map.getLayers.mockReturnValue([{ id: "l1", type: "tile", name: "图层1", isTile: true, isPrivate: false }])
    const layerObj: any = { id: "l1", show: true, opacity: 1 }
    map.getLayerById.mockReturnValue(layerObj)
    vm.initTileLayers()
    vm.startEditingLayer({ key: "l1", name: "图层1", isTile: true })

    // options 是 reactive 数组，包含各 slider 配置，调用每个 change 回调
    const opts = vm.options as any[]
    expect(opts.length).toBeGreaterThan(0)
    for (const item of opts) {
      if (typeof item.change === "function") {
        item.change(0.5)
      }
    }
    expect(layerObj.opacity).toBe(0.5)
    wrapper.unmount()
  })
})

describe("query-poi/index.vue 深度覆盖", () => {
  it("showHistoryList / clearHistoryList / addHistory / querySiteList / flyTo / clickVoid / startCloseSearch", async () => {
    // 预置 localStorage 历史
    localStorage.setItem("mars3d_queryGaodePOI", JSON.stringify(["北京", "上海"]))

    const mod = await import("../../src/widgets/basic/query-poi/index.vue")
    const wrapper = mount(mod.default, {
      global: {
        components: {
          "mars-dialog": globalComponents["mars-dialog"],
          "mars-input": globalComponents["mars-input"],
          "mars-button": globalComponents["mars-button"],
          "mars-icon": globalComponents["mars-icon"],
          "a-pagination": globalComponents["a-pagination"],
          "a-empty": globalComponents["a-empty"]
        },
        provide: { getMapInstance: () => mars3dMock.createMockMap() }
      }
    })
    const vm: any = wrapper.vm

    // showHistoryList（searchTxt 为空，读取历史）
    vm.searchTxt = ""
    vm.showHistoryList()
    expect(vm.dataSource.length).toBe(2)
    expect(vm.searchListShow).toBe(true)

    // showHistoryList searchTxt 非空直接返回
    vm.searchTxt = "x"
    vm.showHistoryList()

    // clearHistoryList
    vm.clearHistoryList()
    expect(vm.dataSource.length).toBe(0)
    expect(localStorage.getItem("mars3d_queryGaodePOI")).toBeNull()

    // addHistory
    vm.addHistory("广州")
    const stored = JSON.parse(localStorage.getItem("mars3d_queryGaodePOI")!)
    expect(stored).toContain("广州")
    // 重复添加不重复
    vm.addHistory("广州")
    expect(JSON.parse(localStorage.getItem("mars3d_queryGaodePOI")!).length).toBe(1)

    // querySiteList 有数据
    widgetMapMocks.queryPoi.querySiteList.mockResolvedValueOnce({ list: [{ name: "地点1", type: "餐饮", lng: 116, lat: 39 }], allcount: 1 })
    await vm.querySiteList("北京", 1)
    expect(vm.siteListShow).toBe(true)
    expect(vm.siteSource.length).toBe(1)

    // querySiteList 无数据
    widgetMapMocks.queryPoi.querySiteList.mockResolvedValueOnce({ list: [], allcount: 0 })
    await vm.querySiteList("xxx", 1)

    // flyTo 有 graphic
    vm.flyTo({ _graphic: {}, name: "地点" })
    expect(widgetMapMocks.queryPoi.flyToGraphic).toHaveBeenCalled()

    // flyTo graphic 为 null
    vm.flyTo({ _graphic: null, name: "无坐标" })

    // clickVoid
    vm.clickVoid({ target: { dataset: {}, tagName: "DIV" }, preventDefault: vi.fn() })
    vm.clickVoid({ target: { dataset: { event: "prevent" }, tagName: "INPUT" }, preventDefault: vi.fn() })

    // startCloseSearch
    vi.useFakeTimers()
    vm.startCloseSearch()
    vi.advanceTimersByTime(600)
    expect(vm.searchListShow).toBe(false)
    vi.useRealTimers()

    // handleSearch 空值
    vm.searchTxt = ""
    await vm.handleSearch("")

    // handleSearch 经纬度
    await vm.handleSearch("116.39,39.9")

    // handleSearch 正常搜索
    widgetMapMocks.queryPoi.queryData.mockResolvedValueOnce({ list: [{ name: "结果1" }, { name: "结果1" }] })
    await vm.handleSearch("查询")
    expect(vm.dataSource.length).toBe(1) // 去重

    wrapper.unmount()
  })
})

describe("tools-button/index.vue 事件处理", () => {
  it("openManageLayer / openManageBasemaps 切换激活状态", async () => {
    const mod = await import("../../src/widgets/basic/tools-button/index.vue")
    const { store, key } = await setupWidgetStore()
    const wrapper = mount(mod.default, {
      global: {
        plugins: [[store, key]],
        provide: { getMapInstance: () => mars3dMock.createMockMap(), getCurrentWidget: () => "tools-button" }
      }
    })
    // manage-layers 与 manage-basemap 同属 group:"manage" 互斥组，
    // 交叉触发会互相关闭，需同一事件连发两次才能走到 disable 分支
    widgetMapMocks.toolsButton.eventTarget.emit("openManageLayer")
    await wrapper.vm.$nextTick()
    // 第二次触发 openManageLayer：已激活 → disable 分支
    widgetMapMocks.toolsButton.eventTarget.emit("openManageLayer")
    widgetMapMocks.toolsButton.eventTarget.emit("openManageBasemaps")
    await wrapper.vm.$nextTick()
    // 第二次触发 openManageBasemaps：已激活 → disable 分支
    widgetMapMocks.toolsButton.eventTarget.emit("openManageBasemaps")
    wrapper.unmount()
  })
})

describe("scene-tree.vue 深度覆盖", () => {
  it("flytoModelNode / onModelChecked 各分支", async () => {
    marsUtilMocks.fetchJson.mockResolvedValue({ name: "root", id: "1", children: [] })
    const mod = await import("../../src/widgets/basic/manage-layers/scene-tree.vue")
    const { store, key } = await setupWidgetStore()
    const w = store.state.widgets.find((w: any) => w.name === "layer-scenetree")
    if (w) w.data = { url: "http://example.com/config/scene.json", id: "1" }
    const wrapper = mount(mod.default, {
      global: {
        components: { "mars-dialog": globalComponents["mars-dialog"], "mars-tree": globalComponents["mars-tree"] },
        plugins: [[store, key]],
        provide: { getCurrentWidget: () => "layer-scenetree" }
      }
    })
    await wrapper.vm.$nextTick()
    const vm: any = wrapper.vm

    // flytoModelNode
    vm.flytoModelNode(["k1"], { node: { sphere: [1, 2, 3] } })
    expect(widgetMapMocks.manageLayers.flytoModelNode).toHaveBeenCalled()

    // onModelChecked keys > 2000
    const keys = new Array(2001).fill("k")
    vm.onModelChecked(keys, { checkedNodes: [] })

    // onModelChecked keys <= 2000
    vm.onModelChecked(["k1"], { checkedNodes: [{ id: 1 }] })
    expect(widgetMapMocks.manageLayers.checkModelStyle).toHaveBeenCalled()

    wrapper.unmount()
  })

  it("fetchJson 返回 null 时 LayerTreeData 为空", async () => {
    marsUtilMocks.fetchJson.mockResolvedValue(null)
    const mod = await import("../../src/widgets/basic/manage-layers/scene-tree.vue")
    const { store, key } = await setupWidgetStore()
    const w = store.state.widgets.find((w: any) => w.name === "layer-scenetree")
    if (w) w.data = { url: "http://example.com/config/scene.json", id: "1" }
    const wrapper = mount(mod.default, {
      global: {
        components: { "mars-dialog": globalComponents["mars-dialog"], "mars-tree": globalComponents["mars-tree"] },
        plugins: [[store, key]],
        provide: { getCurrentWidget: () => "layer-scenetree" }
      }
    })
    await wrapper.vm.$nextTick()
    expect((wrapper.vm as any).LayerTreeData.length).toBe(0)
    wrapper.unmount()
  })

  it("isHaveChildren 递归嵌套 children", async () => {
    marsUtilMocks.fetchJson.mockResolvedValue({
      name: "root", id: "1",
      children: [
        { name: "child1", id: "2", children: [{ name: "grand", id: "3" }] }
      ]
    })
    const mod = await import("../../src/widgets/basic/manage-layers/scene-tree.vue")
    const { store, key } = await setupWidgetStore()
    const w = store.state.widgets.find((w: any) => w.name === "layer-scenetree")
    if (w) w.data = { url: "http://example.com/config/scene.json", id: "1" }
    const wrapper = mount(mod.default, {
      global: {
        components: { "mars-dialog": globalComponents["mars-dialog"], "mars-tree": globalComponents["mars-tree"] },
        plugins: [[store, key]],
        provide: { getCurrentWidget: () => "layer-scenetree" }
      }
    })
    await wrapper.vm.$nextTick()
    const data = (wrapper.vm as any).LayerTreeData
    expect(data.length).toBe(1)
    expect(data[0].children.length).toBe(1)
    expect(data[0].children[0].children.length).toBe(1)
    wrapper.unmount()
  })
})
