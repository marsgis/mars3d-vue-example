<template>
  <PannelBox class="infoView">
    <a-space>
      <span>Style样式</span>
      <mars-button @click="setStyleDef"> 原始样式 </mars-button>
      <mars-button @click="setStyle1">自定义效果1</mars-button>
      <mars-button @click="setStyle2">自定义效果2</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

interface FormState {
  enabledBloom: boolean
  enabledShadows: boolean
  enabledBrightness: boolean
  color: string
}

// 原始样式
const setStyle1 = () => {
  mapWork.setStyle1()
}
// 样式1
const setStyle2 = () => {
  mapWork.setStyle2()
}
// 样式2
const setStyleDef = () => {
  mapWork.setStyleDef()
}
</script>
<style scoped lang="less"></style>
