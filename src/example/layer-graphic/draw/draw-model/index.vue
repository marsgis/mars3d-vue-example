<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span>模型URl</span>
        <mars-input v-model:value="modelUrl"></mars-input>
        <a-checkbox v-model:checked="isProxy">代理</a-checkbox>
        <mars-button @click="drawModel">标绘</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <a-checkbox @change="chkHasTerrain" v-model:checked="isHasTerrain">地形</a-checkbox>
        <a-checkbox @change="chkTestTerrain" v-model:checked="isTestTerrain">深度检测</a-checkbox>
        <a-checkbox @change="onlyPickModelPosition" v-model:checked="isonlyModel">仅在3dtiles上标绘</a-checkbox>
      </a-space>
    </div>
    <div>
      <a-space>
        <a-upload
          :multiple="false"
          name="file"
          accept="json,geojson"
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
  </pannel>
  <GraphicEditor ref="editor" />
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from "vue"
import Pannel from "@/components/mars-work/pannel.vue"
import GraphicEditor from "@comp/mars-sample/graphic-editor/index.vue"
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

const modelUrl = ref<string>("//data.mars3d.cn/gltf/mars/feiji.glb")

// 代理
const isProxy = ref<boolean>(false)
const drawModel = () => {
  mapWork.drawModel(modelUrl.value, isProxy.value)
}

// 地形
const isHasTerrain = ref<boolean>(true)
const chkHasTerrain = () => {
  mapWork.chkHasTerrain(isHasTerrain.value)
}

// 深度检测
const isTestTerrain = ref<boolean>(false)
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(isTestTerrain.value)
}

// 仅在3dmodel上绘制
const isonlyModel = ref<boolean>(false)
const onlyPickModelPosition = () => {
  mapWork.onlyPickModelPosition(isonlyModel.value)
}

const clear = () => {
  mapWork.deleteAll()
}

// *****************************JSON文件***************************//
const globalProperties = getCurrentInstance()!.appContext.config.globalProperties
// 打开JSON
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

// *****************************属性面板***************************//
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
