<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">轨迹方向</span>
        <a-slider @change="headingChange" v-model:value="headingVal" :min="0" :max="360" :step="0.01" />值{{ headingVal }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">前后侧摆</span>
        <a-slider @change="pitchChange" v-model:value="pitchVal" :min="-180" :max="180" :step="0.01" />值{{ pitchVal }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">左右侧摆</span>
        <a-slider @change="rollChange" v-model:value="rollVal" :min="-180" :max="180" :step="0.01" />值{{ rollVal }}
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <mars-button @click="sePoint">设置摄像头位置</mars-button>
        <mars-button @click="getCenter">计算与地面交点</mars-button>
        <a-checkbox @change="testTerrain" v-model:checked="isChecked">深度检测</a-checkbox>
      </a-space>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import * as mapWork from "./map.js"

const headingVal = ref<number>(220)

const pitchVal = ref<number>(75)

const rollVal = ref<number>(0)

const isChecked = ref<boolean>(false)

mapWork.eventTarget.on("loadOK", () => {
  mapWork.updateModel(headingVal.value, pitchVal.value, rollVal.value)
})

const headingChange = () => {
  mapWork.updateModel(headingVal.value, pitchVal.value, rollVal.value)
}
const pitchChange = () => {
  mapWork.updateModel(headingVal.value, pitchVal.value, rollVal.value)
}

const rollChange = () => {
  mapWork.updateModel(headingVal.value, pitchVal.value, rollVal.value)
}

const testTerrain = () => {
  mapWork.testTerrain(isChecked.value)
}

// 设置摄像头位置
const sePoint = () => {
  mapWork.sePoint()
}

// 计算与地面焦点
const getCenter = () => {
  mapWork.getCenter()
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
</style>
