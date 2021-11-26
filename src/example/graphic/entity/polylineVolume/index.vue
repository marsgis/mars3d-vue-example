<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState />
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">数据维护:</span>
          <mars-button @click="btnDrawModel">图上标绘</mars-button>
          <a-checkbox v-model:checked="enabledEdit" @change="bindEdit">是否编辑</a-checkbox>
        </a-space>
      </a-form-item>

      <a-form-item>
        <dataManage />
      </a-form-item>
    </a-form>
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

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const enabledEdit = ref(false)

const bindEdit = () => {
  mapWork.bindEdit(enabledEdit.value)
}
const btnDrawModel = () => {
  mapWork.btnDrawModel()
}

// 属性面板
const editor = ref()
mapWork.graphicLayer.on(mapWork.mars3d.EventType.drawCreated, async (e: any) => {
  const result = await editor.value.setValue(e.graphic)
  if (result) {
    editor.value.showEditor()
  }
})
// 编辑修改了模型
mapWork.graphicLayer.on(
  [
    mapWork.mars3d.EventType.editStart,
    mapWork.mars3d.EventType.editMovePoint,
    mapWork.mars3d.EventType.editStyle,
    mapWork.mars3d.EventType.editRemovePoint
  ],
  async (e: any) => {
    const result = await editor.value.setValue(e.graphic)
    if (result) {
      editor.value.showEditor()
    }
  }
)
// 停止编辑修改模型
mapWork.graphicLayer.on([mapWork.mars3d.EventType.editStop, mapWork.mars3d.EventType.removeGraphic], async (e: any) => {
  editor.value.hideEditor()
})
</script>
