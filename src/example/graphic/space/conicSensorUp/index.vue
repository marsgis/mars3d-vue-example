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
          <span class="pannel-item-label">半径:</span>
          <mars-input-number class="inputNum" @change="sensorRadius" v-model:value="radiusValue" :min="1" :max="999999999" :step="1.0"></mars-input-number>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">夹角:</span>
          <a-slider @change="angle" v-model:value="angleValue" :min="1" :max="89" :step="0.01" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">顶盖:</span>
          <a-checkbox @change="sensorTop" v-model:checked="formState.enabledShowModelTop">是否显示</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">地面投影:</span>
          <a-checkbox @change="sensorArea" v-model:checked="formState.enabledModelArea">是否显示</a-checkbox>
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
  enabledModelArea: boolean
}
export default defineComponent({
  components: {
    PannelBox
  },

  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const angleValue = ref<number>(25)

    const radiusValue = ref<number>(300000)

    const formState: UnwrapRef<FormState> = reactive({
      enabledShowHide: true,
      enabledShowModelTop: true,
      enabledModelArea: false
    })

    mapWork.addConicSensor(angleValue.value, radiusValue.value)

    // 显示/隐藏
    const sensorShowHide = () => {
      mapWork.sensorShowHide(formState.enabledShowHide)
    }
    // 半径
    const sensorRadius = () => {
      mapWork.sensorRadius(radiusValue.value)
    }

    // 角度
    const angle = () => {
      mapWork.angle(angleValue.value)
    }
    // 顶部显示隐藏
    const sensorTop = () => {
      mapWork.sensorTop(formState.enabledShowModelTop)
    }
    // 地面阴影
    const sensorArea = () => {
      mapWork.sensorArea(formState.enabledModelArea)
    }
    return {
      formState,
      sensorShowHide,
      sensorRadius,
      angle,
      sensorTop,
      sensorArea,
      angleValue,
      radiusValue
    }
  }
})
</script>
<style scoped lang="less">
.inputNum {
  width: 110px !important;
}
.pannel-item-label {
  width: 60px;
}

.ant-slider {
  width: 110px;
}
</style>
