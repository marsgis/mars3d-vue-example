<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="drawLine">绘制线</mars-button>
      <mars-button @click="crossPoint">计算相交点</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

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
