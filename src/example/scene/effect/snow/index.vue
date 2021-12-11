<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <a-checkbox @change="isSnowChecked" v-model:checked="snowchecked">下雪效果</a-checkbox>
        <a-checkbox @change="isCoverChecked" v-model:checked="coverchecked">积雪效果</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">速度:</span>
        <a-slider @change="speed" v-model:value="speedValue" :min="1" :max="100" />
      </a-space>
    </div>

    <div>
      <a-space>
        <span class="pannel-item-label">积雪程度:</span>
        <a-slider @change="height" v-model:value="heightValue" :min="0" :max="1" :step="0.1" />
      </a-space>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

// 下雪速度
const speedValue = ref<number>(20)
const speed = () => {
  mapWork.snowSpeed(speedValue.value)
}

// 粒子大小
const heightValue = ref<number>(0.6)
const height = () => {
  mapWork.sonwAlpha(heightValue.value)
}

// 是否开启下雪效果
const snowchecked = ref(true)
const isSnowChecked = () => {
  mapWork.chkSnow(snowchecked.value)
}

// 是否开启积雪效果
const coverchecked = ref(true)
const isCoverChecked = () => {
  mapWork.chkSnowCover(coverchecked.value)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 55px;
}
.ant-slider {
  width: 145px;
}
</style>
