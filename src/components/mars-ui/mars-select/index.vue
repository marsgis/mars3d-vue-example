<template>
  <a-select class="mars-select" popupClassName="mars-select-dropdown" v-bind="attrs">
    <template v-for="(comp, name) in slots" :key="name" v-slot:[name]>
      <component :is="comp" />
    </template>
  </a-select>
</template>
<script lang="ts">
import { useAttrs, useSlots, defineComponent } from "vue"
export default defineComponent({
  name: "mars-select",
  inheritAttrs: false,
  setup() {
    const attrs = useAttrs()
    const slots = useSlots()
    return {
      attrs,
      slots
    }
  }
})
</script>
<style lang="less" scoped>
.mars-select {
  width: 100%;
  height: 32px;
  background-color: var(--mars-control-bg);
  border-radius: 2px;
  box-shadow: none;
  :deep(.ant-select-selector) {
    border-radius: 0;
    border-color: var(--mars-control-border);
    border-radius: 2px;
    background: none;
    color: var(--mars-text-color);
    &:hover,
    &:focus {
      border-color: var(--mars-hover-color);
    }
    .ant-select-selection-item {
      color: var(--mars-control-text) !important;
    }
  }

  :deep(.ant-select-arrow) {
    color: var(--mars-control-icon);
  }
}
</style>
<style lang="less"></style>
