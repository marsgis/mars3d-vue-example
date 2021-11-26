<template>
  <PannelBox class="infoView">
    <a-row :gutter="5">
      <a-col :span="24">
        <a-form-item label="演示数据" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-space>
            <mars-button @click="loadEarthData">全球区域</mars-button>
            <mars-button @click="loadDongnanData">局部区域</mars-button>
          </a-space>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="粒子个数" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider
          v-model:value="formState.count"
          @change="changeCount"
          :min="1000" :max="90000" :step="1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="存活时间" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider
          v-model:value="formState.age"
          @change="changeAge"
          :min="10" :max="500" :step="1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="移动速率" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider
          v-model:value="formState.speed"
          @change="changeSpeed"
          :min="1" :max="100" :step="1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="线宽度" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-slider
          v-model:value="formState.linewidth"
          @change="changeLinewidth"
          :min="1" :max="10" :step="0.1" />
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-form-item label="线颜色" :labelCol="labelCol" :labelAlign="labelAlign">
          <mars-color-picker v-model:value="formState.color" @change="changeColor"/>
        </a-form-item>
      </a-col>
    </a-row >
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  count: number
  age:number
  speed:number
  linewidth:number
  color:string
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const labelCol = ref({ span: 8 })
const labelAlign = ref("left")

const formState: UnwrapRef<FormState> = reactive({
  count: 5000,
  age: 120,
  speed: 60,
  linewidth: 1,
  color: "#4696db"
})


// 滑动条事件
// 修改粒子数量
const changeCount = () => {
  mapWork.changeCount(formState.count)
}
// 修改存活时间
const changeAge = () => {
  mapWork.changeAge(formState.age)
}
// 修改移动速率
const changeSpeed = () => {
  mapWork.changeSpeed(formState.speed)
}
// 修改线宽
const changeLinewidth = () => {
  mapWork.changeLinewidth(formState.linewidth)
}
// 修改颜色
const changeColor = () => {
  mapWork.changeColor(formState.color)
}

// 全球加载数据
const loadEarthData = () => {
  mapWork.loadEarthData()
}
// 局部加载数据
const loadDongnanData = () => {
  mapWork.loadDongnanData()
}
</script>
<style scoped lang="less">
.infoView{
  width: 300px;
}
</style>
