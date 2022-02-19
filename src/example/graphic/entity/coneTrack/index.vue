<template>
  <mars-pannel :visible="true" right="10" top="10">
    <mars-button @click="onClickSelPoint">追踪目标点</mars-button>
  </mars-pannel>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const onClickSelPoint = () => {
  mapWork.onClickSelPoint()
}
</script>
