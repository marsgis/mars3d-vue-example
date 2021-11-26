<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span>分析区域:</span>
          <mars-button @click="drawExtent">绘制矩形</mars-button>
          <mars-button @click="drawPolygon">绘制面</mars-button>
          <mars-button @click="clear">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>限定高度:</span>
          <a-slider @change="currHeight" v-model:value="inputValue" :min="0" :max="180" />当前高度{{ inputValue }}
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const inputValue = ref<number>(80)

const currHeight = () => {
  mapWork.currHeight(inputValue.value)
}
// 绘制矩形
const drawExtent = () => {
  mapWork.drawExtent()
}
// 绘制面
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 清除
const clear = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 150px;
}
.infoView {
  width: 320px;
}
</style>
