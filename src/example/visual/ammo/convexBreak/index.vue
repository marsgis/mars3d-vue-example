<template>
  <PannelBox class="infoView">
    <div class="infoView-content">
       <span>操作提示：鼠标左键单击进行发射</span>
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
