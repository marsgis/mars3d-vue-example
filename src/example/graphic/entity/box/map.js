
var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 加一些演示数据
  addGraphic_01(graphicLayer)
  addGraphic_02(graphicLayer)
  addGraphic_03(graphicLayer)
  addGraphic_04(graphicLayer)
}

// 显示隐藏 绑定popup和tooltip和右键菜单以及是否编辑
function bindShowHide(val) {
  graphicLayer.show = val
}
function bindPopup(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerPopup(graphicLayer)
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
    // eslint-disable-next-line no-undef
    bindLayerContextMenu(graphicLayer)
  } else {
    graphicLayer.unbindContextMenu(true)
  }
}
function bindEdit(val) {
  graphicLayer.hasEdit = val
}

// 按钮事件
function btnDrawModel() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "box",
    style: {
      color: "#00ff00",
      opacity: 0.6,
      dimensions_x: 1000.0,
      dimensions_y: 1000.0,
      dimensions_z: 1000.0
    }
  })
}
function btnClear() {
  graphicLayer.clear()
}
function btnExpFile() {
  // eslint-disable-next-line no-undef
  expFile(graphicLayer)
}
function btnImpFile(file) {
  // eslint-disable-next-line no-undef
  impFile(graphicLayer, file)
}

// 定位至模型
var modelTest
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


//
function addGraphic_01(graphicLayer) {
  var graphic = new mars3d.graphic.BoxEntity({
    position: [116.282587, 30.859197, 544.31],
    style: {
      dimensions: new Cesium.Cartesian3(1000.0, 1000.0, 1000.0),
      fill: true,
      color: "#00ff00",
      opacity: 0.4,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)
}

//
function addGraphic_02(graphicLayer) {
  var graphic = new mars3d.graphic.BoxEntity({
    position: new mars3d.LatLngPoint(116.329199, 30.881595, 390.3),
    style: {
      dimensions: new Cesium.Cartesian3(900.0, 600.0, 900.0),
      fill: false,
      outline: true,
      outlineColor: "#ffff00"
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

//
function addGraphic_03(graphicLayer) {
  var graphic = new mars3d.graphic.BoxEntity({
    position: new mars3d.LatLngPoint(116.392526, 30.903729, 933.55),
    style: {
      dimensions: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      fill: true,
      color: "#00ffff",
      opacity: 0.9,
      heading: 45,
      roll: 45,
      pitch: 0
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

//
function addGraphic_04(graphicLayer) {
  var graphic = new mars3d.graphic.BoxEntity({
    position: [116.244399, 30.920459, 573.6],
    style: {
      dimensions: new Cesium.Cartesian3(800.0, 600.0, 1000.0),
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineColor: "#000000",
      label: {
        text: "我是原始的",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -10,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(graphic)

  // graphic转geojson
  var geojson = graphic.toGeoJSON()
  console.log("转换后的geojson", geojson)
  addGeoJson(geojson, graphicLayer)
}

// 添加单个geojson为graphic，多个直接用graphicLayer.loadGeoJSON
function addGeoJson(geojson, graphicLayer) {
  var graphicCopy = mars3d.Util.geoJsonToGraphics(geojson)[0]
  delete graphicCopy.attr
  // 新的坐标
  graphicCopy.position = [116.301991, 30.933872, 624.03]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}
