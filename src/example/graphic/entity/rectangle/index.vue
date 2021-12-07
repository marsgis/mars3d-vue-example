<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <LayerState />
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">数据维护:</span>
        <mars-button @click="onClickDrawModel">绘制矩形</mars-button>
        <mars-button @click="onClickDrawModelExtruded">立体矩形</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="bindEdit">是否编辑</a-checkbox>
      </a-space>
    </div>
    <div>
      <dataManage />
    </div>
  </PannelBox>
  <LocationTo />
  <GraphicEditor ref="editor" />
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import dataManage from "@comp/MarsSample/DataManage.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
import GraphicEditor from "@comp/GraphicEditor/index.vue"
import * as mapWork from "./map.js"

const onClickDrawModel = () => {
  mapWork.onClickDrawModel()
}
const onClickDrawModelExtruded = () => {
  mapWork.onClickDrawModelExtruded()
}

// 是否编辑
const enabledEdit = ref(false)
const bindEdit = () => {
  mapWork.bindEdit(enabledEdit.value)
}

// 属性面板
const editor = ref()
mapWork.eventTarget.on("editorUI-draw", async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 编辑修改了模型
mapWork.eventTarget.on("editorUI-SMR", async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 停止编辑修改模型
mapWork.eventTarget.on("editorUI-stop", async (e: any) => {
  editor.value.hideEditor()
})
</script>
