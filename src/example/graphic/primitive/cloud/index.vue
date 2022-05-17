<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <span>大数据加载:</span>
      <mars-input-number :min="1" :max="100000" v-model:value="num" step="1"></mars-input-number>条
      <mars-button @click="addDemoGraphic">生成</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
    </a-space>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"

// 生成大数据
const num = ref<number>(1024)
const addDemoGraphic = () => {
  mapWork.addDemoGraphic(num.value)
}

const clearLayer = () => {
  mapWork.graphicLayer.clear()
}
</script>
<style scoped lang="less">
.ant-input-number {
  width: 70px;
}
</style>
