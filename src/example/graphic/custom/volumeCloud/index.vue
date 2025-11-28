<template>
  <mars-dialog :visible="true" right="10" top="10" width="290">
    <a-form>
      <a-form-item label="筛选值">
        <mars-slider :min="0.0" :max="200.0" :step="0.01" v-model:value="formState.threshold" @change="changeThreshold" />
      </a-form-item>
      <a-form-item label="精细度">
        <mars-slider :min="300.0" :max="1000.0" :step="1" v-model:value="formState.detail" @change="changeSteps" />
      </a-form-item>
      <a-form-item label="X轴">
        <mars-slider range :min="-0.5" :max="0.5" :step="0.01" v-model:value="formState.rangeX" @change="changeXCut" />
      </a-form-item>
      <a-form-item label="Y轴">
        <mars-slider range :min="-0.5" :max="0.5"  :step="0.01" v-model:value="formState.rangeY" @change="changeYCut" />
      </a-form-item>
      <a-form-item label="Z轴">
        <mars-slider range :min="-0.5" :max="0.5"  :step="0.01" v-model:value="formState.rangeZ" @change="changeZCut" />
      </a-form-item>
    </a-form>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  threshold: number
  detail: number
  rangeX: [number, number]
  rangeY: [number, number]
  rangeZ: [number, number]
}

const formState = reactive<FormState>({
  threshold: 65,
  detail: 600,
  rangeX: [-0.5, 0.5],
  rangeY: [-0.5, 0.5],
  rangeZ: [-0.5, 0.5]
})

const changeThreshold = () => {
  mapWork.graphicLayer.graphics[0].threshold = formState.threshold / 255
}
const changeSteps = () => {
  mapWork.graphicLayer.graphics[0].detail = formState.detail
}
const changeXCut = () => {
  mapWork.updateClip({
   xmin: formState.rangeX[0],
   xmax: formState.rangeX[1]
  })
}
const changeYCut = () => {
  mapWork.updateClip({
   ymin: formState.rangeY[0],
   ymax: formState.rangeY[1]
  })
}
const changeZCut = () => {
  mapWork.updateClip({
   zmin: formState.rangeZ[0],
   zmax: formState.rangeZ[1]
  })
}
</script>
<style scoped lang="less"></style>
