<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-form-item label="演示数据:">
        <a-space>
          <mars-button @click="mapWork.loadDongnanData">局部风场</mars-button>
          <mars-button @click="mapWork.loadDongnanData2">局部洋流</mars-button>
          <mars-button @click="mapWork.loadEarthData">全球区域</mars-button>
        </a-space>
      </a-form-item>
    </div>

    <div class="f-mb">
      <a-space title="粒子纹理的大小，确定粒子的最大数量（particlesTextureSize*particlesTextureSize）">
        <span class="mars-pannel-item-label">粒子总数:</span>
        <mars-slider v-model:value="formState.particlesTextureSize" @change="changeTextureSize" :min="1" :max="1000"
          :step="1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">轨迹宽度:</span>
        <mars-slider v-model:value="formState.lineWidth" range @change="changeLineWidth" :min="1" :max="10"
          :step="0.1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">轨迹长度:</span>
        <mars-slider v-model:value="formState.lineLength" range @change="changeLineLength" :min="1" :max="200"
          :step="1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">速度系数:</span>
        <mars-slider v-model:value="formState.speedFactor" @change="changeSpeedFactor" :min="0.1" :max="20"
          :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">粒子消失率:</span>
        <mars-slider v-model:value="formState.dropRate" @change="changeDropRate" :min="0.0001" :max="0.01"
          :step="0.0001" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">额外消失率:</span>
        <mars-slider v-model:value="formState.dropRateBump" @change="changeDropRateBump" :min="0" :max="0.2"
          :step="0.001" /></a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">翻转Y坐标:</span>
        <mars-switch v-model:checked="formState.flipY" @change="changeFlipY" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-form-item label="线颜色:">
        <mars-color-picker v-model:value="formState.color" @change="changeColor" />
      </a-form-item>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

const labelCol = ref({ span: 8 })
const labelAlign = ref("left")

interface FormState {
  particlesTextureSize: number
  lineWidth: [number, number]
  lineLength: [number, number]
  speedFactor: number
  dropRate: number
  dropRateBump: number
  flipY: boolean
  color: string
}
const formState: UnwrapRef<FormState> = reactive({
  particlesTextureSize: 100,
  lineWidth: [1, 5],
  lineLength: [20, 100],
  speedFactor: 0.5,
  dropRate: 0.003,
  dropRateBump: 0.01,
  flipY: false,
  color: "#4696db"
})


// 滑动条事件
const changeTextureSize = () => {
  mapWork.setLayerOptions({ particlesTextureSize: formState.particlesTextureSize })
}
const changeLineWidth = () => {
  mapWork.setLayerOptions({ lineWidth: { min: formState.lineWidth[0], max: formState.lineWidth[1] } })
}
const changeLineLength = () => {
  mapWork.setLayerOptions({ lineLength: { min: formState.lineLength[0], max: formState.lineLength[1] } })
}
const changeSpeedFactor = () => {
  mapWork.setLayerOptions({ speedFactor: formState.speedFactor })
}
const changeDropRate = () => {
  mapWork.setLayerOptions({ dropRate: formState.dropRate })
}
const changeDropRateBump = () => {
  mapWork.setLayerOptions({ dropRateBump: formState.dropRateBump })
}
const changeFlipY = () => {
  mapWork.setLayerOptions({ flipY: formState.flipY })
}
const changeColor = (e) => {
  mapWork.setLayerOptions({ colors: [formState.color] })
}

</script>
<style scoped lang="less">
:deep(.ant-slider) {
  width: 200px;
}

.mars-pannel-item-label {
  width: 80px;
}
</style>
