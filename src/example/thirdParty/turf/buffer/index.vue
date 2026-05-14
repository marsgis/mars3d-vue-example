<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">缓冲半径:</span>
        <mars-input-number class="radius" @change="radiusChange" v-model:value="radiusVal" :min="1" :step="1" :max="999" addon-after="公里"></mars-input-number>
      </a-space>
    </div>

    <a-space>
      <span class="mars-pannel-item-label">绘制:</span>
      <mars-button class="draw_btn" @click="drawPoint">点</mars-button>
      <mars-button class="draw_btn" @click="drawPolyline">线</mars-button>
      <mars-button class="draw_btn" @click="drawPolygon">面</mars-button>
      <mars-button class="draw_btn" @click="clearAll">清除</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const radiusVal = ref<number>(1)

// 点
const drawPoint = () => {
  mapWork.drawPoint()
}
// 线
const drawPolyline = () => {
  mapWork.drawPolyline()
}

// 面
const drawPolygon = () => {
  mapWork.drawPolygon()
}

const radiusChange = () => {
  mapWork.radiusChange(radiusVal.value)
}

radiusChange()


// 清除
const clearAll = () => {
  mapWork.deleteAll()
}

</script>
<style scoped lang="less">
.mars-pannel-item-label {
  width: 55px;
}
.ant-input-number {
  width: 60px !important;
}

.draw_btn {
  width: 52px;
}
</style>
