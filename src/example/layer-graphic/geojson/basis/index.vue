<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="geojson-example">
      <mars-button @click="showChinaLine">省界线</mars-button>
      <mars-button @click="showPlanningSurface">规划面</mars-button>
      <mars-button @click="showDraw">标绘数据</mars-button>
      <mars-button @click="showMonomer">单体化面</mars-button>
      <mars-button @click="showWorld">世界各国</mars-button>
      <mars-button @click="showPoint">体育设施点</mars-button>
      <mars-button @click="showBuilding">立体建筑物</mars-button>
      <mars-button @click="showBoundaryWall">合肥边界墙</mars-button>
      <mars-button @click="showRegion">合肥区域面</mars-button>
      <mars-button class="floor" @click="showFloor">分层分户楼栋</mars-button>
      <mars-button @click="showGCJ02Data">GCJ纠偏</mars-button>
    </div>

    <div class="f-pt f-mb">
      <a-space>
        <span>透明度:</span>
        <mars-slider v-model:value="layerOpacity" :min="0.0" :max="1.0" :step="0.1" @change="onOpacityChange" />
      </a-space>
    </div>
    <div>
      <layer-state label="" />
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import { useWidget } from "@mars/widgets/common/store/widget"
import * as mapWork from "./map.js"

const { updateWidget } = useWidget()

function setDefuatData() {
  layerOpacity.value = 1.0

  mapWork.eventTarget.fire("defuatData", {
    enabledShowHide: true,
    enabledPopup: true,
    enabledTooltip: false,
    enabledRightMenu: false
  })
}

const showDraw = () => {
  setDefuatData()
  mapWork.showDraw(true)

  changeGraphicData()
}
const showPoint = () => {
  setDefuatData()
  mapWork.showPoint()

  changeGraphicData()
}
const showChinaLine = () => {
  setDefuatData()
  mapWork.showChinaLine()

  changeGraphicData()
}
const showRegion = () => {
  setDefuatData()
  mapWork.showRegion()

  changeGraphicData()
}
const showBoundaryWall = () => {
  setDefuatData()
  mapWork.showBoundaryWall()

  changeGraphicData()
}
const showPlanningSurface = () => {
  setDefuatData()
  mapWork.showPlanningSurface()

  changeGraphicData()
}
const showWorld = () => {
  setDefuatData()
  mapWork.showWorld()

  changeGraphicData()
}
const showBuilding = () => {
  setDefuatData()
  mapWork.showBuilding()

  changeGraphicData()
}
const showFloor = () => {
  setDefuatData()
  mapWork.showFloor()

  changeGraphicData()
}
const showMonomer = () => {
  setDefuatData()
  mapWork.showMonomer()

  changeGraphicData()
}

const showGCJ02Data = () => {
  setDefuatData()
  mapWork.showGCJ02Data()

  changeGraphicData()
}



function changeGraphicData() {
  setTimeout(() => {
    updateWidget("manage-layers")
  }, 500)
}

const layerOpacity = ref<number>(1.0)
const onOpacityChange = () => {
  mapWork.graphicLayer.opacity = layerOpacity.value
}
</script>
<style scoped lang="less">
.geojson-example {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  align-content: center;
  flex-wrap: wrap;

  .mars-button {
    width: 94px;
  }

  .floor {
    padding-left: 5px !important;
  }
}


:deep(.ant-slider) {
  width: 230px;
}
</style>
