<template>
  <pannel class="infoView">
    <mars-button @click="onClickSelPoint">追踪目标点</mars-button>
  </pannel>
</template>

<script lang="ts" setup>
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const onClickSelPoint = () => {
  mapWork.onClickSelPoint()
}
</script>
