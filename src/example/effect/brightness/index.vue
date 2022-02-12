<template>
  <mars-pannel class="infoView">
    <a-form>
      <a-form-item label="状态:">
        <a-checkbox @change="onChangeState" v-model:checked="enabled">开启效果</a-checkbox>
      </a-form-item>

      <a-form-item label="亮度:">
        <a-slider @change="onChangeBrightness" v-model:value="brightness" :min="0" :max="5" :step="0.01" />
      </a-form-item>
    </a-form>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import * as mapWork from "./map.js"

const brightness = ref<number>(2)

const enabled = ref(true)

// 亮度
const onChangeBrightness = () => {
  mapWork.setBrightness(brightness.value)
}

const onChangeState = () => {
  mapWork.setBrightnessEffect(enabled.value)
}
</script>
<style scoped lang="less">
.infoView {
  width: 200px;
}
</style>
