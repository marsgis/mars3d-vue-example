<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-form>
      <a-form-item>
        <a-space>
          <mars-button @click="removeAll">清除</mars-button>
          <span class="fontMsg">提示：插值数大时分析略慢，请耐心等待。</span>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span>面插值数:</span>
          <mars-input style="width: 80px" v-model:value="formState.inputNumberPolygon" :step="1"></mars-input>
          <mars-button @click="interPolygon">面插值</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>面插值数:</span>
          <mars-input style="width: 80px" v-model:value="formState.inputNumberPolygonDepth" :step="1"></mars-input>
          <mars-button @click="interPolygonByDepth">面插值(离屏渲染方式)</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>面内插点:</span>
          <mars-input style="width: 80px" v-model:value="formState.inputNumberPolygon" :step="1"></mars-input> 米
          <mars-button @click="interPolygonGrid">面插点</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>线插值数:</span>
          <mars-input style="width: 80px" v-model:value="formState.inputNumberPolyline" :step="1"></mars-input>
          <mars-button @click="interPolyline">线插值</mars-button>
          <mars-button @click="interLine">线插值(高度等分)</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>线插值数:</span>
          <mars-input style="width: 80px" v-model:value="formState.inputNumberPolylineDepth" :step="1"></mars-input>
          <mars-button @click="interLineByDepth">线插值(离屏渲染方式)</mars-button>
        </a-space>
      </a-form-item>

    </a-form>
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
}

const formState: UnwrapRef<FormState> = reactive({
  inputNumberPolygon: 10,
  inputNumberPolygonDepth: 300,
  inputNumberPolyline: 100,
  inputNumberPolylineDepth: 300
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
</script>
<style scoped lang="less">
.fontMsg {
  color: #cad1d1;
  font-size: 12px;
}
.mars-pannel-item-label {
  width: 40px;
}
</style>
