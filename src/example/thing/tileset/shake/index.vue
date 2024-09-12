<template>
  <mars-dialog :visible="true" right="10" top="10" width="350">
    <a-space>
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
        <a-form-item label="绘制区域">
          <mars-button @click="changeAddress">绘制区域</mars-button>
        </a-form-item>
        <a-form-item label="最大摇晃距离">
          <a-space>
            <mars-input v-model:value="formState.maxDistance" @change="changemaxDistance" />
            米
          </a-space>
        </a-form-item>
        <a-form-item label="摇晃一次时间">
          <a-space>
            <mars-input v-model:value="formState.duration" @change="changeduration" />
            <span>毫秒</span>
          </a-space>
        </a-form-item>
        <a-form-item label="最大高度">
          <a-space>
            <mars-input v-model:value="formState.maxHeight" @change="changeMaxHeight" />
            米
          </a-space>
        </a-form-item>
        <a-form-item label="范围内颜色">
          <a-space>
            <mars-color-picker v-model:value="formState.inRangeColor" @change="changeinRangeColor" />
          </a-space>
        </a-form-item>
        <a-form-item label="范围外颜色">
          <a-space>
            <mars-color-picker v-model:value="formState.outRangeColor" @change="changeoutRangeColor" />
          </a-space>
        </a-form-item>
      </a-form>
    </a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  address: number[][]
  maxDistance: number
  duration: number
  maxHeight: number
  inRangeColor: string
  outRangeColor: string
}

const formState = reactive<FormState>({
  address: [],
  maxDistance: 5,
  duration: 1000,
  maxHeight: 120,
  inRangeColor: "rgba(255, 0, 0, 0.5)",
  outRangeColor: "rgb(255,255,255)"
})

const changeAddress = () => {
  mapWork.drawArea()
}

const changemaxDistance = () => {
  mapWork.tilesetShake.maxDistance = formState.maxDistance
}
const changeduration = () => {
  mapWork.tilesetShake.duration = formState.duration
}
const changeMaxHeight = () => {
  mapWork.tilesetShake.maxHeight = formState.maxHeight
}
const changeinRangeColor = () => {
  mapWork.tilesetShake.inRangeColor = formState.inRangeColor
}
const changeoutRangeColor = () => {
  mapWork.tilesetShake.outRangeColor = formState.outRangeColor
}
</script>
