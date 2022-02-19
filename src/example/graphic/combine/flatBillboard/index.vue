<template>
  <mars-pannel :visible="true" right="10" top="10">
    <layer-state />
    <div class="f-pt">
    <a-space>
      <span>间隔</span>
      <mars-input-number v-model:value="num" :min="1" :max="1000" step="1"></mars-input-number>米插值
      <mars-button @click="showDataPoint">生成图标</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
      <mars-button @click="loadDemo">加载演示数据</mars-button>
    </a-space>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

// 生成大数据
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
.ant-input-number {
  width: 70px;
}
</style>
