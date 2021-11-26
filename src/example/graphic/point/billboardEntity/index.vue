<template>
  <PannelBox class="infoView">
    <a-checkbox v-model:checked="formState.enabledAggressive" @change="formStateChange">是否聚合</a-checkbox>
    <br />  <br />
    <mars-button title="贴地属性性能较低，建议异步计算后将高度值存放数据库内，后期直接加载此高度值" @click="getDataSurfaceHeight"
      >演示异步计算贴地高度</mars-button
    >
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledAggressive: boolean
}
export default defineComponent({
  components: {
    PannelBox
  },
  setup() {
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
    return {
      formState,
      formStateChange,
      getDataSurfaceHeight
    }
  }
})
</script>
<style scoped lang="less"></style>
