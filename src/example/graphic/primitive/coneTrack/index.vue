<template>
  <mars-pannel class="infoView">
    <layer-state />
    <mars-button @click="onClickSelPoint">追踪目标点</mars-button>
  </mars-pannel>
</template>

<script setup lang="ts">
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

const onClickSelPoint = () => {
  mapWork.onClickSelPoint()
}
</script>
