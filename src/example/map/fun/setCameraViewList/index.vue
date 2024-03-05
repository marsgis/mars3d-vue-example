<template>
  <div class="map_btn">
    <mars-button danger v-show="isStart" @click="pauseCameraViewList">
      <mars-icon icon="pause-one" color="#f2f2f2" :size="16"></mars-icon>
      暂停</mars-button>
    <mars-button v-show="!isStart" @click="proceedCameraViewList">
      <mars-icon icon="play" color="#f2f2f2" :size="16"></mars-icon>
      继续</mars-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const isStart = ref<boolean>(true)

const pauseCameraViewList = () => {
  isStart.value = false
  mapWork.pauseCameraViewList()
}

const proceedCameraViewList = () => {
  isStart.value = true
  mapWork.proceedCameraViewList()
}
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
</style>
