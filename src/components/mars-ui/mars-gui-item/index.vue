<template>
  <a-form-item v-if="visible" :label="option.label">
    <div :style="getItemStyle(option)">
      <component
        :is="getComponent(option.type)"
        v-model:value="value"
        :min="option.min || option.min === 0 ? option.min : -Infinity"
        :max="option.max || option.max === 0 ? option.max : Infinity"
        :step="option.step || 0.1"
        :range="option.range || false"
        :options="option.data || []"
        :units="option.units"
        @change="itemChange(option)"
      >
      </component>
      <span v-if="option.extraAfter" class="extra_follow_close">{{ option.extraAfter }}</span>
    </div>
    <div v-if="extraVisible" class="mars-gui-extra">
      <component v-if="extraIsCustom" :is="extraText"></component>
      <template v-else>{{ extraText }}</template>
    </div>
  </a-form-item>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { components, GuiItem, getFormData } from "./index"

const props = defineProps<{
  option: GuiItem
  options: GuiItem[]
}>()

const emits = defineEmits(["change"])

const item = computed(() => props.option)

const value = computed({
  get: () => item.value.value,
  set: (val) => {
    item.value.value = val
  }
})

const formData = computed(() => getFormData(props.options))

const visible = computed(() => {
  const show = props.option.show
  if (typeof show === "function") {
    return show(formData.value)
  }
  return show === undefined ? true : !!show
})

const extraVisible = computed(() => props.option.extra !== undefined && props.option.extra !== null)

const extraIsCustom = computed(() => (props.option.extraType || "string") === "custom")

const extraText = computed(() => {
  const extra = props.option.extra
  if (typeof extra === "function") {
    return extra(formData.value)
  }
  if (typeof extra === "string") {
    return extra.replace(/\{([^{}]+)\}/g, (_, key) => formData.value[key] ?? "")
  }
  return extra
})

const getItemStyle = ({ extraWidth, extra }: GuiItem) => {
  if (!extraWidth && extraWidth !== 0) {
    extraWidth = 63
  }
  return extra !== undefined
    ? {
      width: `calc(100% - ${extraWidth || extraWidth === 0 ? extraWidth : 100}px)`,
      display: "inline-block",
      marginRight: "6px"
    }
    : {
      display: "inline-block",
      width: "100%"
    }
}

function getComponent(type: keyof typeof components) {
  return components[type]
}

function itemChange(item: GuiItem) {
  if (item.change) {
    item.change(item.value, formData.value)
  } else {
    emits("change", formData.value)
  }
}
</script>
<script lang="ts">
export default {
  name: "mars-gui-item"
}
</script>

<style lang="less">
.mars-gui-form {
  .ant-form-item-control-input-content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .mars-gui-extra {
      display: block;
      font-family: var(--mars-font-family);
      font-size: 12px;
      font-weight: normal;
      color: var(--mars-extra-text-color);
    }

    .extra_follow_close {
      display: inline-block;
      font-family: var(--mars-font-family);
      font-size: 12px;
      font-weight: normal;
      color: var(--mars-extra-text-color);
      margin-left: 10px;
    }

    .ant-input-affix-wrapper {
      padding: 4px;

      .ant-input {
        text-align: center;
      }
    }
  }
}
</style>
