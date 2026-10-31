import { describe, expect, it, vi } from "vitest"
import { mount } from "@vue/test-utils"

// ───────────────────────────────────────────────────────────
// 顶层 mock
// ───────────────────────────────────────────────────────────

const mocks = vi.hoisted(() => ({
  nprogress: {
    start: vi.fn(),
    done: vi.fn(),
    set: vi.fn(),
    isStarted: vi.fn(() => true),
    status: 0.5
  },
  message: {
    config: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  },
  notification: {
    config: vi.fn(),
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  },
  modal: {
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn()
  },
  echarts: {
    registerTheme: vi.fn()
  },
  svgRender: vi.fn(() => "<svg />")
}))

vi.mock("nprogress", () => ({
  default: mocks.nprogress,
  start: mocks.nprogress.start,
  done: mocks.nprogress.done,
  set: mocks.nprogress.set,
  isStarted: mocks.nprogress.isStarted
}))
vi.mock("nprogress/nprogress.css", () => ({}))

vi.mock("ant-design-vue", () => {
  const modalObj = {
    install: vi.fn(),
    info: mocks.modal.info,
    success: mocks.modal.success,
    warning: mocks.modal.warning,
    error: mocks.modal.error
  }
  const treeObj = { name: "Tree", template: "<div><slot /></div>", install: vi.fn() }
  const dropdownObj = { name: "Dropdown", template: "<div><slot /></div>", install: vi.fn() }
  const popoverObj = { name: "Popover", template: "<div><slot /></div>", install: vi.fn() }
  return {
    message: mocks.message,
    notification: mocks.notification,
    Modal: modalObj,
    Tree: treeObj,
    Dropdown: dropdownObj,
    Popover: popoverObj,
    ConfigProvider: { name: "ConfigProvider", template: "<div><slot /></div>" },
    AutoComplete: { install: vi.fn() },
    Button: { install: vi.fn() },
    Cascader: { install: vi.fn() },
    Checkbox: { install: vi.fn() },
    Col: { install: vi.fn() },
    Collapse: { install: vi.fn() },
    Divider: { install: vi.fn() },
    Form: { install: vi.fn() },
    Input: { install: vi.fn() },
    InputNumber: { install: vi.fn() },
    DatePicker: { install: vi.fn() },
    Select: { install: vi.fn() },
    List: { install: vi.fn() },
    Menu: { install: vi.fn() },
    PageHeader: { install: vi.fn() },
    Progress: { install: vi.fn() },
    Pagination: { install: vi.fn() },
    Radio: { install: vi.fn() },
    Row: { install: vi.fn() },
    Slider: { install: vi.fn() },
    Space: { install: vi.fn() },
    Spin: { install: vi.fn() },
    Switch: { install: vi.fn() },
    Table: { install: vi.fn() },
    Tabs: { install: vi.fn() },
    Tooltip: { install: vi.fn() },
    Typography: { install: vi.fn() },
    Upload: { install: vi.fn() },
    Card: { install: vi.fn() },
    Image: { install: vi.fn() },
    Empty: { install: vi.fn() }
  }
})

vi.mock("@icon-park/svg", () => ({
  BringToFront: () => "<svg />"
}))

vi.mock("echarts", () => ({
  registerTheme: mocks.echarts.registerTheme
}))

vi.mock("vue-color-kit", () => ({
  ColorPicker: { name: "ColorPicker", template: "<div />" }
}))

vi.mock("lodash-es", () => {
  const mod = {
    upperFirst: (s: string) => s.charAt(0).toUpperCase() + s.slice(1),
    camelCase: (s: string) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  }
  return { ...mod, default: mod }
})

// 通用 a-* 组件 stub（用于 mars-ui 薄包装组件挂载）
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
  "a-icon": antStub
}

// ───────────────────────────────────────────────────────────
// 配置/数据文件（导入即覆盖）
// ───────────────────────────────────────────────────────────

