<template>
  <mars-pannel :visible="true" right="10" top="10" width="300">
    <div style="width: 275px">
      <a-row :gutter="5">
        <a-col :span="24">
          <a-form-item label="粒子总数" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-slider v-model:value="formState.particlesNumber" @change="onParticleSystemOptionsChange" :min="1" :max="256 * 256" :step="1" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="消失不透明度" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-slider v-model:value="formState.fadeOpacity" @change="onParticleSystemOptionsChange" :min="0.9" :max="0.999" :step="0.001" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="下降率" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-slider v-model:value="formState.dropRate" @change="onParticleSystemOptionsChange" :min="0.0" :max="0.1" :step="0.001" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="下降速度" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-slider v-model:value="formState.dropRateBump" @change="onParticleSystemOptionsChange" :min="0.0" :max="0.2" :step="0.001" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="速度系数" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-slider v-model:value="formState.speedFactor" @change="onParticleSystemOptionsChange" :min="0.05" :max="1" :step="0.01" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="线宽度" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-slider v-model:value="formState.lineWidth" @change="onParticleSystemOptionsChange" :min="0.01" :max="16.0" :step="0.01" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="线颜色" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-color-picker v-model:value="formState.color" @change="changeColor" />
          </a-form-item>
        </a-col>
      </a-row>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  particlesNumber: number
  fadeOpacity: number
  dropRate: number
  dropRateBump: number
  speedFactor: number
  lineWidth: number
  color: string
}

const labelCol = ref({ span: 8 })
const labelAlign = ref("left")

const formState: UnwrapRef<FormState> = reactive({
  particlesNumber: 9000,
  fadeOpacity: 0.996,
  dropRate: 0.003,
  dropRateBump: 0.01,
  speedFactor: 0.2,
  lineWidth: 4.0,
  color: "#4696db"
})

// 参数调节面板
const onParticleSystemOptionsChange = () => {
  mapWork.onParticleSystemOptionsChange(formState)
}

// 修改颜色
const changeColor = () => {
  mapWork.changeColor(formState.color)
}
</script>
<style scoped lang="less">
.infoView {
  width: 300px;
}
</style>
