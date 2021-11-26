<template>
  <PannelBox class="infoView">
    <a-checkbox
      v-model:checked="formState.enabledSmallTooltip"
      @change="formStateChange"
      >启用/禁用</a-checkbox
    >
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledSmallTooltip: boolean
}

export default defineComponent({
  components: {
    PannelBox
  },
  setup () {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const formState: UnwrapRef<FormState> = reactive({
      enabledSmallTooltip: true
    })

    const formStateChange = () => {
      mapWork.enabledSmallTooltip(formState.enabledSmallTooltip)
    }

    return {
      formState,
      formStateChange
    }
  }
})
</script>
<style scoped lang="less">

</style>
