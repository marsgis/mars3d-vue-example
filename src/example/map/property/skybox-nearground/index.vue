<template>
  <div class="map_tool_container">
    <mars-button class="btn" :class="{ active: radioValue === item.value }" v-for="(item) in options" :key="item.value"
      @click="changeBackground(item.value)">{{ item.label }}</mars-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
const radioValue = ref("1")

const options = [
  { label: "晴天", value: "1" },
  { label: "晚霞", value: "2" },
  { label: "蓝天", value: "3" },
  { label: "默认", value: "4" }
]

const changeBackground = (e) => {
  radioValue.value = e
  switch (e) {
    case "1":
      mapWork.sunny()
      break
    case "2":
      mapWork.sunsetGlow()
      break
    case "3":
      mapWork.blueSky()
      break
    case "4":
      mapWork.defaultSky()
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
    width: 68px;
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
