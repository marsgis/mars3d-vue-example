<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space>
      <span>滤镜颜色:</span>
      <mars-color-picker @change="selectColor" v-model:value="color" />
    </a-space>

  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const color = ref("#4e70a6")
const selectColor = (e) => {
  mapWork.setFilterColor(color.value)
}

</script>

<style lang="less" scoped>
.mars-color-view {
  width: 232px;
}
</style>
