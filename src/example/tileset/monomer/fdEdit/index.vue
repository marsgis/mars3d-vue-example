<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <a-space>
        <a-radio-group @change="modeChange" v-model:value="value" name="radioGroup">
          <a-radio value="1">编辑模式</a-radio>
          <a-radio value="2">预览模式</a-radio>
        </a-radio-group>
      </a-space>
    </div>

    <div v-if="value === '1'">
      <a-space>
        <mars-button @click="drawPolygon">单体化面</mars-button>
        <a-upload
          :multiple="false"
          name="file"
          accept="json,geojson,kml,kmz"
          :showUploadList="false"
          @change="openGeoJSON"
          :beforeUpload="() => false"
        >
          <mars-button> 打开... </mars-button>
        </a-upload>
        <mars-button @click="saveGeoJSON">保存</mars-button>
        <mars-button @click="clear">清除</mars-button>
      </a-space>
    </div>
  </PannelBox>
  <GraphicEditor ref="editor" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import GraphicEditor from "@comp/GraphicEditor/index.vue"
import * as mapWork from "./map.js"

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: string
  url?: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

// 单体化面
const drawPolygon = () => {
  mapWork.drawPolygon()
}

const clear = () => {
  mapWork.deleteAll()
}

// 模式发生改变
const value = ref<string>("1")
const modeChange = () => {
  if (value.value === "1") {
    mapWork.toBJMS()
  } else {
    mapWork.toYLMS()
  }
}

// 打开
const openGeoJSON = (info: FileInfo) => {
  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()
  if (fileType != "json") {
    alert("文件类型不合法,请选择json格式标注文件！")
  }

  mapWork.openGeoJSON(item)
}

// 点击保存GeoJSON
const saveGeoJSON = () => {
  mapWork.saveGeoJSON()
}

//* ************************属性面板*****************************/
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
