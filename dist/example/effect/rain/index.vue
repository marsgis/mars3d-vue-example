<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">启用状态:</span>
        <a-switch v-model:checked="checked" @change="chkShowEffect" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">粒子速度:</span>
        <a-slider @change="speed" v-model:value="speedValue" :min="1" :max="100" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">粒子大小:</span>
        <a-slider @change="size" v-model:value="sizeValue" :min="1" :max="100" />
      </a-space>
    </div>

    <div>
      <a-space>
        <span class="pannel-item-label">粒子方向:</span>
        <a-slider @change="direction" v-model:value="directionValue" :min="-89" :max="89" />
      </a-space>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const checked = ref(true)
const speedValue = ref<number>(10)
const sizeValue = ref<number>(20)
const directionValue = ref<number>(-30)

// 是否开启特效
const chkShowEffect = () => {
  mapWork.chkShowEffect(checked.value)
}

// 粒子速度

const speed = () => {
  mapWork.rainSpeed(speedValue.value)
}

// 粒子大小
const size = () => {
  mapWork.rainSize(sizeValue.value)
}
// 粒子方向
const direction = () => {
  mapWork.rainDirection(directionValue.value)
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
