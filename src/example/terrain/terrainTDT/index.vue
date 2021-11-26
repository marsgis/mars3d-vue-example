<template>
  <PannelBox class="infoView">
          <a-checkbox
            v-model:checked="formState.enabledSanjiaowang"
            @change="formStateChange"
            >地形三角网</a-checkbox
          >
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
// eslint-disable-next-line no-duplicate-imports
import type { UnwrapRef } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

interface FormState {
  enabledSanjiaowang: boolean
}

export default defineComponent({
  components: {
    PannelBox
  },
  setup () {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const formState: UnwrapRef<FormState> = reactive({
      enabledSanjiaowang: false
    })

    const formStateChange = () => {
      mapWork.enabledSanjiaowang(formState.enabledSanjiaowang)
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
