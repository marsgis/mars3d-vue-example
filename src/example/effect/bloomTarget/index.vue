<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">状 态:</span>
        <mars-switch v-model:checked="formState.enabled" @change="onChangeState">开启效果</mars-switch>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">泛光颜色:</span>
        <mars-color-picker v-model:value="formState.color" @change="onChangeColor" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">亮 度:</span>
        <mars-slider v-model:value="formState.brightness" @change="onChangeBrightness" :min="-1.0" :max="1.0"
          :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">亮度增强比例:</span>
        <mars-slider v-model:value="formState.ratio" @change="onChangeRatio" :min="1" :max="10" :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">亮度光滑:</span>
        <mars-slider v-model:value="formState.smoothWidth" @change="onChangeSmoothWidth" :min="0.0" :max="5.0"
          :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">亮度阈值:</span>
        <mars-slider v-model:value="formState.threshole" @change="onChangeThreshole" :min="0.0" :max="10" :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">对比度:</span>
        <mars-slider v-model:value="formState.contrast" @change="onChangeContrast" :min="-255.0" :max="255.0"
          :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">模糊样本:</span>
        <mars-slider v-model:value="formState.blurSamples" @change="onChangeBlurSamples" :min="1.0" :max="50.0"
          :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">步 长:</span>
        <mars-slider v-model:value="formState.stepSize" @change="onChangeStep" :min="0" :max="7" :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">增 量:</span>
        <mars-slider v-model:value="formState.delta" @change="onChangeDelta" :min="1" :max="5" :step="0.01" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">Sigma:</span>
        <mars-slider v-model:value="formState.sigma" @change="onChangeSigma" :min="1" :max="10" :step="0.01" />
      </a-space>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"

const formState = reactive({
  enabled: true,
  contrast: 128,
  brightness: -0.3,
  delta: 1.0,
  stepSize: 5.0,
  sigma: 3.78,
  blurSamples: 32.0,
  ratio: 2.0,
  threshole: 0.0,
  smoothWidth: 0.01,
  color: "#ffff00"
})

const onChangeState = () => {
  mapWork.setBloomTargetEffect(formState.enabled)
}

const onChangeBrightness = () => {
  mapWork.setBrightness(formState.brightness)
}

const onChangeDelta = () => {
  mapWork.setDelta(formState.delta)
}

const onChangeStep = () => {
  mapWork.setStep(formState.stepSize)
}

const onChangeSigma = () => {
  mapWork.setSigma(formState.sigma)
}

const onChangeContrast = () => {
  mapWork.setContrast(formState.contrast)
}

const onChangeBlurSamples = () => {
  mapWork.setBlurSamples(formState.blurSamples)
}

const onChangeThreshole = () => {
  mapWork.setThreshole(formState.threshole)
}

const onChangeRatio = () => {
  mapWork.setRatio(formState.ratio)
}

const onChangeSmoothWidth = () => {
  mapWork.setSmoothWidth(formState.smoothWidth)
}

const onChangeColor = () => {
  mapWork.setColor(formState.color)
}
</script>
<style scoped lang="less">
.mars-pannel-item-label {
  width: 88px;
}

.ant-slider {
  width: 195px;
}
.mars-color-view {
  width: 200px;
}
</style>
