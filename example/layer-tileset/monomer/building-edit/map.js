import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayerEdit
let geoJsonLayerDTH

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 43.820826, lng: 125.144526, alt: 679, heading: 333, pitch: -32 }
  },
  control: {
    infoBox: false
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 三维模型
  const tilesetLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "校园",
    url: "//data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",
    position: { alt: 15.8 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tilesetLayer)

  // 单体化图层
  geoJsonLayerDTH = new mars3d.layer.GeoJsonLayer({
    name: "校园-单体化",
    symbol: {
      type: "polygonP",
      styleOptions: {
        // 单体化默认显示样式
        color: "rgba(255, 255, 255, 0.01)",
        clampToGround: true,
        classification: true,
        buffer: 1,
        // 单体化鼠标移入或单击后高亮的样式
        highlight: {
          type: mars3d.EventType.click,
          color: "rgba(255,255,0,0.4)"
        }
      }
    },
    popup: [
      { field: "name", name: "学校场所" },
      { field: "sfkf", name: "是否开放" },
      { field: "remark", name: "备注信息" }
    ]
  })
  map.addLayer(geoJsonLayerDTH)

  graphicLayerEdit = new mars3d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true, // 绘制完成后是否自动激活编辑
    symbol: {
      type: "polygon",
      styleOptions: {
        color: "rgba(255, 255, 0, 0.4)",
        clampToGround: true
      }
    }
  })
  map.addLayer(graphicLayerEdit)

  // 触发自定义事件
  graphicLayerEdit.on(mars3d.EventType.drawCreated, function (e) {
    const graphic = e.graphic
    eventTarget.fire("editorUI-draw", { graphic })
  })
  graphicLayerEdit.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e) {
      const graphic = e.graphic
      eventTarget.fire("editorUI-SMR", { graphic })
    }
  )
  graphicLayerEdit.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
    eventTarget.fire("editorUI-stop")
  })

  queryDthData()

  bindLayerContextMenu()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 加载数据
function queryDthData() {
  const configUrl = "//data.mars3d.cn/file/geojson/dth-xuexiao-fd.json"
  mars3d.Resource.fetchJson({ url: configUrl })
    .then(function (result) {
      graphicLayerEdit.loadGeoJSON(result)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

/**
 * 绑定右键菜单功能，开始编辑，删除等
 *@returns {void} 无
 */
function bindLayerContextMenu() {
  graphicLayerEdit.bindContextMenu([
    {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.startEditing) {
          return false
        }
        return !graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayerEdit.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayerEdit.stopEditing(graphic)
        }
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayerEdit.removeGraphic(graphic)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e) {
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
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e) {
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
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}

// 切换到预览模式
export function toYLMS() {
  const geojson = graphicLayerEdit.toGeoJSON()

  geoJsonLayerDTH.load({ data: geojson })

  graphicLayerEdit.hasEdit = false
  graphicLayerEdit.show = false
}

// 切换到编辑模式
export function toBJMS() {
  geoJsonLayerDTH.clear()
  graphicLayerEdit.hasEdit = true
  graphicLayerEdit.show = true
}

export function deleteAll() {
  graphicLayerEdit.clear()
}

export function drawPolygon() {
  graphicLayerEdit.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      opacity: 0.3,
      clampToGround: true
    }
  })
}

/**
 *打开geojson文件
 *
 * @export
 * @param {FileInfo} file 文件名称
 * @returns {void} 无
 */
export function openGeoJSON(file) {
  const fileName = file.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType == "json" || fileType == "geojson") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const json = this.result
      graphicLayerEdit.loadGeoJSON(json, {
        clear: true,
        flyTo: true
      })
    }
  } else {
    globalMsg("暂不支持 " + fileType + " 文件类型的数据！")
  }
}

// 保存JSON文件
export function saveGeoJSON() {
  if (graphicLayerEdit.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicLayerEdit.toGeoJSON()
  mars3d.Util.downloadFile("单体化.json", JSON.stringify(geojson))
}
