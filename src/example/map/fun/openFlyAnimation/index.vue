<template>
  <div class="map_btn">
    <a-space :size="10">
      <mars-button @click="startAnimation">重新播放</mars-button>
      <mars-button danger @click="stopAnimation">停止动画</mars-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
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
<style lang="less" scoped>
.map_btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;

  .mars-button {
    width: 120px;
    height: 46px;
  }
}
</style>
