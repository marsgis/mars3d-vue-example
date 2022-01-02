<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span>按钮:</span>
        <a-checkbox v-model:checked="formState.enabledPOI" @change="onBindPOI">POI搜索</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledView" @change="onBindView">视角复位</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledSceneModePicker" @change="onBindSceneModePicker">二三维切换</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledBaseLayerPicker" @change="onBindBaseLayerPicker">地图切换</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledFullScreen" @change="onBindFullScreen">全屏切换</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledVR" @change="onBindVR">VR模式</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledHelpButton" @change="onBindHelpButton">帮助</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledZoom" @change="onBindZoom">地图缩放</a-checkbox>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span>面板:</span>
        <a-checkbox v-model:checked="formState.enabledLocation" @change="onBindLocation">位置信息状态栏</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledClock" @change="onBindClock">时钟面板（左下角）</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledTimeLine" @change="onBindTimeLine">时间刻度线</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledNav" @change="onBindNav">导航球</a-checkbox>
        <a-checkbox v-model:checked="formState.enabledLegend" @change="onBindLegend">比例尺</a-checkbox>
      </a-space>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

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

const formState: UnwrapRef<FormState> = reactive({
  enabledPOI: true,
  enabledView: true,
  enabledSceneModePicker: true,
  enabledBaseLayerPicker: true,
  enabledFullScreen: true,
  enabledVR: true,
  enabledHelpButton: true,
  enabledZoom: true,

  enabledLocation: true,
  enabledClock: true,
  enabledTimeLine: true,
  enabledNav: true,
  enabledLegend: true
})

// 按钮
const onBindPOI = () => {
  mapWork.bindPOI(formState.enabledPOI)
}
const onBindView = () => {
  mapWork.bindView(formState.enabledView)
}
const onBindSceneModePicker = () => {
  mapWork.bindSceneModePicker(formState.enabledSceneModePicker)
}
const onBindBaseLayerPicker = () => {
  mapWork.bindBaseLayerPicker(formState.enabledBaseLayerPicker)
}
const onBindFullScreen = () => {
  mapWork.bindFullScreen(formState.enabledFullScreen)
}
const onBindVR = () => {
  mapWork.bindVR(formState.enabledVR)
}
const onBindHelpButton = () => {
  mapWork.bindHelpButton(formState.enabledHelpButton)
}
const onBindZoom = () => {
  mapWork.bindZoom(formState.enabledZoom)
}


// 面板
const onBindLocation = () => {
  mapWork.bindLocation(formState.enabledLocation)
}
const onBindClock = () => {
  mapWork.bindClock(formState.enabledClock)
}
const onBindTimeLine = () => {
  mapWork.bindTimeLine(formState.enabledTimeLine)
}
const onBindNav = () => {
  mapWork.bindNav(formState.enabledNav)
}
const onBindLegend = () => {
  mapWork.bindLegend(formState.enabledLegend)
}
</script>
