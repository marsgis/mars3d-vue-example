<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="drawLine">通视分析</mars-button>
      <mars-button @click="drawCircle">圆形通视分析</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
      <mars-button href="editor.html?id=analysis/spatial/sightlineTerrain" target="_blank">地形精确分析示例</mars-button>
    </a-space>
  </PannelBox>

  <LocationTo />
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
 import * as mapWork from "./map.js"


// 通视分析
const drawLine = () => {
  mapWork.drawLine()
}
// 圆形通视分析
const drawCircle = () => {
  mapWork.drawCircle()
}

// 清除
const clearAll = () => {
  mapWork.clearAll()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
