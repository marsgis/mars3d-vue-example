<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state drawLabel1="椎形" drawLabel2="圆形" :defaultCount="10" :interaction="false" />
  </mars-dialog>
</template>

<script lang="ts" setup>
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
</script>
<style scoped lang="less"></style>
