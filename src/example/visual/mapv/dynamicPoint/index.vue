<template>
  <PannelBox class="infoView">
    <div class="infoView-content">
       <span>在视域变化中部分效果（如点的闪烁）没有融合，可根据实际项目决定是否采用此效果。</span>
    </div>
  </PannelBox>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

export default defineComponent({
  components: {
    PannelBox
  }
})
</script>

<style scoped lang="less">
</style>
