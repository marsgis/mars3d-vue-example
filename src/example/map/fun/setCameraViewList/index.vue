<template>
  <mars-dialog :visible="true" right="10" top="10">
    <mars-button v-show="isStart" @click="pauseCameraViewList">暂停</mars-button>
    <mars-button v-show="!isStart" @click="proceedCameraViewList">继续</mars-button>
  </mars-dialog>
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
