<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <mars-button class="draw-btn" @click="drawPolygon">单体化面</mars-button>

    <div v-if="value === '1'" class="f-pt">
      <a-space>
        <a-upload :multiple="false" name="file" accept=".json,.geojson" :showUploadList="false"
          :beforeUpload="() => false"
          @change="openGeoJSON">
          <mars-button> 打开</mars-button>
        </a-upload>
        <mars-button @click="saveGeoJSON">保存</mars-button>
        <mars-button @click="clear" danger>清除</mars-button>
      </a-space>
    </div>

    <div class="f-pt">
      <a-space>
        <a-radio-group @change="modeChange" v-model:value="value" name="radioGroup">
          <a-radio value="1">编辑模式</a-radio>
          <a-radio value="2">预览模式</a-radio>
        </a-radio-group>
      </a-space>
    </div>
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref, markRaw, onMounted } from "vue"
import * as mapWork from "./map.js"
import { useWidget } from "@mars/widgets/common/store/widget"

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
  if (fileType !== "json") {
    alert("文件类型不合法,请选择json格式标注文件！")
  }

  mapWork.openGeoJSON(item)
}

// 点击保存GeoJSON
const saveGeoJSON = () => {
  mapWork.saveGeoJSON()
}

// ************************属性面板************************/
const { activate, disable, isActivate, updateWidget } = useWidget()
mapWork.eventTarget.on("updateGraphicOptionsWidget", (event) => {
  if (event.disable) {
    disable("graphic-options")
  } else {
    const data = { layerId: event.layerId, graphicId: event.graphicId }
    if (!isActivate("graphic-options")) {
      activate({ name: "graphic-options", data })
    } else {
      updateWidget("graphic-options", data)
    }
  }
})
</script>

<style lang="less" scoped>
.draw-btn {
  width: 302px !important;
}

.mars-button {
  width: 95px;
}
</style>
