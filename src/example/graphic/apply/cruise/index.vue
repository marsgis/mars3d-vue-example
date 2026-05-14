<template>
  <div class="play-tools">
    <mars-button class="start-btn" v-show="!formState.isStart" @click="startPlay">
      <mars-icon icon="play" color="#f2f2f2" :size="16"></mars-icon>
      开始</mars-button>
    <mars-button v-show="formState.isStart && !formState.isPause" @click="pausePlay">
      <mars-icon icon="pause-one" color="#f2f2f2" :size="16"></mars-icon>
      暂停</mars-button>
    <mars-button v-show="formState.isStart && formState.isPause" @click="proceedPlay">
      <mars-icon icon="go-on" color="#f2f2f2" :size="16"></mars-icon>
      继续</mars-button>
    <mars-button v-show="formState.isStart" @click="stopPlay">
      <mars-icon icon="power" color="#f2f2f2" :size="16" />
      停止</mars-button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  isStart: boolean
  isPause: boolean
}
const formState = reactive<FormState>({
  isStart: false,
  isPause: false
})

const startPlay = () => {
  mapWork.circleFixedRoute.start() // 启动漫游
  mapWork.attackFixedRoute.start() // 启动漫游
  udpateState()
}

const pausePlay = () => {
  mapWork.circleFixedRoute.pause()
  mapWork.attackFixedRoute.pause()
  udpateState()
}

const proceedPlay = () => {
  mapWork.circleFixedRoute.proceed()
  mapWork.attackFixedRoute.proceed()
  udpateState()
}

const stopPlay = () => {
  mapWork.stopPlay(true)
}

mapWork.eventTarget.on("changeFixedRoute", udpateState)
function udpateState() {
  setTimeout(() => {
    formState.isStart = mapWork.circleFixedRoute.isStart
    formState.isPause = mapWork.circleFixedRoute.isPause
  }, 100)
}
</script>

<style lang="less" scoped>
.play-tools {
  display: flex;
  position: absolute;
  width: 330px;
  top: 10px;
  right: 10px;
  justify-content: space-around;

  .start-btn {
    width: 300px !important;
  }

  .mars-button {
    width: 146px;
  }
}
</style>
