<template>
  <mars-dialog :visible="true" right="10" top="10" >
      <a-space>
        <span>缩放比例:</span>
        <mars-slider v-model:value="scale" :min="0.0" :max="1000.0" :step="1.0" @change="changeScale" />
      </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
const scale = ref(500)
// 绘制线
const changeScale = () => {
  mapWork.changeScale(scale.value)
}
</script>

<style scoped lang="less">
:deep(.ant-slider) {
  width: 240px;
}
</style>
