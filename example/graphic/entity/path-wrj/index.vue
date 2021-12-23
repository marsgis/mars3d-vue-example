<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="viewAircraft">跟踪视角</mars-button>
      <mars-button @click="viewTopDown">上方视角</mars-button>
      <mars-button @click="viewSide">侧方视角</mars-button>
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/marsgis/pannel.vue"
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
