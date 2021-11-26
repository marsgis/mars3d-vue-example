var map
var selectedView
var graphicLayer
var videoElement
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 31.844188, lng: 117.205321, alt: 143, heading: 175, pitch: -26 }
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
  // 创建矢量数据图层
   graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 2.在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    selectedView = event.graphic
    console.log("监听layer，单击了矢量对象", event)
  })
  // graphicLayer.on(mars3d.EventType.mouseOver, function(event) {
  //   console.log('监听layer，鼠标移入了矢量对象', event)
  // })
  // graphicLayer.on(mars3d.EventType.mouseOut, function(event) {
  //   console.log('监听layer，鼠标移出了矢量对象', event)
  // })

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindPopup("我是layer上绑定的Popup")

  // 可在图层上绑定tooltip,对所有加到这个图层的矢量数据都生效
  // graphicLayer.bindTooltip('我是layer上绑定的Tooltip')

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        var graphic = e.graphic
        if (graphic) {
          graphicLayer.removeGraphic(graphic)
        }
      }
    }
  ])

  // 绑定属性及处理事件
  // bindViewModel()
  bindEvnet()
  addGraphic_01()

}
function createVideoDom() {
  var hlsUrl = "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8"
  // var hlsUrl = "http://ivi.bupt.edu.cn/hls/cctv13.m3u8";

  videoElement = mars3d.DomUtil.create("video", "", document.body)
  videoElement.setAttribute("muted", "muted")
  videoElement.setAttribute("autoplay", "autoplay")
  videoElement.setAttribute("loop", "loop")
  videoElement.setAttribute("crossorigin", "")
  videoElement.setAttribute("controls", "")
  videoElement.style.display = "none"

  const sourceContainer = mars3d.DomUtil.create("source", "", videoElement)
  sourceContainer.setAttribute("src", "//data.mars3d.cn/file/video/lukou.mp4")
  sourceContainer.setAttribute("type", "video/mp4")

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

// 投射视频
function addVideo() {
  var video2D = new mars3d.graphic.Video2D({
    dom: videoElement,
    style: {
      aspectRatio: map.scene.camera.frustum.aspectRatio,
      fov: map.scene.camera.frustum.fov,
      dis: viewModel.dis
    }
  })
  graphicLayer.addGraphic(video2D)

  selectedView = video2D // 记录下
}

// 清除
function clear() {
  graphicLayer.clear()
   selectedView = null
}

// 加载已配置好的视频（此参数为界面上“打印参数”按钮获取的）
function addGraphic_01() {
  var video2D = new mars3d.graphic.Video2D({
    dom: videoElement,
    position: [117.205459, 31.842988, 64.3],
    style: {
      camera: {
        direction: { x: -0.20300781957546601, y: 0.3881445982693198, z: -0.8989613985180693 },
        up: { x: -0.41112481743883666, y: 0.7994469141644973, z: 0.43801942413407347 },
        right: { x: 0.8886867894129509, y: 0.4585067090754624, z: -0.0027180978075245542 }
      },
      dis: 70,
      fovDegree: 52,
      aspectRatio: 3,
      stRotationDegree: 0
    },
    showFrustum: true
  })
  graphicLayer.addGraphic(video2D)

  selectedView = video2D // 记录下
}



// 面板参数更新
var viewModel = {
  fovDegree: 50,
  aspectRatio: 2.0,
  dis: 70,
  rotateDeg: 0
}



function updateParams(fovDegree, aspectRatio, dis) {
  if (!selectedView) {
    return
  }

  selectedView.aspectRatio = aspectRatio
  selectedView.dis = dis
  selectedView.fovDegree = fovDegree
}

function playOrpause() {
  selectedView.play = !selectedView.play
}

// 线框是否显示
function showFrustum(ckd) {
  if (!selectedView) {
    return
  }
  selectedView.showFrustum = ckd
}
// 视频角度改变

function rotateDeg(num) {
  if (!selectedView) {
    return
  }
  selectedView.stRotation = Cesium.Math.toRadians(num)
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

  var params = selectedView.toJSON()
  console.log(JSON.stringify(params))
}

function bindEvnet() {
  document.addEventListener(
    "keydown",
    function (e) {
      switch (e.keyCode) {
        default:
          break
        case "A".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.LEFT)
          break
        case "D".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.RIGHT)
          break
        case "W".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.TOP)
          break
        case "S".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.BOTTOM)
          break
        case "Q".charCodeAt(0): // Q键
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.ALONG)
          break
        case "E".charCodeAt(0): // E
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.INVERSE)
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
// 视频位置
function selCamera() {
  if (selectedView == null) {
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
