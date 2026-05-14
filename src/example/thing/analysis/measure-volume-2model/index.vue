<template>
  <a-spin class="mars-spin" v-model:spinning="spinning" />

  <mars-dialog :visible="true" right="10" top="10">

    <a-form labelAlign="left" :labelCol="{ span: 13 }">
      <a-form-item label="">
        <a-space>
          <mars-button class="btn" @click="mapWork.addDemoGraphic1">固定区域</mars-button>
          <mars-button class="btn" @click="mapWork.analysisMeasure">自定义区域</mars-button>
          <mars-button danger class="btn" @click="mapWork.clear">清除</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item label="基准模型">
        <mars-switch v-model:checked="isShowBaseTile" @change="onChangeBaseTile" />
      </a-form-item>

      <a-form-item label="比较模型">
        <mars-switch v-model:value="isShowCompareTile" @change="onChangeCompareTile" />
      </a-form-item>

      <a-form-item label="分析结果">
        <mars-switch v-model:value="isShowResult" @change="onChangeResult" />
      </a-form-item>
    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const spinning = ref(false)

mapWork.eventTarget.on("start", () => {
  spinning.value = true
})
mapWork.eventTarget.on("end", () => {
  spinning.value = false
})



const isShowBaseTile = ref(true)
const onChangeBaseTile = () => {
  mapWork.baseTileset.show = isShowBaseTile.value
}

const isShowCompareTile = ref(true)
const onChangeCompareTile = () => {
  mapWork.compareTileset.show = isShowCompareTile.value
}

const isShowResult = ref(true)
const onChangeResult = () => {
  mapWork.graphicLayer.show = isShowResult.value
}
</script>
<style lang="less" scoped>
.mars-spin {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding: 30% 0 0 0;
  backdrop-filter: blur(5px);

  .ant-spin-dot {
    top: 50%;
  }
}
</style>
