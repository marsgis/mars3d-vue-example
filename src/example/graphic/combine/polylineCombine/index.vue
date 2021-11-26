<template>
  <PannelBox class="infoView">
    <a-space>
      <span>大数据加载:</span>
      <mars-input-number class="inputNum" :min="0.1" :max="100" v-model:value="num" step="0.1"></mars-input-number>万条
      <mars-button @click="addData">生成</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
    </a-space>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const num = ref<number>(1)

const addData = () => {
  mapWork.addData(num.value)
}
const clearLayer = () => {
  mapWork.clearLayer()
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}
</style>
