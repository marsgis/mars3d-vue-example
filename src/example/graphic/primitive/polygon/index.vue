<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">大数据加载:</span>
        <mars-input-number :min="0.1" :max="100" v-model:value="num" step="0.1"></mars-input-number>万条
        <mars-button @click="addPrimitiveData">生成</mars-button>
      </a-space>
    </div>
    <data-manage />
  </mars-pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import * as mapWork from "./map.js"

// 生成大数据
const num = ref<number>(0.1)
const addPrimitiveData = () => {
  mapWork.addPrimitiveData(num.value)
}
</script>
<style scoped lang="less">
.ant-input-number {
  width: 70px;
}
</style>
