<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="drawLine">绘制线</mars-button>
      <mars-button @click="crossPoint">计算相交点</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/marsgis/pannel.vue"
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
