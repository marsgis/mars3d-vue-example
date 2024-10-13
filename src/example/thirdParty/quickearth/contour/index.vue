<template>
  <mars-dialog :visible="true" right="10" top="10" >

    <a-form  :labelCol="{ span:4 }">
      <a-form-item label="分析值:">
        <mars-slider v-model:value="delta" :min="10" :max="60" :step="1" /></a-form-item>
      </a-form>
      <a-form-item label="显示立体">
        <a-space>
          <mars-button @click="drawRectangle">绘制区域</mars-button>
          <mars-button @click="clearDraw">清除</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item label="剖面分析">
        <a-space>
        <mars-button @click="mapWork.drawLine">绘制线</mars-button>
          <mars-button @click="mapWork.removeSectionPath">清除</mars-button>
        </a-space>
      </a-form-item>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const delta = ref(20)

// 绘制线
const drawRectangle = () => {
  mapWork.drawRectangle(delta.value)
}
const clearDraw = () => {
  mapWork.clearDraw()
}


</script>

<style scoped lang="less">
:deep(.ant-slider) {
  width: 240px;
}
</style>
