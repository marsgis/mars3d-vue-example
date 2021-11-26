<template>
  <PannelBox class="infoView">
    <LayerState />
  </PannelBox>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
</script>
<style scoped lang="less">
.inputNum {
  width: 70px !important;
}
</style>
