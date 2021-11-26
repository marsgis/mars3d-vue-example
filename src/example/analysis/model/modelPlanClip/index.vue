<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">按坐标绘制:</span>
          <mars-button @click="drawLine">绘制线</mars-button>
          <mars-button @click="drawExtent">绘制矩形</mars-button>
          <mars-button @click="drawPoly">绘制面</mars-button>
          <mars-button @click="drawPoly2">绘制面(外切）</mars-button>
          <mars-button @click="clear">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">按正方向:</span>
          <mars-button @click="clipping1">切顶部</mars-button>
          <mars-button @click="clipping2">切底部</mars-button>
          <mars-button @click="clipping3">切东向</mars-button>
          <mars-button @click="clipping4">切西向</mars-button>
          <mars-button @click="clipping5">切南向</mars-button>
          <mars-button @click="clipping6">切北向</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">裁剪距离:</span>
          <a-slider @change="distance" v-model:value="distanceValue" :min="-100" :max="100" />
          <mars-input-number @change="txtDistance" v-model:value="distanceValue" :min="-100" :max="100" />米
        </a-space>
      </a-form-item>

      <a-space-item>
        <a-space>
          <span class="pannel-item-label">裁剪偏移量:</span>
          <a-slider @change="deviation" v-model:value="deviationValue" :min="-10" :max="10" />
        </a-space>
      </a-space-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const distanceValue = ref<number>(0)
const deviationValue = ref<number>(0)

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}
// 绘制矩形
const drawExtent = () => {
  mapWork.drawExtent()
}
// 绘制面
const drawPoly = () => {
  mapWork.drawPoly()
}
// 绘制面(外切)
const drawPoly2 = () => {
  mapWork.drawPoly2()
}
// 切顶部
const clipping1 = () => {
  mapWork.clipping1()
}
const clipping2 = () => {
  mapWork.clipping2()
}
const clipping3 = () => {
  mapWork.clipping3()
}
const clipping4 = () => {
  mapWork.clipping4()
}
const clipping5 = () => {
  mapWork.clipping5()
}
const clipping6 = () => {
  mapWork.clipping6()
}
const distance = () => {
  mapWork.rangeDistance(distanceValue.value)
}

const deviation = () => {
  mapWork.rangeNormalZ(deviationValue.value)
}
const txtDistance = () => {
  mapWork.rangeDistance(distanceValue.value)
}
const clear = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
</style>
