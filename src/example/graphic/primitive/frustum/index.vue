<template>
  <PannelBox class="infoView">
    <mars-button @click="selPoint">追踪目标点</mars-button>
  </PannelBox>
</template>

<script lang="ts" setup>
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const selPoint = () => {
  mapWork.selPoint()
}
</script>
