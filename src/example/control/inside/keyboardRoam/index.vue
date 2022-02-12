<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <a-row>
        <a-col :span="6">演示视角：</a-col>
        <a-col :span="7">
          <mars-button @click="onChangeCenterAtDX1">室内</mars-button>
          <mars-button @click="onChangeCenterAtDX2">室外</mars-button>
        </a-col>
        <a-col :span="4">
          <span title="平移的步长（单位：米）" class="tip-name" > 平移步长:</span>
        </a-col>
        <a-col :span="7">
          <a-slider v-model:value="slideStep" @change="onChangeSlider" :min="0" :max="300" :step="0.01" />
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="6">相机平移:</a-col>
        <a-col :span="18">
          <a-space>
            <span>W :向前</span>
            <span>S :向后</span>
            <span>D :向右</span>
            <span>A :向左</span>
            <span>Q :升高</span>
            <span>E :降低</span>
          </a-space>
        </a-col>
      </a-row>

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

      <a-row>
        <a-col :span="6">屏幕中心点:</a-col>
        <a-col :span="18">
          <a-space>
            <span>I :飞近</span>
            <span>K :远离</span>
            <span>U :向上</span>
            <span>O :向下</span>
            <span>J :逆时针</span>
            <span>L :顺时针</span>
          </a-space>
        </a-col>
      </a-row>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
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
.infoView {
  width: 450px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
.ant-slider {
  width: 103px;
  display: inline-block;
}
.ant-row {
  margin-bottom: 10px;
}
.tip-name{
  line-height: 35px;
}
</style>
