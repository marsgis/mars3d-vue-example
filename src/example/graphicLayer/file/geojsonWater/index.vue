<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <h1 style="margin-left: 40%;">闸门控制</h1>
      </a-form-item>
      <a-form-item label="高度（米）">
        <mars-input-number v-model:value="formState.height" :min="0" :max="4" :step="0.1" />
      </a-form-item>
      <a-form-item label="时长（秒）">
        <mars-input-number v-model:value="formState.time" :min="0" :max="10"  :step="0.1"/>
      </a-form-item>
      <a-form-item>
        <a-space>
          <mars-button @click="openZm">开启</mars-button>
          <mars-button @click="closeZm">关闭</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  height:number
  time: number
}
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  height: 2,
  time: 3
})

const openZm = () => {
  mapWork.openZm(formState.height, formState.time)
}
const closeZm = () => {
  mapWork.closeZm(formState.height, formState.time)
}
</script>
