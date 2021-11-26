<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="drawExtent">绘制矩形</mars-button>
      <mars-button @click="drawExtent2">绘制矩形(外)</mars-button>
      <mars-button @click="drawPoly">绘制面</mars-button>
      <mars-button @click="drawPoly2">绘制面(外)</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

window.$notify("功能 和 已知问题提示", "(1) 因为使用clippingPlanes接口，绘制面时，有些绘制的角度存在效果不对")

// 绘制矩形
const drawExtent = () => {
  mapWork.drawExtent()
}
// 绘制矩形(外)
const drawExtent2 = () => {
  mapWork.drawExtent2()
}
// 绘制面
const drawPoly = () => {
  mapWork.drawPoly()
}
// 绘制面（外）
const drawPoly2 = () => {
  mapWork.drawPoly2()
}
// 清除
const clearAll = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
