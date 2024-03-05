<template>
  <div class="map_btn">
    <a-space :size="10">
      <mars-button class="btn" @click="startRotate">开始</mars-button>
      <mars-button danger class="btn" @click="stopRotate">停止</mars-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
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
