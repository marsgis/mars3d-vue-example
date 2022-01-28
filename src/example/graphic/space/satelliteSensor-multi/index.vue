<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">视椎体状态:</span>
        <a-checkbox v-model:checked="formState.enabledShowHide" @change="sensorShowHide">显示/隐藏</a-checkbox>
        <mars-button @click="locate">定位至卫星</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">位置:</span>
        经度 <mars-input-number @change="xChange" v-model:value="model_x" class="inputNum"></mars-input-number> 纬度<mars-input-number
          @change="yChange"
          v-model:value="model_y"
          class="inputNum"
        ></mars-input-number>
        高度<mars-input-number @change="zChange" v-model:value="model_z" class="inputNum"></mars-input-number>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">轨迹方向:</span>
        <a-slider @change="headingChange" v-model:value="headingValue" :min="0" :max="360" :step="1" />当前值{{ headingValue }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">前后侧摆:</span>
        <a-slider @change="pitchChange" v-model:value="pitchValue" :min="-180" :max="180" :step="1" />当前值{{ pitchValue }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">左右侧摆:</span>
        <a-slider @change="rollChange" v-model:value="rollValue" :min="-180" :max="180" :step="1" />当前值{{ rollValue }}
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">参考系轴:</span>
        <a-checkbox v-model:checked="formState.enabledShowMatrix" @change="chkShowModelMatrix">显示/隐藏</a-checkbox>
        <a-checkbox v-show="formState.enabledShowHide" v-model:checked="formState.enabledIntersect" @change="chkUnderground">求交地球</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">轴长度:</span>
        <a-slider @change="lengthChange" v-model:value="matrixLength" :min="1" :max="10000" :step="1" />当前值{{ matrixLength }}
      </a-space>
    </div>

    <div class="showHide" v-show="formState.enabledShowHide">
      <div class="f-mb">
        <a-space>
          <span class="pannel-item-label">类型:</span>
          <a-radio-group v-model:value="value" name="radioGroup" @change="chkSensorType">
            <a-radio value="1">圆锥体</a-radio>
            <a-radio value="2">四棱锥体</a-radio>
          </a-radio-group>
        </a-space>
      </div>

      <div class="f-mb">
        <a-space>
          <span class="pannel-item-label">夹角1:</span>
          <a-slider @change="angle1" v-model:value="angleValue1" :min="0" :max="89" :step="0.001" />当前值{{ angleValue1 }}
        </a-space>
      </div>

      <div v-if="value === '2'">
        <a-space>
          <span class="pannel-item-label">夹角2:</span>
          <a-slider @change="angle2" v-model:value="angleValue2" :min="0" :max="89" :step="0.001" />当前值{{ angleValue2 }}
        </a-space>
      </div>
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
  enabledIntersect: boolean
  enabledShowMatrix: boolean // 参考轴系
}

const value = ref<string>("2")
const model_x = ref<number>(117.169969)
const model_y = ref<number>(31.840886)
const model_z = ref<number>(9980000)
const matrixLength = ref<number>(30)
// 角度
const angleValue1 = ref<number>(5)
const angleValue2 = ref<number>(10)
const headingValue = ref<number>(0) // 方向
const pitchValue = ref<number>(9) // 仰角
const rollValue = ref<number>(0) // 左右

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledIntersect: false,
  enabledShowMatrix: true
})

mapWork.eventTarget.on("loadOk", () => {
  mapWork.addModelGraphic(
    model_x.value,
    model_y.value,
    model_z.value,
    headingValue.value,
    pitchValue.value,
    rollValue.value,
    angleValue1.value,
    angleValue2.value
  )
})

// 显示/隐藏
const sensorShowHide = () => {
  mapWork.sensorShowHide(formState.enabledShowHide)
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
const lengthChange = () => {
  mapWork.lengthChange(matrixLength.value)
}

// 夹角
const angle1 = () => {
  mapWork.angle1(angleValue1.value)
}
const angle2 = () => {
  mapWork.angle2(angleValue2.value)
}
// 定位至模型
const locate = () => {
  mapWork.locate()
}

const xChange = () => {
  mapWork.updatePosition(model_x.value, model_y.value, model_z.value)
}
const yChange = () => {
  mapWork.updatePosition(model_x.value, model_y.value, model_z.value)
}
const zChange = () => {
  mapWork.updatePosition(model_x.value, model_y.value, model_z.value)
}

// 参考轴系显示与隐藏
const chkShowModelMatrix = () => {
  mapWork.chkShowModelMatrix(formState.enabledShowMatrix)
}

// 是否与地球相交
const chkUnderground = () => {
  mapWork.chkUnderground(formState.enabledIntersect)
}

// 类型选择
const chkSensorType = () => {
  mapWork.chkSensorType(value.value)
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}

.ant-slider {
  width: 110px;
}
</style>
