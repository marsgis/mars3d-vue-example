<template>
  <mars-pannel :visible="true" right="10" top="10" width="320">
    <div class="infoView-content">
      <a-form>
        <a-collapse v-model:activeKey="activeKey">
          <!-- 自定义切换图标 -->
          <template #expandIcon>
            <mars-icon icon="bx:bx-chevron-down-circle" class="icon-vertical-a" />
          </template>
          <!-- 数据处理面板 -->
          <a-collapse-panel key="1" header="数据处理">
            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">图层状态:</span>
                <a-checkbox v-model:checked="formState.enabledShowHide" @change="updateLayerShow">显示隐藏</a-checkbox>
              </a-space>
            </div>
            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">数据维护:</span>
                <mars-button @click="startDraw">图上标绘</mars-button>
              </a-space>
            </div>

            <div class="f-mb">
              <data-manage />
            </div>
          </a-collapse-panel>

          <!-- 参数调试面板 -->
          <a-collapse-panel key="2" header="参数调试">
            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">半径(米)</span>
                <mars-input-number @change="radiusChange" v-model:value="radius" :min="1" :max="999999999" :step="1"></mars-input-number>
              </a-space>
            </div>
            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">方向</span>
                <mars-slider @change="headingChange" v-model:value="headingValue" :min="0" :max="360" :step="0.01" />当前值{{ headingValue }}
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">仰角</span>
                <mars-slider @change="pitchChange" v-model:value="pitchValue" :min="0" :max="360" :step="0.01" />当前值{{ pitchValue }}
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">左右(roll)</span>
                <mars-slider @change="rollChange" v-model:value="rollValue" :min="0" :max="360" :step="0.01" />当前值{{ rollValue }}
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">上下夹角</span>
                <mars-slider @change="xHalfAngle" v-model:value="xValue" :min="0" :max="89" :step="0.01" />当前值{{ xValue }}
              </a-space>
            </div>
            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">左右夹角</span>
                <mars-slider @change="yHalfAngle" v-model:value="yValue" :min="0" :max="89" :step="0.01" />当前值{{ yValue }}
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">扫描面</span>
                <a-checkbox @change="chkShowScanPlane" v-model:checked="formState.enabledShowScanPlane">是否扫描</a-checkbox>
              </a-space>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
  </mars-pannel>
  <location-to />
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"

import * as mapWork from "./map.js"

interface FormState {
  enabledShowHide: boolean
  enabledShowScanPlane: boolean
}

const activeKey = ref(["1", "2"])
const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledShowScanPlane: true
})

const radius = ref<number>(100000) // 半径

const headingValue = ref<number>(30) // 方向

const pitchValue = ref<number>(0) // 仰角

const rollValue = ref<number>(0) // 左右

const xValue = ref<number>(50) // x轴方向

const yValue = ref<number>(50) // y轴方向

// 初始化加载模型
mapWork.eventTarget.on("loadOk", () => {
  mapWork.addDemoGraphic1(headingValue.value, pitchValue.value, rollValue.value, radius.value, xValue.value, yValue.value)
})

const radiusChange = () => {
  // 半径发生改变
  mapWork.radiusChange(radius.value)
}

const headingChange = () => {
  // 方向发生改变
  mapWork.headingChange(headingValue.value)
}
const pitchChange = () => {
  // 仰角发生改变
  mapWork.pitchChange(pitchValue.value)
}
// roll发生改变
const rollChange = () => {
  mapWork.rollChange(rollValue.value)
}

const xHalfAngle = () => {
  mapWork.xHalfAngle(xValue.value)
}
const yHalfAngle = () => {
  mapWork.yHalfAngle(yValue.value)
}

// 是否显示扫描面
const chkShowScanPlane = () => {
  mapWork.ShowScanPlane(formState.enabledShowScanPlane)
}

const updateLayerShow = () => {
  mapWork.graphicLayer.show = formState.enabledShowHide
}

// 图上标绘
const startDraw = () => {
  mapWork.startDraw(headingValue.value, pitchValue.value, rollValue.value, radius.value, xValue.value, yValue.value)
}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}

.ant-slider {
  width: 110px;
}
</style>
