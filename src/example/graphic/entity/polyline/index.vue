<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state drawLabel1="绘制线" drawLabel2="绘制闭合线" />

    <div class="f-mb">
      <a-space>
        <mars-button @click="  mapWork.startDrawBrushLine">绘制自由曲线</mars-button>
      </a-space>
    </div>
  </mars-dialog>
  <location-to />
</template>

<script setup lang="ts">
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
import * as mapWork from "./map.js"

</script>
