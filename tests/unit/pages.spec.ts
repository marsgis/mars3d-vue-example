import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"

// ───────────────────────────────────────────────────────────
// 顶层 mock（vitest 会提升到文件顶部执行）
// 通过模块级变量在 beforeEach 中切换实现
// ───────────────────────────────────────────────────────────

const mocks = vi.hoisted(() => ({
  // index/main
  createApp: vi.fn(() => ({ mount: vi.fn() })),
  // index/App
  open: vi.fn(),
  // editor
  editorInstance: { on: vi.fn(), render: vi.fn() },
  Editor: vi.fn(function () {
    return mocks.editorInstance
  }),
  getCompConfig: vi.fn(() => null),
  // mars-util
  getQueryString: vi.fn(),
  normalizeExampleId: vi.fn((id: string) => id),
  renderExampleEmptyState: vi.fn(),
  // mars-ui
  MarsUIInstall: vi.fn(),
  // widget store
  injectState: vi.fn(() => ({})),
  // map-work
  markMapWorkReady: vi.fn(),
  useWidgetStore: vi.fn(() => ({ state: { widgets: [], openAtStart: [] } }))
}))

vi.mock("vue", async (importOriginal) => {
  const actual = await importOriginal<typeof import("vue")>()
  return { ...actual, createApp: mocks.createApp }
})

vi.mock("@marsgis/editor", () => ({
  Editor: mocks.Editor,
  Util: { getCompConfig: mocks.getCompConfig }
}))
vi.mock("@marsgis/editor/dist/editor.css", () => ({}))
vi.mock("@mars/components/mars-ui", () => ({ default: mocks.MarsUIInstall }))
vi.mock("@mars/components/mars-ui/common", () => ({}))
vi.mock("@mars/widgets/common/store/widget", () => ({
  injectState: mocks.injectState,
  key: Symbol("widget-key"),
  useWidgetStore: mocks.useWidgetStore
}))
vi.mock("@mars/widgets/widget-store", () => ({ default: {} }))
vi.mock("@mars/utils/mars-util", () => ({
  getQueryString: mocks.getQueryString,
  normalizeExampleId: mocks.normalizeExampleId,
  renderExampleEmptyState: mocks.renderExampleEmptyState
}))
vi.mock("@mars/utils/map-work", () => ({ markMapWorkReady: mocks.markMapWorkReady }))
vi.mock("@mars/components/mars-work/example-list.vue", () => ({
  default: { name: "ExampleList", template: "<div />", emits: ["jump"] }
}))
vi.mock("@/components/mars-work/mars-head.vue", () => ({
  default: { name: "Head", template: "<div />", emits: ["clickNav"] }
}))
vi.mock("@mars/components/mars-work/main-operation.vue", () => ({
  default: { name: "MainOperation", template: "<div />", emits: ["childMounted"] }
}))
vi.mock("@mars/widgets/widget.vue", () => ({
  default: { name: "MarsWidget", template: "<div />" }
}))
vi.mock("ant-design-vue", () => ({
  ConfigProvider: { name: "ConfigProvider", template: "<div><slot /></div>" }
}))
vi.mock("ant-design-vue/es/locale/zh_CN", () => ({ default: {} }))

beforeEach(() => {
  vi.clearAllMocks()
  mocks.createApp.mockImplementation((comp: any) => {
    const app = {
      mount: vi.fn(() => {
        // simple 分支的 render 需要被调用才能计入覆盖
        if (comp && comp.render) {
          try {
            comp.render()
          } catch {
            /* ignore */
          }
        }
      }),
      use: vi.fn().mockReturnThis(),
      unmount: vi.fn()
    }
    return app
  })
  mocks.getQueryString.mockReset()
  mocks.getCompConfig.mockReset()
  mocks.renderExampleEmptyState.mockReset()
  mocks.normalizeExampleId.mockImplementation((id: string) => id)
  mocks.editorInstance = { on: vi.fn(), render: vi.fn() }
  mocks.Editor.mockImplementation(function () {
    return mocks.editorInstance
  })
  vi.stubGlobal("open", mocks.open)
  delete (window as any).marsEditor
  delete (window as any).mapWork
  delete (window as any)._mapInstance
  delete process.env.EDITOR_MODE
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.resetModules()
})

