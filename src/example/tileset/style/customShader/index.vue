<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="setStyleDef">原始样式</mars-button>
      <mars-button @click="setStyle1">自定义效果1</mars-button>
      <mars-button @click="setStyle2">自定义效果2</mars-button>
    </a-space>
  </PannelBox>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const setStyle1 = () => {
  mapWork.setStyle1()
}
const setStyle2 = () => {
  mapWork.setStyle2()
}
const setStyleDef = () => {
  mapWork.setStyleDef()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
