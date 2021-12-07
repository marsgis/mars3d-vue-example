import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let weixin

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 12.845055, lng: 112.931363, alt: 24286797, heading: 3, pitch: -90 },
    cameraController: {
      zoomFactor: 3.0,
      minimumZoomDistance: 1000,
      maximumZoomDistance: 300000000,
      constrainedAxis: false // 解除在南北极区域鼠标操作限制
    }
  },
  control: {
    clockAnimate: true, // 时钟动画控制(左下角)
    timeline: true, // 是否显示时间线控件
    compass: { top: "10px", left: "5px" }
  }
}
export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.querySelector(".cesium-viewer-toolbar")
  toolbar.style.bottom = "60px"

  map.clock.shouldAnimate = true
  map.clock.multiplier = 1 // 速度
  addSatellite()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addSatellite() {
  // 创建矢量数据图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了卫星", event)
  })

  weixin = new mars3d.graphic.Satellite({
    name: "BEIDOU M6",
    tle1: "1 38775U 12050B   19233.58396017  .00000002  00000-0  00000+0 0  9996",
    tle2: "2 38775  54.9682 146.4459 0022572 250.3518 274.6095  1.86232229 47268",
    fixedFrameTransform: Cesium.Transforms.localFrameToFixedFrameGenerator("east", "south"),
    model: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      autoHeading: false,
      show: true
    },
    path: {
      color: "#36d9ec",
      show: true
    },
    cone: {
      sensorType: mars3d.graphic.SatelliteSensor.Type.Rect,
      reverse: false,
      rayEllipsoid: true,
      show: true,
      list: [
        {
          name: "高分相机A",
          angle1: 4.03, // 视场张角1(度)
          angle2: 4.03, // 视场张角2(度)
          pitchOffset: 3.7, // 安装偏转角(度)
          color: "#ff0000",
          show: true
        },
        {
          name: "高分相机B",
          angle1: 3.1, // 视场张角1(度)
          angle2: 3.1, // 视场张角2(度)
          pitchOffset: -3.7, // 安装偏转角(度)
          color: "#0000ff",
          show: true
        },
        {
          name: "多光谱相机A",
          angle1: 4.5, // 视场张角1(度)
          angle2: 4.5, // 视场张角2(度)
          pitchOffset: 4.35, // 安装偏转角(度)
          color: "#ffff00",
          show: true
        },
        {
          name: "多光谱相机B",
          angle1: 4.5, // 视场张角1(度)
          angle2: 4.5, // 视场张角2(度)
          pitchOffset: -4.35, // 安装偏转角(度)
          color: "#00ffff",
          show: true
        }
      ]
    }
  })
  graphicLayer.addGraphic(weixin)

  const weixinData = {}
  weixinData.name = weixin.name
  weixinData.tle1 = weixin.options.tle1
  weixinData.tle2 = weixin.options.tle2

  // 显示实时坐标和时间
  weixin.on(mars3d.EventType.change, function (event) {
    const date = Cesium.JulianDate.toDate(map.clock.currentTime)
    weixinData.time = mars3d.Util.formatDate(date, "yyyy-MM-dd HH:mm:ss")
    if (weixin.position) {
      const point = mars3d.LatLngPoint.fromCartesian(weixin.position)
      weixinData.td_jd = point.lng
      weixinData.td_wd = point.lat
      weixinData.td_gd = formatLength(point.alt)
      eventTarget.fire("realData", weixinData)
    }
  })
}

// 定位至卫星
export function locate() {
  weixin.flyTo()
}

// 参考轴系显示与隐藏
export function chkShowModelMatrix(val) {
  weixin.debugAxis = val
}

function formatLength(val, unit) {
  if (val == null) {
    return ""
  }
  val = Number(val)

  if (unit == null || unit == "auto") {
    if (val < 1000) {
      unit = "m"
    } else {
      unit = "km"
    }
  }
  const valstr = (val * 0.001).toFixed(2) + "公里"

  return valstr
}
