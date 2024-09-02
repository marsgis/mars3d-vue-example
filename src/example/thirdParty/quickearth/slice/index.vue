
<template>
  <mars-dialog :visible="true" right="10" top="10">
      <a-space>
        <span>间隔比例:</span>
        <mars-slider v-model:value="scale" :min="0.0" :max="20.0" :step="1.0" @change="changeScale" />
      </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
const scale = ref(10)
// 绘制线
const changeScale = () => {
  mapWork.changeScale(scale.value)
}
</script>

<style scoped lang="less">
:deep(.ant-slider) {
  width: 140px;
}
</style>
