<template>
  <mars-pannel class="infoView">
    <layer-state />
    <div class="f-pt">
    <a-space>
      <span>大数据加载:</span>
      <mars-input-number :min="1" :max="50000" v-model:value="num" step="1"></mars-input-number>条
      <mars-button @click="addCombineData">生成</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
    </a-space>
    </div>
  </mars-pannel>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

// 生成大数据
const num = ref<number>(500)
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
