<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <span>视角:</span>
      <mars-button @click="startPoint">起点</mars-button>
      <mars-button @click="halfWayPoint">半程点</mars-button>
      <mars-button @click="endPoint">终点</mars-button>
      <mars-button @click="allLine">全程路线</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const startPoint = () => {
  mapWork.startPoint()
}

const halfWayPoint = () => {
  mapWork.halfWayPoint()
}

const endPoint = () => {
  mapWork.endPoint()
}

const allLine = () => {
  mapWork.allLine()
}
</script>
<style scoped lang="less">
.mars-pannel-item-label {
  width: 60px;
}
</style>
