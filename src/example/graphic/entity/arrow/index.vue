<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state drawLabel1="绘制直箭头" drawLabel2="绘制攻击箭头" />
  </mars-dialog>
</template>

<script setup lang="ts">
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
</script>
