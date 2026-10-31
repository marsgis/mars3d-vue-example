export const components = {
  number: "mars-input-number",
  switch: "mars-switch",
  radio: "a-radio-group",
  checkbox: "a-checkbox-group",
  slider: "mars-slider",
  color: "mars-color-picker",
  select: "mars-select",
  textarea: "mars-textarea",
  input: "mars-input",
  inputGroup: "mars-input-group"
}

export interface GuiItem {
  type: keyof typeof components
  field: string
  label?: string
  extra?: any
  extraWidth?: number
  extraType?: "string" | "custom"
  extraAfter?: string
  min?: number
  max?: number
  step?: number
  range?: boolean
  data?: any[]
  value?: string | boolean | number | any
  units?: string[]
  show?: boolean | ((data: any) => boolean)
  change?: (value: any, dataObj: any) => any
}

export function getFormData(options: GuiItem[]) {
  const modelValues: Record<string, any> = {}
  options.forEach((item) => {
    modelValues[item.field] = item.value
  })

  return modelValues
}

export function deleteItem(options: GuiItem[], key: string | number) {
  let index: number
  if (typeof key === "string") {
    options.forEach((item, i) => {
      if (item.field === key) {
        index = i
      }
    })
  }
  if (typeof key === "number" && key >= 0 && key < options.length) {
    index = key
  }
  if (index !== undefined) {
    options.splice(index, 1)
  }
}

export function insertItem(options: GuiItem[], index: number, ...args: GuiItem[]) {
  options.splice(index, 0, ...args)
}

export function updateField(options: GuiItem[], field: string, value: any) {
  options.forEach((item) => {
    if (item.field === field) {
      item.value = value
    }
  })
}

export function updateExtra(options: GuiItem[], field: string, value: any) {
  options.forEach((item) => {
    if (item.field === field) {
      item.extra = value
    }
  })
}

export function updateFields(options: GuiItem[], fieldObj: Record<string, any>) {
  options.forEach((item) => {
    if (fieldObj[item.field]) {
      item.value = fieldObj[item.field]
    }
  })
}

export function getValue(options: GuiItem[], field: string) {
  const item = options.find((it) => {
    return it.field === field
  })
  if (item) {
    return item.value
  }
  throw new Error("field is not exist")
}

export function getValues(options: GuiItem[]) {
  return getFormData(options)
}
