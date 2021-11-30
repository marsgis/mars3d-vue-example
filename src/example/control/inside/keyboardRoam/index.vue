<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <a-row>
        <a-col :span="5">相机平移:</a-col>
        <a-col :span="19">
          <a-space>
            <span>W :向前</span>
            <span>S :向后</span>
            <span>D :向右</span>
            <span>A :向左</span>
            <span>Q :升高高度</span>
            <span>E :降低高度</span>
            <span title="">步长</span>
            <a-slider v-model:value="formState.slideStep" @change="changeSlider" :min="0" :max="300" :step="0.01" />
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="5">相对于相机本身:</a-col>
        <a-col :span="19">
          <a-space>
            <span>↑ :抬头</span>
            <span>↓ :低头</span>
            <span>← :向左旋转</span>
            <span>>→ :向右旋转</span>
            <span>↑ :抬头</span>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb">
      <a-row>
        <a-col :span="5">相对于屏幕中心点:</a-col>
        <a-col :span="19">
          <a-space>
            <span>I :飞近</span>
            <span>K :远离</span>
            <span>J :逆时针旋转</span>
            <span>L :顺时针旋转</span>
            <span>U :向上旋转</span>
            <span>O :向下旋转</span>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div class="f-mb f-tac">
      <a-space>
        <mars-button @click="centerAtDX1">室内</mars-button>
        <mars-button @click="centerAtDX2">室外</mars-button>
      </a-space>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  slideStep: number
}
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const activeKey = ref(["1", "2", "3", "4"])

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
.ant-slider {
  width: 160px;
}
.infoView {
  width: 428px;
  :deep(.ant-space) {
    flex-wrap: wrap;
  }
}
</style>
