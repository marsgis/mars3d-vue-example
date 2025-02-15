<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state drawLabel1="绘制轨迹"/>
    <div class="f-mb">
      <a-space>
        <mars-button @click="mapWork.startAll">开始</mars-button>
        <mars-button @click="mapWork.stopAll">停止</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
import * as mapWork from "./map.js"
</script>
