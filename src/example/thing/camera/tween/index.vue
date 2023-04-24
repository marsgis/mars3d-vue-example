<template>
  <mars-dialog :visible="true" right="0" top="10">
    <a-space>
      <mars-button @click="start()">开始</mars-button>
      <mars-button @click="pause()">暂停</mars-button>
      <mars-button @click="resume()">继续</mars-button>
      <mars-button @click="stop()">停止</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"
function start() {
  mapWork.start()
}
function pause() {
  mapWork.pause()
}
function resume() {
  mapWork.resume()
}
function stop() {
  mapWork.stop()
}
</script>
