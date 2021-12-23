<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-row>
        <a-col :span="6">相机平移:</a-col>
        <a-col :span="18">
          <a-space>
            <span>Q :升高高度</span>
            <span>E :降低高度</span>
            <span>W :向前</span>
            <span>S :向后</span>
            <span>D :向右</span>
            <span>A :向左</span>
            <span title="平移的步长（单位：米）"> 步长</span>
            <a-slider v-model:value="slideStep" @change="onChangeSlider" :min="0" :max="300" :step="0.01" />
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="6">相机本身:</a-col>
        <a-col :span="18">
          <a-space>
            <span>↑ :抬头</span>
            <span>↓ :低头</span>
            <span>← :向左旋转</span>
            <span>→ :向右旋转</span>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="6">屏幕中心点:</a-col>
        <a-col :span="18">
          <a-space>
            <span>I :飞近</span>
            <span>K :远离</span>
            <span>U :向上旋转</span>
            <span>O :向下旋转</span>
            <span>J :逆时针旋转</span>
            <span>L :顺时针旋转</span>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb f-tac">
      <a-space>
        <mars-button @click="onChangeCenterAtDX1">室内</mars-button>
        <mars-button @click="onChangeCenterAtDX2">室外</mars-button>
      </a-space>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const slideStep = ref<number>(10)

const onChangeSlider = () => {
  mapWork.changeSlider(slideStep.value)
}
const onChangeCenterAtDX1 = () => {
  mapWork.centerAtDX1()
}
const onChangeCenterAtDX2 = () => {
  mapWork.centerAtDX2()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 103px;
  display: inline-block;
}
.infoView {
  width: 355px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
</style>
