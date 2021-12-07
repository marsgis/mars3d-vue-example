import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象
let rectangularSensor

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    fxaa: true,
    center: { lat: 30.834006, lng: 118.779512, alt: 306743, heading: 313, pitch: -58 },
    cameraController: {
      constrainedAxis: false
    }
  },
  control: {
    sceneModePicker: false
  }
}

export const eventTarget = new mars3d.BaseClass()

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

  eventTarget.fire("loadOk")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

/**
 * 默认相阵控雷达
 *
 * @param {number} heading 方向角
 * @param {number} pitch 仰角
 * @param {number} roll 左右（row）
 * @param {number} radius 半径
 * @param {number} xValue 上下夹角
 * @param {number} yValue 左右夹角
 *
 * @returns {void}
 */

export function addGraphic01(heading, pitch, roll, radius, xValue, yValue) {
  rectangularSensor = new mars3d.graphic.RectangularSensor({
    position: [117.218875, 31.817812, 138],
    style: {
      heading: heading,
      pitch: pitch,
      roll: roll,

      radius: radius, // 传感器的半径
      xHalfAngleDegree: xValue, // 传感器水平半角
      yHalfAngleDegree: yValue, // 传感器垂直半角

      color: "#00ffff",
      opacity: 0.4,
      lineColor: "#ffffff", // 线的颜色

      showScanPlane: true, // 是否显示扫描面
      scanPlaneColor: "#00ffff",
      scanPlaneOpacity: 0.9,
      scanPlaneMode: "vertical", // 扫描面模式 垂直vertical/水平horizontal
      scanPlaneRate: 3, // 扫描速率,
      depthTest: true
    }
  })

  graphicLayer.addGraphic(rectangularSensor)
}

/**
 * 半径发生改变
 *
 * @export
 * @param {number} value 半径值
 * @returns {void}
 */
export function radiusChange(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.radius = value
  })
}

/**
 * 方向发生改变
 *
 * @export
 * @param {number} value 角度
 * @returns {void}
 */
export function headingChange(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.heading = value
  })
}

/**
 * 仰角发生改变
 *
 * @export
 * @param {number} value 仰角
 * @returns {void}
 */
export function pitchChange(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.pitch = value
  })
}

/**
 * roll发生改变
 *
 * @export
 * @param {number} value 仰角
 * @returns {void}
 */
export function rollChange(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.roll = value
  })
}

/**
 * 上下夹角
 *
 * @export
 * @param {number} value 夹角
 * @returns {void}
 */
export function xHalfAngle(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.style = { xHalfAngleDegree: value }
  })
}

/**
 * 左右夹角
 *
 * @export
 * @param {number} value 夹角
 * @returns {void}
 */
export function yHalfAngle(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.style = { yHalfAngleDegree: value }
  })
}

/**
 * 是否显示扫描面
 *
 * @export
 * @param {boolean} value  value = true/false
 * @returns {void}
 */
export function ShowScanPlane(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.style = { showScanPlane: value } // 是否显示扫描面
  })
}

/**
 * 绘制相阵控雷达
 *
 * @param {number} heading 方向
 * @param {number} pitch 仰角
 * @param {number} roll 左右（row）
 * @param {number} radius 半径
 * @param {number} xHalfAngle 上下夹角
 * @param {number} yHalfAngle 左右夹角
 * @returns {void}
 */
export function startDraw(heading, pitch, roll, radius, xHalfAngle, yHalfAngle) {
  // 开始绘制
  graphicLayer.startDraw({
    type: "rectangularSensor",
    style: {
      heading: heading,
      pitch: pitch,
      roll: roll,

      radius: radius, // 传感器的半径
      xHalfAngleDegree: xHalfAngle, // 传感器水平半角
      yHalfAngleDegree: yHalfAngle, // 传感器垂直半角

      color: "#00ffff",
      opacity: 0.4,
      lineColor: "#ffffff", // 线的颜色

      showScanPlane: true, // 是否显示扫描面
      scanPlaneColor: "#00ffff",
      scanPlaneOpacity: 0.9,
      scanPlaneMode: "vertical", // 扫描面模式 垂直vertical/水平horizontal
      scanPlaneRate: 3, // 扫描速率,
      depthTest: true
    }
  })
}

// 显示隐藏
export function bindShowHide(val) {
  graphicLayer.show = val
}
function btnClear() {
  graphicLayer.clear()
}
function btnExpFile() {
  expFile()
}
function btnImpFile(file) {
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
      // eslint-disable-next-line no-undef
      kgUtil.toGeoJSON(strkml).then((geojoson) => {
        console.log("kml2geojson", geojoson)

        graphicLayer.loadGeoJSON(geojoson, {
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
    // eslint-disable-next-line no-undef
    kgUtil.toGeoJSON(file).then((geojoson) => {
      console.log("kmz2geojson", geojoson)

      graphicLayer.loadGeoJSON(geojoson, {
        flyTo: true
      })
    })
  } else {
    globalMsg("暂不支持 " + fileType + " 文件类型的数据！")
  }
}
