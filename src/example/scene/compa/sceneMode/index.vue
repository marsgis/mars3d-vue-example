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

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

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
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
