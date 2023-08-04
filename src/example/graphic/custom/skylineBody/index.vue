<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-space>
      <mars-button @click="addGraphic">添加</mars-button>
      <mars-button @click="clear">清除</mars-button>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

// 换色
const addGraphic = () => {
  mapWork.addGraphic()
}

const clear = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-input-number {
  width: 60px !important;
}
</style>
