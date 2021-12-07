<template>
  <PannelBox class="infoView">
    <a-form-item label="速度:">
      <a-slider @change="formStateChange" v-model:value="slideStep" :min="1" :max="100" :step="1" />
    </a-form-item>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
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
