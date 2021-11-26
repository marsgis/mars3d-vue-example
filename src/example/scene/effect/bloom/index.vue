<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">状态:</span>
          <a-checkbox v-model:checked="formState.chkShowEffect" @change="bindShowEffect">开启效果</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">对比度:</span>
          <a-slider v-model:value="formState.txt_contrast" @change="txt_contrast" :min="-255.0" :max="255.0" :step="0.01" />
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">亮度:</span>
          <a-slider v-model:value="formState.txt_brightness" @change="txt_brightness" :min="-0.1" :max="3.0" :step="0.01" />
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">增量:</span>
          <a-slider v-model:value="formState.txt_delta" @change="txt_delta" :min="1" :max="5" :step="0.01" />
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">步长:</span>
          <a-slider v-model:value="formState.txt_stepSize" @change="txt_stepSize" :min="0" :max="7" :step="0.01" />
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">Sigma:</span>
          <a-slider v-model:value="formState.txt_sigma" @change="txt_sigma" :min="1" :max="10" :step="0.01" />
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState = reactive({
  chkShowEffect: true,
  txt_contrast: 128,
  txt_brightness: -0.3,
  txt_delta: 1.0,
  txt_stepSize: 5.0,
  txt_sigma: 3.78
})

const bindShowEffect = () => {
  mapWork.bindShowEffect(formState.chkShowEffect)
}
const txt_contrast = () => {
  mapWork.txt_contrast(formState.txt_contrast)
}
const txt_brightness = () => {
  mapWork.txt_brightness(formState.txt_brightness)
}
const txt_delta = () => {
  mapWork.txt_delta(formState.txt_delta)
}
const txt_stepSize = () => {
  mapWork.txt_stepSize(formState.txt_stepSize)
}
const txt_sigma = () => {
  mapWork.txt_sigma(formState.txt_sigma)
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 45px;
}
.ant-slider {
  width: 155px;
}
</style>
