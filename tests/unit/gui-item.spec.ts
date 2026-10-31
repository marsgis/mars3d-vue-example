import { describe, expect, it } from "vitest"
import { defineComponent, h } from "vue"
import { mount } from "@vue/test-utils"
import GuiItem from "../../src/components/mars-ui/mars-gui-item/index.vue"
import {
  components,
  deleteItem,
  getFormData,
  getValue,
  getValues,
  insertItem,
  updateExtra,
  updateField,
  updateFields,
  type GuiItem as GuiItemOption
} from "../../src/components/mars-ui/mars-gui-item/index"

/** 表单容器桩：保留 label 便于断言，渲染默认插槽 */
const FormItemStub = defineComponent({
  name: "a-form-item",
  props: { label: String },
  setup(props, { slots }) {
    return () => h("div", { class: "form-item", "data-label": props.label ?? "" }, slots.default?.())
  }
})

/** 控件桩：透传 value，变更时先派发 update:value 再派发 change（与真实控件顺序一致） */
const InputStub = defineComponent({
  name: "mars-input",
  props: { value: { type: null }, suffix: String },
  emits: ["update:value", "change"],
  setup(props, { emit }) {
    return () =>
      h("input", {
        class: "stub-control",
        value: props.value ?? "",
        onChange: (e: any) => {
          emit("update:value", e.target.value)
          emit("change", e.target.value)
        }
      })
  }
})

function mountItem(option: GuiItemOption, options: GuiItemOption[]) {
  return mount(GuiItem, {
    props: { option, options },
    global: {
      components: {
        "a-form-item": FormItemStub,
        "mars-input": InputStub
      }
    }
  })
}

describe("mars-gui-item · 纯函数", () => {
  it("组件映射覆盖所有受支持类型", () => {
    expect(Object.keys(components).sort()).toEqual(
      ["checkbox", "color", "input", "inputGroup", "number", "radio", "select", "slider", "switch", "textarea"].sort()
    )
    expect(components.color).toBe("mars-color-picker")
    expect(components.inputGroup).toBe("mars-input-group")
  })

  it("getFormData / getValues 按 field 汇总 value", () => {
    const options: GuiItemOption[] = [
      { type: "input", field: "a", value: "1" },
      { type: "switch", field: "b", value: true }
    ]
    expect(getFormData(options)).toEqual({ a: "1", b: true })
    expect(getValues(options)).toEqual({ a: "1", b: true })
  })

  it("deleteItem 支持按 field 名与按下标删除，越界/未知字段不动数组", () => {
    const byName: GuiItemOption[] = [
      { type: "input", field: "a", value: 1 },
      { type: "input", field: "b", value: 2 }
    ]
    deleteItem(byName, "a")
    expect(byName.map((it) => it.field)).toEqual(["b"])

    const byIndex: GuiItemOption[] = [
      { type: "input", field: "a", value: 1 },
      { type: "input", field: "b", value: 2 }
    ]
    deleteItem(byIndex, 1)
    expect(byIndex.map((it) => it.field)).toEqual(["a"])

    const untouched: GuiItemOption[] = [{ type: "input", field: "a", value: 1 }]
    deleteItem(untouched, 9)
    deleteItem(untouched, "missing")
    expect(untouched).toHaveLength(1)
  })

  it("insertItem 支持一次插入多项", () => {
    const options: GuiItemOption[] = [{ type: "input", field: "a", value: 1 }]
    insertItem(options, 1, { type: "input", field: "b", value: 2 }, { type: "input", field: "c", value: 3 })
    expect(options.map((it) => it.field)).toEqual(["a", "b", "c"])
  })

  it("updateField / updateExtra 只写命中的字段", () => {
    const options: GuiItemOption[] = [
      { type: "input", field: "a", value: 1 },
      { type: "input", field: "b", value: 2 }
    ]
    updateField(options, "b", 9)
    updateExtra(options, "a", "说明")
    expect(options).toEqual([
      { type: "input", field: "a", value: 1, extra: "说明" },
      { type: "input", field: "b", value: 9 }
    ])
  })

  it("updateFields 只回写真值字段（0 / 空串 / false 不写入）", () => {
    const options: GuiItemOption[] = [
      { type: "input", field: "a", value: 1 },
      { type: "input", field: "b", value: 2 },
      { type: "input", field: "c", value: 3 }
    ]
    updateFields(options, { a: 0, b: "", c: 4 })
    expect(options.map((it) => it.value)).toEqual([1, 2, 4])
  })

  it("getValue 命中返回值，未命中抛错", () => {
    const options: GuiItemOption[] = [{ type: "input", field: "a", value: "x" }]
    expect(getValue(options, "a")).toBe("x")
    expect(() => getValue(options, "missing")).toThrow("field is not exist")
  })
})

describe("mars-gui-item · 单字段渲染", () => {
  it("默认显示，label 取自 option", () => {
    const options: GuiItemOption[] = [{ type: "input", field: "name", value: "old", label: "名称" }]
    const wrapper = mountItem(options[0], options)
    expect(wrapper.find(".form-item").attributes("data-label")).toBe("名称")
  })

  it("show 为 false 时不渲染；show 为函数时按表单数据求值", async () => {
    const hidden: GuiItemOption[] = [{ type: "input", field: "a", value: 1, show: false }]
    expect(mountItem(hidden[0], hidden).find(".form-item").exists()).toBe(false)

    const options: GuiItemOption[] = [
      { type: "input", field: "mode", value: "custom" },
      { type: "input", field: "extra", value: "", show: (data) => data.mode === "custom" }
    ]
    const wrapper = mountItem(options[1], options)
    expect(wrapper.find(".form-item").exists()).toBe(true)
  })

  it("控件变更先写回 options 的 value，再派发 change(formData)", async () => {
    const options: GuiItemOption[] = [
      { type: "input", field: "a", value: "old" },
      { type: "input", field: "b", value: "keep" }
    ]
    const wrapper = mountItem(options[0], options)
    const input = wrapper.find("input")
    ;(input.element as HTMLInputElement).value = "new"
    await input.trigger("change")

    expect(options[0].value).toBe("new")
    expect(wrapper.emitted("change")?.[0]?.[0]).toEqual({ a: "new", b: "keep" })
  })

  it("option.change 存在时优先调用它且不再 emit change", async () => {
    const calls: any[] = []
    const options: GuiItemOption[] = [
      { type: "input", field: "a", value: "old", change: (value, formData) => calls.push([value, formData]) }
    ]
    const wrapper = mountItem(options[0], options)
    const input = wrapper.find("input")
    ;(input.element as HTMLInputElement).value = "new"
    await input.trigger("change")

    expect(calls).toEqual([["new", { a: "new" }]])
    expect(wrapper.emitted("change")).toBeUndefined()
  })

  it("extra 字符串按 {field} 占位替换，extra 存在时预留宽度", () => {
    const options: GuiItemOption[] = [
      { type: "input", field: "count", value: 3 },
      { type: "input", field: "a", value: "", extra: "共 {count} 个", extraWidth: 100, extraAfter: "米" }
    ]
    const wrapper = mountItem(options[1], options)
    expect(wrapper.find(".mars-gui-extra").text()).toBe("共 3 个")
    expect(wrapper.find(".extra_follow_close").text()).toBe("米")
    expect(wrapper.find(".form-item > div").attributes("style")).toContain("calc(100% - 100px)")
  })

  it("无 extra 时占满整行", () => {
    const options: GuiItemOption[] = [{ type: "input", field: "a", value: "" }]
    const style = mountItem(options[0], options).find(".form-item > div").attributes("style")
    expect(style).toContain("width: 100%")
  })
})
