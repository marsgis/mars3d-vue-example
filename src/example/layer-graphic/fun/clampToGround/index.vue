<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="getDataSurfaceHeight">异步计算贴地高度{{ percent }}/{{ percentAll }}</mars-button>
      <mars-button @click="toGeojson">保存GeoJSON</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const percent = ref(0) // 声明ref响应式数据，js中需要 *.value 来操作其值
const percentAll = ref(0) // 声明ref响应式数据，js中需要 *.value 来操作其值

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
