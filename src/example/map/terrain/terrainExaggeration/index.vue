<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <span>夸张程度:</span>
      <mars-slider :min="1" :max="50" v-model:value="verticalExaggeration" @change="formStateChange" />
    </a-space>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import * as mapWork from "./map.js"

const verticalExaggeration = ref<number>(10)
const formStateChange = () => {
  mapWork.changeTerrain(verticalExaggeration.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 220px;
}
</style>
