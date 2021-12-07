<template>
  <PannelBox class="infoView">
    <a-space>
      <span>大数据加载:</span>
      <mars-input-number :min="0.1" :max="100" v-model:value="num" step="0.1"></mars-input-number>万条
      <mars-button @click="addCombineData">生成</mars-button>
      <mars-button @click="clearLayer">清除</mars-button>
    </a-space>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
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
