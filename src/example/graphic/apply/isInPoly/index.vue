<template>
  <mars-pannel class="infoView">
    <a-space>
      <span>框选数据:</span>
      <mars-button @click="drawRectangle">矩形</mars-button>
      <mars-button @click="drawPolygon">面</mars-button>
      <mars-button @click="drawCircle">圆</mars-button>
      <mars-button @click="removeAll">清除</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
 import * as mapWork from "./map.js"


const drawRectangle = () => {
  mapWork.drawRectangle()
}

const drawPolygon = () => {
  mapWork.drawPolygon()
}

const drawCircle = () => {
  mapWork.drawCircle()
}

const removeAll = () => {
  mapWork.removeAll()
}
</script>

