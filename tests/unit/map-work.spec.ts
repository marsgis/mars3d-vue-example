import { afterEach, describe, expect, it, vi } from "vitest"

/**
 * map-work 的就绪状态是模块级变量，每个用例重新加载模块，避免用例间串状态
 */
async function loadModule() {
  vi.resetModules()
  return import("../../src/utils/map-work")
}

describe("map-work 就绪事件流", () => {
  afterEach(() => {
    delete (window as any).mapWork
    vi.useRealTimers()
  })

  it("mark 空对象时忽略", async () => {
    const mod = await loadModule()
    mod.markMapWorkReady(null)
    expect(mod.isMapWorkReady(null)).toBe(false)
  })

  it("已就绪后订阅立即执行一次", async () => {
    const mapWork = { id: 1 }
    ;(window as any).mapWork = mapWork
    const mod = await loadModule()
    mod.markMapWorkReady()
    const callback = vi.fn()
    mod.onMapWorkReady(callback)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenCalledWith(mapWork)
  })

  it("未就绪时先挂起，mark 后执行一次", async () => {
    const mapWork = { id: 2 }
    ;(window as any).mapWork = mapWork
    const mod = await loadModule()
    const callback = vi.fn()
    mod.onMapWorkReady(callback)
    expect(callback).not.toHaveBeenCalled()

    mod.markMapWorkReady()
    expect(callback).toHaveBeenCalledTimes(1)

    mod.markMapWorkReady()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("取消订阅后不再回调", async () => {
    const mapWork = { id: 3 }
    ;(window as any).mapWork = mapWork
    const mod = await loadModule()
    const callback = vi.fn()
    const stop = mod.onMapWorkReady(callback)
    stop()
    mod.markMapWorkReady()
    expect(callback).not.toHaveBeenCalled()
  })

  it("新一轮 mapWork 会丢弃旧等待者", async () => {
    const oldWork = { id: 4 }
    const newWork = { id: 5 }
    ;(window as any).mapWork = oldWork
    const mod = await loadModule()
    const callback = vi.fn()
    mod.onMapWorkReady(callback)

    mod.markMapWorkReady(newWork)
    expect(callback).not.toHaveBeenCalled()

    mod.markMapWorkReady(oldWork)
    expect(callback).not.toHaveBeenCalled()
  })

  it("mapWork 尚未赋值时告警并返回空函数", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const mod = await loadModule()
    const callback = vi.fn()
    const stop = mod.onMapWorkReady(callback)
    expect(warn).toHaveBeenCalled()
    expect(typeof stop).toBe("function")
    expect(() => stop()).not.toThrow()
  })

  it("probe 兜底值就绪后只触发一次", async () => {
    vi.useFakeTimers()
    const mapWork = { id: 6 }
    ;(window as any).mapWork = mapWork
    const mod = await loadModule()
    const callback = vi.fn()
    let ready = false

    mod.onMapWorkReady(callback, { probe: () => ready, interval: 20, timeout: 200 })
    vi.advanceTimersByTime(20)
    expect(callback).not.toHaveBeenCalled()

    ready = true
    vi.advanceTimersByTime(20)
    expect(callback).toHaveBeenCalledTimes(1)

    vi.advanceTimersByTime(400)
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it("probe 抛错按未就绪处理，超时后停止探测", async () => {
    vi.useFakeTimers()
    const mapWork = { id: 7 }
    ;(window as any).mapWork = mapWork
    const mod = await loadModule()
    const callback = vi.fn()
    const probe = vi.fn(() => {
      throw new Error("boom")
    })

    mod.onMapWorkReady(callback, { probe, interval: 10, timeout: 50 })
    vi.advanceTimersByTime(100)
    expect(callback).not.toHaveBeenCalled()
    // 超时停止后不再探测
    const calls = probe.mock.calls.length
    vi.advanceTimersByTime(100)
    expect(probe.mock.calls.length).toBe(calls)
  })
})
