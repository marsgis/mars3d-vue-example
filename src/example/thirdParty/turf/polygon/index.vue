<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span>原始数据:</span>
        <mars-button @click="drawPolygon">绘制面</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>旋转角度:</span>
        <mars-input-number class="input-width" v-model:value="angleValue" />
        <mars-button @click="spinPolygons" >旋转面</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>平移距离:</span>
        <mars-input-number v-model:value="distanceValue" />
        <mars-button @click="translationPolygons" >平移面</mars-button>
      </a-space>
    </div>

    <div>
      <a-space>
        <span>缩放比例:</span>
        <mars-input-number v-model:value="scaleValue" :min="0" :max="10" />
        <mars-button @click="zoomPolygons" >缩放面</mars-button>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"

const angleValue = ref<number>(45) // 旋转的角度
const distanceValue = ref<number>(1) // 平移距离
const scaleValue = ref<number>(2) // 缩放比例

// 绘制面
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 旋转面
const spinPolygons = () => {
  mapWork.spinPolygons(angleValue.value)
}

// 平移面
const translationPolygons = () => {
  mapWork.translationPolygons(distanceValue.value)
}

// 缩放面
const zoomPolygons = () => {
  mapWork.zoomPolygons(scaleValue.value)
}
</script>
<style lang="less" scoped>
:deep(.ant-input-number-input) {
  width: 160px !important;
}
</style>
