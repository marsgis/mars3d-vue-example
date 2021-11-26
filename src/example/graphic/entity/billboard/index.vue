<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState />
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">数据维护:</span>
          <mars-button @click="btnDrawModel">图上标绘</mars-button>
          <a-checkbox v-model:checked="formState.enabledEdit" @change="bindEdit">是否编辑</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">方法演示:</span>
          <mars-button @click="btnStartBounce">开始弹跳</mars-button>
          <mars-button @click="btnStartBounce2">开始弹跳（自动停止）</mars-button>
          <mars-button @click="btnStopBounce">停止弹跳</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <dataManage />
      </a-form-item>
    </a-form>
  </PannelBox>
  <LocationTo />
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import dataManage from "@comp/MarsSample/DataManage.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledEdit: boolean
}
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  enabledEdit: false
})

const bindEdit = () => {
  mapWork.bindEdit(formState.enabledEdit)
}

const btnDrawModel = () => {
  mapWork.btnDrawModel()
}
const btnStartBounce = () => {
  mapWork.btnStartBounce()
}
const btnStartBounce2 = () => {
  mapWork.btnStartBounce2()
}
const btnStopBounce = () => {
  mapWork.btnStopBounce()
}
</script>
<style scoped lang="less"></style>
