<template>
  <mars-pannel :visible="true" zIndex="999" left="10" top="10" height="46">
    <a-checkbox v-model:checked="pointerEvents" @change="chkPointerEvents"> 启用Echars交互 </a-checkbox>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const pointerEvents = ref(false)
mapWork.eventTarget.on("loadOk", () => {
  // 创建Echarts图层
  mapWork.createEchartsLayer(pointerEvents.value)
})

// 状态控制
const chkPointerEvents = () => {
  mapWork.chkPointerEvents(pointerEvents.value)
}
</script>
<style scoped lang="less">
.infoView {
  left: 10px;
  width: 155px;
}
</style>
