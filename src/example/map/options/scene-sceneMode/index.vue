<template>
  <div class="map_tool_container">
    <mars-button class="btn" :class="{ active: radioValue === item.value }" v-for="(item) in options" :key="item.value"
      @click="changeBackground(item.value)">{{ item.label }}</mars-button>
  </div>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"
import { ref } from "vue"

const radioValue = ref("2")
const options = [
  { label: "切换为二维视图", value: "1" },
  { label: "切换为三维视图", value: "2" },
  { label: "切换为2.5D维视图", value: "3" }
]

const changeBackground = (e) => {
  radioValue.value = e
  switch (e) {
    case "1":
      mapWork.to2d()
      break
    case "2":
      mapWork.to3d()
      break
    case "3":
      mapWork.toGLB()
      break
  }
}
</script>
<style lang="less" scoped>
.map_tool_container {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;

  .mars-button {
    // width: 94px;
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
