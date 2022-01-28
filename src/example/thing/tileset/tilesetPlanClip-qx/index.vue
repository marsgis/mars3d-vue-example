<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="drawExtent">绘制矩形</mars-button>
      <mars-button @click="drawExtent2">绘制矩形(外)</mars-button>
      <mars-button @click="drawPoly">绘制面</mars-button>
      <mars-button @click="drawPoly2">绘制面(外)</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

window.$notify("功能 和 已知问题提示", `(1) 因为使用clippingPlanes接口，绘制面时，有些绘制的角度存在效果不对`, { duration: null })

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
  window.$message("提示：因为使用clippingPlanes接口，绘制面时，有些绘制的角度存在效果不对")
  mapWork.drawPoly()
}
// 绘制面（外）
const drawPoly2 = () => {
  window.$message("提示：因为使用clippingPlanes接口，绘制面时，有些绘制的角度存在效果不对")
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
