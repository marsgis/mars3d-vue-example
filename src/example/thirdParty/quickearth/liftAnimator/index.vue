<template>
  <mars-dialog :visible="true" right="10" top="10" >

    <a-form  :labelCol="{ span:4 }">
      <a-form-item label="步长:">
        <mars-slider v-model:value="delta" :min="0.01" :max="0.5" :step="0.01"
        @change="changeChangeDelta" /></a-form-item>
      </a-form>
      <a-form-item label="开关:">
        <a-space>
          <mars-button @click="start">开启</mars-button>
          <mars-button @click="stop">停止</mars-button>
        </a-space>
      </a-form-item>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
const delta = ref(0.2)

const start = () => {
  mapWork.start()
}

const stop = () => {
  mapWork.stop()
}

const changeChangeDelta = () => {
  mapWork.changeChangeDelta(delta.value)
}

</script>

<style scoped lang="less">
:deep(.ant-slider) {
  width: 140px;
}
</style>
