<template>
  <pannel class="infoView model-View" v-auto-height="60">
    <div class="f-mb">
      <a-space>
        <a-checkbox @change="chkTestTerrain" v-model:checked="isTestTerrain">深度检测</a-checkbox>
        <a-checkbox @change="onlyPickModelPosition" v-model:checked="isonlyModel">仅在3dtiles上标绘</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb infoView-content">
      <a-upload :multiple="false" name="file" accept="json,geojson" :showUploadList="false" @change="openGeoJSON" :beforeUpload="() => false">
        <icon-folder-upload class="icon" theme="outline" size="20" fill="#ffffff" title="打开" />
      </a-upload>
      <icon-disk class="icon" theme="outline" size="20" fill="#ffffff" @click="saveGeoJSON" title="保存GeoJSON" />
    </div>

    <div class="f-mb">
      <mars-select
        ref="select"
        v-model:value="value1"
        style="width: 200px; margin-left: 10px"
        :options="selectOptions"
        @change="handleChange"
      ></mars-select>

      <div class="f-mb gltfImg" v-auto-height="220">
        <ul>
          <li v-for="imgs in dataList" :key="imgs.name">
            <img :src="imgs.image" alt="" @click="showModel(imgs.style)" />
          </li>
        </ul>
      </div>
    </div>
  </pannel>
  <GraphicEditor ref="editor" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import GraphicEditor from "@comp/graphic-editor/index.vue"
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

// 深度检测
const isTestTerrain = ref<boolean>(false)
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(isTestTerrain.value)
}

// 仅在模型上绘制
const isonlyModel = ref<boolean>(false)
const onlyPickModelPosition = () => {
  mapWork.onlyPickModelPosition(isonlyModel.value)
}

// 绘制模型
const showModel = (style: any) => {
  mapWork.drawGltf(style)
}

//* **********************下拉框******************* */
let modelData: any
const selectOptions = ref<any[]>([])
const value1 = ref<string>("车辆")
const dataList = ref<any[]>([])

mapWork.eventTarget.on("loadOk", function (event: any) {
  modelData = event.data
  // 下拉框数据
  Object.keys(modelData).forEach((k) => {
    selectOptions.value.push({
      value: k,
      lable: k
    })
  })
  handleChange()
})
// 下拉框改变
const handleChange = () => {
  dataList.value = modelData[value1.value]

  for (let i = 0; i < dataList.value.length; i++) {
    const item = dataList.value[i]

    item.image = mapWork.changeItemImage(item)
    item.style.url = mapWork.changeItemUrl(item)
    dataList.value[i] = item
  }
}

// ************************JSON文件************************/
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

// ************************属性面板************************/
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
<style scoped lang="less">
.infoView-content {
  top: 10px;
  width: 210px;
  background-color: rgba(32, 42, 68, 0.5);
}
.icon {
  margin-left: 10px;
}
.model-View {
  right: 10px;
  width: 240px;
}
.gltfImg {
  width: 100%;
  margin-top: 10px;
  margin-left: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}

.gltfImg li {
  display: inline-block;
  margin-right: 5px;
  width: 100px;
  text-align: center;
  padding-bottom: 10px;
}

.gltfImg img {
  width: 100px;
  height: 90px;
  border: 1.5px solid white;
}
</style>
