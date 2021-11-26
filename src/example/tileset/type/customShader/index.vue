<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span>Style样式</span>
          <mars-button @click="setStyleDef"> 原始样式 </mars-button>
          <mars-button @click="setStyle1">自定义效果1</mars-button>
          <mars-button @click="setStyle2">自定义效果2</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"


interface FormState {
  enabledBloom: boolean
  enabledShadows: boolean
  enabledBrightness: boolean
  color: string
}
export default defineComponent({
  components: {
    PannelBox
  },

  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    // 原始样式
    const setStyle1 = () => {
      mapWork.setStyle1()
    }
    // 样式1
    const setStyle2 = () => {
      mapWork.setStyle2()
    }
    // 样式2
    const setStyleDef = () => {
      mapWork.setStyleDef()
    }


    return {
      setStyle1,
      setStyle2,
      setStyleDef
    }
  }
})
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}
</style>
