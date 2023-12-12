<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <span>绘制:</span>
      <mars-button @click="drawPoint">选择点</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
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
