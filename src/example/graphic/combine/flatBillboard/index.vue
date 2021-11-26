<template>
  <PannelBox class="infoView">
    <a-space>
      <span>间隔</span>
      <mars-input-number class="inputNum" :min="1" :max="1000" v-model:value="num" step="1"></mars-input-number>米插值
      <mars-button @click="showDataPoint">生成图标</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
      <mars-button @click="loadDemo">加载演示数据</mars-button>
    </a-space>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const num = ref<number>(20)

const showDataPoint = () => {
  mapWork.showDataPoint(num.value)
}
const clearLayer = () => {
  mapWork.clearData()
}
const loadDemo = () => {
  mapWork.loadDemo()
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}
</style>
