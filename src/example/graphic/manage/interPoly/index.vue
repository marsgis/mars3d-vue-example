<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="fontMsg">提示：插值数大时分析略慢，请耐心等待。</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">插值数:</span>
          <mars-input style="width: 100px" v-model:value="formState.inputNumberPolygon" :step="1"></mars-input>
          <mars-button @click="interPolygon">面插值</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">插值数:</span>
          <mars-input style="width: 100px" v-model:value="formState.inputNumberPolyline" :step="1"></mars-input>
          <mars-button @click="interPolyline">线插值</mars-button>
          <mars-button @click="interLine">线插值(高度等分)</mars-button>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-space>
          <mars-button @click="removeAll">清除</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  inputNumberPolygon: number
  inputNumberPolyline: number
}

export default defineComponent({
  components: {
    PannelBox
  },
  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}
    const formState: UnwrapRef<FormState> = reactive({
      inputNumberPolygon: 10,
      inputNumberPolyline: 100
    })

    const removeAll = () => {
      mapWork.removeAll()
    }
    const interPolygon = () => {
      mapWork.interPolygon(formState.inputNumberPolygon)
    }
    const interPolyline = () => {
      mapWork.interPolyline(formState.inputNumberPolyline)
    }
    const interLine = () => {
      mapWork.interLine(formState.inputNumberPolyline)
    }
    return {
      formState,
      removeAll,
      interPolygon,
      interPolyline,
      interLine
    }
  }
})
</script>
<style scoped lang="less">
.fontMsg {
  color: #cad1d1;
  font-size: 12px;
}
.pannel-item-label {
  width: 40px;
}
</style>
