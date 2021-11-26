<template>
  <PannelBox class="infoView">
    <a-row :gutter="[10, 10]">
      <a-col :span="24">
        <a-form-item label="分析区域:" :labelCol="labelCol" :labelAlign="labelAlign">
          <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
          <mars-button @click="btnDraw">绘制多边形</mars-button>
          <mars-button @click="clearDraw">清除</mars-button>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="最低海拔（米）:" :labelCol="labelCol" :labelAlign="labelAlign">
          <mars-input-number v-model:value="formState.minHeight" :step="1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="最高海拔（米）:" :labelCol="labelCol" :labelAlign="labelAlign">
          <mars-input-number v-model:value="formState.maxHeight" :step="1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="淹没速度（米/秒）:" :labelCol="labelCol" :labelAlign="labelAlign">
          <mars-input-number v-model:value="formState.speed" :step="1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item>
          <mars-button @click="begin">开始分析</mars-button>
        </a-form-item>
      </a-col>
    </a-row>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  minHeight: any
  maxHeight: any
  speed: number
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const labelCol = ref({ span: 8 })
const labelAlign = ref("left")

const formState: UnwrapRef<FormState> = reactive({
  minHeight: "",
  maxHeight: "",
  speed: 10
})

mapWork.eventTarget.on("loadOk", () => {
  mapWork.floodByGraphic.speed = Number(formState.speed)

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
  width: 360px;
}
</style>
