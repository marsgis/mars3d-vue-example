<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="addLayer">叠加图层</mars-button>
      <mars-button @click="removeLayer">移除图层</mars-button>
    </a-space>
  </pannel>
</template>

<script lang="ts" setup>
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const addLayer = () => {
  mapWork.addLayer()
}

const removeLayer = () => {
  mapWork.removeLayer()
}
</script>
