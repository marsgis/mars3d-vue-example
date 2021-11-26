
var map
var roamLine

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.843773, lng: 117.251509, alt: 34, heading: 270, pitch: -11 }
    },
    control: {
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件
      infoBox: false
    },
    layers: [
      {
        name: "教学楼",
        type: "3dtiles",
        url: "//data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
        position: { lng: 117.251229, lat: 31.844015, alt: 31.2 },
        maximumScreenSpaceError: 8,
        maximumMemoryUsage: 1024,
        show: true
      }
    ]
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 键盘漫游
  map.keyboardRoam.setOptions({
    moveStep: 0.1, // 平移步长 (米)。
    dirStep: 50, // 相机原地旋转步长，值越大步长越小。
    rotateStep: 0.3, // 相机围绕目标点旋转速率，0.3-2.0
    minPitch: 0.1, // 最小仰角  0-1
    maxPitch: 0.95 // 最大仰角  0-1
  })
  map.keyboardRoam.enabled = true // 开启键盘漫游

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 该数据可以从 基础项目 飞行漫游功能界面操作后单个路线的 保存JSON
  var flydata = {
    name: "室内路线",
    speed: 5,
    positions: [
      [117.25164, 31.843773, 32.0],
      [117.251042, 31.843772, 32.0],
      [117.250613, 31.844058, 32.0],
      [117.250677, 31.844146, 32.0],
      [117.250696, 31.844134, 32.0],
      [117.250657, 31.844098, 36.0],
      [117.250611, 31.84406, 36.0],
      [117.251039, 31.843773, 36.0]
    ],
    camera: {
      type: "dy",
      followedX: 1,
      followedZ: 0.2
    },
    offsetHeight: 1.6
  }

  roamLine = new mars3d.graphic.RoamLine(flydata)
  graphicLayer.addGraphic(roamLine)

  startFly()
}

function startFly() {
  // 启动漫游
  roamLine.start()
}

function stopFly() {
  roamLine.stop()
  globalMsg("请鼠标单击地图任意区域后，您再可以键盘按A S D W Q E键控制前后左右, 上下左右键控制旋转, 进行手动漫游。")
}

function centerAtDX1() {
  stopFly()
  map.setCameraView({ lat: 31.843703, lng: 117.251038, alt: 33, heading: 50, pitch: -6 })
}

function centerAtDX2() {
  stopFly()
  map.setCameraView({ lat: 31.843816, lng: 117.250978, alt: 34, heading: 308, pitch: -8 })
}

function centerAtDX3() {
  stopFly()
  map.setCameraView({ lat: 31.843789, lng: 117.251188, alt: 42, heading: 6, pitch: -31 })
}
