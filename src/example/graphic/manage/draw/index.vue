<template>
  <PannelBox class="infoView">
    <div>
      <a-space>
        <span class="pannel-item-label">数据管理:</span>
        <a-checkbox v-model:checked="isShow" @change="showChange">显示隐藏</a-checkbox>
        <a-checkbox v-model:checked="popupShow" @change="showPopup">Popup绑定</a-checkbox>
        <a-checkbox v-model:checked="tooltipShow" @change="showTooltip">Tooltip绑定</a-checkbox>
        <a-checkbox v-model:checked="contextMenuShow" @change="showContextMenu">右键菜单绑定</a-checkbox>
        <a-checkbox v-model:checked="isEditable" @change="isEditableChange">是否编辑</a-checkbox>
        <a-checkbox v-model:checked="onlyPickModelPosition" @change="onlyPickModelPositionChange">
          <span title="屏蔽拾取地形坐标，避免穿透3dtiles模型">仅在3dtiles上标绘</span>
        </a-checkbox>
      </a-space>
    </div>
    <div class="f-pt">
      <a-space>
        <span class="pannel-item-label">图层管理:</span>
        <mars-button @click="clear">清除</mars-button>
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
        <mars-button @click="saveGeoJSON">保存GeoJSON</mars-button>
        <mars-button @click="saveKML">另存KML</mars-button>
        <mars-button @click="saveWKT">另存WKT</mars-button>
      </a-space>
    </div>
    <div class="f-pt">
      <a-space>
        <span class="pannel-item-label">单个点类:</span>
        <mars-button @click="drawPoint">点</mars-button>
        <mars-button @click="drawMarker">图标点</mars-button>
        <mars-button @click="drawLabel">文字</mars-button>
        <mars-button @click="drawModel">小模型</mars-button>
      </a-space>
    </div>
    <div class="f-pt">
      <a-space>
        <span class="pannel-item-label">二维空间:</span>
        <mars-button @click="drawPolyline(false)">线</mars-button>
        <mars-button @click="drawCurve(false)">曲线</mars-button>
        <mars-button @click="drawCorridor(false)">走廊</mars-button>
        <mars-button @click="drawPolygon(false)">面</mars-button>
        <mars-button @click="drawEllipse(false)">圆</mars-button>
        <mars-button @click="drawRectangle(false)">矩形</mars-button>
        <mars-button @click="draPlane">平面</mars-button>
      </a-space>
    </div>
    <div class="f-pt">
      <a-space>
        <span class="pannel-item-label">二维贴地:</span>
        <mars-button @click="drawPolyline(true)">线</mars-button>
        <mars-button @click="drawCurve(true)">曲线</mars-button>
        <mars-button @click="drawCorridor(true)">走廊</mars-button>
        <mars-button @click="drawPolygon(true)">面</mars-button>
        <mars-button @click="drawEllipse(true)">圆</mars-button>
        <mars-button @click="drawRectangle(true)">矩形</mars-button>
      </a-space>
    </div>
    <div class="f-pt">
      <a-space>
        <span class="pannel-item-label">三维空间:</span>
        <mars-button @click="draWall(false)">墙</mars-button>
        <mars-button @click="draWall(true)">闭合墙</mars-button>
        <mars-button @click="drawExtrudedPolygon">面立体</mars-button>
        <mars-button @click="drawExtrudedRectangle">矩形立体</mars-button>
        <mars-button @click="drawBox">盒子</mars-button>
        <mars-button @click="drawExtrudedCircle">圆柱</mars-button>
        <mars-button @click="drawCylinder">圆锥</mars-button>
        <mars-button @click="drawEllipsoid">球</mars-button>
      </a-space>
    </div>
  </PannelBox>
  <GraphicEditor ref="editor" />
  <LocationTo />
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import GraphicEditor from "@comp/GraphicEditor/index.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import _ from "lodash"

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

const globalProperties = getCurrentInstance()!.appContext.config.globalProperties

const mapWork = window.mapWork || {}

const editor = ref()

onMounted(() => {
  bindLayerContextMenu(mapWork.graphicLayer)
})

