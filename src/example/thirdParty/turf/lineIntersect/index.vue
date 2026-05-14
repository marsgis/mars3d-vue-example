<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="btn_container">
      <mars-button @click="drawLine" class="btn">绘制线</mars-button>
      <mars-button @click="crossPoint" class="btn">计算相交点</mars-button>
      <mars-button danger @click="clearAll" class="btn">清除</mars-button>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
 import * as mapWork from "./map.js"


// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}
// 计算相交点
const crossPoint = () => {
  mapWork.crossPoint()
}

// 清除
const clearAll = () => {
  mapWork.clearAll()
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
