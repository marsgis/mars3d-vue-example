<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="showMapImg">查看场景出图</mars-button>
      <mars-button @click="downLoad">下载场景出图</mars-button>
      <mars-button @click="downLoad2">下载场景缩略图</mars-button>
      <mars-button @click="downLoadDiv">下载场景出图(含DIV部分)</mars-button>
    </a-space>
  </mars-pannel>

  <mars-dialog :position="{ left: '25%', top: '30%' }" width="50%" title="场景出图" v-model:visible="showImg">
    <img :src="imges" style="width: 100%; height: 90%" />
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
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

const downLoadDiv = () => {
  mapWork.downLoadDiv()
}
</script>
<style scoped lang="less"></style>
