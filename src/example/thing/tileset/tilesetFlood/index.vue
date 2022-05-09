<template>
  <mars-pannel :visible="true" right="10" top="10" width="320">
    <div style="width: 280px" v-if="!isShow">
      <a-row :gutter="[2, 10]">
        <a-col :span="24">
          <a-form-item label="分析方式:" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-radio-group v-model:value="formState.radio" @change="changeFloodType">
              <a-radio value="1">整体淹没</a-radio>
              <a-radio value="2">局部淹没</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

        <a-col :span="10" v-show="formState.radio == '2'">
          <a-form-item label="分析区域:" />
        </a-col>
        <a-col :span="14" v-show="formState.radio == '2'">
          <a-space>
            <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
            <mars-button @click="btnDraw">绘制多边形</mars-button>
          </a-space>
        </a-col>

        <a-col :span="10">
          <a-form-item label="最低海拔（米）" />
        </a-col>
        <a-col :span="14">
          <mars-input-number v-model:value="formState.minHeight" :step="1" />
        </a-col>

        <a-col :span="10">
          <a-form-item label="最高海拔（米）" />
        </a-col>
        <a-col :span="14">
          <mars-input-number v-model:value="formState.maxHeight" :step="1" />
        </a-col>

        <a-col :span="10">
          <a-form-item label="淹没速度（米/秒）" />
        </a-col>
        <a-col :span="14">
          <mars-input-number v-model:value="formState.speed" :step="1" />
        </a-col>

        <a-col :span="21">
          <a-space>
            <mars-button @click="begin">开始分析</mars-button>
          </a-space>
        </a-col>
      </a-row>
    </div>

    <div v-else>
      <div class="f-mb">
        <a-space>
          <span>高度选择</span>
          <a-slider
            tooltipPlacement="bottom"
            v-model:value="formState.height"
            @change="onChangeHeight()"
            :min="formState.minHeight"
            :max="formState.maxHeight"
            :step="1"
          />
        </a-space>
      </div>

      <div class="f-mb">
        <span>当前高度:{{ formState.height }}</span>
      </div>

      <div class="f-tac">
        <a-space>
          <mars-button @click="startPlay">{{ isStart ? "暂停" : "播放" }}</mars-button>
          <mars-button @click="goBack">返回</mars-button>
        </a-space>
      </div>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"
import { $notify } from "@mars/components/mars-ui/index"

onMounted(() => {
  $notify(
    "已知问题提示",
    `（1）对3dtiles数据有要求，仅适用于无自带着色器的纹理格式模型。
  （2）目前不支持所有3dtile数据，请替换url进行自测`,
    {
      duration: null
    }
  )
})
interface FormState {
  radio: string
  minHeight: number
  maxHeight: number
  speed: number
  height: number
}

const labelCol = { span: 8 }
const labelAlign = "left"
const isStart = ref(true) // 开始播放
const isShow = ref(false) // 显示进度面板

const formState: UnwrapRef<FormState> = reactive({
  radio: "2",
  minHeight: 26,
  maxHeight: 200,
  speed: 10,
  height: 0
})

// 监听到高度发生变化
mapWork.eventTarget.on("heightChange", (e: any) => {
  isShow.value = true
  formState.height = Math.ceil(e.height)
})

// 高度改变
const onChangeHeight = () => {
  mapWork.onChangeHeight(formState.height)
}

// 默认自动播放
const startPlay = () => {
  if (!isStart.value) {
    mapWork.tilesetFlood.start()
  } else {
    mapWork.tilesetFlood.stop()
  }
  isStart.value = !isStart.value
}

const goBack = () => {
  mapWork.stop()

  isShow.value = false
  isStart.value = true
}

// 修改分析方式
const changeFloodType = () => {
  mapWork.changeFloodType(formState.radio)
}

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent()
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw()
}

// 开始淹没
const begin = () => {
  mapWork.begin(formState)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 200px;
}
</style>
