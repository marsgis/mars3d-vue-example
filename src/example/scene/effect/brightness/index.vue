<template>
  <pannel class="infoView">
    <a-form>
      <a-form-item label="状态:">
        <a-checkbox @change="isChecked" v-model:checked="checked">开启效果</a-checkbox>
      </a-form-item>

      <a-form-item label="亮度:">
        <a-slider @change="brightness" v-model:value="brightnessValue" :min="0" :max="5" :step="0.01" />
      </a-form-item>
    </a-form>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const brightnessValue = ref<number>(2)

const checked = ref(true)

// 亮度
const brightness = () => {
  mapWork.brightness(brightnessValue.value)
}

const isChecked = () => {
  mapWork.chkShowEffect(checked.value)
}
</script>
<style scoped lang="less">
.infoView {
  width: 200px;
}
</style>
