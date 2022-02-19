<template>
  <mars-pannel :visible="true" right="10" top="10">
    <layer-state />
    <mars-button @click="onClickSelPoint">追踪目标点</mars-button>
  </mars-pannel>
</template>

<script lang="ts" setup>
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

const onClickSelPoint = () => {
  mapWork.onClickSelPoint()
}
</script>
