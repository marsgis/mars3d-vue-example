<template>
  <mars-pannel :visible="true" right="10" top="10" width="300px">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">方向角</span>
        <mars-slider @change="headingChange" v-model:value="raderParsms.headingValue" :min="0" :max="360" :step="0.01" />
        <span class="mars-pannel-item-value">{{ raderParsms.headingValue }}</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">俯仰角</span>
        <mars-slider @change="pitchChange" v-model:value="raderParsms.pitchValue" :min="-180" :max="180" :step="0.01" />
        <span class="mars-pannel-item-value">{{ raderParsms.pitchValue }}</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">翻滚角(roll)</span>
        <mars-slider @change="rollChange" v-model:value="raderParsms.rollValue" :min="-180" :max="180" :step="0.01" />
        <span class="mars-pannel-item-value">{{ raderParsms.rollValue }}</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">内曲面半径</span>
        <mars-input-number
          @change="outerRadiusChange"
          v-model:value="raderParsms.outerRadius"
          :min="1"
          :max="999999999"
          :step="1"
        ></mars-input-number>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">外曲面半径</span>
        <mars-input-number
          @change="innerRadiusChange"
          v-model:value="raderParsms.innerRadius"
          :min="1"
          :max="999999999"
          :step="1"
        ></mars-input-number>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">左横截面角度</span>
        <mars-slider @change="startFovHChange" v-model:value="raderParsms.startFovH" :min="-180" :max="180" :step="0.01" />
        <span class="mars-pannel-item-value">{{ raderParsms.startFovH }}</span>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">右横截面角度</span>
        <mars-slider @change="endFovHChange" v-model:value="raderParsms.endFovH" :min="-180" :max="180" :step="0.01" />
        <span class="mars-pannel-item-value">{{ raderParsms.endFovH }}</span>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">垂直起始角度</span>
        <mars-slider @change="startFovVChange" v-model:value="raderParsms.startFovV" :min="0" :max="90" :step="0.01" />
        <span class="mars-pannel-item-value">{{ raderParsms.startFovV }}</span>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">垂直结束角度</span>
        <mars-slider @change="endFovVChange" v-model:value="raderParsms.endFovV" :min="0" :max="90" :step="0.01" />
        <span class="mars-pannel-item-value">{{ raderParsms.endFovV }}</span>
      </a-space>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import * as mapWork from "./map.js"

// 双曲面雷达参数
interface Rader {
  outerRadius: number // 外曲面半径
  innerRadius: number // 内曲面半径
  headingValue: number // 方向角
  pitchValue: number // 俯仰角
  rollValue: number // 翻滚角
  startFovH: number // 左横截面角度
  endFovH: number // 右横截面角度
  startFovV: number // 垂直起始角度
  endFovV: number // 垂直结束角度
}

const raderParsms = reactive<Rader>({
  outerRadius: 2000,
  innerRadius: 500,
  headingValue: 0,
  pitchValue: 0,
  rollValue: 0,
  startFovH: 180,
  endFovH: -180,
  startFovV: 0,
  endFovV: 90
})

mapWork.eventTarget.on("loadOk", () => {
  mapWork.getViewConfig(raderParsms)
})

const headingChange = () => {
  // 方向发生改变
  mapWork.headingChange(raderParsms.headingValue)
}

const pitchChange = () => {
  // 仰角发生改变
  mapWork.pitchChange(raderParsms.pitchValue)
}

// roll发生改变
const rollChange = () => {
  mapWork.rollChange(raderParsms.rollValue)
}

const outerRadiusChange = () => {
  mapWork.outerRadiusChange(raderParsms.outerRadius)
}

const innerRadiusChange = () => {
  mapWork.innerRadiusChange(raderParsms.innerRadius)
}

const startFovHChange = () => {
  mapWork.startFovHChange(raderParsms.startFovH)
}

const endFovHChange = () => {
  mapWork.endFovHChange(raderParsms.endFovH)
}

const startFovVChange = () => {
  mapWork.startFovVChange(raderParsms.startFovV)
}

const endFovVChange = () => {
  mapWork.endFovVChange(raderParsms.endFovV)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 110px;
}
.mars-pannel-item-label {
  width: 90px;
}

.mars-pannel-item-value {
  min-width: 50px;
}
</style>
