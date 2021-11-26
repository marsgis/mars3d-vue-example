<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="viewTo23D">分屏</mars-button>
      <mars-button @click="viewTo2d">仅2D</mars-button>
      <mars-button @click="viewTo3d">仅3D</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const viewTo23D = () => {
  mapWork.mapManager.viewTo23D()
}

const viewTo2d = () => {
  mapWork.mapManager.viewTo2d()
}
const viewTo3d = () => {
  mapWork.mapManager.viewTo3d()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
