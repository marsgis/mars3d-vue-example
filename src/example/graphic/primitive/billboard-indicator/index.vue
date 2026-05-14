<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state  :defaultCount="5000" />
  </mars-dialog>
  <location-to />
</template>

<script setup lang="ts">
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
</script>
<style></style>
