<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state drawLabel1="绘制矩形" drawLabel2="绘制立体矩形" />
    <div class="f-mb">
      <a-space>
        <mars-button @click="mapWork.startDrawPoint">绘制点计算矩形</mars-button>
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
