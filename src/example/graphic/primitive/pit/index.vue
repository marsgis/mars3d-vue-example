<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState />
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">井深度:</span>
          <mars-input-number @change="heightChange" class="inputNum" :min="-500" :max="999" v-model:value="num" step="1"></mars-input-number>米
          <a-checkbox v-model:checked="formState.chkTestTerrain" @change="depthTest">深度监测</a-checkbox>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">绘制:</span>
          <mars-button @click="drawExtent">绘制矩形</mars-button>
          <mars-button @click="drawPolygon">绘制多边形</mars-button>
          <mars-button @click="clearLayer">清除</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  chkTestTerrain: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  chkTestTerrain: false
})

const num = ref<number>(30)

// 绘制矩形
const drawExtent = () => {
  mapWork.drawExtent(num.value)
}
// 绘制多边形
const drawPolygon = () => {
  mapWork.drawPolygon(num.value)
}
// 清除
const clearLayer = () => {
  mapWork.clear()
}
// 深度监测
const depthTest = () => {
  mapWork.depthTest(formState.chkTestTerrain)
}
const heightChange = () => {
  mapWork.heightChange(num.value)
}
</script>
<style scoped lang="less">
.inputNum {
  width: 88px !important;
}
</style>
