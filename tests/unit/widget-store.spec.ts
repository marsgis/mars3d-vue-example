import { afterEach, describe, expect, it, vi } from "vitest"
import { createApp, defineComponent, h, nextTick } from "vue"
import { injectState, key as widgetStoreKey, useWidget, useWidgetStore, WidgetState } from "../../src/widgets/common/store/widget"

/** 每个用例独立建 store，避免 widget 对象与激活版本号串状态 */
function createStore(state: WidgetState) {
  return injectState({ state: () => state })
}

function findWidget(store: any, name: string) {
  return store.state.widgets.find((item: any) => item.name === name)
}

const mountedApps: any[] = []

/**
 * useWidget 依赖组件 setup 中的 inject，用最小 Vue 应用挂载一次取得 API
 */
function mountWidgetApi(store: any) {
  const storeKey = widgetStoreKey
  let api: any
  const app = createApp(
    defineComponent({
      setup() {
        api = useWidget()
        return () => h("div")
      }
    })
  )
  app.provide(storeKey, store)
  // 真实应用由页面提供当前 widget 名称，这里给空实现，聚焦 store 行为
  app.provide("getCurrentWidget", () => "")
  app.mount(document.createElement("div"))
  mountedApps.push(app)
  return api
}

describe("injectState 初始化", () => {
  it("缺少 state 参数时抛错", () => {
    expect(() => injectState({} as any)).toThrow("injectState 参数不能为空")
  })

  it("openAtStart 决定初始 visible，defaultOption 合并进每个 widget", () => {
    const store = createStore({
      widgets: [{ name: "a", meta: { from: "a" } }, { name: "b" }],
      openAtStart: ["a"],
      defaultOption: { autoDisable: false, meta: { from: "default" } }
    })

    const a = findWidget(store, "a")
    const b = findWidget(store, "b")
    expect(a.visible).toBe(true)
    expect(b.visible).toBe(false)
    expect(a.autoDisable).toBe(false)
    // widget 自身 meta 覆盖默认 meta
    expect(a.meta).toEqual({ from: "a" })
    expect(b.meta).toEqual({ from: "default" })
    expect(typeof a.key).toBe("string")
    expect(a.key).not.toBe(b.key)
    expect(store.state.defaultOption.autoDisable).toBe(false)
  })
})

describe("activate / disable", () => {
  it("activate 在 nextTick 后写 visible 并登记 openAtStart", async () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })

    store.dispatch("activate", { name: "a", reload: true })
    expect(findWidget(store, "a").visible).toBe(false)

    await nextTick()
    expect(findWidget(store, "a").visible).toBe(true)
    expect(store.state.openAtStart).toContain("a")
  })

  it("activate 写入 data，disable 清除 data", async () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })

    store.dispatch("activate", { name: "a", reload: true, data: { id: 1 } })
    await nextTick()
    expect(findWidget(store, "a").data).toEqual({ id: 1 })

    store.dispatch("disable", "a")
    expect(findWidget(store, "a").visible).toBe(false)
    expect(findWidget(store, "a").data).toBeUndefined()
  })

  it("同 tick 内 activate 后立刻 disable，不会再把面板打开（I017 回归）", async () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })

    store.dispatch("activate", { name: "a", reload: true, data: { id: 1 } })
    store.dispatch("disable", "a")
    await nextTick()

    expect(findWidget(store, "a").visible).toBe(false)
    expect(findWidget(store, "a").data).toBeUndefined()
  })

  it("同组互斥会作废对方同 tick 内待执行的 activate", async () => {
    const store = createStore({
      widgets: [{ name: "a", group: "g" }, { name: "b", group: "g" }],
      openAtStart: []
    })

    store.dispatch("activate", { name: "a", reload: true })
    store.dispatch("activate", { name: "b", reload: true })
    await nextTick()

    expect(findWidget(store, "a").visible).toBe(false)
    expect(findWidget(store, "b").visible).toBe(true)
  })

  it("disableOther 为 true 时关闭可自动关闭的面板", async () => {
    const store = createStore({
      widgets: [{ name: "a", disableOther: true }, { name: "b" }, { name: "c", autoDisable: false }],
      openAtStart: ["b", "c"]
    })

    store.dispatch("activate", { name: "a", reload: true })
    await nextTick()

    expect(findWidget(store, "b").visible).toBe(false)
    expect(findWidget(store, "c").visible).toBe(true)
  })

  it("disableOther 为数组时只关闭指定面板", async () => {
    const store = createStore({
      widgets: [{ name: "a", disableOther: ["b"] }, { name: "b" }, { name: "c" }],
      openAtStart: ["b", "c"]
    })

    store.dispatch("activate", { name: "a", reload: true })
    await nextTick()

    expect(findWidget(store, "b").visible).toBe(false)
    expect(findWidget(store, "c").visible).toBe(true)
  })

  it("disableAll 默认只关闭 autoDisable 的面板", async () => {
    const store = createStore({
      widgets: [{ name: "a" }, { name: "b", autoDisable: false }],
      openAtStart: ["a", "b"]
    })

    store.dispatch("disableAll", false)
    expect(findWidget(store, "a").visible).toBe(false)
    expect(findWidget(store, "b").visible).toBe(true)

    store.dispatch("disableAll", true)
    expect(findWidget(store, "b").visible).toBe(false)
  })

  it("disableAll 作废同 tick 内待执行的 activate", async () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })

    store.dispatch("activate", { name: "a", reload: true })
    store.dispatch("disableAll", true)
    await nextTick()

    expect(findWidget(store, "a").visible).toBe(false)
  })

  it("reload 会换 key 触发组件重载", async () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })

    store.dispatch("activate", { name: "a", reload: true })
    await nextTick()
    const keyBefore = findWidget(store, "a").key

    store.dispatch("activate", { name: "a", reload: true })
    expect(findWidget(store, "a").key).not.toBe(keyBefore)
    expect(findWidget(store, "a").visible).toBe(false)

    await nextTick()
    expect(findWidget(store, "a").visible).toBe(true)
  })

  it("激活不存在的 widget 时只打日志，不抛错", () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => {})
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })

    expect(() => store.dispatch("activate", { name: "zzz", reload: true })).not.toThrow()
    expect(log).toHaveBeenCalled()
  })
})

