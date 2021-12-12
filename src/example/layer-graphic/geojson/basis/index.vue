<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="showChinaLine">省界线</mars-button>
      <mars-button @click="showPlanningSurface">规划面</mars-button>
      <mars-button @click="showDraw">标绘数据</mars-button>
      <mars-button @click="showMonomer">单体化面</mars-button>
      <mars-button @click="showWorld">世界各国</mars-button>
      <mars-button @click="showPoint">体育设施点</mars-button>
      <mars-button @click="showBuilding">立体建筑物</mars-button>
      <mars-button @click="showBoundaryWall">合肥边界墙</mars-button>
      <mars-button @click="showRegion">合肥区域面</mars-button>
      <mars-button @click="showFloor">分层分户楼栋</mars-button>
    </a-space>
  </pannel>
</template>

<script lang="ts" setup>
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const showDraw = () => {
  mapWork.showDraw(true)
}
const showPoint = () => {
  mapWork.showPoint()
}
const showChinaLine = () => {
  mapWork.showChinaLine()
}
const showRegion = () => {
  mapWork.showRegion()
}
const showBoundaryWall = () => {
  mapWork.showBoundaryWall()
}
const showPlanningSurface = () => {
  mapWork.showPlanningSurface()
}
const showWorld = () => {
  mapWork.showWorld()
}
const showBuilding = () => {
  mapWork.showBuilding()
}
const showFloor = () => {
  mapWork.showFloor()
}
const showMonomer = () => {
  mapWork.showMonomer()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
