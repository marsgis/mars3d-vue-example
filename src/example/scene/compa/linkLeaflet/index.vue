<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="viewTo23D">分屏</mars-button>
      <mars-button @click="viewTo2d">仅2D</mars-button>
      <mars-button @click="viewTo3d">仅3D</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const viewTo23D = () => {
  mapWork.mapManager.viewTo23D()
}

const viewTo2d = () => {
  mapWork.mapManager.viewTo2d()
}
const viewTo3d = () => {
  mapWork.mapManager.viewTo3d()
}
</script>
