<template>
  <div class="map_btn">
    <mars-button danger v-show="isStart && !showReplay" @click="pauseCameraViewList">
      <mars-icon icon="pause-one" color="#f2f2f2" :size="16"></mars-icon>
      暂停</mars-button>
    <mars-button v-show="!isStart && !showReplay" @click="proceedCameraViewList">
      <mars-icon icon="play" color="#f2f2f2" :size="16"></mars-icon>
      继续</mars-button>
    <mars-button  v-show="showReplay" @click="playCameraViewList" class="play-camera-view">
      <mars-icon icon="play" color="#f2f2f2" :size="16"></mars-icon>
      播放</mars-button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"

const isStart = ref<boolean>(true)
const showReplay = ref<boolean>(false)

const pauseCameraViewList = () => {
  isStart.value = false
  mapWork.pauseCameraViewList()
}

const proceedCameraViewList = () => {
  isStart.value = true
  mapWork.proceedCameraViewList()
}
const playCameraViewList = () => {
  showReplay.value = false
  mapWork.playCameraViewList()
}

onMounted(() => {
  mapWork.map.on("complateCameraView", function (event) {
    showReplay.value = true
  })
})


</script>
<style lang="less" scoped>
.map_btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;

  .mars-button {
    width: 302px;
    height: 46px;
  }
}

.play-camera-view {
  background-color: #2CC719;
}
</style>
