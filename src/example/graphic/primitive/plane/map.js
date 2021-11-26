var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.832568, lng: 116.296753, alt: 20208, heading: 7, pitch: -72 }
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
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.PlanePrimitive({
    position: [116.236158, 30.891965, 856.12],
    style: {
      plane_normal: Cesium.Cartesian3.UNIT_X,
      dimensions: new Cesium.Cartesian2(2000.0, 1000.0),
      color: "#ff0000",
      opacity: 0.7
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(primitive)

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.PlanePrimitive({
    position: new mars3d.LatLngPoint(116.294498, 30.892548, 432.93),
    style: {
      plane_normal: Cesium.Cartesian3.UNIT_Y,
      dimensions_x: 2000.0,
      dimensions_y: 1000.0,
      color: "#0000ff",
      opacity: 0.6
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.PlanePrimitive({
    position: [116.355196, 30.889309, 437.02],
    style: {
      plane_normal: Cesium.Cartesian3.UNIT_Z,
      dimensions_x: 2000.0,
      dimensions_y: 1000.0,
      color: "#00ffff",
      opacity: 0.4,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.9
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
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
