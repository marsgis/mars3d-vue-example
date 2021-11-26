<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">原始数据:</span>
          <mars-button @click="drawLine">绘制线</mars-button>
          <mars-button @click="clearAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">计算平行线:</span>
          <mars-input-number class="line" v-model:value="value" :min="1" :max="10" />公里
          <mars-button @click="parallelLines">计算</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">计算曲线:</span>
          <mars-button @click="calculationCurve">计算</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const value = ref<number>(5)

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}

// 清除
const clearAll = () => {
  mapWork.clearLayer()
}

// 绘制平行线
const parallelLines = () => {
  mapWork.parallelLines(value.value)
}

// 绘制曲线
const calculationCurve = () => {
  mapWork.calculationCurve()
}
</script>

<style scoped>
.line {
  width: 142px !important;
}
</style>
