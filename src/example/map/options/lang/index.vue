<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb tip-message">Tip: The default language is Chinese中文简体, you can switch to English, etc.</div>
    <div class="f-mb">
      <a-row>
        <a-col :span="6">语言切换:</a-col>
        <a-col :span="18">
          <div class="lang-button-contain">
            <mars-button @click="toCustomLang()"> English </mars-button>
            <mars-button @click="toDefaultLange()"> 中文简体 </mars-button>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="6">Plot:</a-col>
        <a-col :span="18">
          <div class="plot-button-contain">
            <mars-button class="f-mb" :key="item" v-for="item in typeArrPlot" @click="onStartDraw(item)">
              {{ item }}
            </mars-button>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="6">Measure:</a-col>
        <a-col :span="18">
          <div class="measure-button-contain">
            <mars-button class="coordinate-btn" size="middle" @click="onClickCoordinate">coordinate</mars-button>
            <mars-button class="distance-btn" size="middle" @click="onClickDistance">distance</mars-button>
            <mars-button class="f-mt" size="middle" @click="onClickHeight">height</mars-button>
            <mars-button class="f-mt" size="middle" @click="onClickArea">area</mars-button>
            <mars-button class="f-mt" size="middle" @click="onClickAngle">angle</mars-button>
          </div>
        </a-col>
      </a-row>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"

const typeArrPlot = ["rectangle", "polyline", "polygon", "cylinder", "point", "circle", "wall"]

const toCustomLang = () => {
  mapWork.toCustomLang()
}
const toDefaultLange = () => {
  mapWork.toDefaultLange()
}

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
<style lang="less" scoped>
.ant-col {
  line-height: 27px;
  color: rgba(234, 242, 255, 0.8);
  font-size: 14px;
}

.lang-button-contain {
  .mars-button {
    width: 104px;
    margin-right: 8px;
  }
}

.plot-button-contain {
  .mars-button {
    margin-right: 7px;
    width: 68px;
    text-align: center;

    &:first-child {
      padding-left: 3px !important;
    }

    &:last-child {
      margin-bottom: 0 !important;
    }
  }

}

.measure-button-contain {

  .coordinate-btn,
  .distance-btn {
    width: 105px !important;
  }

  .mars-button {
    width: 68px;
    margin-right: 7px;
  }
}

.tip-message {
  color: rgba(234, 242, 255, 0.8);
}
</style>
