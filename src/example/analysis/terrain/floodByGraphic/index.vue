<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <a-space>
        <span>分析区域</span>
        <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
        <mars-button @click="btnDraw">绘制多边形</mars-button>
        <mars-button @click="clearDraw">清除</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>最低海拔</span>
        <mars-input-number v-model:value="formState.minHeight" :step="1" />米
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>最高海拔</span>
        <mars-input-number v-model:value="formState.maxHeight" :step="1" />米
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>淹没速度</span>
        <mars-input-number v-model:value="formState.speed" :step="1" />米/秒
      </a-space>
    </div>

    <div class="f-tac">
      <mars-button @click="begin">开始分析</mars-button>
    </div>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  minHeight: any
  maxHeight: any
  speed: number
}

const formState: UnwrapRef<FormState> = reactive({
  minHeight: "",
  maxHeight: "",
  speed: 10
})

mapWork.eventTarget.on("loadOk", (e: any) => {
  e.floodByGraphic.speed = Number(formState.speed)
})

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent((min: any, max: any) => {
    formState.minHeight = Math.ceil(min)
    formState.maxHeight = Math.ceil(max)
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
  width: 320px;
}
</style>
