<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="addGaodeLayer">高德交通态势图</mars-button>
      <mars-button @click="addBaiduLayer">百度交通态势图</mars-button>
    </a-space>
  </PannelBox>
  <InterestSearch/>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import InterestSearch from "@comp/MarsSample/InterestSearch.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const addGaodeLayer = () => {
  mapWork.addGaodeLayer()
}

const addBaiduLayer = () => {
  mapWork.addBaiduLayer()
}
</script>
<style scoped lang="less">

</style>
