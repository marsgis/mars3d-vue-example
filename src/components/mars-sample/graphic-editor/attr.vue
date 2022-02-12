<template>
  <a-collapse :activeKey="['1']">
    <a-collapse-panel key="1" :showArrow="false" header="属性信息">
      <a-row :gutter="[5, 10]">
        <template v-for="(item, i) in attrComps" :key="i">
          <a-col :span="labelWidth">{{ item.label }}</a-col>
          <a-col :span="24 - labelWidth">
            <component :is="getComponent(item.type as any)" size="small" v-model:value="attributies[item.name]" @change="unionChange(item)">
              <template v-if="item.type === 'label'">{{ attributies[item.name] }}</template>
            </component>
          </a-col>
        </template>
      </a-row>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
/**
 * 模型编辑组件 属性
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { ref, watch } from "vue"
import { Input, InputNumber } from "ant-design-vue"
import Radio from "./comps/radio.vue"
import { isBoolean, isNumber } from "lodash"

const props = defineProps<{
  labelWidth: number
  attrs: any
}>()

const emit = defineEmits(["attrChange"])

const components = {
  radio: Radio,
  textarea: Input.TextArea,
  text: Input,
  number: InputNumber,
  label: "span"
}
function getComponent(type: keyof typeof components) {
  return components[type]
}

const attributies = ref<any>(null)

const attrComps = ref<any[]>([])

watch(
  props,
  () => {
    attributies.value = props.attrs
    if (props.attrs) {
      const ac: any[] = Object.keys(props.attrs)
        .filter((k) => !["id", "name", "remark"].includes(k))
        .map((k) => {
          let type = "text"
          if (isBoolean(attributies[k])) {
            type = "radio"
          }
          if (isNumber(attributies[k])) {
            type = "number"
          }
          return { name: k, label: k, type }
        })
      attrComps.value = [
        { name: "id", label: "主键", type: "label", defval: "" },
        { name: "name", label: "名称", type: "text", defval: "" },
        { name: "remark", label: "备注", type: "textarea", defval: "" }
      ].concat(ac)
    }
  },
  {
    immediate: true
  }
)

function unionChange(item: any) {
  emit("attrChange", {
    [item.name]: attributies.value[item.name]
  })
}
</script>

<style lang="less" scoped></style>
