<template>
  <PannelBox class="infoView">
    <a-space>
      <mars-button @click="show(5)">5F</mars-button>
      <mars-button @click="show(4)">4F</mars-button>
      <mars-button @click="show(3)">3F</mars-button>
      <mars-button @click="show(2)">2F</mars-button>
      <mars-button @click="show(1)">1F</mars-button>
      <mars-button @click="minusOne()">-1F</mars-button>
      <mars-button @click="showAll">整体</mars-button>
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

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
