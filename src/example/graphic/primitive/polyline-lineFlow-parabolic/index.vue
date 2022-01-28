<template>
  <pannel class="infoView">
    <a-form-item label="速度:">
      <a-slider @change="formStateChange" v-model:value="slideStep" :min="1" :max="100" :step="1" />
    </a-form-item>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const slideStep = ref<number>(10)
const formStateChange = () => {
  mapWork.changeSlide(slideStep.value)
}
</script>
<style scoped lang="less">
.infoView {
  width: 245px;
}
</style>
