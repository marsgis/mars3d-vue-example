<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="sunny">晴天</mars-button>
      <mars-button @click="sunsetGlow">晚霞</mars-button>
      <mars-button @click="blueSky">蓝天</mars-button>
      <mars-button @click="mr">默认</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const sunny = () => {
  mapWork.sunny()
}

const sunsetGlow = () => {
  mapWork.sunsetGlow()
}
const blueSky = () => {
  mapWork.blueSky()
}

const mr = () => {
  mapWork.mr()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
