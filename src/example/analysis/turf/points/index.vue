<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">原始数据:</span>
          <mars-button @click="randomPoints">随机点</mars-button>
          <mars-button @click="clearAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">相关计算:</span>
          <mars-button @click="convexPolygon">计算包围面</mars-button>
          <mars-button @click="voronoiPolygon">计算泰森多边形</mars-button>
          <mars-button @click="tinPolygon">计算TIN多边形</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

// 随机点
const randomPoints = () => {
  mapWork.randomPoints()
}
// 清除
const clearAll = () => {
  mapWork.clearlayer()
}
// 计算包围面
const convexPolygon = () => {
  mapWork.convexPolygon()
}
// 计算泰森多边形
const voronoiPolygon = () => {
  mapWork.voronoiPolygon()
}
// 计算TIN多边形
const tinPolygon = () => {
  mapWork.tinPolygon()
}
</script>
<style scoped lang="less">

.pannel-item-label {
  width: 55px;
}
</style>