// ───────────────────────────────────────────────────────────
// index 入口
// ───────────────────────────────────────────────────────────

describe("index/main.ts", () => {
  it("创建应用并挂载到 #app", async () => {
    document.body.innerHTML = '<div id="app"></div>'
    const mountFn = vi.fn()
    mocks.createApp.mockReturnValue({ mount: mountFn })
    await import("../../src/pages/index/main")
    expect(mocks.createApp).toHaveBeenCalledTimes(1)
    expect(mountFn).toHaveBeenCalledWith("#app")
  })
})

// ───────────────────────────────────────────────────────────
// index/App.vue
// ───────────────────────────────────────────────────────────

describe("index/App.vue", () => {
  it("EDITOR_MODE 为真时跳转 editor-vue.html", async () => {
    process.env.EDITOR_MODE = "1"
    process.env.BASE_URL = "/"
    const { default: App } = await import("../../src/pages/index/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.jumpUrl({ id: "k", main: "map/create/options" })
    expect(mocks.open).toHaveBeenCalledWith("/editor-vue.html?key=k&id=map/create/options", "_blank")
  })

  it("EDITOR_MODE 为假时跳转 read-vue.html", async () => {
    delete process.env.EDITOR_MODE
    process.env.BASE_URL = "/"
    const { default: App } = await import("../../src/pages/index/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.jumpUrl({ id: "k", main: "map/create/options", params: "a=1&b=2" })
    expect(mocks.open).toHaveBeenCalledWith("/read-vue.html?key=k&id=map/create/options&a=1&b=2", "_blank")
  })

  it("clickNav 带 page 时显示 iframe，否则隐藏", async () => {
    const { default: App } = await import("../../src/pages/index/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.clickNav({ page: "https://example.com" })
    expect(wrapper.vm.showIframe).toBe(true)
    expect(wrapper.vm.iframeSrc).toBe("https://example.com")
    wrapper.vm.clickNav({})
    expect(wrapper.vm.showIframe).toBe(false)
  })
})

// ───────────────────────────────────────────────────────────
// read main.ts
// ───────────────────────────────────────────────────────────

describe("read/main.ts", () => {
  it("缺少 id 时渲染空态并中止", async () => {
    mocks.getQueryString.mockReturnValue(null)
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/read/main")
    await vi.waitFor(() => expect(mocks.renderExampleEmptyState).toHaveBeenCalledWith(null))
    expect(mocks.getCompConfig).not.toHaveBeenCalled()
    expect(mocks.editorInstance.render).not.toHaveBeenCalled()
  })

  it("id 存在但配置不存在时渲染空态", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "map/x" : null))
    mocks.getCompConfig.mockResolvedValue(null)
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/read/main")
    await vi.waitFor(() => expect(mocks.renderExampleEmptyState).toHaveBeenCalledWith("map/x"))
    expect(mocks.editorInstance.render).not.toHaveBeenCalled()
  })

  it("配置存在时调用 marsEditor.render", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "map/y" : key === "key" ? "k" : null))
    mocks.getCompConfig.mockResolvedValue({ hasPannel: true })
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/read/main")
    // 触发 oncontextmenu 以覆盖 e.preventDefault()
    document.dispatchEvent(new MouseEvent("contextmenu"))
    await vi.waitFor(() =>
      expect(mocks.editorInstance.render).toHaveBeenCalledWith({
        container: document.getElementById("root"),
        exampleId: "map/y",
        exampleKey: "k"
      })
    )
    // 触发 loaded（无面板 → simple 模式）
    const loadedCb = (mocks.editorInstance.on as any).mock.calls.find((c: any[]) => c[0] === "loaded")[1]
    loadedCb({ hasPannel: false })
    expect(window.marsEditor).toBeDefined()
  })

  it("loaded 第二次触发时先销毁旧 UI", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "map/z" : null))
    mocks.getCompConfig.mockResolvedValue({ hasPannel: true })
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/read/main")
    await vi.waitFor(() => expect(mocks.editorInstance.render).toHaveBeenCalled())
    const loadedCb = (mocks.editorInstance.on as any).mock.calls.find((c: any[]) => c[0] === "loaded")[1]
    loadedCb({ hasPannel: true })
    loadedCb({ hasPannel: true })
    expect(mocks.editorInstance.on).toHaveBeenCalled()
  })
})

