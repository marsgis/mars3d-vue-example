<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <span>建议：顺着水流方向选点，直线时多采集点</span>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span>河宽度(米):</span>
          <mars-input-number @change="widthChange" v-model:value="widthValue"></mars-input-number>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span>河高度(米):</span>
          <mars-input-number @change="heightChange" v-model:value="heightValue"></mars-input-number>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>水流速(米/秒):</span>
          <a-slider @change="speedChange" v-model:value="speedValue" :min="0" :max="50" />当前速度{{ speedValue }}米/秒
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <mars-button @click="drawLine">绘制河流</mars-button>
          <mars-button @click="addHeight">升高30米动画</mars-button>
          <mars-button @click="lowerHeight">降低30米动画</mars-button>
          <mars-button @click="clear">清除</mars-button>
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

const widthValue = ref<number>(280)

const heightValue = ref<number>(30)

const speedValue = ref<number>(10)

const drawLine = () => {
  mapWork.drawLine(widthValue.value, heightValue.value, speedValue.value)
}

const widthChange = () => {
  mapWork.widthChange(widthValue.value)
}

const heightChange = () => {
  mapWork.heightChange(heightValue.value)
}
const speedChange = () => {
  mapWork.speedChange(speedValue.value)
}

const addHeight = () => {
  mapWork.addHeight()
}

const lowerHeight = () => {
  mapWork.lowerHeight()
}

const clear = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
</style>
