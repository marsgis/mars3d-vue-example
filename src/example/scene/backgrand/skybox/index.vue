<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="show1">背景1</mars-button>
      <mars-button @click="show2">背景2</mars-button>
      <mars-button @click="show3">背景3</mars-button>
      <mars-button @click="show4">背景4</mars-button>
      <mars-button @click="show5">背景5</mars-button>
      <mars-button @click="show6">背景6</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const show1 = () => {
  mapWork.show1()
}

const show2 = () => {
  mapWork.show2()
}
const show3 = () => {
  mapWork.show3()
}

const show4 = () => {
  mapWork.show4()
}

const show5 = () => {
  mapWork.show5()
}
const show6 = () => {
  mapWork.show6()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
