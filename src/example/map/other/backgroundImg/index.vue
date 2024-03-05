<template>
  <div class="map_tool_container">
    <mars-button class="btn" :class="{ active: radioValue === item.value }" v-for="(item) in options" :key="item.value"
      @click="changeBackground(item.value)">{{ item.label }}</mars-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
const radioValue = ref("2")
const options = [
  { label: "无", value: "1" },
  { label: "背景1", value: "2" },
  { label: "背景2", value: "3" },
  { label: "背景3", value: "4" }
]

const changeBackground = (e) => {
  radioValue.value = e
  switch (e) {
    case "1":
      mapWork.show()
      break
    case "2":
      mapWork.show1()
      break
    case "3":
      mapWork.show2()
      break
    case "4":
      mapWork.show3()
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

