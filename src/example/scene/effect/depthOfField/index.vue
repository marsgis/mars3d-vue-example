<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="启用">
      <a-switch v-model:checked="formState.chkShowEffect" @change="bindShowEffect" />
      </a-form-item>

      <a-form-item label="焦距">
        <a-slider v-model:value="formState.txt_focalDistance" @change="txt_focalDistance" :min="0.0" :max="500.0" :step="1" />
      </a-form-item>
      <a-form-item label="增量">
        <a-slider v-model:value="formState.txt_delta" @change="txt_delta" :min="0.1" :max="2" :step="0.01" />
      </a-form-item>
      <a-form-item label="Sigma">
        <a-slider v-model:value="formState.txt_sigma" @change="txt_sigma" :min="0.5" :max="5" :step="0.01" />
      </a-form-item>
      <a-form-item label="步长">
        <a-slider v-model:value="formState.txt_stepSize" @change="txt_stepSize" :min="0" :max="7" :step="0.01" />
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
  txt_focalDistance: 87,
  txt_delta: 1,
  txt_sigma: 3.78,
  txt_stepSize: 2.46
})

const bindShowEffect = () => {
  mapWork.bindShowEffect(formState.chkShowEffect)
}
const txt_focalDistance = () => {
  mapWork.txt_focalDistance(formState.txt_focalDistance)
}
const txt_delta = () => {
  mapWork.txt_delta(formState.txt_delta)
}
const txt_sigma = () => {
  mapWork.txt_sigma(formState.txt_sigma)
}
const txt_stepSize = () => {
  mapWork.txt_stepSize(formState.txt_stepSize)
}
</script>
<style scoped lang="less">
.infoView{
  width: 200px;
}
</style>
