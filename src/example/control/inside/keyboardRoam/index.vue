<template>
  <PannelBox class="infoView">
      <a-row :gutter="[1,10]">
        <a-col :span="4">相机平移：</a-col>
        <a-col :span="2">W :向前</a-col>
        <a-col :span="2">S :向后</a-col>
        <a-col :span="2">D :向右</a-col>
        <a-col :span="2">A :向左</a-col>
        <a-col :span="3">Q :升高高度</a-col>
        <a-col :span="3">E :降低高度</a-col>
        <a-col :span="1" title="平移的步长（单位：米）">步长</a-col>
        <a-col :span="5">
          <a-slider v-model:value="formState.slideStep" @change="changeSlider" :min="0" :max="300" :step="0.01" />
        </a-col>

        <a-col :span="4">相对于相机本身：</a-col>
        <a-col :span="2">↑ :抬头</a-col>
        <a-col :span="2">↓ :低头</a-col>
        <a-col :span="3">← :向左旋转</a-col>
        <a-col :span="3">→ :向右旋转</a-col>
        <a-col :span="10"></a-col>

        <a-col :span="4">相对于屏幕中心点：</a-col>
        <a-col :span="2">I :飞近</a-col>
        <a-col :span="2">K :远离</a-col>
        <a-col :span="3">J :逆时针旋转</a-col>
        <a-col :span="3">L :顺时针旋转</a-col>
        <a-col :span="3">U :向上旋转</a-col>
        <a-col :span="3">O :向下旋转</a-col>
        <a-col :span="4"></a-col>

        <a-col :span="24">
          <a-space>
            <span>演示视角：</span>
            <mars-button @click="centerAtDX1">室内</mars-button>
            <mars-button @click="centerAtDX2">室外</mars-button>
          </a-space>
        </a-col>
      </a-row>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  slideStep:number
}
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  slideStep: 10
})

const changeSlider = () => {
  mapWork.changeSlider(formState.slideStep)
}
const centerAtDX1 = () => {
  mapWork.centerAtDX1()
}
const centerAtDX2 = () => {
  mapWork.centerAtDX2()
}
</script>
<style scoped lang="less">
.infoView {
  width:765px;
  margin: 5px 10px 20px 10px;
}
.ant-slider {
margin-top: 3px;
}
</style>