// 显示隐藏
const isShow = ref(true)
const showChange = () => {
  mapWork.graphicLayer.show = isShow.value
}

// 是否绑定Popup
const popupShow = ref(false)
const showPopup = () => {
  if (popupShow.value) {
    bindLayerPopup(mapWork.graphicLayer)
  } else {
    mapWork.graphicLayer.unbindPopup()
  }
}

function bindLayerPopup(graphicLayer: any) {
  graphicLayer.bindPopup(function (event: any) {
    const attr = event.graphic?.attr || {}
    attr.test1 = "测试属性"
    // attr["视频"] = `<video src='http://data.mars3d.cn/file/video/lukou.mp4' controls autoplay style="width: 300px;" ></video>`;

    return mapWork.mars3d.Util.getTemplateHtml({ title: "layer上绑定的Popup", template: "all", attr: attr })
  })
}

// 是否绑定Tooltip
const tooltipShow = ref(false)
const showTooltip = () => {
  if (tooltipShow.value) {
    mapWork.graphicLayer.bindTooltip("我是layer上绑定的Tooltip")
  } else {
    mapWork.graphicLayer.unbindTooltip()
  }
}

// 是否绑定右键菜单
const contextMenuShow = ref(true)
const showContextMenu = () => {
  if (tooltipShow.value) {
    bindLayerContextMenu(mapWork.graphicLayer)
  } else {
    mapWork.graphicLayer.unbindContextMenu(true)
  }
}

function bindLayerContextMenu(graphicLayer: any) {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e: any) {
        const graphic = e.graphic
        if (!graphic || !graphic.startEditing) {
          return false
        }
        return !graphic.isEditing
      },
      callback: function (e: any) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e: any) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.isEditing
      },
      callback: function (e: any) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.stopEditing(graphic)
        }
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event: any) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: function (e: any) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e: any) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "polyline" ||
          graphic.type === "polylineP" ||
          graphic.type === "curve" ||
          graphic.type === "curveP" ||
          graphic.type === "polylineVolume" ||
          graphic.type === "polylineVolumeP" ||
          graphic.type === "corridor" ||
          graphic.type === "corridorP" ||
          graphic.type === "wall" ||
          graphic.type === "wallP"
        )
      },
      callback: function (e: any) {
        const graphic = e.graphic
        const strDis = mapWork.mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalProperties.$alert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e: any) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP"
        )
      },
      callback: function (e: any) {
        const graphic = e.graphic
        const strDis = mapWork.mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalProperties.$alert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e: any) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP" ||
          graphic.type === "scrollWall" ||
          graphic.type === "water"
        )
      },
      callback: function (e: any) {
        const graphic = e.graphic
        const strArea = mapWork.mars3d.MeasureUtil.formatArea(graphic.area)
        globalProperties.$alert("该对象的面积为:" + strArea)
      }
    }
  ])
}

// 是否可编辑
const isEditable = ref(true)
const isEditableChange = () => {
  if (!isEditable.value) {
    editor.value.hideEditor()
  }
}

// 是否仅在3dtiles上标绘
const onlyPickModelPosition = ref(false)
const onlyPickModelPositionChange = () => {
  mapWork.map.onlyPickModelPosition = onlyPickModelPosition.value
}

// 点击清除按钮
const clear = () => {
  mapWork.graphicLayer.clear()
}

