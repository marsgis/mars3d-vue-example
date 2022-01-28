<template>
  <pannel class="infoView">
    <span>提示：请单击地图，分析拾取点最近的体育场所。</span>
    <mars-button @click="clearAll">清除</mars-button>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

// 清除
const clearAll = () => {
  mapWork.clearAll()
}
</script>
