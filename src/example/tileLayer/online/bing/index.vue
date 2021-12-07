<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="addLayer">叠加图层</mars-button>
      <mars-button @click="removeLayer">移除图层</mars-button>
    </a-space>
  </PannelBox>
  <InterestSearch :mapWork="mapWork"/>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import InterestSearch from "@comp/MarsSample/InterestSearch.vue"
import * as mapWork from "./map.js"

const addLayer = () => {
  mapWork.addLayer()
}

const removeLayer = () => {
  mapWork.removeLayer()
}
</script>
