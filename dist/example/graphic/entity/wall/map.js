import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

export const eventTarget = new mars3d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.473861, lng: 117.225929, alt: 52974, heading: 2, pitch: -49 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  initLayerManager()

  // 加一些演示数据
  addGraphicDemo1(graphicLayer)
  addGraphicDemo2(graphicLayer)
  addGraphicDemo3(graphicLayer)
  addGraphicDemo4(graphicLayer)
  addGraphicDemo5(graphicLayer)
  addGraphicDemo6(graphicLayer)
  addGraphicDemo7(graphicLayer)
  addGraphicDemo8(graphicLayer)
  addGraphicDemo9(graphicLayer)

  // 触发自定义事件
  graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    const graphic = e.graphic
    eventTarget.fire("editorUI-draw", { graphic })
  })
  graphicLayer.on(
    [mars3d.EventType.editStart, mars3d.EventType.editMovePoint, mars3d.EventType.editStyle, mars3d.EventType.editRemovePoint],
    function (e) {
      const graphic = e.graphic
      eventTarget.fire("editorUI-SMR", { graphic })
    }
  )
  graphicLayer.on([mars3d.EventType.editStop, mars3d.EventType.removeGraphic], function (e) {
    eventTarget.fire("editorUI-stop")
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  btnClear()
}

// 显示隐藏 绑定popup和tooltip和右键菜单以及是否编辑
function bindShowHide(val) {
  graphicLayer.show = val
}
function bindPopup(val) {
  if (val) {
    bindLayerPopup()
  } else {
    graphicLayer.unbindPopup()
  }
}
function bindTooltip(val) {
  if (val) {
    graphicLayer.bindTooltip("我是layer上绑定的Tooltip")
  } else {
    graphicLayer.unbindTooltip()
  }
}
function bindRightMenu(val) {
  if (val) {
    bindLayerContextMenu()
  } else {
    graphicLayer.unbindContextMenu(true)
  }
}
export function bindEdit(val) {
  graphicLayer.hasEdit = val
}

// 按钮事件
export function onClickDrawModel() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "wall",
    style: {
      color: "#55ff33",
      opacity: 0.8,
      diffHeight: 800
    }
  })
}
export function onClickDrawModelClosure() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "wall",
    style: {
      color: "#55ff33",
      opacity: 0.8,
      diffHeight: 800,
      closure: true
    }
  })
}
function btnClear() {
  graphicLayer.clear()
}
function btnExpFile() {
  // 代码在graphicManager.js

  expFile()
}
function btnImpFile(file) {
  // 代码在graphicManager.js

  impFile(file)
}

// 定位至模型
let modelTest
function centerAtModel() {
  if (!modelTest) {
    modelTest = new mars3d.layer.TilesetLayer({
      url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
      position: { alt: 80.6 },
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      flyTo: true
    })
    map.addLayer(modelTest)
  }
}

function addGraphicDemo1(graphicLayer) {
  const graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.154815, 31.853495],
      [117.181255, 31.854257],
      [117.182284, 31.848255],
      [117.184748, 31.840141],
      [117.180557, 31.835556],
      [117.180023, 31.833741],
      [117.166846, 31.833737],
      [117.155531, 31.833151],
      [117.154787, 31.835978],
      [117.151994, 31.839036],
      [117.150691, 31.8416],
      [117.151215, 31.844734]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      // 动画线材质
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        image: "img/textures/fence.png",
        color: "#00ff00",
        speed: 10,
        axisY: true
      })
    }
  })
  graphicLayer.addGraphic(graphic)

  // 演示个性化处理graphic，代码在graphicManager.js

  initGraphicManager(graphic)
}

