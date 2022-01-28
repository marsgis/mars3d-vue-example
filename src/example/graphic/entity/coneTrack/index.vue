<template>
  <pannel class="infoView">
    <mars-button @click="onClickSelPoint">追踪目标点</mars-button>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const onClickSelPoint = () => {
  mapWork.onClickSelPoint()
}
</script>
