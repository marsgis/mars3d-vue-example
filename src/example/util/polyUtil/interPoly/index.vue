<template>
  <pannel class="infoView">
    <div class="f-mb">
      <span class="fontMsg">提示：插值数大时分析略慢，请耐心等待。</span>
    </div>

    <a-form>
      <a-form-item>
        <a-space>
          <span>插值数:</span>
          <mars-input style="width: 100px" v-model:value="formState.inputNumberPolygon" :step="1"></mars-input>
          <mars-button @click="interPolygon">面插值</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>插值数:</span>
          <mars-input style="width: 100px" v-model:value="formState.inputNumberPolyline" :step="1"></mars-input>
          <mars-button @click="interPolyline">线插值</mars-button>
          <mars-button @click="interLine">线插值(高度等分)</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </pannel>
</template>

<script lang="ts" setup>
import { reactive } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  inputNumberPolygon: number
  inputNumberPolyline: number
}

const formState: UnwrapRef<FormState> = reactive({
  inputNumberPolygon: 10,
  inputNumberPolyline: 100
})

const removeAll = () => {
  mapWork.removeAll()
}
const interPolygon = () => {
  mapWork.interPolygon(formState.inputNumberPolygon)
}
const interPolyline = () => {
  mapWork.interPolyline(formState.inputNumberPolyline)
}
const interLine = () => {
  mapWork.interLine(formState.inputNumberPolyline)
}
</script>
<style scoped lang="less">
.fontMsg {
  color: #cad1d1;
  font-size: 12px;
}
.pannel-item-label {
  width: 40px;
}
</style>