function addGraphicDemo2(graphicLayer) {
  const graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.208302, 31.85757],
      [117.234234, 31.858263],
      [117.234261, 31.833317],
      [117.207414, 31.834541]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      // 动画线材质
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        image: "img/textures/arrow.png",
        color: Cesium.Color.CHARTREUSE,
        repeat: new Cesium.Cartesian2(30, 1),
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphicDemo3(graphicLayer) {
  // 圆形时
  const positions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: Cesium.Cartesian3.fromDegrees(117.276257, 31.866351, 19.57),
    radius: 1200, // 半径
    count: 50 // 共返回(count*4)个点
  })

  const graphic = new mars3d.graphic.WallEntity({
    positions: positions,
    style: {
      diffHeight: 800,
      closure: true,
      // 动画线材质
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        image: "img/textures/fence.png",
        color: "#00ffff",
        speed: 10,
        axisY: true
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphicDemo4(graphicLayer) {
  const graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.229659, 31.908221],
      [117.240804, 31.908175]
    ],
    style: {
      diffHeight: 700,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        // 动画线材质
        image: "img/textures/fence.png",
        axisY: true,
        color: "#ff0000",
        image2: "img/textures/tanhao.png",
        color2: "#ffff00",
        speed: 10
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphicDemo5(graphicLayer) {
  const graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.153945, 31.881122, 36.4],
      [117.168352, 31.880147, 32.6],
      [117.178047, 31.885925, 29.25]
    ],
    style: {
      diffHeight: 200,
      color: "#00ffff",
      opacity: 0.4,
      label: {
        text: "我是原始的",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(graphic)

  // graphic转geojson
  const geojson = graphic.toGeoJSON()
  console.log("转换后的geojson", geojson)
  addGeoJson(geojson, graphicLayer)
}

// 添加单个geojson为graphic，多个直接用graphicLayer.loadGeoJSON
function addGeoJson(geojson, graphicLayer) {
  const graphicCopy = mars3d.Util.geoJsonToGraphics(geojson)[0]
  delete graphicCopy.attr
  // 新的坐标
  graphicCopy.positions = [
    [117.105938, 31.883825, 43.6],
    [117.125006, 31.876243, 42.6],
    [117.135525, 31.882068, 39],
    [117.151507, 31.874259, 39.7]
  ]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

function addGraphicDemo6(graphicLayer) {
  const graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.353776, 31.887406, 21.2],
      [117.321028, 31.887207, 21.3],
      [117.290341, 31.902469, 15.1]
    ],
    style: {
      diffHeight: 400,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        // 动画线材质
        image: "img/textures/arrow.png",
        color: "#00eba8",
        repeat: new Cesium.Cartesian2(20, 1),
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphicDemo7(graphicLayer) {
  const graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.192113, 31.80998, 32.2],
      [117.228145, 31.792757, 26.7],
      [117.2717, 31.798397, 20.7]
    ],
    style: {
      diffHeight: 500,
      color: "#00ffff",
      opacity: 0.4,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphicDemo8(graphicLayer) {
  const graphic = new mars3d.graphic.WallEntity({
    positions: [
      [117.206138, 31.877321],
      [117.206326, 31.901436]
    ],
    style: {
      diffHeight: 400,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.Image, {
        image: getColorRampCanvas(),
        transparent: false
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 纹理图绘制
function getColorRampCanvas(elevationRamp) {
  if (elevationRamp == null) {
    // elevationRamp = { 0.0: "blue", 0.1: "cyan", 0.37: "lime", 0.54: "yellow", 1: "red" };
    // elevationRamp = { 0.0: '#000000', 0.045: '#2747E0', 0.1: '#D33B7D', 0.15: '#D32738', 0.37: '#FF9742', 0.54: '#ffd700', 1.0: '#ffffff' }
    elevationRamp = {
      0.0: "#FFEDA0",
      0.05: "#FED976",
      0.1: "#FEB24C",
      0.15: "#FD8D3C",
      0.37: "#FC4E2A",
      0.54: "#E31A1C",
      0.7: "#BD0026",
      1.0: "#800026"
    }
  }

  const canvas = document.createElement("canvas")
  canvas.width = 1
  canvas.height = 100

  const ctx = canvas.getContext("2d")
  const grd = ctx.createLinearGradient(0, 0, 0, 100)
  for (const key in elevationRamp) {
    grd.addColorStop(1 - Number(key), elevationRamp[key])
  }

  ctx.fillStyle = grd
  ctx.fillRect(0, 0, 1, 100) // 参数：左上角x  左上角y  宽度width  高度height
  return canvas.toDataURL()
}

// 边界墙绘制
function addGraphicDemo9(graphicLayer) {
  queryAreasData().then(function (data) {
    const arr = mars3d.Util.geoJsonToGraphics(data) // 解析geojson
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i]
      const graphic = new mars3d.graphic.WallEntity({
        positions: item.positions,
        style: {
          diffHeight: 3000,
          material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
            image: "img/textures/fence.png",
            color: "#bdf700",
            repeat: new Cesium.Cartesian2(5, 1),
            axisY: true, // 方向，true时上下，false左右
            speed: 10
          })
        },
        attr: item.attr
      })
      graphicLayer.addGraphic(graphic)
      graphic.bindTooltip("合肥欢迎您 - 火星科技")
    }
  })
}

// 边界墙绘制 - 数据获取
function queryAreasData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/areas/340100.json" })
}

// 在图层级处理一些事物
function initLayerManager() {
  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  /* graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听layer，鼠标移入了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听layer，鼠标移出了矢量对象", event)
  }) */

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerPopup()

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu()
}

// 绑定图层的弹窗
function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr || {}
    attr.test1 = "测试属性"
    // attr["视频"] = `<video src='http://data.mars3d.cn/file/video/lukou.mp4' controls autoplay style="width: 300px;" ></video>`;

    return mars3d.Util.getTemplateHtml({ title: "layer上绑定的Popup", template: "all", attr: attr })
  })
}

// 绑定右键菜单
function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
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
          graphicLayer.startEditing(graphic)
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
          graphicLayer.stopEditing(graphic)
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
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
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
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的长度为:" + strDis)
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

// 保存GeoJSON
function expFile() {
  if (graphicLayer.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicLayer.toGeoJSON()
  mars3d.Util.downloadFile("我的标注.json", JSON.stringify(geojson))
}

// 打开保存的文件
function impFile(file) {
  const fileName = file.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()
  if (fileType != "json") {
    globalMsg("文件类型不合法,请选择json格式标注文件！")
    return
  }

  if (fileType == "json" || fileType == "geojson") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const json = this.result
      graphicLayer.loadGeoJSON(json, {
        flyTo: true
      })
    }
  } else if (fileType == "kml") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const strkml = this.result

      kgUtil.toGeoJSON(strkml).then((geojson) => {
        console.log("kml2geojson转换结果为", geojson)

        graphicLayer.loadGeoJSON(geojson, {
          flyTo: true
          // symbol: function (attr, style, featue) {
          //   let geoType = featue.geometry?.type
          //   if (geoType == 'Point') {
          //     return {
          //       image: 'img/marker/di3.png',
          //       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          //       scale: 0.4,
          //       label: {
          //         text: attr.name,
          //         font_size: 18,
          //         color: '#ffffff',
          //         outline: true,
          //         outlineColor: '#000000',
          //         pixelOffsetY: -50,
          //         scaleByDistance: true,
          //         scaleByDistance_far: 990000,
          //         scaleByDistance_farValue: 0.3,
          //         scaleByDistance_near: 10000,
          //         scaleByDistance_nearValue: 1,
          //       },
          //     }
          //   }
          //   return style
          // },
        })
      })
    }
  } else if (fileType == "kmz") {
    // 加载input文件控件的二进制流

    kgUtil.toGeoJSON(file).then((geojson) => {
      console.log("kmz2geojson", geojson)

      graphicLayer.loadGeoJSON(geojson, {
        flyTo: true
      })
    })
  } else {
    globalMsg("暂不支持 " + fileType + " 文件类型的数据！")
  }
}

