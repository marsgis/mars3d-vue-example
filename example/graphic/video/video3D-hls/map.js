import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象
let selectedView
let videoElement

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.843366, lng: 117.205566, alt: 132, heading: 179, pitch: -56 },
    fxaa: true, // 不开启抗锯齿，编辑时界面会闪烁
    globe: {
      depthTestAgainstTerrain: true // 不加无法投射到地形上
    }
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
  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 绑定属性及处理事件
  bindEvnet()

  // 加一些演示数据
 addGraphic01()
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
  const hlsUrl = "http://ivi.bupt.edu.cn/hls/cctv13.m3u8"
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

// 加载已配置好的视频（此参数为界面上“打印参数”按钮获取的）
function addGraphic01() {
  const video3D = new mars3d.graphic.Video3D({
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

/**
 * 视频投放
 *
 * @export
 * @param {boolean} showFrustum 线框是否显示
 * @param {number} opacity 透明度
 * @returns {void} 无
 */
export function createViewForVideo(showFrustum, opacity) {
  // 取屏幕中心点
  const cartesian = map.getCenter({ format: false })
  if (!cartesian) {
    return
  }
  const cameraPosition = Cesium.clone(map.scene.camera.position)

  // 构造投射体
  const video3D = new mars3d.graphic.Video3D({
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

/**
 * 图片投放
 *
 * @export
 * @param {boolean} showFrustum 线框是否显示
 * @param {number} opacity 透明度
 * @returns {void} 无
 */
export function createViewForPicture(showFrustum, opacity) {
  // 取屏幕中心点
  const cartesian = map.getCenter({ format: false })
  if (!cartesian) {
    return
  }
  const cameraPosition = Cesium.clone(map.scene.camera.position)

  // 构造投射体
  const video3D = new mars3d.graphic.Video3D({
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

/**
 * 文本投放
 *
 * @export
 * @param {boolean} showFrustum 线框是否显示
 * @param {number} opacity 透明度
 * @returns {void} 无
 */
export function createText(showFrustum, opacity) {
  const cartesian = map.getCenter({ format: false })
  if (!cartesian) {
    return
  }

  const cameraPosition = Cesium.clone(map.scene.camera.position)

  // 构造投射体
  const video3D = new mars3d.graphic.Video3D({
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

/**
 * 颜色投放
 *
 * @export
 * @param {boolean} showFrustum 线框是否显示
 * @param {number} opacity 透明度
 * @returns {void} 无
 */
export function createViewForColor(showFrustum, opacity) {
  // 取屏幕中心点
  const cartesian = map.getCenter({ format: false })
  if (!cartesian) {
    return
  }
  const cameraPosition = Cesium.clone(map.scene.camera.position)

  // 构造投射体
  const video3D = new mars3d.graphic.Video3D({
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
export function clearVideo() {
  graphicLayer.clear()
  selectedView = null
}

// 播放暂停
export function playOrpause() {
  if (!selectedView) {
    return
  }
  selectedView.play = !selectedView.play
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

  const params = JSON.stringify(selectedView.toJSON())
  console.log("Video3D构造参数为", params)
}

// 混合系数
export function opacity(value) {
  if (!selectedView) {
    return
  }
  selectedView.opacity = value
}

// 水平拉伸
export function cameraFov(value) {
  if (!selectedView) {
    return
  }
  selectedView.fovDegree = value
}

// 宽高比例
export function cameraWidHei(value) {
  if (selectedView) {
    selectedView.aspectRatio = value
  }
}

// 线框是否显示
export function showFrustum(ckd) {
  if (!selectedView) {
    return
  }
  selectedView.showFrustum = ckd
}

// 视频位置
export function selCamera() {
  if (!selectedView) {
    return
  }
  map.graphicLayer.startDraw({
    type: "point",
    success: (graphic) => {
      const point = graphic.point
      graphic.remove() // 删除绘制的点

      selectedView.cameraPosition = point
    }
  })
}

export function selView() {
  if (!selectedView) {
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

// 键盘微调控制
export function bindEvnet(step) {
  document.addEventListener(
    "keydown",
    function (e) {
      switch (e.keyCode) {
        default:
          break
        case "A".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.LEFT, step)
          break
        case "D".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.RIGHT, step)
          break
        case "W".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.TOP, step)
          break
        case "S".charCodeAt(0):
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.BOTTOM, step)
          break
        case "Q".charCodeAt(0): // Q键
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.ALONG, step)
          break
        case "E".charCodeAt(0): // E
          rotateCamera(mars3d.graphic.Video3D.RatateDirection.INVERSE, step)
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
