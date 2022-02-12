<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">数据维护:</span>
        <mars-button @click="onClickStartDraw">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="onChangeHasEdit">是否编辑</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">方法演示:</span>
        <mars-button @click="btnStartBounce">开始弹跳</mars-button>
        <mars-button @click="btnStartBounce2">开始弹跳（自动停止）</mars-button>
        <mars-button @click="btnStopBounce">停止弹跳</mars-button>
      </a-space>
    </div>

    <div class="f-mb">
      <data-manage />
    </div>
  </mars-pannel>
  <location-to />
  <GraphicEditor ref="editor" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import DataManage from "@/components/mars-sample/data-manage.vue"
import LocationTo from "@/components/mars-sample/location-to.vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
import GraphicEditor from "@/components/mars-sample/graphic-editor/index.vue"
import * as mapWork from "./map.js"

const onClickStartDraw = () => {
  mapWork.startDrawGraphic()
}
const btnStartBounce = () => {
  mapWork.btnStartBounce()
}
const btnStartBounce2 = () => {
  mapWork.btnStartBounce2()
}
const btnStopBounce = () => {
  mapWork.btnStopBounce()
}

// 是否编辑
const enabledEdit = ref<boolean>(false)
const onChangeHasEdit = () => {
  mapWork.updateLayerHasEdit(enabledEdit.value)
}

// 属性面板
const editor = ref()
mapWork.eventTarget.on("graphicEditor-start", async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 编辑修改了模型
mapWork.eventTarget.on("graphicEditor-update", async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 停止编辑修改模型
mapWork.eventTarget.on("graphicEditor-stop", async (e: any) => {
  editor.value.hideEditor()
})
</script>
