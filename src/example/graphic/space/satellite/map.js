var map
var weixin
var eventTarget = new mars3d.BaseClass()
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 5.459746, lng: 68.238291, alt: 36261079, heading: 143, pitch: -89 },
      cameraController: {
        zoomFactor: 3.0,
        minimumZoomDistance: 1000,
        maximumZoomDistance: 300000000,
        constrainedAxis: false // 解除在南北极区域鼠标操作限制
      }
    },
    control: {
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件
      compass: { bottom: "350px", left: "5px" }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0]
  toolbar.style.bottom = "110px"

  // 指定时间
  // map.clock.currentTime = Cesium.JulianDate.fromDate(new Date('2020-11-27 10:48:28'))

  map.clock.shouldAnimate = true
  map.clock.multiplier = 1 // 速度

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了卫星", event)
  })

  weixin = new mars3d.graphic.Satellite({
    name: "GAOFEN 1",
    tle1: "1 39150U 13018A   21180.50843864  .00000088  00000-0  19781-4 0  9997",
    tle2: "2 39150  97.8300 252.9072 0018449 344.7422  15.3253 14.76581022440650",

    model: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 90,
      autoHeading: true,
      show: true
    },
    label: {
      color: "#ffffff",
      opacity: 1,
      font_family: "楷体",
      font_size: 30,
      outline: true,
      outlineColor: "#000000",
      outlineWidth: 3,
      background: true,
      backgroundColor: "#000000",
      backgroundOpacity: 0.5,
      font_weight: "normal",
      font_style: "normal",
      pixelOffsetX: 0,
      pixelOffsetY: -20,
      scaleByDistance: true,
      scaleByDistance_far: 10000000,
      scaleByDistance_farValue: 0.4,
      scaleByDistance_near: 100000,
      scaleByDistance_nearValue: 1,
      show: true
    },
    cone: {
      sensorType: mars3d.graphic.SatelliteSensor.Type.Rect,
      angle1: 10,
      angle2: 5,
      color: "#6ef500",
      reverse: false,
      show: true
    },
    path: {
      show: true,
      color: "#00ff00",
      opacity: 0.5,
      width: 1
    },
    fixedFrameTransform: Cesium.Transforms.localFrameToFixedFrameGenerator("east", "south"),
    popup: `高分1号`
  })
  graphicLayer.addGraphic(weixin)

  var weixinData = {}
  weixinData.name = weixin.name
  weixinData.tle1 = weixin.options.tle1
  weixinData.tle2 = weixin.options.tle2

  // 显示实时坐标和时间
  weixin.on(mars3d.EventType.change, (e) => {
    const date = Cesium.JulianDate.toDate(map.clock.currentTime)
    weixinData.time = mars3d.Util.formatDate(date, "yyyy-MM-dd HH:mm:ss")
    if (weixin.position) {
      var point = mars3d.LatLngPoint.fromCartesian(weixin.position)
      weixinData.td_jd = point.lng
      weixinData.td_wd = point.lat
      weixinData.td_gd = point.alt
      eventTarget.fire("loadOk", { weixinData })
    }
  })
}

// 定位至卫星
function locate() {
  weixin.flyTo()
}
// 参考轴系显示与隐藏
function chkShowModelMatrix(val) {
  weixin.debugAxis = val
}
// 凝视目标
function selPoint() {
  if (weixin.lookAt) {
    weixin.lookAt = null
  } else {
    map.graphicLayer.startDraw({
      type: "point",
      style: {
        pixelSize: 12,
        color: "#ffff00"
      },
      success: function (graphic) {
        var position = graphic.positionShow
        map.graphicLayer.clear()

        weixin.lookAt = position
      }
    })
  }
}

// 类型选择
function chkSensorType(value) {
  if (value === "1") {
    weixin.setOptions({
      cone: {
        sensorType: mars3d.graphic.SatelliteSensor.Type.Conic
      }
    })
  } else {
    weixin.setOptions({
      cone: {
        sensorType: mars3d.graphic.SatelliteSensor.Type.Rect
      }
    })
  }
}

// 俯仰角
function pitchChange(value) {
  weixin.pitch = value
}
// 左右角

function rollChange(value) {
  weixin.roll = value
}

// 夹角1
function angle1(value) {
  weixin.angle1 = value
}
// 夹角2
function angle2(value) {
  weixin.angle2 = value
}
