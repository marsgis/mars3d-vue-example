<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state  drawLabel1="绘制时序点" drawLabel2="绘制漫游路线"  />
  </mars-dialog>
</template>

<script setup lang="ts">
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
</script>
