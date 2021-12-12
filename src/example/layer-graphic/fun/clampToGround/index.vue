<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="getDataSurfaceHeight">异步计算贴地高度{{ percent }}/{{ percentAll }}</mars-button>
      <mars-button @click="toGeojson">保存GeoJSON</mars-button>
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const percent = ref(0)
const percentAll = ref(0)

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
