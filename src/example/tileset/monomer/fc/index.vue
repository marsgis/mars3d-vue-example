<template>
  <PannelBox class="infoView">
    显示每层颜色:<a-switch v-model:checked="checked" @change="chkShowColor" />
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

export default defineComponent({
  components: {
    PannelBox
  },
  setup () {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}

    const checked = ref(true)

    const chkShowColor = () => {
      mapWork.chkShowColor(checked.value)
    }

    return {
      checked,
      chkShowColor

    }
  }
})
</script>
<style scoped lang="less">
</style>
