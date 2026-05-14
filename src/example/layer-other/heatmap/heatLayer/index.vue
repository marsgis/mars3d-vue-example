<template>

<mars-dialog :visible="true" right="10" top="10" width="260">
    <div class="f-mb">
      <a-space >
        <span class="mars-pannel-item-label">数据范围:</span>
        <mars-slider v-model:value="formState.dataRange" range @change="changeDataRange" :min="1" :max="200"
          :step="1" />
      </a-space>
    </div>


    <div class="f-mb">
      <a-space >
        <span class="mars-pannel-item-label">opacity:</span>
        <mars-slider v-model:value="formState.heatOpacity" range @change="changeOpacity" :min="0.1" :max="1.0"
          :step="0.1" />
      </a-space>
    </div>


    <div class="f-mb">
      <a-space >
        <span class="mars-pannel-item-label">blur:</span>
        <mars-slider v-model:value="formState.blur" @change="changeBlur" :min="0.1" :max="1.0"
          :step="0.1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space >
        <span class="mars-pannel-item-label">radius:</span>
        <mars-slider v-model:value="formState.radius" @change="changeRadius" :min="1" :max="50"
          :step="1" />
      </a-space>
    </div>
  </mars-dialog>

  <div class="divPanel">
    <img src="https://data.mars3d.cn/img/busines/legend-heatmap.png" />
  </div>
</template>

<script setup lang="ts" >
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  dataRange: [number, number]
  heatOpacity: [number, number]
  blur: number
  radius: number
}
const formState: UnwrapRef<FormState> = reactive({
  dataRange: [1, 200],
  heatOpacity: [0.1, 0.8],
  blur: 0.85,
  radius: 25
})

// 滑动条事件

const changeDataRange = () => {
  mapWork.setHeatOptions({ min: formState.dataRange[0], max: formState.dataRange[1] })
}
const changeOpacity = () => {
  mapWork.setHeatOptions({ heatStyle: { minOpacity: formState.heatOpacity[0], maxOpacity: formState.heatOpacity[1] } })
}
const changeBlur = () => {
  mapWork.setHeatOptions({ heatStyle: { blur: formState.blur } })
}

const changeRadius = () => {
  mapWork.setHeatOptions({ heatStyle: { radius: formState.radius } })
}
</script>

<style scoped lang="less">
.divPanel {
  position: absolute;
  bottom: 40px;
  right: 20px;
}
.divPanel img {
  width: 40px;
  height: 180px;
}
:deep(.ant-slider) {
  width: 150px;
}

.mars-pannel-item-label {
  width: 70px;
}
</style>
