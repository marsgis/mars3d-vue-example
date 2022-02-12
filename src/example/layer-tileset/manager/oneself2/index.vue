<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span>图层URL:</span>
        <mars-input v-model:value="url"></mars-input>
      </a-space>
    </div>
    <a-space>
      <mars-button @click="showModel">加载模型</mars-button>
      <mars-button @click="flyTo">视角复位</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import * as mapWork from "./map.js"

const url = ref<any>()

mapWork.eventTarget.on("loadOk", () => {
  // 历史记录模型地址
  const modelUrl = localStorage.getItem("onlyModel2")
  if (modelUrl) {
    url.value = modelUrl
  } else {
    url.value = "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json"
  }

  setTimeout(() => {
    mapWork.showModel(url.value)
  }, 1000)
})

const showModel = () => {
  mapWork.showModel(url.value)
  localStorage.setItem("onlyModel2", url.value)
}
const flyTo = () => {
  mapWork.flyTo()
}
</script>
