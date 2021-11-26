<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span>按钮:</span>
          <a-checkbox v-model:checked="formState.enabledPOI" @change="bindPOI">POI搜索</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledView" @change="bindView">视角复位</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledSceneModePicker" @change="bindSceneModePicker">二三维切换</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledBaseLayerPicker" @change="bindBaseLayerPicker">地图切换</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledFullScreen" @change="bindFullScreen">全屏切换</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledVR" @change="bindVR">VR模式</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledHelpButton" @change="bindHelpButton">帮助</a-checkbox>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span>面板:</span>
          <a-checkbox v-model:checked="formState.enabledLocation" @change="bindLocation">位置信息状态栏</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledClock" @change="bindClock">时钟面板（左下角）</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledTimeLine" @change="bindTimeLine">时间刻度线</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledNav" @change="bindNav">导航球</a-checkbox>
          <a-checkbox v-model:checked="formState.enabledLegend" @change="bindLegend">比例尺</a-checkbox>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledPOI: boolean
  enabledView: boolean
  enabledSceneModePicker: boolean
  enabledBaseLayerPicker: boolean
  enabledFullScreen: boolean
  enabledVR: boolean
  enabledHelpButton: boolean

  enabledLocation: boolean
  enabledClock: boolean
  enabledTimeLine: boolean
  enabledNav: boolean
  enabledLegend: boolean
}
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  enabledPOI: true,
  enabledView: true,
  enabledSceneModePicker: true,
  enabledBaseLayerPicker: true,
  enabledFullScreen: true,
  enabledVR: true,
  enabledHelpButton: true,

  enabledLocation: true,
  enabledClock: true,
  enabledTimeLine: true,
  enabledNav: true,
  enabledLegend: true
})

// 按钮
const bindPOI = () => {
  mapWork.bindPOI(formState.enabledPOI)
}
const bindView = () => {
  mapWork.bindView(formState.enabledView)
}
const bindSceneModePicker = () => {
  mapWork.bindSceneModePicker(formState.enabledSceneModePicker)
}
const bindBaseLayerPicker = () => {
  mapWork.bindBaseLayerPicker(formState.enabledBaseLayerPicker)
}
const bindFullScreen = () => {
  mapWork.bindFullScreen(formState.enabledFullScreen)
}
const bindVR = () => {
  mapWork.bindVR(formState.enabledVR)
}
const bindHelpButton = () => {
  mapWork.bindHelpButton(formState.enabledHelpButton)
}

// 面板
const bindLocation = () => {
  mapWork.bindLocation(formState.enabledLocation)
}
const bindClock = () => {
  mapWork.bindClock(formState.enabledClock)
}
const bindTimeLine = () => {
  mapWork.bindTimeLine(formState.enabledTimeLine)
}
const bindNav = () => {
  mapWork.bindNav(formState.enabledNav)
}
const bindLegend = () => {
  mapWork.bindLegend(formState.enabledLegend)
}
</script>
