<template>
  <PannelBox class="infoView">
    <LayerState/>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

import LayerState from "@comp/MarsSample/LayerState.vue"



export default defineComponent({
  components: {
    PannelBox,
    LayerState
}
})
</script>
<style scoped lang="less">

</style>
