<template>
  <mars-dialog :visible="true" right="10" top="10" width="330" customClass="satelliteListDialog">
    <layer-state />
  </mars-dialog>
</template>

<script lang="ts" setup>
import LayerState from "@mars/components/mars-sample/layer-state.vue"
</script>
<style lang="less">
.satelliteListDialog {
  .mars-dialog__content  {
    padding: 13px 14px !important
  }
}
</style>
