<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="addLayer">叠加图层</mars-button>
      <mars-button @click="removeLayer">移除图层</mars-button>
    </a-space>
  </pannel>
  <interest-search :mapWork="mapWork"/>
</template>

<script setup lang="ts">
import Pannel from "@/components/marsgis/pannel.vue"
import InterestSearch from "@comp/mars-sample/interest-search.vue"
import * as mapWork from "./map.js"

const addLayer = () => {
  mapWork.addLayer()
}

const removeLayer = () => {
  mapWork.removeLayer()
}
</script>
