<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <simple-tile-layer-state />
  </mars-dialog>
</template>

<script setup lang="ts">
// 逻辑和/mars-sample/tile-layer-state.vue文件的逻辑相同，只是样式不同
import SimpleTileLayerState from "./simpleTileLayerState.vue"
</script>
