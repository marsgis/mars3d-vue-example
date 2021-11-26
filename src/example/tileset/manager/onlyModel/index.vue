<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="图层URL" name="url">
        <a-space>
          <mars-input v-model:value="url"></mars-input>
          <mars-button @click="showModel">加载模型</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item label="背景颜色">
        <mars-color-picker v-model:value="color" @change="changeColor" />
      </a-form-item>
      <mars-button @click="flyTo">视角复位</mars-button>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const url = ref<any>()
const color = ref("#363635")

mapWork.eventTarget.on("loadOk", () => {
  // 历史记录模型地址
  const modelUrl = localStorage.getItem("onlyModel")
  if (modelUrl) {
    url.value = modelUrl
  } else {
    url.value = "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json"
  }
  mapWork.eventTarget.on("beforeUI", function (event: any) {
    setTimeout(mapWork.showModel(url.value, event.map), 1000)
  })
})
const changeColor = () => {
  mapWork.changeColor(color.value)
}
const showModel = () => {
  mapWork.showModel(url.value)
  localStorage.setItem("onlyModel", url.value)
}
const flyTo = () => {
  mapWork.flyTo()
}
</script>
