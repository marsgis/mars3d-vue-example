<template>
  <mars-pannel :visible="true" right="10" top="10">
    <layer-state />
    <div class="f-pt">
    <a-space>
      <span>大数据加载:</span>
      <mars-input-number :min="0.1" :max="100" v-model:value="num" step="0.1"></mars-input-number>万条
      <mars-button @click="addCombineData">生成</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
    </a-space>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

// 生成大数据
const num = ref<number>(1)
const addCombineData = () => {
  mapWork.addCombineData(num.value)
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
