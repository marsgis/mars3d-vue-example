<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state :defaultCount="5" :interaction="false" />
  </mars-dialog>
</template>

<script lang="ts" setup>
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
import * as mapWork from "./map.js"
</script>
<style scoped lang="less"></style>
