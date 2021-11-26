var map
var satelliteSensor
var modelGraphic
var graphicLayer
var reverse = true // z轴方向，true朝向空中，false朝向地心
var converter = Cesium.Transforms.eastNorthUpToFixedFrame
// var converter = Cesium.Transforms.localFrameToFixedFrameGenerator('east', 'south')

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 0.072832, lng: 151.409367, alt: 29330818, heading: 10, pitch: -90 }
    },
    cameraController: {
      maximumZoomDistance: 9000000000,
      constrainedAxis: false // 解除在南北极区域鼠标操作限制
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)



  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)
}

function addModelGraphic(x, y, z, heading, pitch, roll, angle1, angle2) {
  var position = Cesium.Cartesian3.fromDegrees(x, y, z)
  // 加个模型
  modelGraphic = new mars3d.graphic.ModelEntity({
    name: "卫星模型",
    position: position,
    style: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 150,
      heading: heading,
      pitch: pitch,
      roll: roll
    }
  })
  graphicLayer.addGraphic(modelGraphic)

  // 打开3个轴进行显示对比
  modelGraphic.debugAxis = true

  // 视锥体
  satelliteSensor = new mars3d.graphic.SatelliteSensor({
    position: position,
    style: {
      sensorType: mars3d.graphic.SatelliteSensor.Type.Rect,
      angle1: angle1,
      angle2: angle2,
      heading: heading,
      pitch: pitch,
      roll: roll,
      color: "rgba(0,255,255,0.7)"
    },
    fixedFrameTransform: converter,
    reverse: reverse
  })
  graphicLayer.addGraphic(satelliteSensor)
}

function updatePosition(x, y, z) {
  var position = Cesium.Cartesian3.fromDegrees(x, y, z)
  modelGraphic.position = position
  satelliteSensor.position = position
}

function locate() {
  map.flyToGraphic(modelGraphic, { radius: modelGraphic.height * 2 })
}

// 方向角改变
function headingChange(value) {
  modelGraphic.heading = value
  satelliteSensor.heading = value
}

// 俯仰角
function pitchChange(value) {
  modelGraphic.pitch = value
  satelliteSensor.pitch = value
}
// 左右角

function rollChange(value) {
  modelGraphic.roll = value
  satelliteSensor.roll = value
}

// 夹角1
function angle1(value) {
  satelliteSensor.angle1 = value
}
// 夹角2

function angle2(value) {
  satelliteSensor.angle2 = value
}

// 参考轴系显示与隐藏
function chkShowModelMatrix(val) {
  modelGraphic.debugAxis = val
}

// 视椎体状态
function sensorShowHide(val) {
  satelliteSensor.show = val
}
// 是否与地球相交
function chkUnderground(val) {
  satelliteSensor.rayEllipsoid = val
}

// 类型选择
function chkSensorType(value) {
  if (value === "1") {
    satelliteSensor.sensorType = mars3d.graphic.SatelliteSensor.Type.Conic
  } else {
    satelliteSensor.sensorType = mars3d.graphic.SatelliteSensor.Type.Rect
  }
}

function lengthChange(value) {
  modelGraphic.debugAxisLength = value * 1000
}

function clearAll() {
  map.graphicLayer.clear()
}

// 获取边界值
function getRegion() {
  map.graphicLayer.clear()

  var coords = satelliteSensor.getAreaCoords() // 导出成像区边界坐标
  if (!coords || coords.length == 0) {
    globalMsg("当前与地球无成像区边")
    return
  }
  console.log(coords)
  // 显示边界点，测试
  map.graphicLayer.clear()

  coords.forEach((position) => {
    var primitive = new mars3d.graphic.PointPrimitive({
      position: position,
      style: {
        color: "#ff0000",
        pixelSize: 8,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2,
        clampToGround: true
      }
    })
    map.graphicLayer.addGraphic(primitive)
  })

  // 提示边界值，测试
  console.log(JSON.stringify(coords))
}
function getCenter() {
  map.graphicLayer.clear()

  var groundPosition = satelliteSensor.groundPosition
  if (!groundPosition) {
    globalMsg("当前与地球无交点")
    return
  }

  var primitive = new mars3d.graphic.PointPrimitive({
    position: groundPosition,
    style: {
      color: "#ff0000",
      pixelSize: 8,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      clampToGround: true
    }
  })
  map.graphicLayer.addGraphic(primitive)

  var point = mars3d.LatLngPoint.fromCartesian(groundPosition)
  globalMsg(point.toString())
}