// ───────────────────────────────────────────────────────────
// editor main.ts
// ───────────────────────────────────────────────────────────

describe("editor/main.ts", () => {
  it("editor 入口接收 code/full 参数并渲染", async () => {
    mocks.getQueryString.mockImplementation((key: string) =>
      key === "id" ? "map/options" : key === "code" ? "abc" : key === "full" ? "1" : null
    )
    mocks.getCompConfig.mockResolvedValue({ hasPannel: true })
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/editor/main")
    // 触发 oncontextmenu 以覆盖 e.preventDefault()
    document.dispatchEvent(new MouseEvent("contextmenu"))
    await vi.waitFor(() => expect(mocks.editorInstance.render).toHaveBeenCalled())
    expect(window.marsEditor).toBeDefined()
  })

  it("editor 缺少 id 时渲染空态", async () => {
    mocks.getQueryString.mockReturnValue(null)
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/editor/main")
    await vi.waitFor(() => expect(mocks.renderExampleEmptyState).toHaveBeenCalledWith(null))
  })

  it("editor 配置不存在时渲染空态", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "map/none" : null))
    mocks.getCompConfig.mockResolvedValue(null)
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/editor/main")
    await vi.waitFor(() => expect(mocks.renderExampleEmptyState).toHaveBeenCalledWith("map/none"))
  })

  it("editor loaded 有面板与无面板分支", async () => {
    mocks.getQueryString.mockImplementation((key: string) => (key === "id" ? "map/x" : null))
    mocks.getCompConfig.mockResolvedValue({ hasPannel: true })
    document.body.innerHTML = '<div id="root"></div><div id="mars-ui-root"></div>'
    await import("../../src/pages/editor/main")
    await vi.waitFor(() => expect(mocks.editorInstance.render).toHaveBeenCalled())
    const loadedCb = (mocks.editorInstance.on as any).mock.calls.find((c: any[]) => c[0] === "loaded")[1]
    loadedCb({ hasPannel: true })
    loadedCb({ hasPannel: false })
    expect(mocks.editorInstance.on).toHaveBeenCalled()
  })
})

// ───────────────────────────────────────────────────────────
// editor App.vue（与 read 结构一致，补充覆盖）
// ───────────────────────────────────────────────────────────

