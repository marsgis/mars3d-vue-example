<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="btns-list">
      <mars-button @click="onBindMapDemo">Map上直接弹出</mars-button>

      <mars-button @click="onBindLayerDemo">图层上绑定</mars-button>
      <mars-button @click="onBindLayerDemo2">图层上预定义配置</mars-button>
      <mars-button @click="onBindLayerTemplateDemo">自定义模版</mars-button>

      <mars-button @click="onBindGraphicDemo1">Graphic上绑定</mars-button>
      <mars-button @click="onBindGraphicDemo2">Graphic上局部刷新</mars-button>
      <mars-button @click="onBindGraphicDynamicAttrDemo">后端动态属性</mars-button>
    </div>
  </mars-dialog>

  <mars-dialog left="100" right="100" top="80" bottom="80" title="查看历史" v-model:visible="showLayer">
    <iframe src="http://marsgis.cn/"
     sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
     frameborder="0" style="height: 100%;width: 100%;"></iframe>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const showLayer = ref()

mapWork.eventTarget.on("showWebsite", function (event: any) {
  showLayer.value = event.showHistoryLayer
})

const onBindMapDemo = () => {
  mapWork.bindMapDemo()
}

const onBindLayerDemo = () => {
  mapWork.bindLayerDemo()
}

const onBindLayerDemo2 = () => {
  mapWork.bindLayerDemo2()
}

const onBindLayerTemplateDemo = () => {
  mapWork.bindLayerTemplateDemo()
}
const onBindGraphicDynamicAttrDemo = () => {
  mapWork.bindGraphicDynamicAttrDemo()
}

const onBindGraphicDemo1 = () => {
  mapWork.bindGraphicDemo1()
}

const onBindGraphicDemo2 = () => {
  mapWork.bindGraphicDemo2()
}
</script>
<style scoped lang="less">
.btns-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
</style>
