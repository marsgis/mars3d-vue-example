<template>
  <mars-pannel class="infoView">
    <a-space>
      <mars-button @click="addLayer">叠加图层</mars-button>
      <mars-button @click="removeLayer">移除图层</mars-button>
    </a-space>
  </mars-pannel>
  <interest-search />
</template>

<script setup lang="ts">
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import InterestSearch from "@/components/mars-sample/interest-search.vue"
import * as mapWork from "./map.js"

const addLayer = () => {
  mapWork.addLayer()
}

const removeLayer = () => {
  mapWork.removeLayer()
}
</script>
