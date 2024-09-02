<template>
  <mars-dialog :visible="true" right="10" top="10" >
      <a-space>
        <mars-button @click="mapWork.drawLine">绘制线</mars-button>
        <mars-button @click="mapWork.drawRectangle">绘制矩形</mars-button>
        <mars-button @click="mapWork.drawCircle">绘制圆</mars-button>
        <mars-button @click="mapWork.removeSectionPath">清除</mars-button>
      </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

</script>

<style scoped lang="less">
</style>
