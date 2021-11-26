<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="showFenliDemo">风力发电机</mars-button>
      <mars-button @click="showShanghaiDemo">上海浦东</mars-button>
      <mars-button @click="showDonghuaDemo">动画模型</mars-button>
      <mars-button @click="showGuangfu">光伏电场</mars-button>
      <mars-button @click="removeLayer">清除</mars-button>
    </a-space>
  </PannelBox>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const showShanghaiDemo = () => {
  mapWork.showShanghaiDemo()
}

const showDonghuaDemo = () => {
  mapWork.showDonghuaDemo()
}

const showFenliDemo = () => {
  mapWork.showFenliDemo()
}

const showGuangfu = () => {
  mapWork.showGuangfu()
}

const removeLayer = () => {
  mapWork.removeLayer()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
