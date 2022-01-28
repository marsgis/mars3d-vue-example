<template>
  <pannel class="infoView">
    <div class="f-mb">
      <span>建议：顺着水流方向选点，直线时多采集点</span>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">河宽度(米):</span>
        <mars-input-number @change="widthChange" v-model:value="widthValue"></mars-input-number>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">河高度(米):</span>
        <mars-input-number @change="heightChange" v-model:value="heightValue"></mars-input-number>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">水流速(米/秒):</span>
        <a-slider @change="speedChange" v-model:value="speedValue" :min="0" :max="50" />当前速度{{ speedValue }}米/秒
      </a-space>
    </div>

    <div>
      <a-space>
        <mars-button @click="drawLine">绘制河流</mars-button>
        <mars-button @click="addHeight">升高30米</mars-button>
        <mars-button @click="lowerHeight">降低30米</mars-button>
        <mars-button @click="clear">清除</mars-button>
      </a-space>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

// 宽度
const widthValue = ref<number>(280)
const widthChange = () => {
  mapWork.widthChange(widthValue.value)
}

// 高度
const heightValue = ref<number>(30)
const heightChange = () => {
  if (!heightValue.value) {
    heightValue.value = 30
  }
  mapWork.heightChange(heightValue.value)
}

// 流速
const speedValue = ref<number>(10)
const speedChange = () => {
  mapWork.speedChange(speedValue.value)
}

// 绘制河流
const drawLine = () => {
  mapWork.drawLine(widthValue.value, heightValue.value, speedValue.value)
}

// 升高
const addHeight = () => {
  mapWork.addHeight()
}

// 降低
const lowerHeight = () => {
  mapWork.lowerHeight()
}

const clear = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 100px;
}
.pannel-item-label {
  width: 75px;
}
</style>
