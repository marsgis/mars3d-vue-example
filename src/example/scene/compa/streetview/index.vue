<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="viewTo23D">分屏</mars-button>
      <mars-button @click="viewTo2d">仅街景</mars-button>
      <mars-button @click="viewTo3d">仅3D</mars-button>
    </a-space>
  </PannelBox>

  <PannelBox class="iconView">
    <img src="img/marker/street.png" alt="" class="imgIcon" @click="chooseStree" />
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const viewTo23D = () => {
  mapWork.splitScreen()
}

const viewTo2d = () => {
  mapWork.streetscape()
}
const viewTo3d = () => {
  mapWork.viewTo3d()
}
const chooseStree = () => {
  mapWork.chooseStree()
}
</script>
<style scoped lang="less">
.infoView {
  width: 240px;
  left: 44%;
}
.iconView {
  width: 60px;
  height: 60px;
  top: 10px;
  right: 10px;
}
.imgIcon {
  width: 70%;
  height: 100%;
  margin-left: 5px;
}
</style>
