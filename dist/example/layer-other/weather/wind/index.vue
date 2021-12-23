<template>
  <pannel class="infoView">
    <a-row :gutter="5">
      <a-col :span="24">
        <a-form-item label="maxParticles" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider v-model:value="formState.maxParticles" @change="onParticleSystemOptionsChange" :min="1" :max="256 * 256" :step="1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="particleHeight" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider v-model:value="formState.particleHeight" @change="onParticleSystemOptionsChange" :min="1" :max="10000" :step="1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="fadeOpacity" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider v-model:value="formState.fadeOpacity" @change="onParticleSystemOptionsChange" :min="0.9" :max="0.999" :step="0.001" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="dropRate" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider v-model:value="formState.dropRate" @change="onParticleSystemOptionsChange" :min="0.0" :max="0.1" :step="0.001" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="dropRateBump" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider v-model:value="formState.dropRateBump" @change="onParticleSystemOptionsChange" :min="0.0" :max="0.2" :step="0.001" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="speedFactor" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider v-model:value="formState.speedFactor" @change="onParticleSystemOptionsChange" :min="0.05" :max="1" :step="0.01" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="lineWidth" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider v-model:value="formState.lineWidth" @change="onParticleSystemOptionsChange" :min="0.01" :max="16.0" :step="0.01" />
        </a-form-item>
      </a-col>
    </a-row>
  </pannel>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  maxParticles: number
  particleHeight: number
  fadeOpacity: number
  dropRate: number
  dropRateBump: number
  speedFactor: number
  lineWidth: number
}

const labelCol = ref({ span: 8 })
const labelAlign = ref("left")

const formState: UnwrapRef<FormState> = reactive({
  maxParticles: 9000,
  particleHeight: 1.0,
  fadeOpacity: 0.996,
  dropRate: 0.003,
  dropRateBump: 0.01,
  speedFactor: 0.2,
  lineWidth: 4.0
})

// 参数调节面板
const onParticleSystemOptionsChange = () => {
  mapWork.onParticleSystemOptionsChange(formState)
}
</script>
<style scoped lang="less">
.infoView {
  width: 300px;
}
</style>
