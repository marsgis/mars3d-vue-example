<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state ref="graphicLayerStateRef" />
  </mars-dialog>
</template>

<script setup lang="ts">
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
import * as mapWork from "./map.js"
import { ref } from "vue"

const graphicLayerStateRef = ref()

mapWork.eventTarget.on("addTableData", function (event: any) {
  graphicLayerStateRef.value.addTableData()
})
</script>
