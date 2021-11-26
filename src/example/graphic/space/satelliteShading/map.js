var map
var graphicLayer
var weixinData = {}

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 6.148021, lng: 58.982029, alt: 42278441, heading: 220, pitch: -85 },
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
  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.bindPopup(function (event) {
    var points = event.graphic?.attr?.points
    if (!points) {
      return
    }
    // 单击轨迹连线上的点后，求该点对应的时间
    var positionDM = event.cartesian
    var val1 = points[0]
    var val2 = points[points.length - 1]

    var startTime = Cesium.JulianDate.toDate(val1.time)
    var endTime = Cesium.JulianDate.toDate(val2.time)

    var len1 = Math.abs(Cesium.Cartesian3.distance(positionDM, val1.position))
    var len2 = Math.abs(Cesium.Cartesian3.distance(positionDM, val2.position))

    var adds = (len1 / (len1 + len2)) * (endTime.getTime() - startTime.getTime()) // 求按距离比例的时间增加值
    var currentTime = new Date(startTime.getTime() + adds)

    var inthtml = "单击处时间：" + currentTime.format("yyyy-MM-dd HH:mm:ss")
    return inthtml
  })
  var weixin = new mars3d.graphic.Satellite({
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
      show: true
    },
    path: {
      show: true,
      color: "#00ff00",
      opacity: 0.5,
      width: 1
    }
  })
  map.graphicLayer.addGraphic(weixin)

  setTimeout(() => {
    weixin.flyTo({
      radius: 900000, // 距离目标点的距离
      pitch: -60 // 相机方向
    })
  }, 1000)

  var now = Cesium.JulianDate.toDate(map.clock.currentTime)
  weixinData.startTime = mars3d.Util.formatDate(now, "yyyy-MM-dd HH:mm:ss")

  now.setMinutes(now.getMinutes() + 60)
  weixinData.endTime = mars3d.Util.formatDate(now, "yyyy-MM-dd HH:mm:ss")
}

function btnAdd(data, bt, et) {
  const weixin = map.graphicLayer.getGraphicByAttr("name", "GAOFEN 1")
  var _starttime = bt
  var _endTime = et
  var _color = data.areaColor
  var _opacity = data.slideOpacity
  var _angle = data.slideAngle

  addTimeShading(weixin, {
    startTime: _starttime,
    endTime: _endTime,
    color: _color,
    opacity: _opacity,
    angle: _angle
  })
}
function btnRemoveAll() {
  graphicLayer.clear()
}
function changeColorOpacity(data) {
  graphicLayer.eachGraphic(function (graphic) {
    graphic.setColorStyle({ color: data.areaColor, opacity: data.slideOpacity })
  })
}
function changeAngle(val) {
  const weixin = map.graphicLayer.getGraphicByAttr("name", "GAOFEN 1")
  if (val) {
    weixin.angle1 = val
  }
}
function changeGuidaoS(valS) {
  updateVisibleForFaceNouth(true, valS)
}
function changeGuidaoJ(valJ) {
  updateVisibleForFaceNouth(false, valJ)
}

// options参数包含：startTime开始时间，endTime结束时间，angle张开角度，color颜色，opacity透明度
function addTimeShading(weixin, options) {
  graphicLayer.clear()

  const bt = new Date(options.startTime).getTime()
  const et = new Date(options.endTime).getTime()

  console.log(bt, et)

  if (bt >= et) {
    globalMsg("开始时间需要小于结束时间。")
    return
  }

  var step = 2 * 60000

  var points = []
  var positions = []

  var temp_t = bt
  while (temp_t <= et) {
    var point = weixin.tle.getPoint(temp_t)
    if (!point) {
      break
    }

    var ground_pos = Cesium.Cartesian3.fromDegrees(point.lng, point.lat)
    positions.push(ground_pos)

    var time = Cesium.JulianDate.fromDate(new Date(temp_t))
    points.push({
      position: ground_pos,
      time: time,
      height: point.alt
    })

    temp_t += step
  }

  if (positions.length < 2) {
    globalMsg("没有该时间段内的轨迹数据。")
    return
  }

  var clr = Cesium.Color.fromCssColorString(options.color || "#ff0000").withAlpha(Number(options.opacity || 1.0))
  clr = Cesium.ColorGeometryInstanceAttribute.fromColor(clr)

  var geometryInstancesSG = [] // 升轨
  var geometryInstancesJG = [] // 降轨
  for (var i = 1; i < positions.length; i++) {
    var position1 = positions[i - 1]
    var position2 = positions[i]

    var height = points[i].height // 也可以取position2的高度
    var shadingWidth = height * Math.tan(Cesium.Math.toRadians(options.angle)) * 2 // 根据卫星角度求其带宽度

    var instance = new Cesium.GeometryInstance({
      geometry: new Cesium.CorridorGeometry({
        vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
        positions: [position1, position2],
        width: shadingWidth,
        cornerType: Cesium.CornerType.MITERED // 指定转角处样式
      }),
      attributes: {
        color: clr
      }
    })
    // 重要：绑定相关属性
    instance.attr = {
      points: [points[i - 1], points[i]]
    }

    var hp = mars3d.PointUtil.getHeadingPitchRollForLine(position1, position2)

    if (hp.heading > 0) {
      geometryInstancesSG.push(instance)
    } else {
      geometryInstancesJG.push(instance)
    }
  }

  // 升轨
  if (geometryInstancesSG.length > 0) {
    var primitiveSG = new mars3d.graphic.BaseCombine({
      instances: geometryInstancesSG
    })
    primitiveSG.isFaceNouth = true
    graphicLayer.addGraphic(primitiveSG)
  }

  // 降轨
  if (geometryInstancesJG.length > 0) {
    var primitiveJG = new mars3d.graphic.BaseCombine({
      instances: geometryInstancesJG
    })
    primitiveJG.isFaceNouth = false
    graphicLayer.addGraphic(primitiveJG)
  }
}

// 升降轨类型筛选
function updateVisibleForFaceNouth(isFaceNouth, show) {
  graphicLayer.eachGraphic(function (graphic) {
    if (isFaceNouth && graphic.isFaceNouth) {
      graphic.show = show
    }
    if (!isFaceNouth && !graphic.isFaceNouth) {
      graphic.show = show
    }
  })
}
