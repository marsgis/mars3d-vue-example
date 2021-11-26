
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
    type: "point",
    style: {
      pixelSize: 12,
      color: "#3388ff",
      label: {
        // 不需要文字时，去掉label配置即可
        text: "可以同时支持文字",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
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


function addGraphic_01(graphicLayer) {
  var graphic = new mars3d.graphic.PointEntity({
    position: [116.244399, 30.920459, 573.6],
    style: {
      color: "#ff0000",
      pixelSize: 10,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      label: {
        text: "我是原始点",
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

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)

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
  graphicCopy.position = [116.18869, 30.95041, 525.84]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

function addGraphic_02(graphicLayer) {
  var graphic = new mars3d.graphic.PointEntity({
    name: "根据视距缩放点",
    position: new mars3d.LatLngPoint(116.301798, 30.835848, 915),
    style: {
      color: "#00ff00",
      pixelSize: 32,
      scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_03(graphicLayer) {
  var graphic = new mars3d.graphic.PointEntity({
    name: "贴地点",
    position: new mars3d.LatLngPoint(116.39224, 30.902853),
    style: {
      color: "#ffff00",
      pixelSize: 10,
      clampToGround: true,
      outlineWidth: 0,

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
        pixelSize: 15,
        outlineColor: "#ff0000",
        outlineWidth: 2
      }
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_04(graphicLayer) {
  var graphic = new mars3d.graphic.PointEntity({
    name: "根据视距显示点",
    position: new mars3d.LatLngPoint(116.329102, 30.977955, 1548.6),
    style: {
      color: "#0000ff",
      pixelSize: 20,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 100000)
    }
  })
  graphicLayer.addGraphic(graphic)
}
