import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

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

  // 加一些演示数据
  addGraphicDemo1(graphicLayer)
  addGraphicDemo2(graphicLayer)
  addGraphicDemo3(graphicLayer)
  addGraphic04(graphicLayer)

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
  graphicLayer.clear()
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
export function btnDrawModel() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "billboard",
    style: {
      image: "img/marker/mark1.png",
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      label: {
        // 不需要文字时，去掉label配置即可
        text: "可以同时支持文字",
        font_size: 30,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -50
      }
    }
  })
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

export function btnStartBounce() {
  graphicLayer.eachGraphic((graphic) => {
    if (graphic.startBounce) {
      graphic.startBounce()
    }
  })
}
export function btnStartBounce2() {
  graphicLayer.eachGraphic((graphic) => {
    if (graphic.startBounce) {
      graphic.startBounce({
        autoStop: true,
        step: 2,
        maxHeight: 90
      })
    }
  })
}
export function btnStopBounce() {
  graphicLayer.eachGraphic((graphic) => {
    if (graphic.stopBounce) {
      graphic.stopBounce()
    }
  })
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
  const graphic = new mars3d.graphic.BillboardEntity({
    name: "根据视距缩放图标",
    position: new mars3d.LatLngPoint(116.301798, 30.835848, 915),
    style: {
      image: "img/marker/mark3.png",
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1),
      label: {
        text: "我是原始的",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -40,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(graphic)

  // 演示个性化处理graphic，代码在\js\graphicManager.js

  initGraphicManager(graphic)

  // graphic转json，clone一个对象
  const json = graphic.toJSON()
  console.log("转换后的json", json)

  json.position = [116.33493, 30.822064, 644.43] // 新的坐标
  json.style.label = json.style.label || {}
  json.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(json) // 支持直接加json，内部转为graphic
}

function addGraphicDemo2(graphicLayer) {
  const graphic = new mars3d.graphic.BillboardEntity({
    name: "贴地图标",
    position: [116.39224, 30.902853],
    style: {
      image: "img/marker/di3.png",
      scale: 0.5,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      clampToGround: true,

      label: { text: "鼠标移入会放大", pixelOffsetY: -50 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        scale: 0.8
      }
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphicDemo3(graphicLayer) {
  const graphic = new mars3d.graphic.BillboardEntity({
    name: "绿色自定义图标",
    position: [116.340443, 30.882935, 389.88],
    style: {
      image: "img/marker/symbol1.png",
      scale: 1,
      pixelOffset: new Cesium.Cartesian2(0, -6) // 偏移量
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic04(graphicLayer) {
  const propertyFJ = getSampledPositionProperty([
    [116.223119, 30.933365, 487.4],
    [116.313957, 30.861597, 417.7],
    [116.333367, 30.847406, 402],
    [116.392083, 30.852692, 616],
    [116.413892, 30.869853, 486.4],
    [116.515749, 30.868033, 669.6]
  ])

  const graphic = new mars3d.graphic.BillboardEntity({
    position: propertyFJ,
    orientation: new Cesium.VelocityOrientationProperty(propertyFJ),
    style: {
      image: "img/marker/huojian.svg",
      scale: 0.5,
      alignedAxis: new Cesium.VelocityVectorProperty(propertyFJ, true)
    },
    hasEdit: false
  })
  graphicLayer.addGraphic(graphic)
}

// 计算演示的SampledPositionProperty轨迹
function getSampledPositionProperty(points) {
  const property = new Cesium.SampledPositionProperty()

  const start = map.clock.currentTime
  const positions = mars3d.LatLngArray.toCartesians(points)
  for (let i = 0; i < positions.length; i++) {
    const time = Cesium.JulianDate.addSeconds(start, i * 20, new Cesium.JulianDate())
    const position = positions[i]
    property.addSample(time, position)
  }
  return property
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