describe("useWidget API", () => {
  afterEach(() => {
    mountedApps.splice(0).forEach((app) => app.unmount())
  })

  it("activate 后可查询激活状态", async () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })
    const api = mountWidgetApi(store)

    api.activate("a")
    expect(api.isActivate("a")).toBe(false)

    await nextTick()
    expect(api.isActivate("a")).toBe(true)
  })

  it("setVisible(false) 作废同 tick 内待执行的 activate（I017 回归）", async () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })
    const api = mountWidgetApi(store)

    api.activate("a")
    api.setVisible("a", false)
    await nextTick()

    expect(api.isActivate("a")).toBe(false)
  })

  it("updateWidget 把对象参数合并回写 data，数组参数不写入", async () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })
    const api = mountWidgetApi(store)

    api.updateWidget("a", { x: 1 })
    api.updateWidget("a", { y: 2 })
    expect(findWidget(store, "a").data).toEqual({ x: 1, y: 2 })

    api.updateWidget("a", ["command"])
    expect(findWidget(store, "a").data).toEqual({ x: 1, y: 2 })
  })

  it("useWidgetStore 返回注入的 store", () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })
    let got: any
    const app = createApp(
      defineComponent({
        setup() {
          got = useWidgetStore()
          return () => h("div")
        }
      })
    )
    app.provide(widgetStoreKey, store)
    app.mount(document.createElement("div"))
    mountedApps.push(app)
    expect(got).toBe(store)
  })

  it("currentWidget 各 getter 实时读取 store 中的当前 widget", async () => {
    const store = createStore({
      widgets: [{ name: "a", group: "g", disableOther: false, component: { name: "Comp" }, meta: { m: 1 } }],
      openAtStart: []
    })
    let api: any
    const app = createApp(
      defineComponent({
        setup() {
          api = useWidget()
          return () => h("div")
        }
      })
    )
    app.provide(widgetStoreKey, store)
    app.provide("getCurrentWidget", () => "a")
    app.mount(document.createElement("div"))
    mountedApps.push(app)

    api.activate({ name: "a", data: { id: 1 } })
    await nextTick()

    const cw = api.currentWidget
    expect(cw.name).toBe("a")
    expect(typeof cw.key).toBe("string")
    expect(cw.component).toEqual({ name: "Comp" })
    expect(cw.autoDisable).toBe(true)
    expect(cw.disableOther).toBe(false)
    expect(cw.group).toBe("g")
    expect(cw.visible).toBe(true)
    expect(cw.data).toEqual({ id: 1 })
    expect(cw.meta).toEqual({ m: 1 })
  })

  it("currentWidget.onUpdate 无当前名称时直接返回", () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })
    const api = mountWidgetApi(store) // getCurrentWidget 返回 ""
    expect(() => api.currentWidget.onUpdate(vi.fn())).not.toThrow()
  })

  it("getWidget 返回快照；onUpdate 监听后 updateWidget 触发回调", () => {
    const store = createStore({ widgets: [{ name: "a" }], openAtStart: [] })
    let api: any
    let w: any
    const cb = vi.fn()
    const app = createApp(
      defineComponent({
        setup() {
          api = useWidget()
          w = api.getWidget("a")
          w.onUpdate(cb) // setup 内注册，onUnmounted 才能正确关联组件实例
          return () => h("div")
        }
      })
    )
    app.provide(widgetStoreKey, store)
    app.provide("getCurrentWidget", () => "")
    app.mount(document.createElement("div"))
    mountedApps.push(app)

    expect(api.getWidget("zzz")).toBeNull()
    expect(w.name).toBe("a")

    api.updateWidget("a", { x: 1 })
    expect(cb).toHaveBeenCalledWith({ x: 1 })
  })

  it("activate/disable 支持数组参数，disableAll 关闭全部", async () => {
    const store = createStore({ widgets: [{ name: "a" }, { name: "b" }], openAtStart: [] })
    const api = mountWidgetApi(store)

    api.activate(["a", "b"])
    await nextTick()
    expect(api.isActivate("a")).toBe(true)
    expect(api.isActivate("b")).toBe(true)

    api.disable(["a"])
    expect(api.isActivate("a")).toBe(false)
    expect(findWidget(store, "a").data).toBeUndefined()

    api.disableAll()
    expect(api.isActivate("b")).toBe(false)
  })
})
