<template>
  <pannel class="infoView">
    <div class="f-mb">
      <layer-state />
    </div>
    <div>
      <a-space>
        <span class="pannel-item-label">大数据加载:</span>
        <mars-input-number :min="0.1" :max="100" v-model:value="num" step="0.1"></mars-input-number>万条
        <mars-button @click="addPrimitiveData">生成</mars-button>
        <mars-button @click="clearLayer">清除</mars-button>
      </a-space>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import LayerState from "@comp/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

// 大数据加载
const num = ref<number>(0.5)
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
