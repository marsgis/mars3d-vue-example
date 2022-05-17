<template>
  <mars-pannel :visible="true" right="10" top="10" width="320">
    <div class="infoView-content">
      <a-form>
        <a-collapse v-model:activeKey="activeKey">
          <!-- 自定义切换图标 -->
          <template #expandIcon>
            <mars-icon icon="down-c" class="icon-vertical-a" />
          </template>
          <!-- 数据处理面板 -->
          <a-collapse-panel key="1" header="数据处理">
            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">图层状态:</span>
                <a-checkbox v-model:checked="enabledShowHide" @change="updateLayerShow">显示隐藏</a-checkbox>
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
                <mars-input-number @change="radiusChange" v-model:value="sensorParams.radius" :min="1" :max="999999999" :step="1"></mars-input-number>
              </a-space>
            </div>
            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">方向</span>
                <mars-slider @change="headingChange" v-model:value="sensorParams.headingValue" :min="0" :max="360" :step="0.01" />当前值{{
                  sensorParams.headingValue
                }}
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">仰角</span>
                <mars-slider @change="pitchChange" v-model:value="sensorParams.pitchValue" :min="0" :max="360" :step="0.01" />当前值{{
                  sensorParams.pitchValue
                }}
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">左右(roll)</span>
                <mars-slider @change="rollChange" v-model:value="sensorParams.rollValue" :min="0" :max="360" :step="0.01" />当前值{{
                  sensorParams.rollValue
                }}
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">上下夹角</span>
                <mars-slider @change="xHalfAngle" v-model:value="sensorParams.xValue" :min="0" :max="89" :step="0.01" />当前值{{
                  sensorParams.xValue
                }}
              </a-space>
            </div>
            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">左右夹角</span>
                <mars-slider @change="yHalfAngle" v-model:value="sensorParams.yValue" :min="0" :max="89" :step="0.01" />当前值{{
                  sensorParams.yValue
                }}
              </a-space>
            </div>

            <div class="f-mb">
              <a-space>
                <span class="mars-pannel-item-label">扫描面</span>
                <a-checkbox @change="chkShowScanPlane" v-model:checked="enabledShowScanPlane">是否扫描</a-checkbox>
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
import { reactive, ref, toRaw, onMounted } from "vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import { $notify } from "@mars/components/mars-ui/index"
import * as mapWork from "./map.js"

const activeKey = ref(["1", "2"])
const enabledShowHide = ref(true) // 图层显示
const enabledShowScanPlane = ref(true) // 扫描面

interface Sensor {
  radius: number
  headingValue: number
  pitchValue: number
  rollValue: number
  xValue: number
  yValue: number
}

const sensorParams = reactive<Sensor>({
  radius: 100000,
  headingValue: 30,
  pitchValue: 0,
  rollValue: 0,
  xValue: 50,
  yValue: 50
})

// 初始化加载模型
onMounted(() => {
  $notify("已知问题提示", `（1）该矢量对象不支持拾取`, { duration: null })
  mapWork.addDemoGraphic1(toRaw(sensorParams))
})

const radiusChange = () => {
  // 半径发生改变
  mapWork.radiusChange(sensorParams.radius)
}

const headingChange = () => {
  // 方向发生改变
  mapWork.headingChange(sensorParams.headingValue)
}
const pitchChange = () => {
  // 仰角发生改变
  mapWork.pitchChange(sensorParams.pitchValue)
}
// roll发生改变
const rollChange = () => {
  mapWork.rollChange(sensorParams.rollValue)
}

const xHalfAngle = () => {
  mapWork.xHalfAngle(sensorParams.xValue)
}
const yHalfAngle = () => {
  mapWork.yHalfAngle(sensorParams.yValue)
}

// 是否显示扫描面
const chkShowScanPlane = () => {
  mapWork.ShowScanPlane(enabledShowScanPlane.value)
}

const updateLayerShow = () => {
  mapWork.graphicLayer.show = enabledShowHide.value
}

// 图上标绘
const startDraw = () => {
  mapWork.startDraw(toRaw(sensorParams))
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
