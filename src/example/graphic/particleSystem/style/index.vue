<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">所在位置：</span>
        <mars-button @click="btnSelectPosition">图上选点</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">发射目标方向:</span>
        <mars-button @click="btnSelectTarget">图上选点</mars-button>
        <span>点高度:</span>
        <mars-input @change="txtTargetHeight" v-model:value="formState.pointHeight" :step="0.01" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">粒子图片大小:</span>
        <mars-slider @change="initParamView" v-model:value="formState.sliderParticleSize" :min="2" :max="60" :step="1" />
        <mars-input v-model:value="formState.sliderParticleSize" :min="2" :max="60" :step="1" />
        (px)
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">粒子开始比例:</span>
        <mars-slider @change="initParamView" v-model:value="formState.slideStart" :min="0.0" :max="10.0" :step="1" />
        <mars-input v-model:value="formState.slideStart" :min="0.0" :max="10.0" :step="1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">粒子结束比例:</span>
        <mars-slider @change="initParamView" v-model:value="formState.slideStop" :min="0.0" :max="10.0" :step="1" />
        <mars-input v-model:value="formState.slideStop" :min="0.0" :max="10.0" :step="1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">粒子发射数量:</span>
        <mars-slider @change="initParamView" v-model:value="formState.emissionRate" :min="0.0" :max="500.0" :step="1" />
        <mars-input v-model:value="formState.emissionRate" :min="0.0" :max="500.0" :step="1" />
        (次/秒)
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">最小寿命时长:</span>
        <mars-slider @change="initParamView" v-model:value="formState.slideMinLife" :min="0.1" :max="30.0" :step="0.1" />
        <mars-input v-model:value="formState.slideMinLife" :min="0.1" :max="30.0" :step="0.1" />
        (秒)
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">最大寿命时长:</span>
        <mars-slider @change="initParamView" v-model:value="formState.slideMaxLife" :min="0.1" :max="30.0" :step="0.1" />
        <mars-input v-model:value="formState.slideMaxLife" :min="0.1" :max="30.0" :step="0.1" />
        (秒)
      </a-space>
    </div>
    <!-- <div class="f-mb">
      <a-space>

        <span class="mars-pannel-item-label">最小速度:</span>
      <mars-slider @change="initParamView" v-model:value="formState.slideMinSpeed" :min="-20.0" :max="20.0" :step="1" />
      <mars-input v-model:value="formState.slideMinSpeed" :min="-20.0" :max="20.0" :step="1"/>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>

        <span class="mars-pannel-item-label">最大速度:</span>
      <mars-slider @change="initParamView" v-model:value="formState.slideMaxSpeed" :min="-20.0" :max="20.0" :step="1" />
      <mars-input v-model:value="formState.slideMaxSpeed" :min="-20.0" :max="20.0" :step="1"/>
      </a-space>
    </div> -->
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">重力因子:</span>
        <mars-slider @change="initParamView" v-model:value="formState.slideGravity" :min="-20.0" :max="20.0" :step="1" />
        <mars-input v-model:value="formState.slideGravity" :min="-20.0" :max="20.0" :step="1" />
      </a-space>
    </div>
  </mars-pannel>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

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
.mars-pannel-item-label {
  display: block;
  text-align: right;
  width: 80px;
}
.ant-slider {
  display: inline-block;
  margin: -2px 7px;
  width: 100px;
}
.ant-input-affix-wrapper {
  width: 70px;
}
.ant-input-suffix {
  margin-right: 4px;
}
.ant-input {
  width: 70px !important;
}
</style>
