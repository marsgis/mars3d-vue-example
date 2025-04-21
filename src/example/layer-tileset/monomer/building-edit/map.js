import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer

let geoJsonLayerDTH

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 43.822109, lng: 125.14311, alt: 890, heading: 337, pitch: -50 }
  },
  control: {
    infoBox: false
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 三维模型
  const tilesetLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "校园",
    url: "https://data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",
    position: { alt: 279.0 },
    maximumScreenSpaceError: 1
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

  mars3d.DrawUtil.setEditPointStyle(mars3d.EditPointType.Control, { has3dtiles: true }) // 编辑点贴模型

  graphicLayer = new mars3d.layer.GraphicLayer({
    isAutoEditing: true, // 自动激活编辑
    symbol: {
      type: "polygonP",
      merge: true, // 是否合并并覆盖json中已有的style，默认不合并
      styleOptions: {
        color: "rgba(255, 255, 0, 0.4)",
        clampToGround: true
      }
    }
  })
  map.addLayer(graphicLayer)

  const editUpdateFun = mars3d.Util.funDebounce(openGraphicOptionsWidget, 500)
  graphicLayer.on([mars3d.EventType.click, mars3d.EventType.drawCreated, mars3d.EventType.editStart, mars3d.EventType.editStyle], editUpdateFun)
  const removeFun = mars3d.Util.funDebounce(closeGraphicOptionsWidget, 500)
  graphicLayer.on(mars3d.EventType.removeGraphic, removeFun)

  // 加载数据
  const configUrl = "https://data.mars3d.cn/file/geojson/dth-xuexiao-fd.json"
  mars3d.Util.fetchJson({ url: configUrl })
    .then(function (result) {
      graphicLayer.loadGeoJSON(result)
    })
    .catch(function (error) {
      console.log("加载JSON出错", error)
    })

  bindLayerContextMenu()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  if (graphicLayer) {
    graphicLayer.destroy() // 销毁内部会释放所有事件及数据
    graphicLayer = null
  }

  map = null
}

// 修改样式，修改点，删除点等操作去激活或更新面板
function openGraphicOptionsWidget(e) {
  const graphic = e.graphic
  if (!graphic || graphic.isDestroy || graphic.isDrawing || graphic.isPrivate || graphic.isCombine) {
    return
  }
  eventTarget.fire("updateGraphicOptionsWidget", { graphicId: graphic.id, layerId: graphicLayer.id })
}

function closeGraphicOptionsWidget(e) {
  eventTarget.fire("updateGraphicOptionsWidget", { disable: true })
}

/**
 * 绑定右键菜单功能，开始编辑，删除等
 *@returns {void} 无
 */
export function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return !graphic.isEditing
      },
      callback: (e) => {
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
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphic.stopEditing()
        }
      }
    },
    {
      text: "复制",
      icon: "fa fa-copy",
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          map.contextmenu.copyGraphic = graphic.toJSON() // map内置右键中"粘贴"菜单使用
          map.contextmenu.copyGraphic.layerId = graphicLayer.id
        }
      }
    },
    {
      text: "剪切",
      icon: "fa fa-scissors",
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          map.contextmenu.copyGraphic = graphic.toJSON() // map内置右键中"粘贴"菜单使用
          map.contextmenu.copyGraphic.layerId = graphicLayer.id

          graphic.remove(true) // 移除原有对象
        }
      }
    },
    {
      text: "还原编辑(还原到初始)",
      icon: "fa fa-pencil",
      show: (event) => {
        function hasRestore(graphic) {
          if (!graphic || !graphic.hasEdit || !graphic.isEditing) {
            return false
          }
          return graphic.editing?.hasRestore()
        }

        const graphic = event.graphic
        if (hasRestore(graphic)) {
          return true
        }
        if (graphic.isPrivate && graphic.parent) {
          return hasRestore(graphic.parent) // 右击是编辑点时
        }
        return false
      },
      callback: (event) => {
        const graphic = event.graphic
        if (graphic.editing?.restore) {
          graphic.editing.restore() // 撤销编辑，可直接调用
        } else if (graphic.parent?.editing?.restore) {
          graphic.parent.editing.restore() // 右击是编辑点时
        }
      }
    },
    {
      text: "撤销编辑(还原到上一步)",
      icon: "fa fa-pencil",
      show: (event) => {
        function hasRevoke(graphic) {
          if (!graphic || !graphic.hasEdit || !graphic.isEditing) {
            return false
          }
          return graphic.editing?.hasRevoke()
        }

        const graphic = event.graphic
        if (hasRevoke(graphic)) {
          return true
        }
        if (graphic.isPrivate && graphic.parent) {
          return hasRevoke(graphic.parent) // 右击是编辑点时
        }
        return false
      },
      callback: (event) => {
        const graphic = event.graphic
        if (graphic.editing?.revoke) {
          graphic.editing.revoke() // 撤销编辑，可直接调用
        } else if (graphic.parent?.editing?.revoke) {
          graphic.parent.editing.revoke() // 右击是编辑点时
        }
      }
    },
    {
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy || graphic.isPrivate || graphic.graphicIds) {
          return false
        } else {
          return true
        }
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        const parent = graphic.parent // 右击是编辑点时
        graphicLayer.removeGraphic(graphic)
        if (parent) {
          graphicLayer.removeGraphic(parent)
        }
      }
    },
    {
      text: "查看聚合列表",
      icon: "fa fa-info",
      show: (event) => {
        const graphic = event.graphic
        if (graphic.cluster && graphic.graphics) {
          return true
        } else {
          return false
        }
      },
      callback: (e) => {
        const graphics = e.graphic?.graphics
        if (graphics) {
          const names = []
          for (let index = 0; index < graphics.length; index++) {
            const g = graphics[index]
            names.push(g.attr.name || g.attr.text || g.id)
          }
          return globalAlert(`${names.join(",")}`, `共${graphics.length}个聚合对象`)
        }
      }
    },
    {
      text: "计算周长",
      icon: "fa fa-medium",
      show: (event) => {
        const graphic = event.graphic
        return !graphic.isPoint
      },
      callback: (e) => {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      icon: "fa fa-reorder",
      show: (event) => {
        const graphic = event.graphic
        return !graphic.isPoint
      },
      callback: (e) => {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}

// 切换到预览模式
export function toYLMS() {
  const geojson = graphicLayer.toGeoJSON()

  geoJsonLayerDTH.load({ data: geojson })

  graphicLayer.isAutoEditing = false
  graphicLayer.show = false
}

// 切换到编辑模式
export function toBJMS() {
  geoJsonLayerDTH.clear()
  graphicLayer.isAutoEditing = true
  graphicLayer.show = true
}

export function deleteAll() {
  graphicLayer.clear()
}

export async function drawPolygon() {
  const graphic = await graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      opacity: 0.3,
      outline: true,
      outlineColor: "#000000",
      clampToGround: true
    }
  })
  console.log("标绘完成", graphic.toJSON())
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

  if (fileType === "json" || fileType === "geojson") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const json = JSON.parse(this.result)
      console.log("打开了json文件", json)
      graphicLayer.loadJSON(json, { flyTo: true, clear: true })
    }
  } else {
    globalMsg("暂不支持 " + fileType + " 文件类型的数据！")
  }
}

// 保存JSON文件
export function saveGeoJSON() {
  if (graphicLayer.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  const layers = map.getLayerById(graphicLayer.id)
  const geojson = layers.toGeoJSON()
  mars3d.Util.downloadFile("单体化.json", JSON.stringify(geojson))
}
