<template>
  <pannel class="infoView">
    <a-checkbox v-model:checked="enabledSmallTooltip" @change="formStateChange">启用/禁用</a-checkbox>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const enabledSmallTooltip = ref<boolean>(true)
const formStateChange = () => {
  mapWork.enabledSmallTooltip(enabledSmallTooltip.value)
}
</script>
