<template>
  <div class="map_btn">
    <a-space :size="10">
      <mars-button @click="drawLine">绘制线</mars-button>
      <mars-button danger @click="clearAll">清除</mars-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}

// 清除
const clearAll = () => {
  mapWork.clearGraphicLayer()
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
