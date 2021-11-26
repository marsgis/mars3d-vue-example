<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="showMapImg">查看场景出图</mars-button>
      <mars-button @click="downLoad">下载场景出图</mars-button>
      <mars-button @click="downLoad2">下载场景缩略图</mars-button>
    </a-space>
  </PannelBox>

  <PannelBox class="imgBox" type="model" title="场景出图" v-model:visible="showImg">
    <img :src="imges" style="width: 100%; height: 90%" />
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const showImg = ref<boolean>(false)

const imges = ref()

mapWork.eventTarget.on("loadOk", function (event: any) {
  console.log(event)
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
  top: 30%;
  left: 25%;
  width: 800px;
  height: 400px;
}
.ant-space {
  display: grid;
}
</style>
