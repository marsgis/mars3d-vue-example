<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">启用:</span>
        <a-switch v-model:checked="formState.chkShowEffect" @change="bindShowEffect" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">雾颜色:</span>
        <mars-color-picker v-model:value="formState.color" @change="changeColor" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">近距离:</span>
        <a-slider v-model:value="formState.fogByDistanceX" @change="fogByDistanceX" :min="1" :max="5000" :step="1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">远距离:</span>
        <a-slider v-model:value="formState.fogByDistanceZ" @change="fogByDistanceZ" :min="100" :max="50000" :step="1" />
      </a-space>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const formState = reactive({
  chkShowEffect: true,
  color: "#ffffff",
  fogByDistanceX: 100,
  fogByDistanceZ: 9000
})

const bindShowEffect = () => {
  mapWork.bindShowEffect(formState.chkShowEffect)
}
const changeColor = () => {
  mapWork.changeColor(formState.color)
}
const fogByDistanceX = () => {
  mapWork.fogByDistanceX(formState.fogByDistanceX)
}
const fogByDistanceZ = () => {
  mapWork.fogByDistanceZ(formState.fogByDistanceZ)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 40px;
}
.ant-slider {
  width: 160px;
}
</style>
