<template>
  <pannel class="infoView">
    <a-space>
      <mars-button @click="addGaodeLayer">高德交通态势图</mars-button>
      <mars-button @click="addBaiduLayer">百度交通态势图</mars-button>
    </a-space>
  </pannel>
  <interest-search :mapWork="mapWork"/>
</template>

<script setup lang="ts">
import Pannel from "@/components/marsgis/pannel.vue"
import InterestSearch from "@comp/mars-sample/interest-search.vue"
import * as mapWork from "./map.js"

const addGaodeLayer = () => {
  mapWork.addGaodeLayer()
}

const addBaiduLayer = () => {
  mapWork.addBaiduLayer()
}
</script>
