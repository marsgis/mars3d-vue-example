<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <mars-button title="贴地属性性能较低，建议异步计算后将高度值存放数据库内，后期直接加载此高度值" @click="getDataSurfaceHeight">
      演示异步计算贴地高度
    </mars-button>
    <div class="state-tools">
      <a-checkbox v-model:checked="enabledAggressive" @change="formStateChange">是否聚合</a-checkbox>
      <a-checkbox class="show-hide" v-model:checked="layerShow" @change="layerShowChange">是否显示</a-checkbox>
    </div>

  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const enabledAggressive = ref(true)
const layerShow = ref(true)

const formStateChange = () => {
  mapWork.enabledAggressive(enabledAggressive.value)
}
const layerShowChange = () => {
  mapWork.layerShowChange(layerShow.value)
}

const getDataSurfaceHeight = () => {
  mapWork.getDataSurfaceHeight()
}
</script>

<style lang="less" scoped>
.mars-button {
  width: 302px;
  margin-bottom: 10px;
}

.state-tools {
  display: flex;
  justify-content: flex-start;

  .show-hide {
    margin-left: 20px;
  }
}
</style>
