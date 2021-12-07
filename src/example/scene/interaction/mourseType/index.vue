<template>
  <PannelBox class="infoView">
    <a-radio-group @change="shadingMaterials" v-model:value="value">
      <a-radio :value="1">更换中键和右键 </a-radio>
      <a-radio :value="2">Cesium操作习惯</a-radio>
    </a-radio-group>
  </PannelBox>
  <LocationTo />
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import * as mapWork from "./map.js"

const value = ref<number>(1)

const shadingMaterials = () => {
  mapWork.shadingMaterials(value.value)
}
</script>
