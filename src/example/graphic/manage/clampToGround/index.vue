<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="getDataSurfaceHeight">异步计算贴地高度{{ percent }}/{{ percentAll }}</mars-button>
      <mars-button @click="toGeojson">保存GeoJSON</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

const percent = ref(0)
const percentAll = ref(0)
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

mapWork.eventTarget.on("loadOk", function (event: any) {
  percentAll.value = event.geojsonLength
})

// 保存为Geojson文件
const toGeojson = () => {
  mapWork.toGeojson()
}

// 异步计算贴地高度
const getDataSurfaceHeight = () => {
  mapWork.getDataSurfaceHeight()
  mapWork.eventTarget.on("loadOk", function (event: any) {
    percent.value = event.resultData.percent
    percentAll.value = event.resultData.percentAll
  })
}
</script>
