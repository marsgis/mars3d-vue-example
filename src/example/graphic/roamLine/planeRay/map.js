var map
var roamLine
var roamLineData = {}
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.344715, lng: 115.783073, alt: 10056, heading: 158, pitch: -55 },
      globe: {
        // depthTestAgainstTerrain: true,
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.hasTerrain = false

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 该数据可以从 基础项目 飞行漫游功能界面操作后保存JSON
  var flydata = {
    speed: 200,
    positions: [
      [115.833866, 31.311451, 4000],
      [115.785116, 31.293944, 4000],
      [115.748115, 31.266263, 4000],
      [115.711031, 31.216472, 4000]
    ],
    model: {
      url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
      scale: 0.01,
      minimumPixelSize: 100,
      show: true
    },
    path: {
      color: "#ffff00",
      width: 3,
      show: true
    },
    shadow: {
      type: "wall",
      show: true
    },
    camera: {
      type: "zy",
      followedX: 50,
      followedZ: 10
    },
    clockLoop: false,
    interpolation: false,
    showGroundHeight: true,
    clampToGround: false
  }

  roamLine = new mars3d.graphic.RoamLine(flydata)
  graphicLayer.addGraphic(roamLine)

  // 启动漫游
  roamLine.start()

  testShading()

  if (map.viewer.timeline) {
    map.viewer.timeline.zoomTo(roamLine.startTime, roamLine.stopTime)
  }

  // 显示基本信息，名称、总长、总时间
  roamLineData.td_alltimes = formatTime(roamLine.alltimes)
  roamLineData.td_alllength = mars3d.MeasureUtil.formatDistance(roamLine.alllen)

  roamLine.on(mars3d.EventType.change, (event) => {
    // 面板显示相关信息

    showRealTimeInfo(event, roamLine.alltimes)
    eventTarget.fire("roamLineChange")
  })

  eventTarget.fire("loadOk")
}

function updateModel(isAuto, val) {
  var pitch = val.slidePitchStep
  var roll = val.slideRollStep

  roamLine.updateAngle(isAuto, {
    pitch: pitch,
    roll: roll
  })
}

// 格式化时间
function formatTime(strtime) {
  strtime = Number(strtime) || 0

  if (strtime < 60) {
    return strtime.toFixed(0) + "秒"
  } else if (strtime >= 60 && strtime < 3600) {
    var miao = Math.floor(strtime % 60)
    return Math.floor(strtime / 60) + "分钟" + (miao != 0 ? miao + "秒" : "")
  } else {
    strtime = Math.floor(strtime / 60) // 秒转分钟
    return Math.floor(strtime / 60) + "小时" + Math.floor(strtime % 60) + "分钟"
  }
}

// 显示实时坐标和时间
function showRealTimeInfo(params, _alltime) {
  if (params == null) {
    return
  }

  var val = Math.ceil((params.time * 100) / _alltime)
  if (val < 1) {
    val = 1
  }
  if (val > 100) {
    val = 100
  }

  roamLineData.percent = val

  roamLineData.td_jd = params.lng
  roamLineData.td_wd = params.lat
  roamLineData.td_gd = mars3d.MeasureUtil.formatDistance(params.alt)

  roamLineData.td_times = formatTime(params.time)
  roamLineData.td_length = mars3d.MeasureUtil.formatDistance(params.len)

  if (params.hbgd) {
    roamLineData.td_dmhb = mars3d.MeasureUtil.formatDistance(params.hbgd)
  } else {
    roamLineData.td_dmhb = "未知"
  }

  if (params.ldgd) {
    roamLineData.td_ldgd = mars3d.MeasureUtil.formatDistance(params.ldgd)
  } else {
    roamLineData.td_ldgd = "未知"
  }
}

var groundLayer // 地面投影图层

