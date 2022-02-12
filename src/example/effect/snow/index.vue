<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <a-checkbox @change="onChangeSnowState" v-model:checked="formState.enabledSnow">下雪效果</a-checkbox>
        <a-checkbox @change="onChangeCoverState" v-model:checked="formState.enabledCover">积雪效果</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">速度:</span>
        <a-slider @change="onChangeSpeed" v-model:value="formState.speed" :min="1" :max="100" />
      </a-space>
    </div>

    <div>
      <a-space>
        <span class="mars-pannel-item-label">积雪程度:</span>
        <a-slider @change="onChangeAlpha" v-model:value="formState.alpha" :min="0" :max="1" :step="0.1" />
      </a-space>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import * as mapWork from "./map.js"

const formState = reactive({
  enabledSnow: true,
  enabledCover: true,
  speed: 20,
  alpha: 0.6
})

// 下雪速度
const onChangeSpeed = () => {
  mapWork.setSpeed(formState.speed)
}

// 积雪厚度
const onChangeAlpha = () => {
  mapWork.setAlpha(formState.alpha)
}

// 是否开启下雪效果
const onChangeSnowState = () => {
  mapWork.setSnow(formState.enabledSnow)
}

// 是否开启积雪效果
const onChangeCoverState = () => {
  mapWork.setCover(formState.enabledCover)
}
</script>
<style scoped lang="less">
.mars-pannel-item-label {
  width: 55px;
}
.ant-slider {
  width: 145px;
}
</style>
