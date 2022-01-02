<template>
  <pannel class="infoView">
    <a-row :gutter="[2, 10]">
      <a-col :span="24">
        <a-form-item label="分析方式:" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-radio-group v-model:value="formState.radio" @change="changeFloodType">
            <a-radio value="1">整体淹没</a-radio>
            <a-radio value="2">局部淹没</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>

      <a-col :span="8" v-show="formState.radio == '2'">
        <a-form-item label="分析区域:" />
      </a-col>
      <a-col :span="16" v-show="formState.radio == '2'">
        <a-space>
          <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
          <mars-button @click="btnDraw">绘制多边形</mars-button>
        </a-space>
      </a-col>

      <a-col :span="8">
        <a-form-item label="最低海拔（米）" />
      </a-col>
      <a-col :span="16">
        <mars-input-number v-model:value="formState.minHeight" :step="1" />
      </a-col>

      <a-col :span="8">
        <a-form-item label="最高海拔（米）" />
      </a-col>
      <a-col :span="16">
        <mars-input-number v-model:value="formState.maxHeight" :step="1" />
      </a-col>

      <a-col :span="8">
        <a-form-item label="淹没速度（米/秒）" />
      </a-col>
      <a-col :span="16">
        <mars-input-number v-model:value="formState.speed" :step="1" />
      </a-col>

      <a-col :span="21">
        <a-space>
          <mars-button @click="begin">开始分析</mars-button>
          <mars-button @click="stop">结束分析</mars-button>
        </a-space>
      </a-col>
    </a-row>
  </pannel>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  radio: string
  minHeight: any
  maxHeight: any
  speed: number
}

const labelCol = ref({ span: 8 })
const labelAlign = ref("left")

const formState: UnwrapRef<FormState> = reactive({
  radio: "2",
  minHeight: "1894",
  maxHeight: "2000",
  speed: 10
})
onMounted(() => {
  window.$notify(
    "已知问题提示",
    `（1）对3dtiles数据有要求，仅适用于无自带着色器的纹理格式模型。
  （2）目前不支持所有3dtile数据，请替换url进行自测`,
    {
      duration: null
    }
  )
})
// 修改分析方式
const changeFloodType = () => {
  mapWork.changeFloodType(formState.radio)
}

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent()
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw()
}

// 开始淹没
const begin = () => {
  mapWork.begin(formState)
}
const stop = () => {
  mapWork.stop()
}
</script>
<style scoped lang="less">
.infoView {
  width: 320px;
}
</style>
