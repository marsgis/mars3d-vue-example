<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="viewTo23D">分屏</mars-button>
      <mars-button @click="viewTo2d">仅2D</mars-button>
      <mars-button @click="viewTo3d">仅3D</mars-button>
    </a-space>
  </pannel>
</template>

<script setup lang="ts">
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const viewTo23D = () => {
  mapWork.viewTo23D()
}

const viewTo2d = () => {
  mapWork.viewTo2d()
}
const viewTo3d = () => {
  mapWork.viewTo3d()
}
</script>
