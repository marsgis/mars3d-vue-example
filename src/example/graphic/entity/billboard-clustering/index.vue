<template>
  <mars-pannel :visible="true" right="10" top="10">
    <a-space>
      <a-checkbox v-model:checked="formState.enabledAggressive" @change="formStateChange">是否聚合</a-checkbox>

      <mars-button title="贴地属性性能较低，建议异步计算后将高度值存放数据库内，后期直接加载此高度值" @click="getDataSurfaceHeight">
        演示异步计算贴地高度
      </mars-button>
    </a-space>
  </mars-pannel>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledAggressive: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState: UnwrapRef<FormState> = reactive({
  enabledAggressive: true
})
const formStateChange = () => {
  mapWork.enabledAggressive(formState.enabledAggressive)
}
const getDataSurfaceHeight = () => {
  mapWork.getDataSurfaceHeight()
}
</script>
