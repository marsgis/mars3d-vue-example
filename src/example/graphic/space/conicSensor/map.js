var map
var graphicLayer
var conicSensor
var testLine
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 23.729961, lng: 116.284734, alt: 1868672, heading: 355, pitch: -65 },
      cameraController: {
        constrainedAxis: false // 解除在南北极区域鼠标操作限制
      }
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

function addConicSensor(heading, pitch, roll, angle, length) {
  // 圆锥体
  conicSensor = new mars3d.graphic.ConicSensor({
    position: [117.170264, 31.840312, 363],
    style: {
      angle: angle,
      length: length,
      // length: new Cesium.CallbackProperty(function (time) {
      //   length += 100 //测试动态length
      //   return length
      // }, false),
      heading: heading,
      pitch: pitch,
      roll: roll,
      color: "rgba(255,0,0,0.4)",
      outlineColor: "rgba(255,255,255,0.9)"
    }
  })
  graphicLayer.addGraphic(conicSensor)

  // 测试连接线
   testLine = new mars3d.graphic.PolylineEntity({
    positions: new Cesium.CallbackProperty(function (time) {
      var localEnd = conicSensor.rayPosition
      if (!localEnd) {
        return []
      }
      return [conicSensor.position, localEnd]
    }, false),
    style: {
      arcType: Cesium.ArcType.NONE,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineDash, {
        color: "#ff0000"
      }),
      width: 1
    }
  })
  graphicLayer.addGraphic(testLine)
}

// 方向角
function headingChange(value) {
  conicSensor.heading = value
}

// 俯仰角
function pitchChange(value) {
  conicSensor.pitch = value
}

// 左右角
function rollChange(value) {
  conicSensor.roll = value
}

// 夹角
function angle(value) {
  conicSensor.angle = value
}

// 显示/隐藏
function sensorShowHide(val) {
  conicSensor.show = val
  testLine.show = val
}

// 顶部显示隐藏
function sensorTop(val) {
  conicSensor.topShow = val
}

function sensorLength(val) {
  conicSensor.length = val
}
