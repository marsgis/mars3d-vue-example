<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="startAnimation">重新播放</mars-button>
      <mars-button @click="stopAnimation">停止动画</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

// 随机点
const startAnimation = () => {
  mapWork.startAnimation()
}
// 清除
const stopAnimation = () => {
  mapWork.stopAnimation()
}
</script>
