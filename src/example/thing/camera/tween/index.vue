<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <mars-button class="btn" @click="start()">开始</mars-button>
      <mars-button class="btn" @click="pause()">暂停</mars-button>
      <mars-button class="btn" @click="resume()">继续</mars-button>
      <mars-button class="btn" @click="stop()">停止</mars-button>
    </a-space>
    <a-checkbox v-model:checked="checkFlag" class="show-checkbox" @change="changeShowLayer">显示视锥体</a-checkbox>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const checkFlag = ref(false)
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

function changeShowLayer() {
  mapWork.changeShowLayer(checkFlag.value)
}
</script>
<style lang="less" scoped>
.btn {
  width: 68px;
}
</style>
