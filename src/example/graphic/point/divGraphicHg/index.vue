<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="divGraphicYellow">效果一</mars-button>
      <mars-button @click="divGraphicBule">效果二</mars-button>
      <mars-button @click="divGraphicWhite">效果三</mars-button>
    </a-space>
  </PannelBox>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const divGraphicYellow = () => {
  mapWork.divGraphicYellow()
}

const divGraphicBule = () => {
  mapWork.divGraphicBule()
}

const divGraphicWhite = () => {
  mapWork.divGraphicWhite()
}
</script>

<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
