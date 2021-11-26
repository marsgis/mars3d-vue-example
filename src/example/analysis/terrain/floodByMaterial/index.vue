<template>
  <PannelBox class="infoView">
    <a-row :gutter="[10, 10]">
      <a-col :span="7">
        <a-form-item label="分析区域:" />
      </a-col>
      <a-col :span="15">
        <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
        <mars-button @click="btnDraw">绘制多边形</mars-button>
        <mars-button @click="clearDraw">清除</mars-button>
      </a-col>

      <a-col :span="7">
        <a-form-item label="最低海拔（米）:" />
      </a-col>
      <a-col :span="16">
        <mars-input-number v-model:value="formState.minHeight" :step="1" />
      </a-col>

      <a-col :span="7">
        <a-form-item label="最高海拔（米）:" />
      </a-col>
      <a-col :span="16">
        <mars-input-number v-model:value="formState.maxHeight" :step="1" />
      </a-col>

      <a-col :span="7">
        <a-form-item label="淹没速度（米/秒）:" />
      </a-col>
      <a-col :span="16">
        <mars-input-number v-model:value="formState.speed" :step="1" />
      </a-col>

      <a-col :span="24">
        <mars-button @click="begin">开始分析</mars-button>
      </a-col>
    </a-row>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  minHeight: any
  maxHeight: any
  speed: number
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  minHeight: "",
  maxHeight: "",
  speed: 80
})

mapWork.eventTarget.on("loadOk", () => {
  mapWork.floodByMaterial.speed = Number(formState.speed)
})

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent((min: any, max: any) => {
    if (mapWork.floodByMaterial.length > 0) {
      min = Math.min(min, Number(formState.minHeight))
      max = Math.max(max, Number(formState.maxHeight))
    }

    formState.minHeight = min
    formState.maxHeight = max
  })
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw((min: any, max: any) => {
    formState.minHeight = Math.ceil(min)
    formState.maxHeight = Math.ceil(max)
  })
}
const clearDraw = () => {
  mapWork.clearDraw()

  formState.minHeight = ""
  formState.maxHeight = ""
}

// 开始淹没
const begin = () => {
  mapWork.begin(formState)
}
</script>
<style scoped lang="less">
.infoView {
  width: 380px;
}
</style>
