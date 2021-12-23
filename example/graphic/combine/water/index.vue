<template>
  <pannel class="infoView">
    <a-space>
      <span>大数据加载:</span>
      <mars-input-number v-model:value="num" :min="0.1" :max="100" step="0.1"></mars-input-number>万条
      <mars-button @click="addCombineData">生成</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
    </a-space>
  </pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

// 生成大数据
const num = ref<number>(1)
const addCombineData = () => {
  mapWork.addCombineData(num.value)
}

const clearLayer = () => {
  mapWork.clearLayer()
}
</script>
<style scoped lang="less">
.ant-input-number {
  width: 70px;
}
</style>
