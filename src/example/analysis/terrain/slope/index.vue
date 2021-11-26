<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="插值数">
        <a-space>
          <mars-input-number v-model:value="formState.txtSplitNum" :step="1" :min="1" :max="999" />
          <mars-button @click="btnDrawExtent">添加矩形</mars-button>
          <mars-button @click="btnDraw">添加多边形</mars-button>
          <mars-button @click="btnDrawPoint">添加点</mars-button>
          <mars-button @click="clearAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item label="插值数">
        <a-radio-group v-model:value="formState.radio" @change="changeShadingType">
          <a-radio value="none">无阴影</a-radio>
          <a-radio value="slope">坡度</a-radio>
          <a-radio value="aspect">坡向</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  radio: string
  txtSplitNum: number
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  radio: "none",
  txtSplitNum: 10
})

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent(formState.txtSplitNum)
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw(formState.txtSplitNum)
}
// 添加点
const btnDrawPoint = () => {
  mapWork.btnDrawPoint()
}
// 清除
const clearAll = () => {
  mapWork.clearAll()
}

// 改变阴影
const changeShadingType = () => {
  mapWork.changeShadingType(formState.radio)
}
</script>
<style scoped lang="less">
.ant-input-number {
  width: 70px !important;
}
</style>
