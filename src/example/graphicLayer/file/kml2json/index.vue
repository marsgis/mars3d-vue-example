<template>
  <PannelBox class="infoView">
    <a-form>
      <a-space>
        <mars-button @click="showTieluDemo">铁路</mars-button>
        <mars-button @click="showGaosuluDemo">高速公路</mars-button>
        <mars-button @click="showQixiangDemo">气象等值面</mars-button>
        <mars-button @click="showGuojiaDemo">国家GDP数据</mars-button>
        <mars-button @click="showAnquanDemo">海上安全通告</mars-button>
      </a-space>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const showTieluDemo = () => {
  mapWork.showTieluDemo()
}
const showGaosuluDemo = () => {
  mapWork.showGaosuluDemo()
}
const showQixiangDemo = () => {
  mapWork.showQixiangDemo()
}
const showGuojiaDemo = () => {
  mapWork.showGuojiaDemo()
}
const showAnquanDemo = () => {
  mapWork.showAnquanDemo()
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
