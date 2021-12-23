<template>
  <pannel class="infoView">
    <a-checkbox v-model:checked="onCheckedTriangulation" @change="formStateChange">地形三角网</a-checkbox>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const onCheckedTriangulation = ref<boolean>(false)

const formStateChange = () => {
  mapWork.checkedTriangulation(onCheckedTriangulation.value)
}
</script>
