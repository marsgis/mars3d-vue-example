<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="drawLine">绘制线</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}

// 清除
const clearAll = () => {
  mapWork.clearLayer()
}
</script>
