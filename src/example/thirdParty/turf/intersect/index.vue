<template>
  <div class="map_btn">
    <a-space :size="10">
      <mars-button @click="intersect">求交</mars-button>
      <mars-button danger @click="clearAll">清除</mars-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

// 面求交
const intersect = () => {
  mapWork.intersect()
}
// 清除
const clearAll = () => {
  mapWork.clear()
}
</script>
<style lang="less" scoped>
.map_btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;

  .mars-button {
    width: 120px;
    height: 46px;
  }
}
</style>
