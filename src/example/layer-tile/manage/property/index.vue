<template>
  <mars-pannel :visible="true" right="10" top="10" width="300">
    <div class="property-content">
      <h2 class="f-mb title">栅格底图参数</h2>
      <a-row :gutter="10">
        <a-col :span="15">
          <a-form-item label="亮度" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-slider
              v-model:value="formState.brightness"
              @change="changeOpacity('brightness', formState.brightness)"
              :min="0"
              :max="3"
              :step="0.01"
            />
          </a-form-item>
        </a-col>
        <a-col :span="9">
          <mars-input-number
            v-model:value="formState.brightness"
            @change="changeOpacity('brightness', formState.brightness)"
            :min="0"
            :max="3"
            :step="0.01"
          />
        </a-col>
        <a-col :span="15">
          <a-form-item label="对比度" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-slider v-model:value="formState.contrast" @change="changeOpacity('contrast', formState.contrast)" :min="0" :max="3" :step="0.01" />
          </a-form-item>
        </a-col>
        <a-col :span="9">
          <mars-input-number
            v-model:value="formState.contrast"
            @change="changeOpacity('contrast', formState.contrast)"
            :min="0"
            :max="3"
            :step="0.01"
          />
        </a-col>
        <a-col :span="15">
          <a-form-item label="色彩" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-slider v-model:value="formState.hue" @change="changeOpacity('hue', formState.hue)" :min="0" :max="3" :step="0.01" />
          </a-form-item>
        </a-col>
        <a-col :span="9">
          <mars-input-number v-model:value="formState.hue" @change="changeOpacity('hue', formState.hue)" :min="0" :max="3" :step="0.01" />
        </a-col>
        <a-col :span="15">
          <a-form-item label="饱和度" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-slider
              v-model:value="formState.saturation"
              @change="changeOpacity('saturation', formState.saturation)"
              :min="0"
              :max="3"
              :step="0.01"
            />
          </a-form-item>
        </a-col>
        <a-col :span="9">
          <mars-input-number
            v-model:value="formState.saturation"
            @change="changeOpacity('saturation', formState.saturation)"
            :min="0"
            :max="3"
            :step="0.01"
          />
        </a-col>
        <a-col :span="15">
          <a-form-item label="伽马值" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-slider v-model:value="formState.gamma" @change="changeOpacity('gamma', formState.gamma)" :min="0" :max="3" :step="0.01" />
          </a-form-item>
        </a-col>
        <a-col :span="9">
          <mars-input-number v-model:value="formState.gamma" @change="changeOpacity('gamma', formState.gamma)" :min="0" :max="3" :step="0.01" />
        </a-col>
        <a-col :span="15">
          <a-form-item label="透明度" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-slider v-model:value="formState.opacity" @change="changeOpacity('opacity', formState.opacity)" :min="0" :max="1" :step="0.01" />
          </a-form-item>
        </a-col>
        <a-col :span="9">
          <mars-input-number v-model:value="formState.opacity" @change="changeOpacity('opacity', formState.opacity)" :min="0" :max="1" :step="0.01" />
        </a-col>
      </a-row>
    </div>
  </mars-pannel>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  brightness: number
  contrast: number
  hue: number
  saturation: number
  gamma: number
  opacity: number
}

export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      brightness: 1,
      contrast: 1.16,
      hue: 0.1,
      saturation: 1,
      gamma: 0.53,
      opacity: 1
    })
    const changeOpacity = (attribute: string, val: number) => {
      mapWork.changeOpacity(attribute, val)
    }

    return {
      formState,
      changeOpacity,
      labelCol: {
        span: 8
      },
      labelAlign: "left"
    }
  }
})
</script>
<style lang="less" scoped>
.title {
  color: @mars-basecolor;
}

.property-content{
  width: 100%;
  overflow-x: hidden;
}
</style>
