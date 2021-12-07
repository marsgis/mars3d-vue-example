<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="viewAircraft">跟踪视角</mars-button>
      <mars-button @click="viewTopDown">上方视角</mars-button>
      <mars-button @click="viewSide">侧方视角</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const viewAircraft = () => {
  mapWork.viewAircraft()
}

const viewTopDown = () => {
  mapWork.viewTopDown()
}

const viewSide = () => {
  mapWork.viewSide()
}
</script>
