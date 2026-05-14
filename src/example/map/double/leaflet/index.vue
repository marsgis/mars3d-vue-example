<template>
  <div class="map_tool_container">
    <mars-button class="btn" :class="{ active: radioValue === item.value }" v-for="(item) in options" :key="item.value"
      @click="viewTo(item.value)">{{ item.label }}</mars-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const radioValue = ref("1")


const options = [
  { label: "分屏", value: "1" },
  { label: "仅2D", value: "2" },
  { label: "仅3D", value: "3" }
]

const viewTo = (e) => {
  radioValue.value = e
  switch (e) {
    case "1":
      mapWork.viewTo23D()
      break
    case "2":
      mapWork.viewTo2d()
      break
    case "3":
      mapWork.viewTo3d()
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
    background-color: rgba(39, 44, 54, 0.8);
  }

  .active {
    background-color: rgba(51, 133, 255, 1) !important;
  }

  .mars-button:last-child {
    margin-right: 0px
  }
}
</style>
