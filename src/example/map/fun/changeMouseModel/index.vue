<template>
  <mars-pannel class="infoView">
    <a-radio-group @change="shadingMaterials" v-model:value="value">
      <a-radio :value="1">更换中键和右键 </a-radio>
      <a-radio :value="2">Cesium操作习惯</a-radio>
    </a-radio-group>
  </mars-pannel>
  <location-to />
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import LocationTo from "@/components/mars-sample/location-to.vue"
import * as mapWork from "./map.js"

const value = ref<number>(1)

const shadingMaterials = () => {
  mapWork.shadingMaterials(value.value)
}
</script>
