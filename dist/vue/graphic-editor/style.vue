<template>
  <a-collapse v-model:activeKey="styleCollapse">
    <a-collapse-panel key="1" :showArrow="false" header="+ 样式信息">
      <a-row :gutter="[5, 10]" align="middle">
        <a-col :span="labelWidth">所在图层</a-col>
        <a-col :span="24 - labelWidth">{{ layerName }}</a-col>
        <a-col :span="labelWidth">标号类型</a-col>
        <a-col :span="24 - labelWidth">{{ entityName }}</a-col>
        <template v-for="(item, i) in props.styleConfig.style" :key="i">
          <template v-if="styleValue && showIt(item)">
            <a-col :span="labelWidth">{{ item.label }}</a-col>
            <a-col :span="24 - labelWidth">
              <component
                :is="getComponent(item.type)"
                size="small"
                v-model:value="styleValue[item.name]"
                :min="item.min || item.min === 0 ? item.min : -Infinity"
                :max="item.max || item.max === 0 ? item.max : Infinity"
                :step="item.step || 0.1"
                :options="item.data || []"
                @change="unionChange(item)"
              >
                <span v-if="item.type === 'label'" class="attr-editor-label">{{ styleValue[item.name] }}</span>
              </component>
            </a-col>
          </template>
        </template>
      </a-row>
    </a-collapse-panel>
    <a-collapse-panel v-if="styleValue && styleValue.label" key="2" :showArrow="false" header="+ 注记信息">
      <a-row :gutter="[5, 10]">
        <template v-for="(item, i) in labelConfig.style" :key="i">
          <template v-if="labelShowIt(item)">
            <a-col :span="labelWidth">{{ item.label }}</a-col>
            <a-col :span="24 - labelWidth">
              <component
                :is="getComponent(item.type)"
                size="small"
                v-model:value="styleValue.label[item.name]"
                :min="item.min || item.min === 0 ? item.min : -Infinity"
                :max="item.max || item.max === 0 ? item.max : Infinity"
                :step="item.step || 0.1"
                :options="item.data || []"
                @change="unionLabelChange"
              ></component>
            </a-col>
          </template>
        </template>
      </a-row>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
/**
 * 模型编辑组件 样式
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { inject, ref, watch } from "vue"
import _ from "lodash"
import { Input, InputNumber, Select, Slider } from "ant-design-vue"
import Radio from "./comps/radio.vue"
import ColorPicker from "@comp/mars-ui/mars-color-picker"

const props = defineProps<{
  labelWidth: number
  styleConfig: any
  style: any
}>()

const emit = defineEmits(["styleChange"])

const getGraphicAttr: () => any = inject("getGraphicAttr") as () => any
const getGraphic: () => any = inject("getGraphic") as () => any

const layerName = ref("")
const entityName = ref("")
const styleValue = ref<any>(null)
const showImpacts = ref<any[]>([])
const showLabelImpacts = ref<any[]>([])
const labelConfig = getLabelConfig()

watch(
  props,
  () => {
    if (props.style) {
      styleValue.value = _.cloneDeep(props.style)
      setDefault()
      const gp = getGraphic()
      layerName.value = gp?._layer?.name || ""
      entityName.value = gp?._name || props.styleConfig.name
      setImpacts()
      if (props.style.label) {
        setLabelDefault()
        setLabelImpacts()
      }
    }

    getLabelConfig()
  },
  {
    immediate: true
  }
)

const styleCollapse = ref(["1", "2"])

const components = {
  number: InputNumber,
  radio: Radio,
  slider: Slider,
  color: ColorPicker,
  combobox: Select,
  textarea: Input.TextArea,
  label: "span"
}
function getComponent(type: keyof typeof components) {
  return components[type]
}

function getLabelConfig() {
  const graphicAttr = getGraphicAttr()

  return graphicAttr.label
}

function setDefault() {
  if (props.styleConfig.style) {
    props.styleConfig.style.forEach((item: any) => {
      if (!styleValue.value[item.name] && styleValue.value[item.name] !== 0 && styleValue.value[item.name] !== false) {
        styleValue.value[item.name] = item.defval
      }
    })
  }
}

function setImpacts() {
  let allImpacts: any[] = []
  if (props.styleConfig.style) {
    props.styleConfig.style.forEach((item: any) => {
      if (item.impact && styleValue.value[item.name] === true) {
        allImpacts = allImpacts.concat(item.impact)
      }
      if (item.data && _.isArray(item.data)) {
        item.data.forEach((op: any) => {
          if (op.impact && styleValue.value[item.name] === op.value) {
            allImpacts = allImpacts.concat(op.impact)
          }
        })
      }
    })
  }
  showImpacts.value = _.uniq(allImpacts)
}

function setLabelDefault() {
  labelConfig.style.forEach((item: any) => {
    if (!styleValue.value.label[item.name] && styleValue.value.label[item.name] !== 0) {
      styleValue.value.label[item.name] = item.defval
    }
  })
}
function setLabelImpacts() {
  let allImpacts: any[] = []

  labelConfig.style.forEach((item: any) => {
    if (item.impact && styleValue.value.label[item.name] === true) {
      allImpacts = allImpacts.concat(item.impact)
    }
    if (item.data && _.isArray(item.data)) {
      item.data.forEach((op: any) => {
        if (op.impact && styleValue.value.label[item.name] === op.value) {
          allImpacts = allImpacts.concat(op.impact)
        }
      })
    }
  })
  showLabelImpacts.value = _.uniq(allImpacts)
}

function updateStyle(item: any) {
  emit("styleChange", {
    [item.name]: styleValue.value[item.name]
  })
}

function unionChange(item: any) {
  if (item.name === "fill" || item.name === "outline") {
    if (styleValue.value.fill === false && styleValue.value.outline === false) {
      window.$message("填充和边框不能同时为否")
      styleValue.value[item.name] = true
      return
    }
  }
  setImpacts()
  updateStyle(item)
}

function unionLabelChange(item: any) {
  setLabelDefault()
  setLabelImpacts()
  updateStyle({ name: "label" })
}

function showIt(item: any) {
  return item.type !== "hidden" && (!item.isImpact || (item.isImpact && showImpacts.value.includes(item.name)))
}
function labelShowIt(item: any) {
  return item.type !== "hidden" && (!item.isImpact || (item.isImpact && showLabelImpacts.value.includes(item.name)))
}
</script>

<style lang="less" scoped>
:deep(.ant-select) {
  width: 100%;
}
</style>
