<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="to2d">切换为二维视图</mars-button>
      <mars-button @click="to3d">切换为三维视图</mars-button>
      <mars-button @click="toGLB">切换为2.5D维视图</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const to2d = () => {
  mapWork.to2d()
}

const to3d = () => {
  mapWork.to3d()
}
const toGLB = () => {
  mapWork.toGLB()
}
</script>
