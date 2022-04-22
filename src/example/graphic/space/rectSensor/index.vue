<template>
  <mars-pannel :visible="true" right="10" top="10" width="280">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">四棱锥体:</span>
        <a-checkbox v-model:checked="sensorParams.enabledShowHide" @change="sensorShowHide">显示/隐藏</a-checkbox>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">长度:</span>
        <mars-input-number @change="sensorLength" v-model:value="sensorParams.lengthValue" :min="1" :max="999999999" :step="1.0"></mars-input-number>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">方向角:</span>
        <mars-slider @change="headingChange" v-model:value="sensorParams.headingValue" :min="0" :max="360" :step="0.01" />值{{
          sensorParams.headingValue
        }}°
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">俯仰角:</span>
        <mars-slider @change="pitchChange" v-model:value="sensorParams.pitchValue" :min="-180" :max="180" :step="0.01" />值{{
          sensorParams.pitchValue
        }}°
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">左右角:</span>
        <mars-slider @change="rollChange" v-model:value="sensorParams.rollValue" :min="-180" :max="180" :step="0.01" />值{{ sensorParams.rollValue }}°
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">夹角1:</span>
        <mars-slider @change="angle1" v-model:value="sensorParams.angleValue1" :min="0.1" :max="89" :step="0.01" />值{{ sensorParams.angleValue1 }}°
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">夹角2:</span>
        <mars-slider @change="angle2" v-model:value="sensorParams.angleValue2" :min="0.1" :max="89" :step="0.01" />值{{ sensorParams.angleValue2 }}°
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">顶盖:</span>
        <a-checkbox @change="sensorTop" v-model:checked="sensorParams.enabledShowModelTop">是否显示</a-checkbox>
      </a-space>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import * as mapWork from "./map.js"

// 四棱锥体参数
interface RectSensor {
  enabledShowHide: boolean
  enabledShowModelTop: boolean

  angleValue1: number
  angleValue2: number
  lengthValue: number
  headingValue: number
  pitchValue: number
  rollValue: number
}

const sensorParams = reactive<RectSensor>({
  enabledShowHide: true,
  enabledShowModelTop: true,

  angleValue1: 30,
  angleValue2: 30,
  lengthValue: 700000,
  headingValue: 0,
  pitchValue: 40,
  rollValue: 0
})

// 显示/隐藏
const sensorShowHide = () => {
  mapWork.sensorShowHide(sensorParams.enabledShowHide)
}
// 半径
const sensorLength = () => {
  mapWork.sensorLength(sensorParams.lengthValue)
}

// 方向角
const headingChange = () => {
  mapWork.headingChange(sensorParams.headingValue)
}

// 俯仰角
const pitchChange = () => {
  mapWork.pitchChange(sensorParams.pitchValue)
}

// 左右角
const rollChange = () => {
  mapWork.rollChange(sensorParams.rollValue)
}

// 夹角
const angle1 = () => {
  mapWork.angle1(sensorParams.angleValue1)
}
const angle2 = () => {
  mapWork.angle2(sensorParams.angleValue2)
}

// 顶部显示隐藏
const sensorTop = () => {
  mapWork.sensorTop(sensorParams.enabledShowModelTop)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 110px;
}
</style>
