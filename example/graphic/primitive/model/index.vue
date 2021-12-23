<template>
  <pannel class="infoView">
    <div class="f-mb">
      <layer-state />
    </div>
    <div>
      <a-space>
        <span class="pannel-item-label">大数据加载:</span>
        <mars-input-number :min="1" :max="100000" v-model:value="num" step="1"></mars-input-number>条
        <mars-button @click="addPrimitiveData">生成</mars-button>
        <mars-button @click="clearLayer">清除</mars-button>
      </a-space>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import LayerState from "@comp/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

// 生成大数据
const num = ref<number>(1024)
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
