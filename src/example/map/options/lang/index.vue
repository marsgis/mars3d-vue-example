<template>
  <pannel class="infoView">
    <div class="f-mb">Tip: The default language is Chinese中文简体, you can switch to English, etc.</div>

    <div class="f-mb">
      <a-row>
        <a-col :span="6">Plot:</a-col>
        <a-col :span="18">
          <a-space>
            <mars-button :key="item" v-for="item in typeArrPlot" @click="onStartDraw(item)">
              {{ item }}
            </mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
    <div class="f-mb">
      <a-row>
        <a-col :span="6">Measurement:</a-col>
        <a-col :span="18">
          <a-space>
            <mars-button size="middle" @click="onClickDistance">distance</mars-button>
            <mars-button size="middle" @click="onClickArea">area</mars-button>
            <mars-button size="middle" @click="onClickHeight">height</mars-button>
            <mars-button size="middle" @click="onClickCoordinate">coordinate</mars-button>
            <mars-button size="middle" @click="onClickAngle">ditance</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const typeArrPlot = ["point", "polyline", "polygon", "circle", "rectangle", "wall", "cylinder"]

const onStartDraw = (e: any) => {
  mapWork.startDraw(e)
}

const onClickDistance = () => {
  mapWork.distance()
}
const onClickArea = () => {
  mapWork.area()
}
const onClickHeight = () => {
  mapWork.height()
}
const onClickCoordinate = () => {
  mapWork.coordinate()
}
const onClickAngle = () => {
  mapWork.angle()
}
</script>
<style scoped lang="less">
.infoView {
  width: 355px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
</style>
