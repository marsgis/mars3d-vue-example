<template>
  <mars-dialog :visible="true" right="10" top="10" width="290">
    <a-form>
      <a-form-item label="筛选值">
        <mars-slider :min="0.0" :max="65.0" :step="0.01" v-model:value="formState.threshold" @change="changeThreshold" />
      </a-form-item>
      <a-form-item label="精细度">
        <mars-slider :min="300.0" :max="1000.0" :step="1" v-model:value="formState.detail" @change="changeSteps" />
      </a-form-item>
      <a-form-item label="X">
        <mars-slider :min="-0.5" :max="0.5" :step="0.01" v-model:value="formState.xCut" @change="changeXCut" />
      </a-form-item>
      <a-form-item label="Y">
        <mars-slider :min="-0.5" :max="0.5"  :step="0.01" v-model:value="formState.yCut" @change="changeYCut" />
      </a-form-item>
      <a-form-item label="Z">
        <mars-slider :min="-0.5" :max="0.5"  :step="0.01" v-model:value="formState.zCut" @change="changeZCut" />
      </a-form-item>
    </a-form>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  threshold: number
  xCut: number
  yCut: number
  zCut: number
  detail: number
}

const formState = reactive<FormState>({
  threshold: 65,
  detail: 600,
  xCut: 0,
  yCut: 0,
  zCut: 0
})

const changeThreshold = () => {
  mapWork.graphicLayer.graphics[0].threshold = formState.threshold / 255
}
const changeSteps = () => {
  mapWork.graphicLayer.graphics[0].detail = formState.detail
}
const changeXCut = () => {
  mapWork.graphicLayer.graphics[0].xCut = formState.xCut
}
const changeYCut = () => {
  mapWork.graphicLayer.graphics[0].yCut = formState.yCut
}
const changeZCut = () => {
  mapWork.graphicLayer.graphics[0].zCut = formState.zCut
}
</script>
<style scoped lang="less"></style>
