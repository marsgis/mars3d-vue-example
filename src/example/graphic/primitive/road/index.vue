<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <span>建议：顺着道路方向选点，直线时多采集点</span>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">路宽度(米):</span>
        <mars-input-number @change="widthChange" v-model:value="widthValue"></mars-input-number>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">路高度(米):</span>
        <mars-input-number @change="heightChange" v-model:value="heightValue"></mars-input-number>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">透明度:</span>
        <a-slider @change="alphaChange" v-model:value="alphaValue" :min="0" :max="1" step="0.1" />当前值{{ alphaValue }}
      </a-space>
    </div>

    <div>
      <a-space>
        <mars-button @click="drawLine">绘制道路</mars-button>
        <mars-button @click="clear">清除</mars-button>
      </a-space>
    </div>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

// 宽度
const widthValue = ref<number>(280)
const widthChange = () => {
  mapWork.widthChange(widthValue.value)
}

// 高度
const heightValue = ref<number>(30)
const heightChange = () => {
  mapWork.heightChange(heightValue.value)
}

// 透明度
const alphaValue = ref<number>(1)
const alphaChange = () => {
  mapWork.alphaChange(alphaValue.value)
}

const drawLine = () => {
  mapWork.drawLine(widthValue.value, heightValue.value, alphaValue.value)
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
  width: 60px;
}
</style>
