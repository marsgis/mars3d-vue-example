<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="grid-item">
      <div class="grid-item_0"> 单个裁剪面: </div>
      <mars-button class="grid-item_1" @click="drawLine">按绘制线裁剪</mars-button>
      <mars-button @click="mapWork.clippingType('ZR')">切顶部</mars-button>
      <mars-button @click="mapWork.clippingType('Z')">切底部</mars-button>
      <mars-button @click="mapWork.clippingType('XR')">切东向</mars-button>
      <mars-button @click="mapWork.clippingType('X')">切西向</mars-button>
      <mars-button @click="mapWork.clippingType('Y')">切南向</mars-button>
      <mars-button @click="mapWork.clippingType('YR')">切北向</mars-button>
    </div>

    <div class="grid-item grid-item_more">
      <div class="grid-item_0"> 多个裁剪面: </div>
      <mars-button @click="drawExtent">绘制矩形</mars-button>
      <mars-button @click="drawPoly">绘制面</mars-button>
      <mars-button class="grid-item_1" @click="drawPoly2">绘制面（外切）</mars-button>
    </div>

    <p class="mars-pannel-item-label">裁剪面参数:</p>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">裁剪距离</span>
        <mars-slider @change="distance" v-model:value="distanceValue" :min="-100" :max="100" />
        <mars-input-number @change="txtDistance" v-model:value="distanceValue" :min="-100" :max="100" addon-after="米" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">斜切偏移量</span>
        <mars-slider @change="deviation" v-model:value="deviationValue" :min="-10" :max="10" />
        <mars-input-number @change="txtDeviation" v-model:value="deviationValue" :min="-10" :max="10" addon-after="米" />
      </a-space>
    </div>

    <mars-button class="w-full" @click="clear" danger>清除</mars-button>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const distanceValue = ref<number>(0)
const deviationValue = ref<number>(0)

// 绘制线
const drawLine = () => {
  mapWork.drawLine()
}
// 绘制矩形
const drawExtent = () => {
  mapWork.drawExtent()
}
// 绘制面
const drawPoly = () => {
  mapWork.drawPoly()
}
// 绘制面(外切)
const drawPoly2 = () => {
  mapWork.drawPoly2()
}

const distance = () => {
  mapWork.rangeDistance(distanceValue.value)
}
const txtDistance = () => {
  mapWork.rangeDistance(distanceValue.value)
}

const deviation = () => {
  mapWork.rangeNormalZ(deviationValue.value)
}
const txtDeviation = () => {
  mapWork.rangeNormalZ(deviationValue.value)
}
const clear = () => {
  mapWork.clear()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 110px;
  margin: 0;
}

.mars-pannel-item-label {
  width: 75px;
}

.grid-item {
  display: grid;
  gap: 10px 10px;
  grid-template-columns: 75px repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  margin-bottom: 10px;

  .grid-item_0 {
    grid-row: 1 / span 3;
    padding-top: 5px;
    color: rgba(234, 242, 255, 0.8);
  }

  .grid-item_1 {
    grid-column: 2 / span 3;
  }
}


.grid-item_more {
  grid-template-columns: 75px repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  margin-bottom: 0;

  .grid-item_1 {
    grid-column: 2 / span 2;
  }
}

.unitClass {
  width: 65px;

  :deep(.ant-input-number-handler-wrap) {
    display: none;
  }

  :deep(.ant-input-number-group-addon) {
    padding: 0 8px 0 0;
  }

}
</style>
