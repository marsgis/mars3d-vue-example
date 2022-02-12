<template>
  <mars-pannel class="infoView">
    <a-space>
      <mars-button @click="addGaodeLayer">高德交通态势图</mars-button>
      <mars-button @click="addBaiduLayer">百度交通态势图</mars-button>
    </a-space>
  </mars-pannel>
  <interest-search />
</template>

<script setup lang="ts">
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import InterestSearch from "@/components/mars-sample/interest-search.vue"
import * as mapWork from "./map.js"

const addGaodeLayer = () => {
  mapWork.addGaodeLayer()
}

const addBaiduLayer = () => {
  mapWork.addBaiduLayer()
}
</script>
