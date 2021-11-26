<template>
  <PannelBox class="infoView">
    <a-form-item label="速度:">
      <a-slider @change="formStateChange" v-model:value="formState.slideStep" :min="1" :max="100" :step="1" />
    </a-form-item>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  slideStep: number
}

export default defineComponent({
  components: {
    PannelBox
  },
  setup () {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const formState: UnwrapRef<FormState> = reactive({
      slideStep: 10
    })

    const formStateChange = () => {
      mapWork.changeSlide(formState.slideStep)
    }

    return {
      formState,
      formStateChange
    }
  }
})
</script>
<style scoped lang="less">
.infoView {
  width: 245px;
}
</style>
