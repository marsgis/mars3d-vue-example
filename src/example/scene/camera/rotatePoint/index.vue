<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="startRotate">开始</mars-button>
      <mars-button @click="stopRotate">停止</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

// 随机点
const startRotate = () => {
  mapWork.startRotate()
}
// 清除
const stopRotate = () => {
  mapWork.stopRotate()
}
</script>
