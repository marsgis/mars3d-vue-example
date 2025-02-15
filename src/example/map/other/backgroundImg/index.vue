<template>
  <div class="map_tool_container">
    <mars-button class="btn" :class="{ active: radioValue === item.value }" v-for="(item) in options" :key="item.value"
      @click="changeBackground(item.value)">{{ item.label }}</mars-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const radioValue = ref("img1")
const options = [
  { label: "无", value: "img0" },
  { label: "背景1", value: "img1" },
  { label: "背景2", value: "img2" },
  { label: "背景3", value: "img3" },
  { label: "颜色", value: "color" },
  { label: "天空盒", value: "skybox" }
]

const changeBackground = (e) => {
  radioValue.value = e
  switch (e) {
    case "img0":
      mapWork.showImgNone()
      break
    case "img1":
      mapWork.showImg1()
      break
    case "img2":
      mapWork.showImg2()
      break
    case "img3":
      mapWork.showImg3()
      break
    case "color":
      mapWork.showColor()
      break
    case "skybox":
      mapWork.showSkybox()
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

