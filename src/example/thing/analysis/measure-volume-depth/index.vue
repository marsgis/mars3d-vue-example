<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb height">
      <a-space>
        <span class="mars-pannel-item-label">基准面高(米):</span>
        <mars-input-number @change="baseHeight" id="inputNumber" v-model:value="baseValue" step="0.1" />
        <mars-button @click="selHeight">点选高度</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">底部高度(米):</span>
        <mars-input-number @change="txtMinHeight" id="inputNumber" v-model:value="bottomValue" step="0.1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">最高高度(米):</span>
        <mars-input-number @change="txtMaxHeight" id="inputNumber" v-model:value="topValue" step="0.1" />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <mars-button class="btn" @click="analysisMeasure">绘制分析区域</mars-button>
        <mars-button danger class="btn" @click="clear">清除</mars-button>
      </a-space>
    </div>
    <p class="info">
      提示：单击分析按钮激活绘制分析，对绘制面(墙)内的进行以下计算。<br />
      1. 挖方量: 计算“基准面”到地表之间的凸出部分进行挖掉的体积（高于“最高高度”的挖方被忽略）。<br />
      2. 填方量：计算“基准面”与“底部高度”之间的缺少部分进行填平的体积。
    </p>
  </mars-dialog>

  <location-to />
</template>

<script setup lang="ts">
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import { onMounted, ref } from "vue"
import * as mapWork from "./map.js"

const baseValue = ref<number>()

const bottomValue = ref<number>()

const topValue = ref<number>()

const checked = ref(true)

// 方量分析
const analysisMeasure = () => {
  mapWork.analysisMeasure()
}
// 清除
const clear = () => {
  mapWork.clear()
}

// 基础高度修改
const baseHeight = () => {
  mapWork.baseHeight(baseValue.value)
}

// 修改底高
const txtMinHeight = () => {
  mapWork.txtMinHeight(bottomValue.value)
}

// 修改顶高
const txtMaxHeight = () => {
  mapWork.txtMaxHeight(topValue.value)
}

// 点选高度
const selHeight = () => {
  mapWork.selHeight()
}
mapWork.eventTarget.on("heightVal", function (event: any) {
  baseValue.value = event.baseHeight
  bottomValue.value = event.minHeight
  topValue.value = event.maxHeight
})
</script>
<style scoped lang="less">
.mars-pannel-item-label {
  width: 90px;
}
.btn {
  width: 146px;
}
.info {
  color: rgba(234, 242, 255, 0.7)
}
.height {
  .ant-input-number {
    width: 118px !important;
  }
}

.ant-input-number {
  width: 204px !important;
}
</style>
