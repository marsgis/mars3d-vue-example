<template>
  <mars-dialog :visible="true" right="10" top="10"  width="330">
    <div class="btns-list">
      <mars-button @click="onBindLayerDemo">图层上绑定</mars-button>
      <mars-button @click="onUnBindLayerDemo">图层上解绑</mars-button>
      <mars-button @click="onBindGraphicDemo">Graphic上绑定</mars-button>
      <mars-button @click="onUnBindGraphicDemo">Graphic上解绑</mars-button>
      <mars-button @click="onBindMapDefault">Map绑定默认菜单</mars-button>
      <mars-button @click="onBindMapDemo">Map绑定自定义菜单</mars-button>
      <mars-button @click="onUnBindMapDemo">Map绑定上解绑</mars-button>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import * as mapWork from "./map.js"

const onBindMapDemo = () => {
  mapWork.bindMapDemo()
}

const onBindMapDefault = () => {
  mapWork.bindMapDefault()
}
const onUnBindMapDemo = () => {
  mapWork.unBindMapDemo()
}

const onBindLayerDemo = () => {
  mapWork.bindLayerDemo()
}

const onUnBindLayerDemo = () => {
  mapWork.unBindLayerDemo()
}

const onBindGraphicDemo = () => {
  mapWork.bindGraphicDemo()
}

const onUnBindGraphicDemo = () => {
  mapWork.unBindGraphicDemo()
}
</script>
<style scoped lang="less">
.btns-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
} 
</style>
