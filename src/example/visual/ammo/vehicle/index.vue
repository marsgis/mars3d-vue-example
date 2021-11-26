<template>
  <PannelBox class="infoView">
    <div class="infoView-content">
       <span>操作提示：W 前进、S 后退、 A 左转弯、D 右转弯</span>
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
