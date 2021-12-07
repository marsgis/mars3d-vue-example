<template>
      <a-space>
        <span class="pannel-item-label">数据管理:</span>
        <mars-button @click="btnClear">清除</mars-button>
        <mars-button @click="btnExpFile"  title="保存GeoJSON">
           <icon-save />
        保存</mars-button>
        <a-upload
          :multiple="false"
          name="file"
          accept="json,geojson"
          :file-list="fileList"
          :showUploadList="false"
          :supportServerRender="true"
          :beforeUpload="beforeUploade"
          @change="btnImpFile"
        >
          <a-button title="打开GeoJSON">
            <icon-upload-one />
            打开
          </a-button>
        </a-upload>
      </a-space>
</template>

<script setup lang="ts">
/**
 * 公共组件：用来运行或保存GEOJSON
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { ref } from "vue"
import { message } from "ant-design-vue"
import { UploadOutlined } from "@ant-design/icons-vue"

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

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork

//  清除数据
const btnClear = () => {
  mapWork.btnClear()
}
// 保存geojson
const btnExpFile = () => {
  mapWork.btnExpFile()
}
// 打开geojson
const beforeUploade = (file: FileItem) => {
  // fileList.value = [file]
  return false
}
const btnImpFile = (info: FileInfo) => {
  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType != "json") {
    message.error("文件类型不合法,请选择json格式标注文件！")
  }
  mapWork.btnImpFile(item)
}

const fileList = ref([])
</script>
