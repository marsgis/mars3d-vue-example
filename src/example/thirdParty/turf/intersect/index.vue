<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="intersect">求交</mars-button>
      <mars-button @click="clearAll">清除</mars-button>
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/marsgis/pannel.vue"
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
