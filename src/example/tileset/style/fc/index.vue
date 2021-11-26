<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="showAll">整体</mars-button>
      <mars-button @click="show(5)">5F</mars-button>
      <mars-button @click="show(4)">4F</mars-button>
      <mars-button @click="show(3)">3F</mars-button>
      <mars-button @click="show(2)">2F</mars-button>
      <mars-button @click="show(1)">1F</mars-button>
      <mars-button @click="minusOne()">-1F</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
// 负一层
const minusOne = () => {
  mapWork.minusOne()
}
const showAll = () => {
  mapWork.showAll()
}
const show = (item: any) => {
  mapWork.show(item)
}
</script>
<style scoped lang="less">
.ant-space {
  display: grid;
}
</style>
