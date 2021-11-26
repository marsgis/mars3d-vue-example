<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="randomPoints">随机点</mars-button>
      <mars-button @click="randomPolylines">随机线</mars-button>
      <mars-button @click="randomPolygons">随机面</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
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
// 随机线
const randomPolylines = () => {
  mapWork.randomPolylines()
}
// 随机面
const randomPolygons = () => {
  mapWork.randomPolygons()
}
// 清除
const clearAll = () => {
  mapWork.clearAll()
}
</script>
