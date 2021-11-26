<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState />
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">大数据加载:</span>
          <mars-input-number class="inputNum" :min="1" :max="10000" v-model:value="num" step="1"></mars-input-number>条
          <mars-button @click="addData">生成</mars-button>
          <mars-button @click="clearLayer">清除</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const num = ref<number>(500)

const addData = () => {
  mapWork.addData(num.value)
}
const clearLayer = () => {
  mapWork.clearLayer()
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}
</style>
