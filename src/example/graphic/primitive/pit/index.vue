<template>
  <pannel class="infoView">
    <div class="f-mb">
      <layer-state />
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">井深度:</span>
        <mars-input-number v-model:value="num" @change="onHeightChange" :min="-500" :max="999" step="1"></mars-input-number>米
        <a-checkbox v-model:checked="chkTestTerrain" @change="onDepthTestChange">深度监测</a-checkbox>
      </a-space>
    </div>
    <div>
      <a-space>
        <span class="pannel-item-label">绘制:</span>
        <mars-button @click="drawExtent">绘制矩形</mars-button>
        <mars-button @click="drawPolygon">绘制多边形</mars-button>
        <mars-button @click="clearLayer">清除</mars-button>
      </a-space>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import LayerState from "@comp/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

const chkTestTerrain = ref<boolean>(false)
// 深度监测
const onDepthTestChange = () => {
  mapWork.onDepthTestChange(chkTestTerrain.value)
}

const num = ref<number>(30)
// 绘制矩形
const drawExtent = () => {
  mapWork.drawExtent(num.value)
}
// 绘制多边形
const drawPolygon = () => {
  mapWork.drawPolygon(num.value)
}
const onHeightChange = () => {
  mapWork.onHeightChange(num.value)
}

// 清除
const clearLayer = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-input-number {
  width: 88px;
}
</style>
