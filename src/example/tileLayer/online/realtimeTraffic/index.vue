<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="addGaodeLayer">高德交通态势图</mars-button>
      <mars-button @click="addBaiduLayer">百度交通态势图</mars-button>
    </a-space>
  </PannelBox>
  <InterestSearch :mapWork="mapWork"/>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import InterestSearch from "@comp/MarsSample/InterestSearch.vue"
import * as mapWork from "./map.js"

const addGaodeLayer = () => {
  mapWork.addGaodeLayer()
}

const addBaiduLayer = () => {
  mapWork.addBaiduLayer()
}
</script>
