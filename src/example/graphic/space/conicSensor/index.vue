<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">圆锥体:</span>
        <a-checkbox v-model:checked="formState.enabledShowHide" @change="sensorShowHide">显示/隐藏</a-checkbox>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">长度:</span>
        <mars-input-number @change="sensorLength" v-model:value="lengthValue" :min="1" :max="999999999" :step="1.0"></mars-input-number>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">方向角:</span>
        <a-slider @change="headingChange" v-model:value="headingValue" :min="0" :max="360" :step="0.01" />
        <span class="pannel-item-value">值{{ headingValue }}</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">俯仰角:</span>
        <a-slider @change="pitchChange" v-model:value="pitchValue" :min="-180" :max="180" :step="0.01" />
        <span class="pannel-item-value">值{{ pitchValue }}</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">左右角:</span>
        <a-slider @change="rollChange" v-model:value="rollValue" :min="-180" :max="180" :step="0.01" />
        <span class="pannel-item-value">值{{ rollValue }}</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">夹角:</span>
        <a-slider @change="angle" v-model:value="angleValue" :min="0" :max="89" :step="0.01" />
        <span class="pannel-item-value">值{{ angleValue }}</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">顶盖:</span>
        <a-checkbox @change="sensorTop" v-model:checked="formState.enabledShowModelTop">是否显示</a-checkbox>
      </a-space>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  enabledShowHide: boolean
  enabledShowModelTop: boolean
}

// 角度
const angleValue = ref<number>(5)

// 长度（米）
const lengthValue = ref<number>(700000)

const headingValue = ref<number>(0) // 方向

const pitchValue = ref<number>(40) // 仰角

const rollValue = ref<number>(0) // 左右

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledShowModelTop: true
})

mapWork.eventTarget.on("loadOk", () => {
  mapWork.addConicSensor(headingValue.value, pitchValue.value, rollValue.value, angleValue.value, lengthValue.value)
})

// 显示/隐藏
const sensorShowHide = () => {
  mapWork.sensorShowHide(formState.enabledShowHide)
}

// 半径
const sensorLength = () => {
  mapWork.sensorLength(lengthValue.value)
}

// 方向角
const headingChange = () => {
  mapWork.headingChange(headingValue.value)
}

// 俯仰角
const pitchChange = () => {
  mapWork.pitchChange(pitchValue.value)
}

// 左右角
const rollChange = () => {
  mapWork.rollChange(rollValue.value)
}

// 夹角
const angle = () => {
  mapWork.angle(angleValue.value)
}

// 顶部显示隐藏
const sensorTop = () => {
  mapWork.sensorTop(formState.enabledShowModelTop)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 60px;
}
.ant-slider {
  width: 110px;
}
.infoView {
  width: 274px;
}
</style>
