<template>
  <pannel class="infoView roamLinePanel">
    <a-form>
      <a-form-item>
        <a-row :gutter="[0, 10]">
          <a-col :span="8">模型角度:</a-col>
          <a-col :span="11">
            <a-radio-group v-model:value="formState.radio">
              <a-radio value="1">自动</a-radio>
              <a-radio value="2">手动</a-radio>
            </a-radio-group>
          </a-col>
        </a-row>
      </a-form-item>
      <div v-show="formState.radio === '2'">
        <a-form>
          <a-form-item>
            <a-row :gutter="[0, 10]">
              <a-col :span="8">heading值:</a-col>
              <a-col :span="11">根据路线自动计算</a-col>

              <a-col :span="8">pitch值(前后):</a-col>
              <a-col :span="11">
                <a-slider @change="updateModel" v-model:value="formState.slidePitchStep" :min="-90" :max="90" :step="0.01" />
              </a-col>

              <a-col :span="8">roll值(左右):</a-col>
              <a-col :span="11">
                <a-slider @change="updateModel" v-model:value="formState.slideRollStep" :min="-90" :max="90" :step="0.01" />
              </a-col>
            </a-row>
          </a-form-item>
        </a-form>
      </div>
      <mars-button @click="btnClear"> 清除地面投影</mars-button>
    </a-form>
  </pannel>
  <roamline-panel />
</template>

<script setup lang="ts">
import { reactive } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import roamlinePanel from "@/components/mars-sample/roamline-panel.vue"
import type { UnwrapRef } from "vue"
 import * as mapWork from "./map.js"

interface FormState {
  radio: string
  slidePitchStep: number
  slideRollStep: number
}


const formState: UnwrapRef<FormState> = reactive({
  radio: "2",
  slidePitchStep: 0,
  slideRollStep: 10
})

mapWork.eventTarget.on("loadOk", () => {
  mapWork.updateModel(false, formState)
})

const updateModel = () => {
  mapWork.updateModel(false, formState)
}

const btnClear = () => {
  mapWork.btnClear()
}
</script>

<style scoped lang="less">
.roamLinePanel {
  width: 300px;
}
</style>
