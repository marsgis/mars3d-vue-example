<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">轨迹方向</span>
        <mars-slider @change="headingChange" v-model:value="modelParams.headingVal" :min="0" :max="360" :step="0.01" />值{{ modelParams.headingVal }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">前后侧摆</span>
        <mars-slider @change="pitchChange" v-model:value="modelParams.pitchVal" :min="-180" :max="180" :step="0.01" />值{{ modelParams.pitchVal }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">左右侧摆</span>
        <mars-slider @change="rollChange" v-model:value="modelParams.rollVal" :min="-180" :max="180" :step="0.01" />值{{ modelParams.rollVal }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <mars-button @click="setPoint">设置摄像头位置</mars-button>
        <mars-button @click="getCenter">计算与地面交点</mars-button>
        <a-checkbox @change="testTerrain" v-model:checked="isChecked">深度检测</a-checkbox>
      </a-space>
    </div>
  </mars-pannel>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import * as mapWork from "./map.js"

interface params {
  headingVal: number
  pitchVal: number
  rollVal: number
}

const modelParams = reactive<params>({
  headingVal: 220,
  pitchVal: 75,
  rollVal: 0
})

const isChecked = ref<boolean>(false)

mapWork.eventTarget.on("loadOK", () => {
  mapWork.updateModel(modelParams)
})

const headingChange = () => {
  mapWork.updateModel(modelParams)
}
const pitchChange = () => {
  mapWork.updateModel(modelParams)
}

const rollChange = () => {
  mapWork.updateModel(modelParams)
}

const testTerrain = () => {
  mapWork.testTerrain(isChecked.value)
}

// 设置摄像头位置
const setPoint = () => {
  mapWork.sePoint()
}

// 计算与地面焦点
const getCenter = () => {
  mapWork.analysisIntersection()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
</style>
