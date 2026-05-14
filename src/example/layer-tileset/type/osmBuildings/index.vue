<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <mars-button @click="mapWork.setStyle1">原始样式</mars-button>
        <mars-button @click="mapWork.setStyle2">特效样式</mars-button>
        <mars-button @click="mapWork.setStyle3">夜景贴图</mars-button>
        <mars-button @click="mapWork.setStyle4">动态特效</mars-button>
      </a-space>
    </div>

    <div class="building-color">
      <span>建筑物颜色:</span>
      <mars-color-picker @change="selectColor" v-model:value="color" />
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const color = ref("#ffffff")

const selectColor = (e) => {
  mapWork.selectColor(color.value)
}
</script>

<style scoped lang="less">
.building-color {
  display: flex;
  align-items: center;
  gap: 10px;

  .mars-color-view {
    width: calc(100% - 85px);
  }
}
</style>
