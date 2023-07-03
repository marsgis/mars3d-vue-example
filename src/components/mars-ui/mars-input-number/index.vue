<template>
  <a-input-number class="mars-input-number" v-bind="copyAttrs">
    <template v-for="(comp, name) in slots" :key="name" v-slot:[name]>
      <component :is="comp" />
    </template>
  </a-input-number>
</template>
<script lang="ts">
import { useAttrs, useSlots, defineComponent, toRaw } from "vue"
import _ from "lodash"
export default defineComponent({
  name: "mars-input-number",
  inheritAttrs: false,
  setup() {
    const attrs = useAttrs()
    const slots = useSlots()
    const copyAttrs = _.cloneDeep(toRaw(attrs))

    // style.js中如果有配置toFixed
    if (attrs.tofixed) {
      copyAttrs.value = (attrs.value as number).toFixed(attrs.tofixed as number)
    }
    return {
      slots,
      copyAttrs
    }
  }
})
</script>
<style lang="less" scoped>
.mars-input-number {
  color: var(--mars-text-color);
  background-color: transparent !important;
  border-color: var(--mars-base-border-color);
  width: 100%;
  * {
    color: var(--mars-text-color);
  }
}
:deep(.ant-input-number-handler-wrap) {
  background: none;
  .anticon {
    color: var(--mars-text-color);
  }
}
</style>
