
<template>
  <mars-dialog :visible="true" right="10" top="10">
      <a-space>
        <span>缩放比例:</span>
        <mars-slider v-model:value="extrudeScale" :min="0.0" :max="10000.0" :step="1.0" @change="changeScale" />
      </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
const extrudeScale = ref(5000)
// 绘制线
const changeScale = () => {
  mapWork.changeScale(extrudeScale.value)
}
</script>

<style scoped lang="less">
:deep(.ant-slider) {
  width: 140px;
}
</style>
