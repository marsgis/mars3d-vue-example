<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <span>建议：顺着道路方向选点，直线时多采集点</span>
    </div>

    <layer-state />

    <div class="f-mb f-pt">
      <a-space>
        <span class="mars-pannel-item-label">路宽度:</span>
        <mars-input-number @change="widthChange" v-model:value="widthValue" :min="0"></mars-input-number>
        <span>(米)</span>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">路高度:</span>
        <mars-input-number @change="heightChange" v-model:value="heightValue" :min="0"></mars-input-number>
        <span>(米)</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">透明度:</span>
        <mars-slider @change="alphaChange" v-model:value="alphaValue" :min="0" :max="1" :step="0.1" />当前值{{ alphaValue }}
      </a-space>
    </div>

    <div class="f-tac">
      <a-space>
        <mars-button @click="drawLine">绘制道路</mars-button>
        <mars-button @click="clear">清除</mars-button>
      </a-space>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

const widthValue = ref(20) // 宽度
const alphaValue = ref(1) // 透明度
const heightValue = ref(1) // 高度

const widthChange = () => {
  mapWork.widthChange(widthValue.value)
}

// 高度
const heightChange = () => {
  mapWork.heightChange(heightValue.value)
}

// 透明度
const alphaChange = () => {
  mapWork.alphaChange(alphaValue.value)
}

const drawLine = () => {
  mapWork.drawLine(widthValue.value, heightValue.value, alphaValue.value)
}

const clear = () => {
  mapWork.clearLayer()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 100px;
}
.mars-pannel-item-label {
  width: 60px;
}
</style>
