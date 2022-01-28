<template>
  <pannel class="infoView">
    <a-checkbox v-model:checked="pointerEvents" @change="chkPointerEvents"> 启用Echars交互 </a-checkbox>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
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
