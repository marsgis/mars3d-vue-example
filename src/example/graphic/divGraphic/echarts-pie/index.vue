<template>
  <mars-dialog :visible="true" right="10" top="10" >
    <div class="state-tools">
      <a-checkbox class="show-hide" v-model:checked="layerShow" @change="layerShowChange">是否显示</a-checkbox>
      <a-checkbox v-model:checked="clusterEnabled" @change="formStateChange">是否聚合</a-checkbox>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const layerShow = ref(true)
const clusterEnabled = ref(false)

const formStateChange = () => {
  mapWork.graphicLayer.clusterEnabled = clusterEnabled.value
}
const layerShowChange = () => {
  mapWork.graphicLayer.show = layerShow.value
}


</script>

<style lang="less" scoped>
.state-tools {
  display: flex;
  justify-content: flex-start;

  .show-hide {
    margin-left: 20px;
  }
}
</style>
