<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="btn_container">
      <mars-button @click="drawLine" class="btn">绘制线</mars-button>
      <mars-button @click="nearPoint" class="btn">计算最近点</mars-button>
      <mars-button @click="clearAll" danger class="btn">清除</mars-button>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
 import * as mapWork from "./map.js"


// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}
// 计算最近点
const nearPoint = () => {
  mapWork.drawPoint()
}
// 清除
const clearAll = () => {
  mapWork.clearLayer()
}
</script>
<style lang="less" scoped>
  .btn_container {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 94px;
    }
  }
</style>