function testShading() {
  // 卫星朝向的中线地面点
  const line1 = new mars3d.graphic.PolylineEntity({
    positions: new Cesium.CallbackProperty(function (time) {
      var pt1 = roamLine.position
      var pt2 = centerPosion
      if (!pt1 || !pt2) {
        return []
      }

      return [pt1, pt2]
    }, false),
    style: {
      width: 2,
      color: "#ff0000",
      arcType: Cesium.ArcType.NONE
    }
  })
  map.graphicLayer.addGraphic(line1)

  // 卫星边线2点
  const graphicTriangle = new mars3d.graphic.PolylineEntity({
    positions: new Cesium.CallbackProperty(function (time) {
      var positions = getFourShadingPosition({
        angle: 2.4,
        angle2: 1.4
      })
      return positions
    }, false),
    style: {
      width: 2,
      color: "#0000ff",
      clampToGround: true
    }
  })
  map.graphicLayer.addGraphic(graphicTriangle)

  // 创建矢量数据图层
  groundLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(groundLayer)

  setInterval(function () {
    if (!map.clock.shouldAnimate || !thisPositions) {
      return
    }
    addPolygon()
  }, 1500)
}

// 清除地面投影
function btnClear() {
  groundLayer.clear()
}

// 获取地面的四棱台投影面
var thisPositions
var centerPosion

function getFourShadingPosition(opts) {
  // 位置
  var pt1 = roamLine.position
  if (!pt1) {
    return
  }

  var ellipsoid = map.scene.globe.ellipsoid

  // 张角
  var angle1 = Cesium.Math.toRadians(opts.angle) / 2

  var heading = Cesium.Math.toRadians(Cesium.defaultValue(opts.heading, roamLine.heading))
  var pitch = Cesium.Math.toRadians(Cesium.defaultValue(opts.pitch, roamLine.pitch))
  var roll = Cesium.Math.toRadians(Cesium.defaultValue(opts.heading, roamLine.roll))

  // 张角
  var angle2 = Cesium.Math.toRadians(opts.angle2) / 2

  var ptLeft1 = mars3d.PointUtil.getRayEarthPosition(pt1, new Cesium.HeadingPitchRoll(heading, pitch + angle2, roll + angle1), true, ellipsoid)
  if (!ptLeft1) {
    return
  }

  var ptRight1 = mars3d.PointUtil.getRayEarthPosition(pt1, new Cesium.HeadingPitchRoll(heading, pitch + angle2, roll - angle1), true, ellipsoid)
  if (!ptRight1) {
    return
  }

  var ptRight2 = mars3d.PointUtil.getRayEarthPosition(pt1, new Cesium.HeadingPitchRoll(heading, pitch - angle2, roll - angle1), true, ellipsoid)
  if (!ptRight2) {
    return
  }

  var ptLeft2 = mars3d.PointUtil.getRayEarthPosition(pt1, new Cesium.HeadingPitchRoll(heading, pitch - angle2, roll + angle1), true, ellipsoid)
  if (!ptLeft2) {
    return
  }

  var ptLeft = Cesium.Cartesian3.midpoint(ptLeft1, ptLeft2, new Cesium.Cartesian3())
  var ptRight = Cesium.Cartesian3.midpoint(ptRight1, ptRight2, new Cesium.Cartesian3())
  thisPositions = [ptLeft, ptRight]

  centerPosion = Cesium.Cartesian3.midpoint(ptLeft, ptRight, new Cesium.Cartesian3())

  return [ptLeft1, ptRight1, ptRight2, ptLeft2, ptLeft1]
}

var lastPositions

function addPolygon() {
  if (lastPositions == null) {
    lastPositions = thisPositions
    return
  }
  var positions = [lastPositions[0], lastPositions[1], thisPositions[1], thisPositions[0]]
  lastPositions = thisPositions

  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: positions,
    style: {
      color: "#ff0000",
      opacity: 0.3
    }
  })
  groundLayer.addGraphic(primitive)

  if (groundLayer.length > 2000) {
    groundLayer.clear()
  }
}