// 点击保存GeoJSON
const saveGeoJSON = () => {
  if (mapWork.graphicLayer.length === 0) {
    globalProperties.$message("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = mapWork.graphicLayer.toGeoJSON()
  mapWork.mars3d.Util.downloadFile("我的标注.json", JSON.stringify(geojson))
}

// 打开GeoJSON

const openGeoJSON = (info: FileInfo) => {
  const item = info.file
  const fileName = item.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()
  console.log(item)
  if (fileType != "json") {
    alert("文件类型不合法,请选择json格式标注文件！")
  }
  mapWork.openGeoJSON(item)
}

// 点击保存KML
const saveKML = () => {
  if (mapWork.graphicLayer.length === 0) {
    globalProperties.$message("当前没有标注任何数据，无需保存！")
    return
  }
  const strResult = toKML()
  mapWork.mars3d.Util.downloadFile("我的标注.kml", strResult)
}

function toKML() {
  let geojsonObject = mapWork.graphicLayer.toGeoJSON()
  if (geojsonObject == null) {
    return null
  }

  geojsonObject = _.cloneDeep(geojsonObject)

  const kml = mapWork.kgUtil.toKml(geojsonObject, {
    name: "Mars3D标绘数据",
    documentName: "Mars3D标绘数据文件",
    documentDescription: "标绘数据 by mars3d.cn",
    simplestyle: true
  })

  return kml
}

// 点击保存WKT
const saveWKT = () => {
  if (mapWork.graphicLayer.length === 0) {
    globalProperties.$message("当前没有标注任何数据，无需保存！")
    return
  }
  const strResult = toWKT()
  mapWork.mars3d.Util.downloadFile("我的标注wkt.txt", JSON.stringify(strResult))
}

function toWKT() {
  let geojsonObject = mapWork.graphicLayer.toGeoJSON()
  if (geojsonObject == null) {
    return null
  }
  geojsonObject = _.cloneDeep(geojsonObject)

  const arrWKT: any[] = []
  let index = 0
  geojsonObject.features.forEach((feature: any) => {
    const attr = feature.properties
    const style = feature.properties.style

    const wkt = mapWork.Terraformer.WKT.convert(feature.geometry) // geojson转换WKT格式 ,terraformer库
    arrWKT.push({
      id: ++index,
      name: attr.name || "",
      remark: attr.remark || "",
      style: style,
      wkt: wkt
    })
  })
  return arrWKT
}

// 开始编辑
mapWork.graphicLayer.on(mapWork.mars3d.EventType.editStart, async (e: any) => {
  if (isEditable.value) {
    const result = await editor.value.setValue(e.graphic)
    if (result) {
      editor.value.showEditor()
    }
  }
})

// 停止编辑
mapWork.graphicLayer.on(mapWork.mars3d.EventType.editStop, async (e: any) => {
  editor.value.hideEditor()
})

// 移动坐标点
mapWork.graphicLayer.on(mapWork.mars3d.EventType.editMovePoint, async (e: any) => {
  if (isEditable.value) {
    const result = await editor.value.setValue(e.graphic)
    if (result) {
      editor.value.showEditor()
    }
  }
})

// 删除对象
mapWork.graphicLayer.on(mapWork.mars3d.EventType.removeGraphic, async (e: any) => {
  editor.value.hideEditor()
})

function drawPoint() {
  mapWork.drawPoint()
}

function drawMarker() {
  mapWork.drawMarker()
}

function drawLabel() {
  mapWork.drawLabel()
}

function drawModel() {
  mapWork.drawModel()
}

function drawPolyline(clampToGround: boolean) {
  mapWork.drawPolyline(clampToGround)
}

function drawPolygon(clampToGround: boolean) {
  mapWork.drawPolygon(clampToGround)
}

function drawCurve(clampToGround: boolean) {
  mapWork.drawCurve(clampToGround)
}

function drawCorridor(clampToGround: boolean) {
  mapWork.drawCorridor(clampToGround)
}

function drawEllipse(clampToGround: boolean) {
  mapWork.drawEllipse(clampToGround)
}

function drawRectangle(clampToGround: boolean) {
  mapWork.drawRectangle(clampToGround)
}

function draPlane() {
  mapWork.draPlane()
}

function draWall(closure: boolean) {
  mapWork.draWall(closure)
}

function drawBox() {
  mapWork.drawBox()
}

function drawCylinder() {
  mapWork.drawCylinder()
}

function drawEllipsoid() {
  mapWork.drawEllipsoid()
}

function drawExtrudedPolygon() {
  mapWork.drawExtrudedPolygon()
}

function drawExtrudedRectangle() {
  mapWork.drawExtrudedRectangle()
}

function drawExtrudedCircle() {
  mapWork.drawExtrudedCircle()
}
</script>
