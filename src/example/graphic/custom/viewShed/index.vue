<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label"></span>
        <mars-button @click="addViewShed">添加可视域</mars-button>
        <mars-button @click="clear">清除</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">相机位置:</span>
        <mars-button @click="selCamera">鼠标图上点选(相机位置)</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">水平张角:</span>
        <mars-slider @change="onChangeAngle" v-model:value="video.cameraAngle" :min="1" :max="60" :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">垂直张角:</span>
        <mars-slider @change="onChangeAngle2" v-model:value="video.cameraAngle2" :min="10" :max="30" :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">投射距离:</span>
        <mars-slider @change="onChangeDistance" v-model:value="video.distanceValue" :min="1" :max="1000" :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">四周方向:</span>
        <mars-slider @change="onChangeHeading" v-model:value="video.heading" :min="0" :max="360" :step="0.1" />
        <mars-button @click="onClickSelView">图上选点</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">俯仰角度:</span>
        <mars-slider @change="onChangePitch" v-model:value="video.pitchValue" :min="-180" :max="180" :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">视椎框线:</span>
        <a-checkbox @change="showFrustum" v-model:checked="video.showFrustum">是否显示</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">视频透明度:</span>
        <mars-slider @change="onChangeOpacity" v-model:value="video.opcity" :min="0" :max="1" :step="0.1" />
      </a-space>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import * as mapWork from "./map.js"

interface Video {
  showFrustum: boolean // 是否显示视椎线
  cameraAngle: number // 水平角度
  cameraAngle2: number // 垂直角度
  distanceValue: number // 投射距离
  heading: number // 四周距离
  pitchValue: number // 俯仰角度
  opcity: number // 透明度
  videoRotate: number // 视角角度
}

const video = reactive<Video>({
  showFrustum: false,
  cameraAngle: 0,
  cameraAngle2: 0,
  distanceValue: 0,
  heading: 0,
  pitchValue: 0,
  opcity: 1,
  videoRotate: 0
})

mapWork.eventTarget.on("addViewShedValue", (e) => {
  const data = e.value
  // video.showFrustum = data.showFrustum
  video.cameraAngle = data.cameraAngle
  video.cameraAngle2 = data.cameraAngle2
  video.distanceValue = data.distanceValue
  video.pitchValue = data.pitchValue
  video.opcity = data.opcity
  video.heading = data.heading
})

// 添加可视域
const addViewShed = () => {
  mapWork.addViewShed(video)
}
// 清除
const clear = () => {
  mapWork.clear()
}

// 视频位置
const selCamera = () => {
  mapWork.selCamera()
}

const onChangeAngle = () => {
  mapWork.onChangeAngle(video.cameraAngle)
}
const onChangeAngle2 = () => {
  mapWork.onChangeAngle2(video.cameraAngle2)
}
const onChangeDistance = () => {
  mapWork.onChangeDistance(video.distanceValue)
}

const onChangeHeading = () => {
  mapWork.onChangeHeading(video.heading)
}

const onClickSelView = () => {
  mapWork.onClickSelView()
}

const onChangePitch = () => {
  mapWork.onChangePitch(video.pitchValue)
}

// 线框是否显示
const showFrustum = () => {
  mapWork.showFrustum(video.showFrustum)
}

// 修改视频透明度
const onChangeOpacity = () => {
  mapWork.onChangeOpacity(video.opcity)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
.mars-pannel-item-label {
  display: block;
  text-align: right;
  width: 64px;
}
</style>
