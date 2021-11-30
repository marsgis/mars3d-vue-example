var map
var graphicLayer
var selectedView
var videoElement
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.843366, lng: 117.205566, alt: 132, heading: 179, pitch: -56 },
      fxaa: true, // 不开启抗锯齿，编辑时界面会闪烁
      globe: {
        depthTestAgainstTerrain: true // 不加无法投射到地形上
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 添加参考三维模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "合肥国家大学科技园",
    url: "//data.mars3d.cn/3dtiles/qx-hfdxy/tileset.json",
    position: { alt: -24 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tiles3dLayer)
  createVideoDom()
  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 绑定属性及处理事件
  bindEvnet()

  // 加一些演示数据
  addGraphic_01()
}

function createVideoDom() {
  videoElement = mars3d.DomUtil.create("video", "", document.body)
  videoElement.setAttribute("muted", "muted")
  videoElement.setAttribute("autoplay", "autoplay")
  videoElement.setAttribute("loop", "loop")
  videoElement.setAttribute("crossorigin", "")
  videoElement.setAttribute("controls", "")
  videoElement.style.display = "none"

  const sourceContainer = mars3d.DomUtil.create("source", "", videoElement)
  sourceContainer.setAttribute("src", "http://data.mars3d.cn/file/video/lukou.mp4")
  sourceContainer.setAttribute("type", "video/mp4")

  hls()
}
function hls() {
  // 加HLS演示数据
  var hlsUrl = "http://ivi.bupt.edu.cn/hls/cctv13.m3u8"
  if (window.Hls.isSupported()) {
    var hls = new window.Hls()
    hls.loadSource(hlsUrl)
    hls.attachMedia(videoElement)
    hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
      videoElement.play()
    })
  } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
    videoElement.src = hlsUrl
    videoElement.addEventListener("loadedmetadata", function () {
      videoElement.play()
    })
  }
}

// 加载已配置好的视频（此参数为界面上“打印参数”按钮获取的）
function addGraphic_01() {
  var video3D = new mars3d.graphic.Video3D({
    type: mars3d.graphic.Video3D.Type.Video,
    url: "http://data.mars3d.cn/file/video/menqian.mp4",
    position: [117.20551, 31.842824, 41.4],
    cameraPosition: [117.205457, 31.842984, 63.9],
    style: {
      fovDegree: 84.3,
      aspectRatio: 2.6,
      opacity: 0.8,
      camera: {
        direction: {
          x: 0.07331987934745406,
          y: -0.31686588753316797,
          z: -0.9456321719412325
        },
        right: {
          x: 0.8826585211077188,
          y: 0.46201009007723565,
          z: -0.08637483304041443
        },
        up: {
          x: -0.4642608430704491,
          y: 0.8283373020603265,
          z: -0.3135588997412374
        }
      }
    },
    showFrustum: true
  })
  graphicLayer.addGraphic(video3D)

  selectedView = video3D // 记录下
}

// 视频投放
function createViewForVideo(showFrustum, opacity) {
  // 取屏幕中心点
  var cartesian = map.getCenter({ format: false })
  if (!cartesian) {
    return
  }
  var cameraPosition = Cesium.clone(map.scene.camera.position)

  // 构造投射体
  var video3D = new mars3d.graphic.Video3D({
    type: mars3d.graphic.Video3D.Type.Video,
    url: "http://data.mars3d.cn/file/video/lukou.mp4",
    position: cartesian,
    cameraPosition: cameraPosition,
    style: {
      opacity: opacity
    },
    showFrustum: showFrustum
  })
  graphicLayer.addGraphic(video3D)

  selectedView = video3D // 记录下
}

// 图片投放
function createViewForPicture(showFrustum, opacity) {
  // 取屏幕中心点
  var cartesian = map.getCenter({ format: false })
  if (!cartesian) {
    return
  }
  var cameraPosition = Cesium.clone(map.scene.camera.position)

  // 构造投射体
  var video3D = new mars3d.graphic.Video3D({
    type: mars3d.graphic.Video3D.Type.Image,
    url: "./img/tietu/gugong.jpg",
    position: cartesian,
    cameraPosition: cameraPosition,
    style: {
      opacity: opacity
    },
    showFrustum: showFrustum
  })
  graphicLayer.addGraphic(video3D)

  selectedView = video3D // 记录下
}

