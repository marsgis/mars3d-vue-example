<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span>步长:</span>
        <mars-input-number v-model:value="step" :min="1" :max="10" @change="onChangeGrid" addon-after="公里"/>
      </a-space>
    </div>

    <div class="radio_container">
      <span>类型:</span>
      <a-radio-group v-model:value="gridType" name="grid" @change="onChangeGrid">
        <div class="radio_btn_container">
          <a-radio value="point" class="radio_btn">点</a-radio>
          <a-radio value="triangle" class="radio_btn">三角网</a-radio>
          <a-radio value="square" class="radio_btn">方格网</a-radio>
          <a-radio value="hex" class="radio_btn">蜂窝网</a-radio>
        </div>
      </a-radio-group>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const gridType = ref("")
const step = ref<number>(5)

const onChangeGrid = () => {
  switch (gridType.value) {
    case "point":
      mapWork.pointGrid(step.value)
      break

    case "triangle":
      mapWork.triangleGrid(step.value)
      break

    case "square":
      mapWork.squareGrid(step.value)
      break

    case "hex":
      mapWork.hexGrid(step.value)
      break

    default:
      break
  }
}
</script>
<style scoped lang="less">
.ant-input-number {
  width: 224px !important;
}
.radio_container {
  display: flex;
  justify-content: space-between;
}

.radio_btn_container {
  width: 260px;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.radio_btn {
  flex-basis: 50%;
  margin-bottom: 10px;
  margin-right: 0px;
  &:nth-child(n+3) {
    margin-bottom: 0px;
  }
}
</style>
