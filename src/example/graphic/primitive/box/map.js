var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.828597, lng: 116.300638, alt: 22610, heading: 7, pitch: -72 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\common\script\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 加一些演示数据
  addGraphic_a1(graphicLayer)
  addGraphic_a2(graphicLayer)
  addGraphic_a3(graphicLayer)
  addGraphic_a4(graphicLayer)
  addGraphic_a5(graphicLayer)
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.BoxPrimitive({
    position: [116.282587, 30.859197, 544.31],
    style: {
      dimensions: new Cesium.Cartesian3(1000.0, 1000.0, 1000.0),
      color: "#00ffff",
      opacity: 0.8
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 图层管理的相关处理，代码在\common\script\graphicManager.js

  // eslint-disable-next-line no-undef
  initGraphicManager(primitive)

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.BoxPrimitive({
    position: new mars3d.LatLngPoint(116.329199, 30.881595, 390.3),
    style: {
      dimensions: new Cesium.Cartesian3(900.0, 600.0, 900.0),
      color: "#ff0000",
      opacity: 0.4,
      outline: true,
      outlineColor: "#ffffff"
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.BoxPrimitive({
    position: [116.244399, 30.920459, 573.6],
    style: {
      dimensions: new Cesium.Cartesian3(800.0, 600.0, 1000.0),
      color: "#99FFFF",
      opacity: 0.4
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.BoxPrimitive({
    position: new mars3d.LatLngPoint(116.392526, 30.903729, 933.55),
    style: {
      dimensions: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      color: "#ffff00",
      opacity: 0.4,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a5(graphicLayer) {
  var primitive = new mars3d.graphic.BoxPrimitive({
    position: [116.318792, 30.934805, 524.71],
    style: {
      dimensions: new Cesium.Cartesian3(800.0, 600.0, 1000.0),
      color: "#0033ff",
      opacity: 0.4,
      label: {
        text: "Mars3D方便易用",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -10,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive)
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
