<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <LayerState />
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">数据维护:</span>
        <mars-button @click="btnDrawModel">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="bindEdit">是否编辑</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
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

const btnDrawModel = () => {
  mapWork.btnDrawModel()
}

// 是否编辑
const enabledEdit = ref<boolean>(false)
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
