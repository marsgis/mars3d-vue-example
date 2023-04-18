<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button v-show="!formState.isStart" @click="startPlay">开始</mars-button>
      <mars-button v-show="formState.isStart && !formState.isPause" @click="pausePlay">暂停</mars-button>
      <mars-button v-show="formState.isStart && formState.isPause" @click="proceedPlay">继续</mars-button>
      <mars-button v-show="formState.isStart" @click="stopPlay">停止</mars-button>
    </a-space>
  </mars-dialog>
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