// 文本投放
function createText(showFrustum, opacity) {
  var cartesian = map.getCenter({ format: false })
  if (!cartesian) {
    return
  }

  var cameraPosition = Cesium.clone(map.scene.camera.position)

  // 构造投射体
  var video3D = new mars3d.graphic.Video3D({
    type: mars3d.graphic.Video3D.Type.Text,
    position: cartesian,
    cameraPosition: cameraPosition,
    style: {
      text: "Mars3D 火星科技 2021",
      opacity: opacity,
      textStyles: {
        font: "50px 楷体",
        fill: true,
        fillColor: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
        stroke: true,
        strokeWidth: 2,
        strokeColor: new Cesium.Color(1.0, 1.0, 1.0, 0.8),
        backgroundColor: new Cesium.Color(1.0, 1.0, 1.0, 0.1),
        textBaseline: "top",
        padding: 40
      }
    },
    showFrustum: showFrustum
  })
  graphicLayer.addGraphic(video3D)

  selectedView = video3D // 记录下
}

// 颜色投放
function createViewForColor(showFrustum, opacity) {
  // 取屏幕中心点
  var cartesian = map.getCenter({ format: false })
  if (!cartesian) {
    return
  }
  var cameraPosition = Cesium.clone(map.scene.camera.position)

  // 构造投射体
  var video3D = new mars3d.graphic.Video3D({
    type: mars3d.graphic.Video3D.Type.Color,
    position: cartesian,
    cameraPosition: cameraPosition,
    style: {
      color: Cesium.Color.CYAN.withAlpha(0.5),
      opacity: opacity
    },
    showFrustum: showFrustum
  })
  graphicLayer.addGraphic(video3D)

  selectedView = video3D // 记录下
}

// 清除
function clearVideo() {
  graphicLayer.clear()
  selectedView = null
}

// 播放暂停
function playOrpause() {
  // if (!selectedView) {
  //   return
  // }
  // selectedView.play = !selectedView.play
}

// 定位至视频位置
function locate() {
  if (!selectedView) {
    return
  }
  selectedView.flyTo()
}
// 打印参数

function printParameters() {
  if (!selectedView) {
    return
  }

  var params = JSON.stringify(selectedView.toJSON())
  console.log(params)
}

// 混合系数
function opacity(value) {
  if (!selectedView) {
    return
  }
  selectedView.opacity = value
}

// 水平拉伸

function cameraFov(value) {
  if (!selectedView) {
    return
  }
  selectedView.fovDegree = value
}

// 宽高比例
function cameraWidHei(value) {
  if (selectedView) {
    selectedView.aspectRatio = value
  }
}

// 线框是否显示
function showFrustum(ckd) {
  if (!selectedView) {
    return
  }
  selectedView.showFrustum = ckd
}

// 视频位置
function selCamera() {
  if (!selectedView) {
    return
  }
  map.graphicLayer.startDraw({
    type: "point",
    success: (graphic) => {
      var point = graphic.point
      graphic.remove() // 删除绘制的点

      selectedView.cameraPosition = point
    }
  })
}

function selView() {
  if (!selectedView) {
    return
  }

  map.graphicLayer.startDraw({
    type: "point",
    success: (graphic) => {
      var point = graphic.point
      graphic.remove() // 删除绘制的点

      selectedView.position = point
    }
  })
}
// 键盘微调控制

function bindEvnet() {
  document.addEventListener(
    "keydown",
    function (e) {
      switch (e.keyCode) {
        default:
          break
        case "A".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.LEFT)
          break
        case "D".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.RIGHT)
          break
        case "W".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.TOP)
          break
        case "S".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.BOTTOM)
          break
        case "Q".charCodeAt(0): // Q键
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.ALONG)
          break
        case "E".charCodeAt(0): // E
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.INVERSE)
          break
      }
    },
    false
  )
}

// 微调视频
var adjustVal
var cameraFollowVal
function rotateCamera(dir) {
  if (!selectedView) {
    return
  }
  selectedView.rotateCamera(dir, adjustVal)

  if (cameraFollowVal) {
    map.camera.direction = selectedView.style.camera.direction
    map.camera.right = selectedView.style.camera.right
    map.camera.up = selectedView.style.camera.up
    map.camera.position = selectedView.position
  }
}
