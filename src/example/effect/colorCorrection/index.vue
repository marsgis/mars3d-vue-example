<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-form  :labelCol="{ span:4 }">
      <a-form-item label="启用">
        <mars-switch v-model:checked="formState.enabled" @change="onChangeState" />
      </a-form-item>

      <a-form-item label="亮度">
        <mars-slider v-model:value="formState.brightness" @change="onChangeBrightness" :min="0.0" :max="2.0"
          :step="0.1" />
      </a-form-item>
      <a-form-item label="对比度">
        <mars-slider v-model:value="formState.contrast" @change="onChangeContrast" :min="0.0" :max="2.0" :step="0.1" />
      </a-form-item>
      <a-form-item label="色调">
        <mars-slider v-model:value="formState.hue" @change="onChangeigma" :min="0.0" :max="1.0" :step="0.1" />
      </a-form-item>
      <a-form-item label="饱和度">
        <mars-slider v-model:value="formState.saturation" @change="onChangeSaturation" :min="0.0" :max="2.0"
          :step="0.1" />
      </a-form-item>
    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"

const formState = reactive({
  enabled: true,
  brightness: 1.0,
  contrast: 1.0,
  hue: 0.0,
  saturation: 1.0
})

const onChangeState = () => {
  mapWork.setDepthOfField(formState.enabled)
}

const onChangeBrightness = () => {
  mapWork.setBrightness(formState.brightness)
}

const onChangeContrast = () => {
  mapWork.setContrast(formState.contrast)
}

const onChangeigma = () => {
  mapWork.setHue(formState.hue)
}

const onChangeSaturation = () => {
  mapWork.setSaturation(formState.saturation)
}
</script>
<style scoped lang="less"> </style>
