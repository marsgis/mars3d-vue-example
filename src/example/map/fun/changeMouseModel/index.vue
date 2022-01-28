<template>
  <pannel class="infoView">
    <a-radio-group @change="shadingMaterials" v-model:value="value">
      <a-radio :value="1">更换中键和右键 </a-radio>
      <a-radio :value="2">Cesium操作习惯</a-radio>
    </a-radio-group>
  </pannel>
  <location-to />
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import LocationTo from "@comp/mars-sample/location-to.vue"
import * as mapWork from "./map.js"

const value = ref<number>(1)

const shadingMaterials = () => {
  mapWork.shadingMaterials(value.value)
}
</script>
