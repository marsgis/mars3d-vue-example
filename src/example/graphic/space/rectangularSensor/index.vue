<template>
  <PannelBox class="infoView">
    <div class="infoView-content">
      <a-form>
        <a-collapse v-model:activeKey="activeKey">
          <!-- 自定义切换图标 -->
          <template #expandIcon>
            <icon-down-c />
          </template>
          <!-- 数据处理面板 -->
          <a-collapse-panel key="1" header="数据处理">
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">图层状态:</span>
                <a-checkbox v-model:checked="formState.enabledShowHide" @change="bindShowHide">显示隐藏</a-checkbox>
              </a-space>
            </a-form-item>
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">数据维护:</span>
                <mars-button @click="startDraw">图上标绘</mars-button>
              </a-space>
            </a-form-item>
            <a-form-item>
              <DataManage />
            </a-form-item>
          </a-collapse-panel>

          <!-- 参数调试面板 -->
          <a-collapse-panel key="2" header="参数调试">
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">半径(米)</span>
                <mars-input-number @change="radiusChange" v-model:value="radius" :min="1" :max="999999999" :step="1"></mars-input-number>
              </a-space>
            </a-form-item>
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">方向</span>
                <a-slider @change="headingChange" v-model:value="headingValue" :min="0" :max="360" :step="0.01" />当前值{{ headingValue }}
              </a-space>
            </a-form-item>

            <a-form-item>
              <a-space>
                <span class="pannel-item-label">仰角</span>
                <a-slider @change="pitchChange" v-model:value="pitchValue" :min="0" :max="360" :step="0.01" />当前值{{ pitchValue }}
              </a-space>
            </a-form-item>

            <a-form-item>
              <a-space>
                <span class="pannel-item-label">左右(roll)</span>
                <a-slider @change="rollChange" v-model:value="rollValue" :min="0" :max="360" :step="0.01" />当前值{{ rollValue }}
              </a-space>
            </a-form-item>

            <a-form-item>
              <a-space>
                <span class="pannel-item-label">上下夹角</span>
                <a-slider @change="xHalfAngle" v-model:value="xValue" :min="0" :max="89" :step="0.01" />当前值{{ xValue }}
              </a-space>
            </a-form-item>
            <a-form-item>
              <a-space>
                <span class="pannel-item-label">左右夹角</span>
                <a-slider @change="yHalfAngle" v-model:value="yValue" :min="0" :max="89" :step="0.01" />当前值{{ yValue }}
              </a-space>
            </a-form-item>

            <a-form-item>
              <a-space>
                <span class="pannel-item-label">扫描面</span>
                <a-checkbox @change="chkShowScanPlane" v-model:checked="formState.enabledShowScanPlane">是否扫描</a-checkbox>
              </a-space>
            </a-form-item>
          </a-collapse-panel>
        </a-collapse>
      </a-form>
    </div>
  </PannelBox>
  <LocationTo />
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"
import DataManage from "@comp/MarsSample/DataManage.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"

interface FormState {
  enabledShowHide: boolean
  enabledShowScanPlane: boolean
}
export default defineComponent({
  components: {
    PannelBox,
    DataManage,
    LocationTo
  },

  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}
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
      mapWork.addGraphic_01(headingValue.value, pitchValue.value, rollValue.value, radius.value, xValue.value, yValue.value)
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

    const bindShowHide = () => {
      mapWork.bindShowHide(formState.enabledShowHide)
    }

    // 图上标绘
    const startDraw = () => {
      mapWork.startDraw(headingValue.value, pitchValue.value, rollValue.value, radius.value, xValue.value, yValue.value)
    }

    return {
      radius,
      headingValue,
      pitchValue,
      rollValue,
      xValue,
      yValue,
      chkShowScanPlane,
      startDraw,
      headingChange,
      pitchChange,
      rollChange,
      xHalfAngle,
      yHalfAngle,
      activeKey,
      formState,
      radiusChange,
      bindShowHide
    }
  }
})
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}

.ant-slider {
  width: 110px;
}

.infoView-content {
  width: 460px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