// 也可以在单个Graphic上做个性化管理及绑定操作
function initGraphicManager(graphic) {
  // 3.在graphic上绑定监听事件
  /* graphic.on(mars3d.EventType.click, function (event) {
    console.log("监听graphic，单击了矢量对象", event)
  })
  graphic.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听graphic，鼠标移入了矢量对象", event)
  })
  graphic.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听graphic，鼠标移出了矢量对象", event)
  }) */

  // 绑定Tooltip
  // graphic.bindTooltip('我是graphic上绑定的Tooltip') //.openTooltip()

  // 绑定Popup
  const inthtml = `<table style="width: auto;">
            <tr>
              <th scope="col" colspan="2" style="text-align:center;font-size:15px;">我是graphic上绑定的Popup </th>
            </tr>
            <tr>
              <td>提示：</td>
              <td>这只是测试信息，可以任意html</td>
            </tr>
          </table>`
  graphic.bindPopup(inthtml).openPopup()

  // 绑定右键菜单
  graphic.bindContextMenu([
    {
      text: "删除对象[graphic绑定的]",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        const graphic = e.graphic
        if (graphic) {
          graphic.remove()
        }
      }
    }
  ])

  // 测试 颜色闪烁
  if (graphic.startFlicker) {
    graphic.startFlicker({
      time: 20, // 闪烁时长（秒）
      maxAlpha: 0.5,
      color: Cesium.Color.YELLOW,
      onEnd: function () {
        // 结束后回调
      }
    })
  }
}
