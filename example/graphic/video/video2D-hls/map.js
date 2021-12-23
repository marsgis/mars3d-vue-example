import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let selectedView
let graphicLayer
let videoElement

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.844188, lng: 117.205321, alt: 143, heading: 175, pitch: -26 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  addModel()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addModel() {
  createVideoDom()

  // 添加参考三维模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "合肥国家大学科技园",
    url: "//data.mars3d.cn/3dtiles/qx-hfdxy/tileset.json",
    position: { alt: -24 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tiles3dLayer)
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
        const graphic = e.graphic
        if (graphic) {
          graphicLayer.removeGraphic(graphic)
        }
      }
    }
  ])

  addGraphic01()
}

function createVideoDom() {
  const hlsUrl = "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8"
  // let hlsUrl = "http://ivi.bupt.edu.cn/hls/cctv13.m3u8";

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
    const hls = new window.Hls()
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
export function addVideo(dis) {
  const video2D = new mars3d.graphic.Video2D({
    dom: videoElement,
    style: {
      aspectRatio: map.scene.camera.frustum.aspectRatio,
      fov: map.scene.camera.frustum.fov,
      dis: dis
    }
  })
  graphicLayer.addGraphic(video2D)

  selectedView = video2D // 记录下
}

// 清除
export function clear() {
  graphicLayer.clear()
  selectedView = null
}

// 加载已配置好的视频（此参数为界面上“打印参数”按钮获取的）
function addGraphic01() {
  const video2D = new mars3d.graphic.Video2D({
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

/**
 * 参数改变
 *
 * @export
 * @param {number} fovDegree 视角水平张角
 * @param {number} aspectRatio 视角宽高比例
 * @param {number} dis 视角距离
 * @returns {void}
 */

export function updateParams(fovDegree, aspectRatio, dis) {
  if (!selectedView) {
    return
  }

  selectedView.aspectRatio = aspectRatio
  selectedView.dis = dis
  selectedView.fovDegree = fovDegree
}

export function playOrpause() {
  selectedView.play = !selectedView.play
}

/**
 *
 * @export
 * @param {boolean} isCheckde 线框是否显示
 * @returns {void}
 */
export function showFrustum(isCheckde) {
  if (!selectedView) {
    return
  }
  selectedView.showFrustum = isCheckde
}
/**
 * 视频角度
 *
 * @param {number} num 0-360°
 * @returns {void}
 */
export function rotateDeg(num) {
  if (!selectedView) {
    return
  }
  selectedView.stRotation = Cesium.Math.toRadians(num)
}

// 定位至视频位置
export function locate() {
  if (!selectedView) {
    return
  }
  selectedView.flyTo()
}
// 打印参数
export function printParameters() {
  if (!selectedView) {
    return
  }

  const params = selectedView.toJSON()
  console.log("Video2D构造参数为", JSON.stringify(params))
}

export function bindEvnet(step) {
  document.addEventListener(
    "keydown",
    function (e) {
      switch (e.keyCode) {
        default:
          break
        case "A".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.LEFT, step)
          break
        case "D".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.RIGHT, step)
          break
        case "W".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.TOP, step)
          break
        case "S".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.BOTTOM, step)
          break
        case "Q".charCodeAt(0): // Q键
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.ALONG, step)
          break
        case "E".charCodeAt(0): // E
          rotateCamera(mars3d.graphic.Video2D.RatateDirection.INVERSE, step)
          break
      }
    },
    false
  )
}

// 微调视频
function rotateCamera(dir, adjustVal) {
  if (!selectedView) {
    return
  }
  selectedView.rotateCamera(dir, adjustVal)
}

/**
 *
 * @export
 * @param {boolean} isFollow 相机是否跟随
 * @returns {void} 无
 */
export function cameraFollow(isFollow) {
  if (isFollow) {
    map.camera.direction = selectedView.style.camera.direction
    map.camera.right = selectedView.style.camera.right
    map.camera.up = selectedView.style.camera.up
    map.camera.position = selectedView.position
  }
}

// 视频位置
export function selCamera() {
  if (selectedView == null) {
    return
  }

  map.graphicLayer.startDraw({
    type: "point",
    success: (graphic) => {
      const point = graphic.point
      graphic.remove() // 删除绘制的点

      selectedView.position = point
    }
  })
}
