<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <mars-button class="btn" @click="showMapImg">查看场景出图(弹窗)</mars-button>

    <mars-button class="btn" @click="downLoad">下载场景出图</mars-button>
    <mars-button class="btn" @click="downLoad2">下载场景缩略图</mars-button>
    <mars-button class="btn" @click="screenShots">截缩略图</mars-button>

    <img class="f-mt" :src="imges" v-if="showScreenShot" style="width: 100%; height: 100%" />
  </mars-dialog>

  <mars-dialog left="100" right="100" top="50" bottom="60" title="场景出图" v-model:visible="showImg">
    <img :src="imges" style="width: 100%; height: 100%" />
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const showImg = ref<boolean>(false)
const showScreenShot = ref<boolean>(false)

const imges = ref()

const showMapImg = () => {
  mapWork.showMapImg().then((image) => {
    imges.value = image
    showImg.value = true
  })
}

const downLoad = () => {
  mapWork.downLoad()
}
const downLoad2 = () => {
  mapWork.downLoad2()
}

// 截图
const screenShots = () => {
  showScreenShot.value = true
  mapWork.showMapImg({ width: 200, height: 200 }).then((image) => {
    imges.value = image
  })
}
</script>
<style scoped lang="less">
.btn {
  width:145px;
  margin-bottom: 10px;
  &:nth-child(odd) {
    margin-right: 10px;
  }
}

.btn_div {
  width:300px;
}
</style>
