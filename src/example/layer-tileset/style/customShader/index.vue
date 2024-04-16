<template>
  <div class="map_tool_container">
    <mars-button class="btn" :class="{ active: activeIndex === 0 }" @click="setStyleDef">原始样式</mars-button>
    <mars-button class="btn" :class="{ active: activeIndex === 1 }" @click="setStyle1">自定义效果1</mars-button>
    <mars-button class="btn" :class="{ active: activeIndex === 2 }" @click="setStyle2">自定义效果2</mars-button>
    <mars-button class="btn" :class="{ active: activeIndex === 3 }" @click="setStyle3">自定义效果3</mars-button>
    <mars-button class="btn" :class="{ active: activeIndex === 4 }" @click="setStyle4">自定义效果4</mars-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"

const activeIndex = ref(0)

const setStyleDef = () => {
  activeIndex.value = 0
  mapWork.setStyleDef()
}
const setStyle1 = () => {
  activeIndex.value = 1
  mapWork.setStyle1()
}
const setStyle2 = () => {
  activeIndex.value = 2
  mapWork.setStyle2()
}
const setStyle3 = () => {
  activeIndex.value = 3
  mapWork.setStyle3()
}
const setStyle4 = () => {
  activeIndex.value = 4
  mapWork.setStyle4()
}
</script>
<style lang="less" scoped>
.map_tool_container {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;

  .mars-button {
    width: 100px;
    margin-right: 10px;
  }

  .mars-button:last-child {
    margin-right: 0px
  }
}
.btn {
  background-color: rgba(39, 44, 54, 0.8);
}
.active {
  background-color: rgba(51, 133, 255, 1) !important;
}
</style>
