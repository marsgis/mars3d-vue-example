<template>
  <PannelBox class="infoView">
    <mars-button @click="onClickSelPoint">追踪目标点</mars-button>
  </PannelBox>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const onClickSelPoint = () => {
  mapWork.onClickSelPoint()
}
</script>
