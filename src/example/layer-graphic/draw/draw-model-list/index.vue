<template>
  <mars-pannel class="infoView model-View" v-auto-height="60">
    <div class="f-mb infoView-content">
      <a-space>
        <span>模型列表： </span>
        <a-upload :multiple="false" name="file" accept="json,geojson" :showUploadList="false" @change="openGeoJSON" :beforeUpload="() => false">
          <i title="打开GeoJSON文件"><Icon icon="icon-park-outline:folder-upload" width="19" /></i>
        </a-upload>
        <i title="保存GeoJSON"><Icon icon="icon-park-outline:disk" width="17" color="#f2f2f2" @click="saveGeoJSON" /></i>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <a-checkbox @change="chkTestTerrain" v-model:checked="isTestTerrain">深度检测</a-checkbox>
        <a-checkbox @change="onlyPickModelPosition" v-model:checked="isonlyModel">仅在3dtiles上标绘</a-checkbox>
      </a-space>
    </div>

    <div class="f-mb">
      <mars-select
        ref="select"
        v-model:value="value1"
        style="width: 200px; margin-left: 10px"
        :options="selectOptions"
        @change="handleChange"
      ></mars-select>

      <div class="f-mb gltfImg" v-auto-height="200">
        <ul>
          <li v-for="imgs in dataList" :key="imgs.name">
            <img :src="imgs.image" alt="" @click="showModel(imgs.style)" />
          </li>
        </ul>
      </div>
    </div>
  </mars-pannel>
  <GraphicEditor ref="editor" />
</template>

<script lang="ts" setup>
import { ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import GraphicEditor from "@/components/mars-sample/graphic-editor/index.vue"
import { Icon } from "@iconify/vue"
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
  mapWork.startDrawModel(style)
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
<style scoped lang="less">
.model-View {
  right: 10px;
  width: 250px;
}

.infoView-content {
  height: 20px;
  width: 210px;
  line-height: 20px;
  background-color: rgba(32, 42, 68, 0.5);
  overflow: hidden;
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
.ant-upload {
  line-height: 0 !important;
}
</style>
