<template>
  <mars-pannel class="infoView">
    <mars-button @click="onClickSelPoint">追踪目标点</mars-button>
  </mars-pannel>
</template>

<script setup lang="ts">
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import * as mapWork from "./map.js"

const onClickSelPoint = () => {
  mapWork.onClickSelPoint()
}
</script>
