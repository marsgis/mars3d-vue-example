<template>
  <div class="play-control">
    <mars-button class="start-btn" v-show="!formState.isStart" @click="btnStart">
      <mars-icon icon="play" color="#f2f2f2" :size="16"></mars-icon>
      开始
    </mars-button>
    <mars-button class="pause-btn" v-show="formState.isStart && !formState.isPause" @click="btnPause">
      <mars-icon icon="pause-one" color="#f2f2f2" :size="16"></mars-icon>
      暂停</mars-button>
    <mars-button class="proceed-btn" v-show="formState.isStart && formState.isPause" @click="btnProceed">
      <mars-icon icon="go-on" color="#f2f2f2" :size="16"></mars-icon>

      继续</mars-button>
    <mars-button class="stop-btn" v-show="formState.isStart" @click="btnStop">
      <mars-icon icon="power" color="#f2f2f2" :size="16" />
      停止</mars-button>
  </div>

  <fixedRoute-info top="70" />
</template>

<script setup lang="ts">
import fixedRouteInfo from "@mars/components/mars-sample/fixedRoute-info.vue"
import { reactive, ref } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  isStart: boolean
  isPause: boolean
}

const formState = reactive<FormState>({
  isStart: false,
  isPause: false
})

mapWork.eventTarget.on("endRoam", () => {
  udpateState()
})

// 按钮事件
const btnStart = () => {
  mapWork.fixedRoute.start() // 启动漫游
  udpateState()
}

const btnPause = () => {
  mapWork.fixedRoute.pause()
  udpateState()
}

const btnProceed = () => {
  mapWork.fixedRoute.proceed()
  udpateState()
}

const btnStop = () => {
  mapWork.fixedRoute.stop()
  udpateState()
}

function udpateState() {
  setTimeout(() => {
    formState.isStart = mapWork.fixedRoute.isStart
    formState.isPause = mapWork.fixedRoute.isPause
  }, 100)
}
</script>

<style lang="less" scoped>
.play-control {
  position: absolute;
  top: 10px;
  right: 10px;

  .start-btn {
    width: 330px;
    height: 46px;
  }

  .pause-btn,
  .proceed-btn,
  .stop-btn {
    width: 160px;
    height: 46px;
  }

  .proceed-btn,
  .stop-btn {
    margin-left: 10px;

  }

}
</style>
