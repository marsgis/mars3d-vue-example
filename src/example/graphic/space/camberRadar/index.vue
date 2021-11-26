<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">方向角</span>
          <a-slider @change="headingChange" v-model:value="headingValue" :min="0" :max="360" :step="0.01" />
          <span class="pannel-item-value">{{ headingValue }}</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">俯仰角</span>
          <a-slider @change="pitchChange" v-model:value="pitchValue" :min="-180" :max="180" :step="0.01" />
          <span class="pannel-item-value">{{ pitchValue }}</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">翻滚角(roll)</span>
          <a-slider @change="rollChange" v-model:value="rollValue" :min="-180" :max="180" :step="0.01" />
          <span class="pannel-item-value">{{ rollValue }}</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">内曲面半径</span>
          <mars-input-number @change="outerRadiusChange" v-model:value="outerRadius" :min="1" :max="999999999" :step="1"></mars-input-number>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">外曲面半径</span>
          <mars-input-number @change="innerRadiusChange" v-model:value="innerRadius" :min="1" :max="999999999" :step="1"></mars-input-number>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">左横截面角度</span>
          <a-slider @change="startFovHChange" v-model:value="startFovH" :min="-180" :max="180" :step="0.01" />
          <span class="pannel-item-value">{{ startFovH }}</span>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">右横截面角度</span>
          <a-slider @change="endFovHChange" v-model:value="endFovH" :min="-180" :max="180" :step="0.01" />
          <span class="pannel-item-value">{{ endFovH }}</span>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">垂直起始角度</span>
          <a-slider @change="startFovVChange" v-model:value="startFovV" :min="0" :max="90" :step="0.01" />
          <span class="pannel-item-value">{{ startFovV }}</span>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">垂直结束角度</span>
          <a-slider @change="endFovVChange" v-model:value="endFovV" :min="0" :max="90" :step="0.01" />
          <span class="pannel-item-value">{{ endFovV }}</span>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const outerRadius = ref<number>(2000) // 外

const innerRadius = ref<number>(500) // 内

const headingValue = ref<number>(0) // 方向

const pitchValue = ref<number>(0) // 仰角

const rollValue = ref<number>(0) // 左右

const startFovH = ref<number>(180) //

const endFovH = ref<number>(-180) //

const startFovV = ref<number>(0)

const endFovV = ref<number>(90)

mapWork.eventTarget.on("loadOk", () => {
  mapWork.getViewConfig(
    headingValue.value,
    pitchValue.value,
    rollValue.value,
    outerRadius.value,
    innerRadius.value,
    startFovH.value,
    endFovH.value,
    startFovV.value,
    endFovV.value
  )
})

const headingChange = () => {
  // 方向发生改变
  mapWork.headingChange(headingValue.value)
}
const pitchChange = () => {
  // 仰角发生改变
  mapWork.pitchChange(pitchValue.value)
}
// roll发生改变

const rollChange = () => {
  mapWork.rollChange(rollValue.value)
}
const outerRadiusChange = () => {
  mapWork.outerRadiusChange(outerRadius.value)
}
const innerRadiusChange = () => {
  mapWork.innerRadiusChange(innerRadius.value)
}
const startFovHChange = () => {
  mapWork.startFovHChange(startFovH.value)
}
const endFovHChange = () => {
  mapWork.endFovHChange(endFovH.value)
}
const startFovVChange = () => {
  mapWork.startFovVChange(startFovV.value)
}
const endFovVChange = () => {
  mapWork.endFovVChange(endFovV.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 110px;
}
.pannel-item-label {
  width: 90px;
}
.pannel-item-value {
  min-width: 50px;
}
</style>
