<template>
  <mars-dialog :visible="true"  right="10" top="10" width="330">
    <graphic-layer-state :defaultCount="100" drawLabel1="绘制"  drawLabel2="绘制朝地面" />
  </mars-dialog>
  <location-to />
</template>

<script lang="ts" setup>
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
</script>
