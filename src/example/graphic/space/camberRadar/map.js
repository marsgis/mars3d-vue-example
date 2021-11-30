var map
var camberRadar
var graphicLayer
var eventTarget = new mars3d.BaseClass()
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.784488, lng: 117.16699, alt: 9030, heading: 1, pitch: -57 },
      cameraController: {
        constrainedAxis: false // 解除在南北极区域鼠标操作限制
      }
    },
    control: {
      sceneModePicker: false
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
  eventTarget.fire("loadOk")
}

function getViewConfig(heading, pitch, roll, radius, startRadius, startFovH, endFovH, startFovV, endFovV) {
  var style = {
    radius: radius,
    startRadius: startRadius,

    heading: heading,
    pitch: pitch,
    roll: roll,

    startFovH: Cesium.Math.toRadians(startFovH),
    endFovH: Cesium.Math.toRadians(endFovH),
    startFovV: Cesium.Math.toRadians(startFovV),
    endFovV: Cesium.Math.toRadians(endFovV)
  }

  camberRadar = new mars3d.graphic.CamberRadar({
    position: [117.170264, 31.840312, 363],
    style: {
      color: "#ff0000",
      opacity: 0.5,
      outline: true,
      outlineColor: "#ffffff",
      segmentH: 50,
      ...style
    }
  })
  graphicLayer.addGraphic(camberRadar)
}

function headingChange(value) {
  camberRadar.heading = value
}

function pitchChange(value) {
  camberRadar.pitch = value
}

function rollChange(value) {
  camberRadar.roll = value
}

function outerRadiusChange(val) {
  camberRadar.radius = val
}

function innerRadiusChange(val) {
  camberRadar.startRadius = val
}

function startFovHChange(value) {
  camberRadar.startFovH = Cesium.Math.toRadians(value)
}

function endFovHChange(value) {
  camberRadar.endFovH = Cesium.Math.toRadians(value)
}

function startFovVChange(value) {
  camberRadar.startFovV = Cesium.Math.toRadians(value)
}

function endFovVChange(value) {
  camberRadar.endFovV = Cesium.Math.toRadians(value)
}