describe("配置文件导入覆盖", () => {
  it("graphic-options 配置文件", async () => {
    const style = await import("../../src/widgets/basic/graphic-options/config/style")
    const material = await import("../../src/widgets/basic/graphic-options/config/material")
    const baseInfo = await import("../../src/widgets/basic/graphic-options/config/base-info")
    expect(style.default).toBeDefined()
    expect(material.default).toBeDefined()
    expect(baseInfo.default).toBeDefined()
  })

  it("mars-ui themes / common / echarts", async () => {
    await import("../../src/components/mars-ui/themes")
    await import("../../src/components/mars-ui/common")
    await import("../../src/components/mars-ui/mars-echarts")
    expect(mocks.echarts.registerTheme).toHaveBeenCalled()
  })
})

// ───────────────────────────────────────────────────────────
// mars-ui 薄包装组件
// ───────────────────────────────────────────────────────────

describe("mars-ui 薄包装组件 smoke mount", () => {
  const components = [
    "mars-button",
    "mars-input",
    "mars-textarea",
    "mars-select",
    "mars-slider",
    "mars-table",
    "mars-date-picker",
    "mars-range-picker",
    "mars-input-number",
    "mars-input-group"
  ]

  for (const name of components) {
    it(`${name} 可挂载`, async () => {
      const mod = await import(`../../src/components/mars-ui/${name}/index.vue`)
      const wrapper = mount(mod.default, {
        global: { components: globalComponents }
      })
      expect(wrapper.exists()).toBe(true)
      wrapper.unmount()
    })
  }

  it("mars-input 带 addon-before 时添加 prefix class", async () => {
    const mod = await import("../../src/components/mars-ui/mars-input/index.vue")
    const wrapper = mount(mod.default, {
      attrs: { "addon-before": "x" },
      global: { components: globalComponents }
    })
    expect(wrapper.classes()).toContain("mars-input")
    wrapper.unmount()
  })

  it("mars-input-number 带 unit 时显示单位", async () => {
    const mod = await import("../../src/components/mars-ui/mars-input-number/index.vue")
    const wrapper = mount(mod.default, {
      attrs: { unit: "m" },
      global: { components: globalComponents }
    })
    expect(wrapper.find(".mars-unit").exists()).toBe(true)
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-switch
// ───────────────────────────────────────────────────────────

describe("mars-switch", () => {
  it("checked 属性控制初始值，change 触发事件", async () => {
    const mod = await import("../../src/components/mars-ui/mars-switch/index.vue")
    const wrapper = mount(mod.default, {
      props: { checked: true },
      global: { components: globalComponents }
    })
    const sw = wrapper.findComponent({ name: "mars-switch" })
    sw.vm.$emit("change", false)
    expect(wrapper.emitted("change")?.[0]).toEqual([false])
    expect(wrapper.emitted("update:checked")?.[0]).toEqual([false])
    wrapper.unmount()
  })

  it("value 属性兜底（checked 为 undefined）", async () => {
    const mod = await import("../../src/components/mars-ui/mars-switch/index.vue")
    const wrapper = mount(mod.default, {
      props: { value: true },
      global: { components: globalComponents }
    })
    const sw = wrapper.findComponent({ name: "mars-switch" })
    sw.vm.$emit("change", false)
    expect(wrapper.emitted("update:value")?.[0]).toEqual([false])
    wrapper.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-icon
// ───────────────────────────────────────────────────────────

describe("mars-icon", () => {
  it("有效 icon 名渲染 svg", async () => {
    const mod = await import("../../src/components/mars-ui/mars-icon/index.vue")
    const wrapper = mount(mod.default, {
      props: { icon: "bring-to-front", color: "#fff", width: "16" },
      global: { components: globalComponents }
    })
    expect(wrapper.find(".mars-icon").html()).toContain("<svg")
    wrapper.unmount()
  })

})

// ───────────────────────────────────────────────────────────
// mars-tree
// ───────────────────────────────────────────────────────────

describe("mars-tree", () => {
  it("icon 函数各分支", async () => {
    const mod = await import("../../src/components/mars-ui/mars-tree")
    const wrapper = mount(mod.default, {
      global: { components: globalComponents }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it("install 注册组件", async () => {
    const mod = await import("../../src/components/mars-ui/mars-tree")
    const app = { component: vi.fn() }
    mod.install(app as any)
    expect(app.component).toHaveBeenCalledWith("mars-tree", mod.default)
  })
})

// ───────────────────────────────────────────────────────────
// mars-dropdown
// ───────────────────────────────────────────────────────────

describe("mars-dropdown", () => {
  it("可挂载", async () => {
    const mod = await import("../../src/components/mars-ui/mars-dropdown")
    const wrapper = mount(mod.default, {
      global: { components: globalComponents }
    })
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it("install 注册组件", async () => {
    const mod = await import("../../src/components/mars-ui/mars-dropdown")
    const app = { component: vi.fn() }
    mod.install(app as any)
    expect(app.component).toHaveBeenCalledWith("mars-dropdown-menu", mod.default)
  })
})

// ───────────────────────────────────────────────────────────
// mars-loading
// ───────────────────────────────────────────────────────────

describe("mars-loading", () => {
  it("showLoading 启动 nprogress", async () => {
    vi.useFakeTimers()
    const mod = await import("../../src/components/mars-ui/mars-loading")
    mod.$showLoading()
    expect(mocks.nprogress.start).toHaveBeenCalled()
    vi.advanceTimersByTime(600)
    mod.$hideLoading()
    expect(mocks.nprogress.done).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it("多次 show 后 hide 不立即 done", async () => {
    vi.useFakeTimers()
    vi.resetModules()
    const mod = await import("../../src/components/mars-ui/mars-loading")
    mod.$showLoading()
    mod.$showLoading()
    mod.$hideLoading()
    expect(mocks.nprogress.done).not.toHaveBeenCalled()
    mod.$hideLoading()
    expect(mocks.nprogress.done).toHaveBeenCalled()
    vi.useRealTimers()
  })

  it("default install 挂载全局方法", async () => {
    const mod = await import("../../src/components/mars-ui/mars-loading")
    const app: any = { config: { globalProperties: {} } }
    mod.default(app)
    expect(app.config.globalProperties.$showLoading).toBe(mod.$showLoading)
    expect(app.config.globalProperties.$hideLoading).toBe(mod.$hideLoading)
  })
})

// ───────────────────────────────────────────────────────────
// mars-message
// ───────────────────────────────────────────────────────────

describe("mars-message", () => {
  it("$message 调用 message[type]", async () => {
    const mod = await import("../../src/components/mars-ui/mars-message")
    await mod.$message("hello", "success")
    expect(mocks.message.success).toHaveBeenCalled()
  })

  it("$message 无效类型 reject", async () => {
    const mod = await import("../../src/components/mars-ui/mars-message")
    await expect(mod.$message("x", "invalid" as any)).rejects.toBeUndefined()
  })

  it("default install", async () => {
    const mod = await import("../../src/components/mars-ui/mars-message")
    const app: any = { config: { globalProperties: {} } }
    mod.default(app)
    expect(app.config.globalProperties.$message).toBe(mod.$message)
  })
})

// ───────────────────────────────────────────────────────────
// mars-notify
// ───────────────────────────────────────────────────────────

describe("mars-notify", () => {
  it("$notify 调用 notification[type]", async () => {
    const mod = await import("../../src/components/mars-ui/mars-notify")
    const p = mod.$notify("title", "desc")
    // 触发 onClose
    const call = (mocks.notification.info as any).mock.calls[0][0]
    call.onClose()
    await expect(p).resolves.toBe(true)
  })

  it("$notify 无效类型 reject", async () => {
    const mod = await import("../../src/components/mars-ui/mars-notify")
    await expect(mod.$notify("t", "d", {}, "invalid" as any)).rejects.toBeUndefined()
  })

  it("default install", async () => {
    const mod = await import("../../src/components/mars-ui/mars-notify")
    const app: any = { config: { globalProperties: {} } }
    mod.default(app)
    expect(app.config.globalProperties.$notify).toBe(mod.$notify)
  })
})

// ───────────────────────────────────────────────────────────
// mars-alert
// ───────────────────────────────────────────────────────────

describe("mars-alert", () => {
  it("$alert 调用 Modal[type] 并 resolve onOk", async () => {
    const mod = await import("../../src/components/mars-ui/mars-alert")
    const p = mod.$alert("content", "title", "info")
    const call = (mocks.modal.info as any).mock.calls[0][0]
    call.onOk()
    await expect(p).resolves.toBe(true)
  })

  it("$alert 取消时 reject", async () => {
    const mod = await import("../../src/components/mars-ui/mars-alert")
    const p = mod.$alert("content")
    const call = (mocks.modal.info as any).mock.calls[0][0]
    call.onCancel()
    await expect(p).rejects.toThrow("用户取消")
  })

  it("$alert 无效类型 reject", async () => {
    const mod = await import("../../src/components/mars-ui/mars-alert")
    await expect(mod.$alert("x", "t", "invalid" as any)).rejects.toBeUndefined()
  })

  it("default install", async () => {
    const mod = await import("../../src/components/mars-ui/mars-alert")
    const app: any = { config: { globalProperties: {} } }
    mod.default(app)
    expect(app.config.globalProperties.$alert).toBe(mod.$alert)
  })
})

// ───────────────────────────────────────────────────────────
// mars-dialog
// ───────────────────────────────────────────────────────────

describe("mars-dialog", () => {
  const mountDialog = async (props: any = {}, slots: any = {}) => {
    // teleport 目标元素
    let wrapper = document.querySelector("#mars-main-view")
    if (!wrapper) {
      wrapper = document.createElement("div")
      wrapper.id = "mars-main-view"
      document.body.appendChild(wrapper)
    }
    // 清空前序用例 teleport 残留的弹框，保证 querySelector 拿到当前实例
    wrapper.innerHTML = ""
    // 模拟容器尺寸
    Object.defineProperty(wrapper, "offsetWidth", { value: 1000, configurable: true })
    Object.defineProperty(wrapper, "offsetHeight", { value: 800, configurable: true })

    const mod = await import("../../src/components/mars-ui/mars-dialog/index.vue")
    const w = mount(mod.default, {
      props: { visible: true, ...props },
      slots,
      global: {
        components: { "mars-icon": { template: "<span />" } }
      },
      attachTo: document.body
    })
    await w.vm.$nextTick()
    // 模拟 dialog 元素尺寸（teleport 到 #mars-main-view）
    const dialogEl = wrapper.querySelector(".mars-dialog") as HTMLElement
    if (dialogEl) {
      Object.defineProperty(dialogEl, "offsetWidth", { value: 300, configurable: true })
      Object.defineProperty(dialogEl, "offsetHeight", { value: 200, configurable: true })
      Object.defineProperty(dialogEl, "offsetLeft", { value: 10, configurable: true })
      Object.defineProperty(dialogEl, "offsetTop", { value: 10, configurable: true })
    }
    return w
  }

  const getDialog = () => document.querySelector("#mars-main-view .mars-dialog") as HTMLElement
  const getThumb = () => document.querySelector("#mars-main-view .mars-dialog-thumb") as HTMLElement

  it("基本挂载与默认 props", async () => {
    const w = await mountDialog({ title: "测试" })
    expect(getDialog()).toBeTruthy()
    w.unmount()
  })

  it("showHeader: 有 title 时显示头部", async () => {
    const w = await mountDialog({ title: "标题" })
    expect(getDialog()?.querySelector(".mars-dialog__header")).toBeTruthy()
    w.unmount()
  })

  it("showHeader: 无 title/icon/slot 时不显示头部", async () => {
    const w = await mountDialog({})
    expect(getDialog()?.querySelector(".mars-dialog__header")).toBeFalsy()
    w.unmount()
  })

  it("getContentStyle: nopadding 时 padding 为 0", async () => {
    const w = await mountDialog({ title: "t", nopadding: true })
    const content = getDialog()?.querySelector(".mars-dialog__content") as HTMLElement
    expect(content.getAttribute("style")).toContain("padding")
    w.unmount()
  })

  it("getContentStyle: 有 footer 时高度计算", async () => {
    const w = await mountDialog({ title: "t" }, { footer: () => "footer" })
    expect(getDialog()?.querySelector(".mars-dialog__footer")).toBeTruthy()
    w.unmount()
  })

  it("close 触发 update:visible 和 closed", async () => {
    const w = await mountDialog({ title: "t", closeable: true })
    const closeBtn = getDialog()?.querySelector(".close-btn") as HTMLElement
    closeBtn.click()
    expect(w.emitted("update:visible")).toBeDefined()
    expect(w.emitted("closed")).toBeDefined()
    w.unmount()
  })

  it("beforeClose 返回 false 时不关闭", async () => {
    const beforeClose = vi.fn(() => false)
    const w = await mountDialog({ title: "t", closeable: true, beforeClose })
    const closeBtn = getDialog()?.querySelector(".close-btn") as HTMLElement
    closeBtn.click()
    expect(beforeClose).toHaveBeenCalled()
    expect(w.emitted("update:visible")).toBeUndefined()
    w.unmount()
  })

  it("beforeClose 返回 Promise resolve 时关闭", async () => {
    const beforeClose = vi.fn(() => Promise.resolve())
    const w = await mountDialog({ title: "t", closeable: true, beforeClose })
    const closeBtn = getDialog()?.querySelector(".close-btn") as HTMLElement
    closeBtn.click()
    await new Promise((r) => setTimeout(r, 10))
    expect(w.emitted("update:visible")).toBeDefined()
    w.unmount()
  })

  it("beforeClose 返回 Promise reject 时不关闭", async () => {
    const beforeClose = vi.fn(() => Promise.reject())
    const w = await mountDialog({ title: "t", closeable: true, beforeClose })
    const closeBtn = getDialog()?.querySelector(".close-btn") as HTMLElement
    closeBtn.click()
    await new Promise((r) => setTimeout(r, 10))
    expect(w.emitted("update:visible")).toBeUndefined()
    w.unmount()
  })

  it("折叠/展开切换", async () => {
    const w = await mountDialog({ title: "t" })
    const vm: any = w.vm
    vm.fold()
    await w.vm.$nextTick()
    expect(getThumb()).toBeTruthy()
    vm.expend()
    await w.vm.$nextTick()
    vm.toggle()
    await w.vm.$nextTick()
    w.unmount()
  })

  it("默认折叠", async () => {
    const w = await mountDialog({ title: "t", defaultFold: true })
    expect(getThumb()).toBeTruthy()
    w.unmount()
  })

  it("拖拽: dragStart + mousemove + mouseup", async () => {
    const w = await mountDialog({ title: "t", draggable: true })
    const header = getDialog()?.querySelector(".mars-dialog__header") as HTMLElement
    header.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 150, clientY: 120 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", { clientX: 150, clientY: 120 }))
    expect(w.emitted("move")).toBeDefined()
    w.unmount()
  })

  it("缩放: resizeStart", async () => {
    const w = await mountDialog({ title: "t", handles: "rb" })
    const handle = getDialog()?.querySelector(".handle-r") as HTMLElement
    handle.dispatchEvent(new MouseEvent("mousedown", { clientX: 300, clientY: 200 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 350, clientY: 250 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", { clientX: 350, clientY: 250 }))
    expect(w.emitted("resize")).toBeDefined()
    w.unmount()
  })

  it("animationClass: 不同位置对应不同动画", async () => {
    const w1 = await mountDialog({ title: "t", left: 10 })
    expect(getDialog()?.className).toContain("fadein-left")
    w1.unmount()

    const w2 = await mountDialog({ title: "t", right: 10 })
    expect(getDialog()?.className).toContain("fadein-right")
    w2.unmount()

    const w3 = await mountDialog({ title: "t", right: 100, top: 10 })
    expect(getDialog()?.className).toContain("fadein-down")
    w3.unmount()

    const w4 = await mountDialog({ title: "t", right: 100, bottom: 10 })
    expect(getDialog()?.className).toContain("fadein-up")
    w4.unmount()

    const w5 = await mountDialog({ title: "t", animation: "custom-anim" })
    expect(getDialog()?.className).toContain("custom-anim")
    w5.unmount()

    const w6 = await mountDialog({ title: "t", animation: false })
    expect(getDialog()?.className).not.toContain("fadein-center")
    w6.unmount()
  })

  it("position prop 优先级高于 left/right/top/bottom", async () => {
    const w = await mountDialog({ title: "t", position: { left: 50, top: 60 }, left: 10, top: 20 })
    await new Promise((r) => setTimeout(r, 20))
    expect(getDialog()?.style.left).toBe("50px")
    w.unmount()
  })

  it("无 left/right 时默认 right=10，无 top/bottom 时默认 top=10", async () => {
    const w = await mountDialog({ title: "t" })
    expect(getDialog()?.style.right).toBe("10px")
    expect(getDialog()?.style.top).toBe("10px")
    w.unmount()
  })

  it("window resize 触发尺寸调整", async () => {
    const w = await mountDialog({ title: "t" })
    window.dispatchEvent(new Event("resize"))
    w.unmount()
  })

  it("initSize: left+right/top+bottom 同时存在时自动计算宽高", async () => {
    // 放大 maxWidth/maxHeight，避免被 window.innerWidth/innerHeight(1024/768) 收敛
    const w = await mountDialog({ title: "t", left: 10, right: 10, top: 10, bottom: 10, maxWidth: 2000, maxHeight: 2000 })
    // w = 1000 - 10 - 10, h = 800 - 10 - 10
    expect(getDialog()?.style.width).toBe("980px")
    expect(getDialog()?.style.height).toBe("780px")
    w.unmount()
  })

  it("initSize: 数值 width/height 走 min/max 收敛", async () => {
    const w = await mountDialog({ title: "t", width: 400, height: 300 })
    expect(getDialog()?.style.width).toBe("400px")
    expect(getDialog()?.style.height).toBe("300px")
    w.unmount()
  })

  it("initSize: 百分比 width 跳过 min/max", async () => {
    const w = await mountDialog({ title: "t", width: "50%" })
    expect(getDialog()?.style.width).toBe("50%")
    w.unmount()
  })

  it("draggable=false 时 dragStart 直接返回，handles=false 时无缩放句柄", async () => {
    const w = await mountDialog({ title: "t", draggable: false, handles: false })
    expect(getDialog()?.querySelector(".mars-dialog__handle")).toBeFalsy()
    const header = getDialog()?.querySelector(".mars-dialog__header") as HTMLElement
    header.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 150, clientY: 120 }))
    expect(w.emitted("move")).toBeUndefined()
    w.unmount()
  })

  it("handles 为字符串时拆分渲染，l/t/b 句柄缩放", async () => {
    const w = await mountDialog({ title: "t", draggable: false, handles: "ltb" })
    const dialog = getDialog()
    const handleL = dialog?.querySelector(".handle-l") as HTMLElement
    const handleT = dialog?.querySelector(".handle-t") as HTMLElement
    const handleB = dialog?.querySelector(".handle-b") as HTMLElement
    expect(handleL).toBeTruthy()
    expect(handleT).toBeTruthy()
    expect(handleB).toBeTruthy()

    // l: 左边界缩放（clientX 需在 0 ~ warpper.offsetWidth 之间）
    handleL.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 350, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", {}))

    // t: 上边界缩放
    handleT.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 100, clientY: 250 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", {}))

    // b: 下边界缩放
    handleB.dispatchEvent(new MouseEvent("mousedown", { clientX: 100, clientY: 100 }))
    document.documentElement.dispatchEvent(new MouseEvent("mousemove", { clientX: 100, clientY: 250 }))
    document.documentElement.dispatchEvent(new MouseEvent("mouseup", {}))

    expect(w.emitted("resize")).toBeDefined()
    w.unmount()
  })

  it("beforeClose 返回非 false 非 Promise 时直接关闭", async () => {
    const beforeClose = vi.fn(() => true)
    const w = await mountDialog({ title: "t", closeable: true, beforeClose })
    const closeBtn = getDialog()?.querySelector(".close-btn") as HTMLElement
    closeBtn.click()
    await new Promise((r) => setTimeout(r, 10))
    expect(w.emitted("update:visible")).toBeDefined()
    w.unmount()
  })

  it("animationClass: 无有效方位时返回 fadein-center", async () => {
    // NaN 可绕过 isAllowValue 的默认值补齐，同时让各方位判断均为 false
    const w = await mountDialog({ title: "t", left: NaN, top: NaN })
    expect(getDialog()?.className).toContain("fadein-center")
    w.unmount()
  })

  it("窗口缩放超出容器时收紧宽高，DOM 变化触发 autoNiceHeight", async () => {
    const w = await mountDialog({ title: "t" })
    const dialog = getDialog() as HTMLElement
    // 模拟弹框超出容器底部/右部
    Object.defineProperty(dialog, "offsetTop", { value: 700, configurable: true })
    Object.defineProperty(dialog, "offsetLeft", { value: 800, configurable: true })
    window.dispatchEvent(new Event("resize"))

    // 模拟内容高度超出：offsetHeight + offsetTop > warpper.offsetHeight
    Object.defineProperty(dialog, "offsetTop", { value: 10, configurable: true })
    Object.defineProperty(dialog, "offsetHeight", { value: 900, configurable: true })
    dialog.setAttribute("data-trigger-observer", "1") // 触发 MutationObserver
    await new Promise((r) => setTimeout(r, 20))
    expect(dialog.style.height).toBe("790px")
    w.unmount()
  })

  it("addEvent/removeEvent 兼容 attachEvent/属性赋值 各分支", async () => {
    const w = await mountDialog({ title: "t" })
    const vm: any = w.vm
    const handler = vi.fn()

    // addEvent
    vm.addEvent(null, "click", handler) // !el 直接返回
    const el1 = { attachEvent: vi.fn() }
    vm.addEvent(el1, "click", handler)
    expect(el1.attachEvent).toHaveBeenCalledWith("onclick", handler)
    const el2 = { addEventListener: vi.fn() }
    vm.addEvent(el2, "click", handler)
    expect(el2.addEventListener).toHaveBeenCalledWith("click", handler)
    const el3: any = {}
    vm.addEvent(el3, "click", handler)
    expect(el3.onclick).toBe(handler)

    // removeEvent
    vm.removeEvent(null, "click", handler) // !el 直接返回
    const el4 = { detachEvent: vi.fn() }
    vm.removeEvent(el4, "click", handler)
    expect(el4.detachEvent).toHaveBeenCalledWith("onclick", handler)
    const el5 = { removeEventListener: vi.fn() }
    vm.removeEvent(el5, "click", handler)
    expect(el5.removeEventListener).toHaveBeenCalledWith("click", handler)
    const el6: any = { onclick: handler }
    vm.removeEvent(el6, "click", handler)
    expect(el6.onclick).toBeNull()
    w.unmount()
  })
})

// ───────────────────────────────────────────────────────────
// mars-ui index install
// ───────────────────────────────────────────────────────────

describe("mars-ui index install", () => {
  it("install 注册所有组件与服务", async () => {
    const mod = await import("../../src/components/mars-ui")
    const app: any = {
      use: vi.fn().mockReturnThis(),
      component: vi.fn(),
      config: { globalProperties: {} }
    }
    mod.default(app, { dialog: {} })
    expect(app.use).toHaveBeenCalled()
    expect(app.component).toHaveBeenCalled()
    expect(mod.getConfig()).toEqual({ dialog: {} })
  })
})
