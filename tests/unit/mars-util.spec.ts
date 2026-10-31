import { beforeEach, describe, expect, it, vi } from "vitest"
import {
  fetchJson,
  getExampleId,
  getQueryString,
  isLonLat,
  normalizeExampleId,
  renderExampleEmptyState,
  setAutoHeight
} from "../../src/utils/mars-util"

vi.mock("../../src/utils/request", () => ({
  default: vi.fn(() => Promise.resolve({ data: { ok: true } }))
}))

describe("isLonLat", () => {
  it.each([
    ["116.39,39.9", true],
    ["0,0", true],
    ["-73.5,-33.8", true],
    ["180,90", true],
    ["-180,-90", true],
    ["181,0", false],
    ["116.39,91", false],
    ["116.39", false],
    ["abc,def", false],
    ["", false],
    ["1,2,3", false]
  ])("%s -> %s", (text, expected) => {
    expect(isLonLat(text)).toBe(expected)
  })
})

describe("normalizeExampleId", () => {
  it("去掉 src/example/ 前缀与 /map.js 后缀", () => {
    expect(normalizeExampleId("src/example/map/create/options/map.js")).toBe("map/create/options")
  })

  it("兼容反斜杠路径", () => {
    expect(normalizeExampleId("src\\example\\graphic\\video\\material\\map.js")).toBe("graphic/video/material")
  })

  it("普通 id 保持不变", () => {
    expect(normalizeExampleId("map/create/options")).toBe("map/create/options")
  })
})

describe("getQueryString / getExampleId", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/read-vue.html?foo=bar&empty=")
  })

  it("读取存在的参数与空值", () => {
    expect(getQueryString("foo")).toBe("bar")
    expect(getQueryString("empty")).toBe("")
    expect(getQueryString("missing")).toBeNull()
  })

  it("缺少 id 时抛错", () => {
    expect(() => getExampleId()).toThrow("id不能为空")
  })

  it("id 会经归一化返回", () => {
    window.history.replaceState({}, "", "/read-vue.html?id=src%2Fexample%2Fmap%2Fcreate%2Foptions%2Fmap.js")
    expect(getExampleId()).toBe("map/create/options")
  })
})

describe("renderExampleEmptyState", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="root"></div>'
  })

  it("非法 id 给出文案与返回链接", () => {
    renderExampleEmptyState("a/b")
    const root = document.getElementById("root")!
    expect(root.textContent).toContain("未找到示例「a/b」")
    const link = root.querySelector("a")!
    expect(link.textContent).toBe("返回示例列表")
    expect(link.getAttribute("href")).toContain("index.html")
  })

  it("缺失 id 给出缺参提示", () => {
    renderExampleEmptyState(null)
    expect(document.getElementById("root")!.textContent).toContain("缺少示例参数 id")
  })

  it("id 内容按文本写入，不解析为 HTML", () => {
    renderExampleEmptyState("<img src=x onerror=alert(1)>")
    expect(document.querySelector("#root img")).toBeNull()
    expect(document.getElementById("root")!.textContent).toContain("<img")
  })

  it("root 不存在时静默返回", () => {
    document.body.innerHTML = ""
    expect(() => renderExampleEmptyState("a/b")).not.toThrow()
  })
})

describe("setAutoHeight", () => {
  it("立即回调一次并在 resize 时再次回调，返回注销函数", () => {
    const wapper = document.createElement("div")
    wapper.id = "sanbox-warpper"
    Object.defineProperty(wapper, "clientHeight", { value: 500 })
    document.body.appendChild(wapper)

    const cb = vi.fn()
    const off = setAutoHeight(cb, 100)
    expect(cb).toHaveBeenCalledWith(400)

    window.dispatchEvent(new Event("resize"))
    expect(cb).toHaveBeenCalledTimes(2)

    off()
    window.dispatchEvent(new Event("resize"))
    expect(cb).toHaveBeenCalledTimes(2)

    document.body.removeChild(wapper)
  })

  it("容器不存在时回退到 body", () => {
    const cb = vi.fn()
    setAutoHeight(cb)
    expect(cb).toHaveBeenCalled()
  })
})

describe("fetchJson", () => {
  it("透传 options 并返回 result.data", async () => {
    const result = await fetchJson({ url: "/api/test", method: "post" })
    expect(result).toEqual({ ok: true })
  })
})
