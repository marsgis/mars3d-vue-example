var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
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
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件
      compass: { top: "10px", left: "5px" }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0]
  toolbar.style.bottom = "110px"

  map.clock.shouldAnimate = true
  map.clock.multiplier = 60 // 速度

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了卫星", event)
  })

  var weixin = new mars3d.graphic.Satellite({
    name: "GAOFEN 1",
    tle1: "1 39150U 13018A   21180.50843864  .00000088  00000-0  19781-4 0  9997",
    tle2: "2 39150  97.8300 252.9072 0018449 344.7422  15.3253 14.76581022440650",
    model: {
      url: "//data.mars3d.cn/gltf/mars/weixin2.gltf",
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
    path: {
      show: true,
      color: "#00ff00",
      opacity: 0.5,
      width: 1
    }
  })
  graphicLayer.addGraphic(weixin)

  // 目标卫星
  var winxinMB = new mars3d.graphic.Satellite({
    name: "COSMOS 2251 DEB",
    tle1: "1 33916U 93036DV  21197.38574736  .00000034  00000-0  48020-4 0  9991",
    tle2: "2 33916  74.0517 160.4563 0330253 328.4241 153.7022 13.66391564618811",
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
    path: {
      show: true,
      color: "#00ff00",
      opacity: 0.5,
      width: 1
    }
  })
  graphicLayer.addGraphic(winxinMB)

  // 四棱椎体
  var rectSensor = new mars3d.graphic.RectSensor({
    position: new Cesium.CallbackProperty(function (time) {
      return weixin.position
    }, false),
    style: {
      angle1: 10,
      angle2: 10,
      color: "rgba(0,255,0,0.4)",
      outline: true,
      topShow: true,
      topSteps: 2,
      rayEllipsoid: true // 与地球求交
    }
  })
  graphicLayer.addGraphic(rectSensor)

  // 追踪目标
  rectSensor.lookAt = new Cesium.CallbackProperty(function (time) {
    return winxinMB.position
  }, false)
}
