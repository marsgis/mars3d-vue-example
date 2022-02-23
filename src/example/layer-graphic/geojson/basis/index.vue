<template>
  <mars-pannel :visible="true" right="10" height="540px" top="10">
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
    <div class="f-pt">
      <layer-state label="" />
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"
import { useWidget } from "@mars/widgets/common/store/widget"

const { updateWidget } = useWidget()

const showDraw = () => {
  mapWork.setDefuatData()
  mapWork.showDraw(true)

  changeGraphicData()
}
const showPoint = () => {
  mapWork.setDefuatData()
  mapWork.showPoint()

  changeGraphicData()
}
const showChinaLine = () => {
  mapWork.setDefuatData()
  mapWork.showChinaLine()

  changeGraphicData()
}
const showRegion = () => {
  mapWork.setDefuatData()
  mapWork.showRegion()

  changeGraphicData()
}
const showBoundaryWall = () => {
  mapWork.setDefuatData()
  mapWork.showBoundaryWall()

  changeGraphicData()
}
const showPlanningSurface = () => {
  mapWork.setDefuatData()
  mapWork.showPlanningSurface()

  changeGraphicData()
}
const showWorld = () => {
  mapWork.setDefuatData()
  mapWork.showWorld()

  changeGraphicData()
}
const showBuilding = () => {
  mapWork.setDefuatData()
  mapWork.showBuilding()

  changeGraphicData()
}
const showFloor = () => {
  mapWork.setDefuatData()
  mapWork.showFloor()

  changeGraphicData()
}
const showMonomer = () => {
  mapWork.setDefuatData()
  mapWork.showMonomer()

  changeGraphicData()
}

function changeGraphicData() {
  setTimeout(() => {
    updateWidget("manage-layers")
  }, 500)
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
