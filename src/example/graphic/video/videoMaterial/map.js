import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象
let videoElement

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 28.44134, lng: 119.482687, alt: 199, heading: 227, pitch: -28 }
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
    name: "县城社区",
    url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 11.5 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tiles3dLayer)

  // 允许编辑
  map.graphicLayer.hasEdit = true

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 2.在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听layer，鼠标移入了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听layer，鼠标移出了矢量对象", event)
  })

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
  addGraphic02()
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
  sourceContainer.setAttribute("src", "//data.mars3d.cn/file/video/lukou.mp4")
  sourceContainer.setAttribute("type", "video/mp4")

  // 可以使视频元素与Cesium的模拟时钟同步
  const synchronizer = new Cesium.VideoSynchronizer({
    clock: map.clock,
    element: videoElement
  })
  map.clock.shouldAnimate = true
}

// 竖立视频
function addGraphic01() {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [119.481299, 28.439988, 140],
      [119.481162, 28.440102, 140],
      [119.481163, 28.440101, 130],
      [119.481296, 28.439986, 130]
    ],
    style: {
      material: videoElement,
      stRotationDegree: 0 // 视频旋转角度
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 地面视频
function addGraphic02() {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [119.481749, 28.440171],
      [119.481385, 28.440457],
      [119.481911, 28.44094],
      [119.482254, 28.440653]
    ],
    style: {
      material: videoElement,
      stRotationDegree: 130, // 视频旋转角度
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(graphic)
}

let rotation = 0
function getRotationValue() {
  return rotation
}

export function drawRectangle() {
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      clampToGround: true
    },
    success: function (graphic) {
      graphic.entityGraphic.material = videoElement
      graphic.entityGraphic.rotation = new Cesium.CallbackProperty(getRotationValue, false)
      graphic.entityGraphic.stRotation = new Cesium.CallbackProperty(getRotationValue, false)
    }
  })
}

/**
 * 绘制这个polygon的时候，点的绘制顺序和面的角度不同，会使画面翻转
 *
 * @export
 * @param {boolean} clampToGround  是否贴地 clampToGround = true/false
 * @returns {void}
 */
export function drawPolygon(clampToGround) {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      opacity: 0.2,
      clampToGround: clampToGround
    },
    success: function (graphic) {
      graphic.entityGraphic.material = videoElement
      graphic.entityGraphic.stRotation = new Cesium.CallbackProperty(getRotationValue, false)
    }
  })
}

// 播放暂停
export function videoPlay() {
  if (!map.clock.shouldAnimate) {
    map.clock.shouldAnimate = true
  }
}
export function videoStop() {
  if (map.clock.shouldAnimate) {
    map.clock.shouldAnimate = false
  }
}

/**
 * 方向改变
 *
 * @export
 * @param {number} value  范围在0-360°
 * @returns {void}
 */
export function angleChange(value) {
  rotation = Cesium.Math.toRadians(value)
}

export function removeAll() {
  map.graphicLayer.clear()
  graphicLayer.clear()
}
