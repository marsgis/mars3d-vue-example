<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span>原始数据:</span>
          <mars-button @click="drawPolygon">绘制面</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>旋转角度:</span>
          <mars-input-number  v-model:value="angleValue" :min="0" :max="360" />
          <mars-button @click="spinPolygons">旋转面</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>平移距离:</span>
          <mars-input-number  v-model:value="distanceValue" :min="1" :max="10" />
          <mars-button @click="translationPolygons">平移面</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>缩放比例:</span>
          <mars-input-number  v-model:value="scaleValue" :min="1" :max="10" />
          <mars-button @click="zoomPolygons">缩放面</mars-button>
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

const angleValue = ref<number>(45) // 旋转的角度
const distanceValue = ref<number>(1) // 平移距离
const scaleValue = ref<number>(2) // 缩放比例

// 绘制面
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 旋转面
const spinPolygons = () => {
  mapWork.spinPolygons(angleValue.value)
}

// 平移面
const translationPolygons = () => {
  mapWork.translationPolygons(distanceValue.value)
}

// 缩放面
const zoomPolygons = () => {
  mapWork.zoomPolygons(scaleValue.value)
}
</script>

