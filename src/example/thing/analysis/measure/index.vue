<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <mars-button class="btn" @click="measureLength">空间距离</mars-button>
        <mars-button class="btn" @click="measureArea">水平面积</mars-button>
        <mars-button class="btn" @click="measureHeight">高度差</mars-button>
        <mars-button class="btn" @click="measurePoint">坐标测量</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <mars-button class="btn" @click="measureSurfaceLength">贴地距离</mars-button>
        <mars-button class="btn" @click="measureSurfaceeArea">贴地面积</mars-button>
        <mars-button class="btn" @click="measureTriangleHeight">三角测量</mars-button>
        <mars-button class="btn" @click="measureAngle">方位角</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <mars-button class="control_btn" @click="saveGeoJSON">保存Json</mars-button>
        <a-upload :multiple="false" name="file" accept=".json,.geojson" :showUploadList="false" @change="openGeoJSON" :beforeUpload="() => false">
          <mars-button class="control_btn"> 打开Json </mars-button>
        </a-upload>
        <mars-button class="control_btn" danger @click="clear">清除</mars-button>
      </a-space>
    </div>
    <div>
      <a-checkbox @change="isChecked" v-model:checked="checked">开启顶点吸附</a-checkbox>
    </div>
  </mars-dialog>

  <location-to />
</template>

<script setup lang="ts">
import { ref } from "vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import * as mapWork from "./map.js"

const checked = ref(false)

// 空间距离
const measureLength = () => {
  mapWork.measureLength()
}
// 水平面积
const measureArea = () => {
  mapWork.measureArea()
}

// 高度差
const measureHeight = () => {
  mapWork.measureHeight()
}

// 坐标测量
const measurePoint = () => {
  mapWork.measurePoint()
}

// 贴地距离
const measureSurfaceLength = () => {
  mapWork.measureSurfaceLength()
}

// 贴地面积
const measureSurfaceeArea = () => {
  mapWork.measureSurfaceeArea()
}

// 三角测量
const measureTriangleHeight = () => {
  mapWork.measureTriangleHeight()
}
// 方位角
const measureAngle = () => {
  mapWork.measureAngle()
}

const isChecked = () => {
  mapWork.onlyVertexPosition(checked.value)
}
const clear = () => {
  mapWork.removeAll()
}

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

// 打开JSON
const openGeoJSON = (info: FileInfo) => {
  mapWork.openJSON(info.file)
}
// 点击保存GeoJSON
const saveGeoJSON = () => {
  mapWork.saveJSON()
}
</script>
<style lang="less" scoped>
.mars-button {
  padding: 0px;
}
.btn {
  width: 68.3px;
}
.control_btn {
  width: 94px;
}
.clear_btn {
  width: 302px;
}
</style>
