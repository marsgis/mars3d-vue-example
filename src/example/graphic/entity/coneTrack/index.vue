<template>
  <PannelBox class="infoView">
    <mars-button @click="btnSelPoint">追踪目标点</mars-button>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const btnSelPoint = () => {
  mapWork.btnSelPoint()
}
</script>
<style scoped lang="less">

</style>
