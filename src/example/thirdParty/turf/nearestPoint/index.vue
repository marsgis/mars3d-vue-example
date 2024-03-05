<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <span>绘制:</span>
      <mars-button class="btn" @click="drawPoint">选择点</mars-button>
      <mars-button danger class="btn" @click="clearAll">清除</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"
// 点
const drawPoint = () => {
  mapWork.drawPoint()
}

// 清除
const clearAll = () => {
  mapWork.clearAll()
}
</script>
<style scoped lang="less">
  .btn {
    width: 126px;
  }
</style>
