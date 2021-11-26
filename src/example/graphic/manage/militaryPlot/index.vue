<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState />
        <a-checkbox v-model:checked="isEditable" @change="isEditableChange">是否编辑</a-checkbox>
      </a-form-item>

      <a-form-item>
        <DataManage />
      </a-form-item>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">二维贴地</span>
          <mars-button @click="drawPolygon('straightArrow')">粗直箭头</mars-button>
          <mars-button @click="drawPolygon('fineArrow')">粗单尖直箭头</mars-button>
          <mars-button @click="drawPolygon('fineArrowYW')">燕尾直箭头</mars-button>
          <mars-button @click="drawPolygon('attackArrow')">攻击箭头</mars-button>
          <mars-button @click="drawPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
          <mars-button @click="drawPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
          <mars-button @click="drawPolygon('doubleArrow')">钳击箭头</mars-button>
          <mars-button @click="drawPolygon('closeVurve')">闭合曲面</mars-button>
          <mars-button @click="drawPolygon('gatheringPlace')">集结地</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">三维贴地</span>
          <mars-button @click="drawExtrudedPolygon('straightArrow')">粗直箭头</mars-button>
          <mars-button @click="drawExtrudedPolygon('fineArrow')">粗单尖直箭头</mars-button>
          <mars-button @click="drawExtrudedPolygon('fineArrowYW')">燕尾直箭头</mars-button>
          <mars-button @click="drawExtrudedPolygon('attackArrow')">攻击箭头</mars-button>
          <mars-button @click="drawExtrudedPolygon('attackArrowPW')">平尾攻击箭头</mars-button>
          <mars-button @click="drawExtrudedPolygon('attackArrowYW')">燕尾攻击箭头</mars-button>
          <mars-button @click="drawExtrudedPolygon('doubleArrow')">钳击箭头</mars-button>
          <mars-button @click="drawExtrudedPolygon('closeVurve')">闭合曲面</mars-button>
          <mars-button @click="drawExtrudedPolygon('gatheringPlace')">集结地</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
  <GraphicEditor ref="editor" />
  <LocationTo />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
import DataManage from "@comp/MarsSample/DataManage.vue"
import GraphicEditor from "@comp/GraphicEditor/index.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"

export default defineComponent({
  components: {
    PannelBox,
    LayerState,
    DataManage,
    GraphicEditor,
    LocationTo
  },
  setup() {
    // mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
    const mapWork = window.mapWork || {}
    const editor = ref()

    // 是否可编辑
    const isEditable = ref(true)
    const isEditableChange = () => {
      if (!isEditable.value) {
        editor.value.hideEditor()
      }
    }

    const drawPolygon = (type: any) => {
      mapWork.drawPolygon(type)
    }
    const drawExtrudedPolygon = (type: any) => {
      mapWork.drawExtrudedPolygon(type)
    }

    // 开始编辑
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

    return {
      drawPolygon,
      drawExtrudedPolygon,
      isEditableChange,
      isEditable,
      editor
    }
  }
})
</script>
<style scoped lang="less"></style>
