<template>
  <PannelBox class="infoView">
    <a-space>
      <span class="pannel-item-label">步长:</span>
      <mars-input-number v-model:value="value" :min="1" :max="10" />
      公里
      <mars-button @click="pointGrid">点</mars-button>
      <mars-button @click="triangleGrid">三角网</mars-button>
      <mars-button @click="squareGrid">方格网</mars-button>
      <mars-button @click="hexGrid">蜂窝网</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const value = ref<number>(5)
// 点网格
const pointGrid = () => {
  mapWork.pointGrid(value.value)
}
// 三角网
const triangleGrid = () => {
  mapWork.triangleGrid(value.value)
}
// 方格网
const squareGrid = () => {
  mapWork.squareGrid(value.value)
}
// 蜂窝网格
const hexGrid = () => {
  mapWork.hexGrid(value.value)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 30px;
}
.ant-input-number {
  width: 60px !important;
}
</style>
