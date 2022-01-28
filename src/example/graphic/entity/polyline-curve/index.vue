<template>
  <pannel class="infoView">
    <div class="f-mb">
      <layer-state />
    </div>

    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">数据维护:</span>
        <mars-button @click="onClickDrawModel">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="bindEdit">是否编辑</a-checkbox>
      </a-space>
    </div>

    <div>
      <data-manage />
    </div>
  </pannel>
  <location-to />
  <GraphicEditor ref="editor" />
</template>
<script setup lang="ts">
import { ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import DataManage from "@comp/mars-sample/data-manage.vue"
import LocationTo from "@comp/mars-sample/location-to.vue"
import LayerState from "@comp/mars-sample/layer-state.vue"
import GraphicEditor from "@comp/mars-sample/graphic-editor/index.vue"
import * as mapWork from "./map.js"

const onClickDrawModel = () => {
  mapWork.onClickDrawModel()
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
mapWork.eventTarget.on("editorUI-stop", async () => {
  editor.value.hideEditor()
})
</script>
