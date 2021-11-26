var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 53.285266, lng: 142.68078, alt: 17309707, heading: 45, pitch: -83 },
      mapMode2D: Cesium.MapMode2D.ROTATE, // 二三维场景切换黑影
      clock: {
        currentTime: "2021-01-01T12:08:20Z",
        multiplier: 60 // 速度
      },
      cameraController: {
        maximumZoomDistance: 9000000000,
        constrainedAxis: false // 解除在南北极区域鼠标操作限制
      }
    },
    control: {
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: false, // 是否显示时间线控件
      infoBox: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      sceneModePicker: true,
      geocoder: false, // 查询
      navigationHelpButton: false, // 提示
      compass: { top: "10px", left: "5px" }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0]
  toolbar.style.bottom = "110px"

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  var property = getDynamicProperty() // 取数据

  // 视锥体 展示
  var conicSensor = new mars3d.graphic.ConicSensor({
    position: property,
    style: {
      angle: 15,
      length: 2500000,
      color: "rgba(255,0,0,0.4)",
      outlineColor: "rgba(255,255,255,0.9)"
    }
  })
  graphicLayer.addGraphic(conicSensor)
}

function getDynamicProperty() {
  // 该数据是由后端计算返回的轨道信息
  var wxkjx = [
    {
      time: "2021-01-01T12:08:20Z",
      x: -143.774623333805,
      y: 27.7998266828718,
      z: 1118477.29262629
    },
    {
      time: "2021-01-01T12:11:40Z",
      x: -146.56364947549,
      y: 38.8612791867078,
      z: 1121731.48352323
    },
    {
      time: "2021-01-01T12:15:00Z",
      x: -150.074587947037,
      y: 49.8538696199919,
      z: 1125266.75027392
    },
    {
      time: "2021-01-01T12:18:20Z",
      x: -155.164247872234,
      y: 60.7243205344318,
      z: 1128555.88185048
    },
    {
      time: "2021-01-01T12:21:40Z",
      x: -164.565295557077,
      y: 71.3021698947674,
      z: 1131111.78312013
    },
    {
      time: "2021-01-01T12:25:00Z",
      x: 168.08311253827,
      y: 80.6216347342535,
      z: 1132558.81749868
    }
  ]

  var property = new Cesium.SampledPositionProperty()
  for (var z = 0; z < wxkjx.length; z++) {
    var item = wxkjx[z]

    var thisTime = Cesium.JulianDate.fromIso8601(item.time)
    var position = Cesium.Cartesian3.fromDegrees(item.x, item.y, item.z)

    // 添加每一个链接点的信息，到达的时间以及坐标位置
    property.addSample(thisTime, position)
  }
  property.setInterpolationOptions({
    interpolationDegree: 2,
    interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
  })

  return property
}
