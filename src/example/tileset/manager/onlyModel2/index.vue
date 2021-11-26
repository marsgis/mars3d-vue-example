<template>
  <PannelBox class="infoView">
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
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const url = ref<any>()

mapWork.eventTarget.on("loadOk", () => {
  if (mapWork.url) {
    url.value = mapWork.url
  }

  // 历史记录模型地址
  const modelUrl = localStorage.getItem("onlyModel2")
  if (modelUrl) {
    url.value = modelUrl
  } else {
    url.value = "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json"
  }

  mapWork.eventTarget.on("beforeUI", function (event: any) {
    setTimeout(mapWork.showModel(url.value, event.map), 1000)
  })
})
const showModel = () => {
  mapWork.showModel(url.value)
  localStorage.setItem("onlyModel2", url.value)
}
const flyTo = () => {
  mapWork.flyTo()
}
</script>