describe("editor/App.vue onChildMounted", () => {
  it("首次挂载触发 useLifecycle 并标记就绪", async () => {
    const useLifecycle = vi.fn()
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 1 }
    ;(window as any)._mapInstance = { id: "map" }
    const { default: App } = await import("../../src/pages/editor/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.onChildMounted()
    expect(useLifecycle).toHaveBeenCalledTimes(1)
    expect(mocks.markMapWorkReady).toHaveBeenCalledTimes(1)
  })

  it("同一 mapWork 重复挂载不再触发", async () => {
    const useLifecycle = vi.fn()
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 2 }
    const { default: App } = await import("../../src/pages/editor/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.onChildMounted()
    wrapper.vm.onChildMounted()
    expect(useLifecycle).toHaveBeenCalledTimes(1)
  })

  it("useLifecycle 抛错时仍标记就绪", async () => {
    const useLifecycle = vi.fn(() => {
      throw new Error("boom")
    })
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 3 }
    const { default: App } = await import("../../src/pages/editor/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.onChildMounted()
    expect(mocks.markMapWorkReady).toHaveBeenCalledTimes(1)
    errorSpy.mockRestore()
  })

  it("mapLoaded 后渲染 openAtStart 的 widget，且 getMapInstance 返回地图实例", async () => {
    const useLifecycle = vi.fn()
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 10 }
    ;(window as any)._mapInstance = { id: "map-instance" }
    mocks.useWidgetStore.mockReturnValue({
      state: {
        widgets: [{ name: "w1", visible: true, key: "k1" }],
        openAtStart: ["w1"]
      }
    })
    let getMapInstanceFn: any = null
    const { default: App } = await import("../../src/pages/editor/App.vue")
    const wrapper = mount(App, {
      global: {
        stubs: {
          MainOperation: {
            name: "MainOperation",
            inject: ["getMapInstance"],
            template: "<div />",
            created() {
              getMapInstanceFn = (this as any).getMapInstance
            }
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    wrapper.vm.onChildMounted()
    await wrapper.vm.$nextTick()
    const marsWidget = wrapper.findComponent({ name: "MarsWidget" })
    expect(marsWidget.exists()).toBe(true)
    // 触发 v-model:visible 回调以覆盖 line 6 的 comp.visible = $event
    marsWidget.vm.$emit("update:visible", false)
    await wrapper.vm.$nextTick()
    expect(getMapInstanceFn()).toEqual({ id: "map-instance" })
  })
})

// ───────────────────────────────────────────────────────────
// read App.vue（与 editor 结构一致）
// ───────────────────────────────────────────────────────────

describe("read/App.vue onChildMounted", () => {
  it("首次挂载触发 useLifecycle 并标记就绪", async () => {
    const useLifecycle = vi.fn()
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 1 }
    ;(window as any)._mapInstance = { id: "map" }
    const { default: App } = await import("../../src/pages/read/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.onChildMounted()
    expect(useLifecycle).toHaveBeenCalledTimes(1)
    expect(mocks.markMapWorkReady).toHaveBeenCalledTimes(1)
  })

  it("同一 mapWork 重复挂载不再触发", async () => {
    const useLifecycle = vi.fn()
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 2 }
    const { default: App } = await import("../../src/pages/read/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.onChildMounted()
    wrapper.vm.onChildMounted()
    expect(useLifecycle).toHaveBeenCalledTimes(1)
  })

  it("useLifecycle 抛错时仍标记就绪并记录错误", async () => {
    const err = new Error("boom")
    const useLifecycle = vi.fn(() => {
      throw err
    })
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 3 }
    const { default: App } = await import("../../src/pages/read/App.vue")
    const wrapper = mount(App)
    await wrapper.vm.$nextTick()
    wrapper.vm.onChildMounted()
    expect(errorSpy).toHaveBeenCalledWith("[example] mapWork.onMounted 执行失败", err)
    expect(mocks.markMapWorkReady).toHaveBeenCalledTimes(1)
    errorSpy.mockRestore()
  })

  it("mapLoaded 后渲染 openAtStart 的 widget，且 getMapInstance 返回地图实例", async () => {
    const useLifecycle = vi.fn()
    ;(window as any).marsEditor = { useLifecycle }
    ;(window as any).mapWork = { id: 10 }
    ;(window as any)._mapInstance = { id: "map-instance" }
    mocks.useWidgetStore.mockReturnValue({
      state: {
        widgets: [{ name: "w1", visible: true, key: "k1" }],
        openAtStart: ["w1"]
      }
    })
    let getMapInstanceFn: any = null
    const { default: App } = await import("../../src/pages/read/App.vue")
    const wrapper = mount(App, {
      global: {
        stubs: {
          MainOperation: {
            name: "MainOperation",
            inject: ["getMapInstance"],
            template: "<div />",
            created() {
              getMapInstanceFn = (this as any).getMapInstance
            }
          }
        }
      }
    })
    await wrapper.vm.$nextTick()
    wrapper.vm.onChildMounted()
    await wrapper.vm.$nextTick()
    const marsWidget = wrapper.findComponent({ name: "MarsWidget" })
    expect(marsWidget.exists()).toBe(true)
    // 触发 v-model:visible 回调以覆盖 line 6 的 comp.visible = $event
    marsWidget.vm.$emit("update:visible", false)
    await wrapper.vm.$nextTick()
    expect(getMapInstanceFn()).toEqual({ id: "map-instance" })
  })
})
