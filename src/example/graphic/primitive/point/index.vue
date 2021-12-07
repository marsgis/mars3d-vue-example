<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <LayerState />
    </div>
    <div>
      <a-space>
        <span class="pannel-item-label">大数据加载:</span>
        <mars-input-number :min="0.1" :max="100" v-model:value="num" step="0.1"></mars-input-number>万条
        <mars-button @click="addPrimitiveData">生成</mars-button>
        <mars-button @click="clearLayer">清除</mars-button>
      </a-space>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
import * as mapWork from "./map.js"

// 生成大数据
const num = ref<number>(1.0)
const addPrimitiveData = () => {
  mapWork.addPrimitiveData(num.value)
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
