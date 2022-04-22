<template>
  <mars-pannel :visible="true" right="10" top="10" width="260">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">圆锥体:</span>
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
        <mars-slider @change="headingChange" v-model:value="sensorParams.headingValue" :min="0" :max="360" :step="0.01" />
        <span class="mars-pannel-item-value">值{{ sensorParams.headingValue }}°</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">俯仰角:</span>
        <mars-slider @change="pitchChange" v-model:value="sensorParams.pitchValue" :min="-180" :max="180" :step="0.01" />
        <span class="mars-pannel-item-value">值{{ sensorParams.pitchValue }}°</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">左右角:</span>
        <mars-slider @change="rollChange" v-model:value="sensorParams.rollValue" :min="-180" :max="180" :step="0.01" />
        <span class="mars-pannel-item-value">值{{ sensorParams.rollValue }}°</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">夹角:</span>
        <mars-slider @change="angle" v-model:value="sensorParams.angleValue" :min="0.01" :max="89" :step="0.01" />
        <span class="mars-pannel-item-value">值{{ sensorParams.angleValue }}°</span>
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
import { reactive, toRaw } from "vue"
import * as mapWork from "./map.js"

// 圆柱体参数
interface Sensor {
  enabledShowHide: boolean
  enabledShowModelTop: boolean

  angleValue: number
  lengthValue: number
  headingValue: number
  pitchValue: number
  rollValue: number
}

const sensorParams = reactive<Sensor>({
  enabledShowHide: true,
  enabledShowModelTop: true,

  angleValue: 5,
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
const angle = () => {
  mapWork.angle(sensorParams.angleValue)
}

// 顶部显示隐藏
const sensorTop = () => {
  mapWork.sensorTop(sensorParams.enabledShowModelTop)
}
</script>
<style scoped lang="less">
.mars-pannel-item-label {
  width: 40px;
}
.ant-slider {
  width: 110px;
}
</style>
