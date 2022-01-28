<template>
  <pannel class="infoView">
    <a-space>
      <span>夸张程度:</span>
      <a-slider :min="1" :max="50" v-model:value="terrainExaggeration" @change="formStateChange" />
    </a-space>
  </pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const terrainExaggeration = ref<number>(1)

const formStateChange = () => {
  mapWork.changeTerrain(terrainExaggeration.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 100px;
}
</style>
