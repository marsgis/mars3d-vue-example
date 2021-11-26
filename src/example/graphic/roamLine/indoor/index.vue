<template>
  <PannelBox class="infoView">
    <a-space>
      <span class="item-label">漫游控制:</span>
      <mars-button @click="startFly">开始漫游</mars-button>
      <mars-button @click="stopFly">停止漫游</mars-button>

      <span class="item-label">室内视角:</span>

      <mars-button @click="centerAtDX1">教室</mars-button>
      <mars-button @click="centerAtDX2">走廊</mars-button>
      <mars-button @click="centerAtDX3">楼梯间</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const startFly = () => {
  mapWork.startFly()
}
const stopFly = () => {
  mapWork.stopFly()
}
const centerAtDX1 = () => {
  mapWork.centerAtDX1()
}
const centerAtDX2 = () => {
  mapWork.centerAtDX2()
}
const centerAtDX3 = () => {
  mapWork.centerAtDX3()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
