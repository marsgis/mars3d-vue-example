<template>
  <PannelBox class="infoView">
    <a-space>
      <span class="pannel-item-label">视角:</span>
      <mars-button @click="changeView1">起点</mars-button>
      <mars-button @click="changeView2">半程点</mars-button>
      <mars-button @click="changeView3">终点</mars-button>
      <mars-button @click="changeView4">全程路线</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import { defineComponent } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const changeView1 = () => {
  mapWork.changeView1()
}
const changeView2 = () => {
  mapWork.changeView2()
}
const changeView3 = () => {
  mapWork.changeView3()
}

const changeView4 = () => {
  mapWork.changeView4()
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 60px;
}
</style>
