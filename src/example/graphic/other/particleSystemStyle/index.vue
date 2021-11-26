<template>
  <PannelBox class="infoView">
    <a-form :model="formState">
      <a-form-item>
        <span class="pannel-item-label">所在位置：</span>
        <mars-button @click="btnSelectPosition">图上选点</mars-button>
      </a-form-item>
      <a-form-item>
        <span class="pannel-item-label">发射目标方向:</span>
        <mars-button @click="btnSelectTarget">图上选点</mars-button>
        <span class="pannel-item-label">点高度:</span>
        <mars-input class="inputNum" @change="txtTargetHeight" v-model:value="formState.pointHeight" :step="0.01" />
      </a-form-item>

      <a-form-item>
        <span class="pannel-item-label">粒子图片大小:</span>
        <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.sliderParticleSize" :min="2" :max="60" :step="1" />
        <mars-input class="inputNum" v-model:value="formState.sliderParticleSize" :min="2" :max="60" :step="1" />&nbsp;&nbsp;(px)
      </a-form-item>
      <a-form-item>
        <span class="pannel-item-label">粒子开始比例:</span>
        <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.slideStart" :min="0.0" :max="10.0" :step="1" />
        <mars-input class="inputNum" v-model:value="formState.slideStart" :min="0.0" :max="10.0" :step="1" />
      </a-form-item>
      <a-form-item>
        <span class="pannel-item-label">粒子结束比例:</span>
        <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.slideStop" :min="0.0" :max="10.0" :step="1" />
        <mars-input class="inputNum" v-model:value="formState.slideStop" :min="0.0" :max="10.0" :step="1" />
      </a-form-item>
      <a-form-item>
        <span class="pannel-item-label">粒子发射数量:</span>
        <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.emissionRate" :min="0.0" :max="500.0" :step="1" />
        <mars-input class="inputNum" v-model:value="formState.emissionRate" :min="0.0" :max="500.0" :step="1" />&nbsp;&nbsp;(次/秒)
      </a-form-item>
      <a-form-item>
        <span class="pannel-item-label">最小寿命时长:</span>
        <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.slideMinLife" :min="0.1" :max="30.0" :step="0.1" />
        <mars-input class="inputNum" v-model:value="formState.slideMinLife" :min="0.1" :max="30.0" :step="0.1" />&nbsp;&nbsp;(秒)
      </a-form-item>
      <a-form-item>
        <span class="pannel-item-label">最大寿命时长:</span>
        <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.slideMaxLife" :min="0.1" :max="30.0" :step="0.1" />
        <mars-input class="inputNum" v-model:value="formState.slideMaxLife" :min="0.1" :max="30.0" :step="0.1" />&nbsp;&nbsp;(秒)
      </a-form-item>
      <!-- <a-form-item>
      <span class="pannel-item-label">最小速度:</span>
      <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.slideMinSpeed" :min="-20.0" :max="20.0" :step="1" />
      <mars-input class="inputNum" v-model:value="formState.slideMinSpeed" :min="-20.0" :max="20.0" :step="1"/>
    </a-form-item>
    <a-form-item>
      <span class="pannel-item-label">最大速度:</span>
      <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.slideMaxSpeed" :min="-20.0" :max="20.0" :step="1" />
      <mars-input class="inputNum" v-model:value="formState.slideMaxSpeed" :min="-20.0" :max="20.0" :step="1"/>
    </a-form-item> -->
      <a-form-item>
        <span class="pannel-item-label">重力因子:</span>
        <a-slider class="sliderNum" @change="initParamView" v-model:value="formState.slideGravity" :min="-20.0" :max="20.0" :step="1" />
        <mars-input class="inputNum" v-model:value="formState.slideGravity" :min="-20.0" :max="20.0" :step="1" />
      </a-form-item>
    </a-form>
  </PannelBox>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

interface FormState {
  pointHeight: string
  sliderParticleSize: number
  slideStart: number
  slideStop: number
  emissionRate: number
  slideMinLife: number
  slideMaxLife: number
  // slideMinSpeed:number
  // slideMaxSpeed:number
  slideGravity: number
}
const formState: UnwrapRef<FormState> = reactive({
  pointHeight: "10.0",
  sliderParticleSize: 20,
  slideStart: 1,
  slideStop: 3,
  emissionRate: 200,
  slideMinLife: 1.2,
  slideMaxLife: 3.2,
  // slideMinSpeed: 1.0,
  // slideMaxSpeed: 4.0,
  slideGravity: -11.0
})
const initParamView = () => {
  mapWork.initParamView(formState)
}

// 发射的目标
const txtTargetHeight = () => {
  mapWork.txtTargetHeight(formState.pointHeight)
}
const btnSelectTarget = () => {
  mapWork.btnSelectTarget(formState.pointHeight)
}

// 所在位置
const btnSelectPosition = () => {
  mapWork.btnSelectPosition()
}
</script>
<style>
.pannel-item-label {
  width: 100px;
  display: inline-block;
  text-align: center;
}
.sliderNum {
  display: inline-block;
  margin: -2px 7px;
  width: 100px;
}
.inputNum {
  width: 80px;
}
</style>
