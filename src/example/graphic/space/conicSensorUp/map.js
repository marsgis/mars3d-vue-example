var map
var conicSensor
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 25.987821, lng: 122.076928, alt: 1295307, heading: 327, pitch: -59 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加个模型
  var graphic = new mars3d.graphic.ModelEntity({
    name: "地面站模型",
    position: [117.170264, 31.840312, 258],
    style: {
      url: "//data.mars3d.cn/gltf/mars/leida.glb",
      scale: 1,
      minimumPixelSize: 40,
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addConicSensor(angle, length) {
  // 圆锥体
  conicSensor = new mars3d.graphic.ConicSensor({
    position: [117.170264, 31.840312, 363],
    style: {
      angle: angle,
      length: length,
      color: "rgba(255,0,0,0.4)",
      outlineColor: "rgba(255,255,255,0.9)"
    }
  })
  graphicLayer.addGraphic(conicSensor)
}

// 顶部显示隐藏
function sensorTop(val) {
  conicSensor.topShow = val
}
// 地面阴影
function sensorArea(val) {
  conicSensor.shadowShow = val
}
// 显示/隐藏
function sensorShowHide(val) {
  conicSensor.show = val
}
// 半径
function sensorRadius(val) {
  conicSensor.length = val
}
// 角度(半长角)
function angle(val) {
  conicSensor.angle = val
}
