<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="showMapImg">查看场景出图</mars-button>
      <mars-button @click="downLoad">下载场景出图</mars-button>
      <mars-button @click="downLoad2">下载场景缩略图</mars-button>
    </a-space>
  </pannel>

  <pannel class="imgBox" type="model" title="场景出图" v-model:visible="showImg">
    <img :src="imges" style="width: 100%; height: 90%" />
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const showImg = ref<boolean>(false)

const imges = ref()

mapWork.eventTarget.on("loadOk", function (event: any) {
  imges.value = event.base64
  showImg.value = true
})

const showMapImg = () => {
  mapWork.showMapImg()
}

const downLoad = () => {
  mapWork.downLoad()
}
const downLoad2 = () => {
  mapWork.downLoad2()
}
</script>
<style scoped lang="less">
.imgBox {
  position: absolute;
  top: 30%;
  left: 25%;
  width: 50%;
  height: 50%;
}
</style>
