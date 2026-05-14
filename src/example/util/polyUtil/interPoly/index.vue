<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span>面插值数:</span>
        <mars-input-number v-model:value="formState.inputNumberPolygon" :step="1"></mars-input-number>
      </a-space>
      <div class="inter f-mt">
        <mars-button @click="interPolygon">面插值</mars-button>
      </div>
    </div>

    <div class="f-mb">
      <a-space>
        <span>面插值数:</span>
        <mars-input-number v-model:value="formState.inputNumberPolygonDepth" :step="1"></mars-input-number>
      </a-space>
      <div class="inter f-mt">
        <mars-button @click="interPolygonByDepth">面插值(离屏渲染方式)</mars-button>
      </div>
    </div>

    <div class="f-mb">
      <a-space>
        <span>面内插点:</span>
        <mars-input-number v-model:value="formState.inputNumberPolygon" :step="1" addon-after="米"></mars-input-number>

      </a-space>
      <div class="inter f-mt">
        <mars-button @click="interPolygonGrid">面插点</mars-button>
      </div>
    </div>

    <div class="f-mb">
      <a-space>
        <span>线插值数:</span>
        <mars-input-number v-model:value="formState.inputNumberPolyline" :step="1"></mars-input-number>
      </a-space>
      <div class="inter-two f-mt">
        <a-space>
          <mars-button @click="interPolyline">线插值</mars-button>
          <mars-button class="pad-none" @click="interLine">线插值(高度等分)</mars-button>
        </a-space>
      </div>
    </div>

    <div class="f-mb">
      <a-space>
        <span>线插值数:</span>
        <mars-input-number v-model:value="formState.inputNumberPolylineDepth" :step="1"></mars-input-number>
      </a-space>
      <div class="inter f-mt">
        <mars-button @click="interLineByDepth">线插值(离屏渲染方式)</mars-button>
      </div>
    </div>

    <div class="f-mb">
      <a-space>
        <span>平行距离:</span>
        <mars-input-number v-model:value="formState.offsetWidth" :step="1"></mars-input-number>
      </a-space>
      <div class="inter f-mt">
        <mars-button @click="getOffsetLine">计算平行线</mars-button>
      </div>
    </div>


    <mars-button class="w-full f-mb" @click="removeAll" danger>清除</mars-button>

    <span class="fontMsg">提示：插值数大时分析略慢，请耐心等待。</span>
  </mars-dialog>
  <location-to />
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import type { UnwrapRef } from "vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import * as mapWork from "./map.js"

interface FormState {
  inputNumberPolygon: number
  inputNumberPolygonDepth: number
  inputNumberPolyline: number
  inputNumberPolylineDepth: number
  offsetWidth: number
}

const formState: UnwrapRef<FormState> = reactive({
  inputNumberPolygon: 10,
  inputNumberPolygonDepth: 300,
  inputNumberPolyline: 100,
  inputNumberPolylineDepth: 300,
  offsetWidth: 500
})

const removeAll = () => {
  mapWork.removeAll()
}
const interPolygon = () => {
  mapWork.interPolygon(formState.inputNumberPolygon)
}
const interPolygonGrid = () => {
  mapWork.interPolygonGrid(formState.inputNumberPolygon)
}
const interPolygonByDepth = () => {
  mapWork.interPolygonByDepth(formState.inputNumberPolygonDepth)
}

const interPolyline = () => {
  mapWork.interPolyline(formState.inputNumberPolyline)
}
const interLine = () => {
  mapWork.interLine(formState.inputNumberPolyline)
}
const interLineByDepth = () => {
  mapWork.interLineByDepth(formState.inputNumberPolylineDepth)
}
const getOffsetLine = () => {
  mapWork.getOffsetLine(formState.offsetWidth)
}
</script>
<style scoped lang="less">
.fontMsg {
  color: #cad1d1;
  font-size: 12px;
}

.mars-input-number {
  width: 228px;
}

.mars-button {
  width: 228px;
}

.inter {
  margin-left: 67px;
}

.inter-two {
  margin-left: 67px;

  .mars-button {
    width: 110px !important;
  }
}

.remove-btn {
  width: 297px !important;
}

.mars-pannel-item-label {
  width: 40px;
}
</style>
