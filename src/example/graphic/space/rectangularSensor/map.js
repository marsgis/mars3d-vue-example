var map
var graphicLayer
var rectangularSensor
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
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
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)
}

function addGraphic_01(heading, pitch, roll, radius, xValue, yValue) {
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

// 半径发生改变
function radiusChange(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.radius = value
  })
}

// 方向发生改变
function headingChange(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.heading = value
  })
}
// 仰角发生改变

function pitchChange(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.pitch = value
  })
}

// roll发生改变
function rollChange(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.roll = value
  })
}

function xHalfAngle(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.style = { xHalfAngleDegree: value }
  })
}

function yHalfAngle(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.style = { yHalfAngleDegree: value }
  })
}

// 是否显示扫描面
function ShowScanPlane(value) {
  graphicLayer.eachGraphic((rectangularSensor) => {
    rectangularSensor.style = { showScanPlane: value } // 是否显示扫描面
  })
}

// 绘制
function startDraw(heading, pitch, roll, radius, xHalfAngle, yHalfAngle) {
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
function bindShowHide(val) {
  graphicLayer.show = val
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

// 定位到模型

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
