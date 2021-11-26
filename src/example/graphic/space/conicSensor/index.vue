<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">圆锥体:</span>
          <a-checkbox v-model:checked="formState.enabledShowHide" @change="sensorShowHide">显示/隐藏</a-checkbox>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">长度:</span>
          <mars-input-number
            class="inputNum"
            @change="sensorLength"
            v-model:value="lengthValue"
            :min="1"
            :max="999999999"
            :step="1.0"
          ></mars-input-number>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">方向角:</span>
          <a-slider @change="headingChange" v-model:value="headingValue" :min="0" :max="360" :step="0.01" />
          <span class="pannel-item-value">值{{ headingValue }}</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">俯仰角:</span>
          <a-slider @change="pitchChange" v-model:value="pitchValue" :min="-180" :max="180" :step="0.01" />
          <span class="pannel-item-value">值{{ pitchValue }}</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">左右角:</span>
          <a-slider @change="rollChange" v-model:value="rollValue" :min="-180" :max="180" :step="0.01" />
          <span class="pannel-item-value">值{{ rollValue }}</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">夹角:</span>
          <a-slider @change="angle" v-model:value="angleValue" :min="0" :max="89" :step="0.01" />
          <span class="pannel-item-value">值{{ angleValue }}</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">顶盖:</span>
          <a-checkbox @change="sensorTop" v-model:checked="formState.enabledShowModelTop">是否显示</a-checkbox>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledShowHide: boolean
  enabledShowModelTop: boolean
}
export default defineComponent({
  components: {
    PannelBox
  },

  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    // 角度
    const angleValue = ref<number>(5)

    // 长度（米）
    const lengthValue = ref<number>(700000)

    const headingValue = ref<number>(0) // 方向

    const pitchValue = ref<number>(40) // 仰角

    const rollValue = ref<number>(0) // 左右

    const formState: UnwrapRef<FormState> = reactive({
      enabledShowHide: true,
      enabledShowModelTop: true
    })

    mapWork.eventTarget.on("loadOk", () => {
      mapWork.addConicSensor(headingValue.value, pitchValue.value, rollValue.value, angleValue.value, lengthValue.value)
    })

    // 显示/隐藏
    const sensorShowHide = () => {
      mapWork.sensorShowHide(formState.enabledShowHide)
    }
    // 半径
    const sensorLength = () => {
      mapWork.sensorLength(lengthValue.value)
    }

    // 方向角
    const headingChange = () => {
      mapWork.headingChange(headingValue.value)
    }

    // 俯仰角
    const pitchChange = () => {
      mapWork.pitchChange(pitchValue.value)
    }

    // 左右角
    const rollChange = () => {
      mapWork.rollChange(rollValue.value)
    }

    // 夹角
    const angle = () => {
      mapWork.angle(angleValue.value)
    }

    // 顶部显示隐藏
    const sensorTop = () => {
      mapWork.sensorTop(formState.enabledShowModelTop)
    }

    return {
      formState,
      sensorShowHide,
      sensorLength,
      angle,
      sensorTop,
      angleValue,
      lengthValue,
      headingValue,
      pitchValue,
      rollValue,
      headingChange,
      pitchChange,
      rollChange
    }
  }
})
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 60px;
}
.inputNum {
  width: 100px !important;
}
.ant-slider {
  width: 110px;
}
.pannel-item-value {
  width: 100px;
}
</style>
