var map
var roamLine
var roamLineData = {}
var changeLineData = {}
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.859616, lng: 116.296235, alt: 445, heading: 258, pitch: -29 }
    },
    control: {
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件
      compass: { bottom: "355px", left: "5px" }
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

  // 该数据可以从 基础项目 飞行漫游功能界面操作后保存JSON
  var flydata = {
    name: "飞机航线",
    speed: 100,
    showStop: true,
    positions: [
      [116.295754, 30.859525, 418.5],
      [116.295699, 30.859754, 419.1],
      [116.295759, 30.860242, 422.2],
      [116.296109, 30.861108, 425.6],
      [116.296669, 30.862062, 428.8],
      [116.297105, 30.862978, 431.7],
      [116.297429, 30.863782, 432.2],
      [116.297829, 30.864648, 432.6],
      [116.298229, 30.865548, 432.7],
      [116.298639, 30.86646, 433.2],
      [116.299029, 30.867376, 433.8],
      [116.299369, 30.868276, 434.9],
      [116.299615, 30.869388, 438.5],
      [116.300039, 30.870338, 442.5],
      [116.300469, 30.871318, 445.5],
      [116.300904, 30.872262, 449.4],
      [116.301324, 30.873121, 454.2],
      [116.301599, 30.873975, 458.7],
      [116.301689, 30.875131, 463.9],
      [116.301579, 30.876368, 468.8],
      [116.301229, 30.877428, 473.7],
      [116.300774, 30.878442, 479.1],
      [116.300239, 30.879461, 486.1],
      [116.299729, 30.880532, 493.5],
      [116.299264, 30.881518, 500.9],
      [116.298709, 30.882543, 510],
      [116.284909, 30.885183, 1133.1],
      [116.283389, 30.884496, 1137.1],
      [116.282189, 30.883573, 1144.7],
      [116.281149, 30.882568, 1156.7],
      [116.280359, 30.881538, 1169.8],
      [116.279799, 30.880498, 1181.2],
      [116.279349, 30.879354, 1193.9],
      [116.279239, 30.878175, 1204.7],
      [116.279199, 30.877008, 1217.5],
      [116.278985, 30.875825, 1219.3],
      [116.278719, 30.874704, 1229.2],
      [116.278504, 30.873662, 1244],
      [116.278319, 30.872651, 1259.5],
      [116.278159, 30.871621, 1276.4],
      [116.278009, 30.870608, 1288.9],
      [116.277859, 30.869592, 1299.4],
      [116.277719, 30.868562, 1307.6],
      [116.277579, 30.867551, 1318.2],
      [116.277479, 30.866533, 1324.5],
      [116.277375, 30.865503, 1333.4],
      [116.277249, 30.864495, 1342.3],
      [116.277109, 30.863481, 1348.5],
      [116.276925, 30.862451, 1355.5],
      [116.276689, 30.861432, 1362.3],
      [116.276329, 30.860395, 1369.9],
      [116.275779, 30.859358, 1377.1],
      [116.274999, 30.858373, 1386.1],
      [116.274169, 30.857366, 1395.2],
      [116.273239, 30.856492, 1402.7],
      [116.272034, 30.855893, 1407.4],
      [116.270639, 30.855432, 1415.9],
      [116.269143, 30.855142, 1422.6],
      [116.267639, 30.85497, 1429.6],
      [116.266053, 30.855134, 1434.4],
      [116.264344, 30.855382, 1437.1],
      [116.262739, 30.855813, 1434.6],
      [116.261124, 30.856393, 1432.8],
      [116.259589, 30.856968, 1434.4],
      [116.258065, 30.857548, 1436.9],
      [116.258949, 30.864934, 1272.7],
      [116.259889, 30.865938, 1266.5],
      [116.260995, 30.866778, 1262],
      [116.262219, 30.867478, 1257.4],
      [116.263369, 30.868178, 1259.1],
      [116.264535, 30.868852, 1259.3],
      [116.265729, 30.86955, 1257.7],
      [116.266959, 30.870248, 1253.8],
      [116.268204, 30.870984, 1248.4],
      [116.269429, 30.871701, 1242.8],
      [116.270623, 30.872398, 1241.4],
      [116.271799, 30.873088, 1241.6],
      [116.272973, 30.873792, 1240.8],
      [116.274099, 30.874505, 1240.5],
      [116.275159, 30.875291, 1238.8],
      [116.276079, 30.876208, 1236.6],
      [116.276833, 30.877313, 1232.6],
      [116.277469, 30.878473, 1230.4],
      [116.278023, 30.879636, 1227.8],
      [116.278519, 30.880798, 1225.7],
      [116.279009, 30.881963, 1223.5],
      [116.279519, 30.883118, 1223.2],
      [116.280029, 30.884288, 1223.1],
      [116.280589, 30.885453, 1222.1],
      [116.281199, 30.886541, 1222.2],
      [116.281959, 30.887563, 1221.3],
      [116.282883, 30.88852, 1221.2],
      [116.283883, 30.889444, 1221.5],
      [116.284949, 30.89026, 1221.2]
    ],
    model: {
      show: true,
      url: "//data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
      scale: 1,
      minimumPixelSize: 100
    },
    path: {
      show: true,
      color: "#ffff00",
      opacity: 0.5,
      width: 1,
      isAll: false
    },
    shadow: [
      {
        show: true,
        type: "wall",
        surface: true
      }
    ],
    camera: {
      type: "gs",
      heading: 30,
      radius: 500
    },
    // "clockLoop": true,      //是否循环播放
    clockRange: Cesium.ClockRange.CLAMPED // CLAMPED 到达终止时间后停止
  }

  roamLine = new mars3d.graphic.RoamLine(flydata)
  graphicLayer.addGraphic(roamLine)

  initUI()

  if (map.viewer.timeline) {
    map.viewer.timeline.zoomTo(roamLine.startTime, roamLine.stopTime)
  }

  // 显示基本信息，名称、总长、总时间
  showAllInfo({
    name: roamLine.name,
    alllen: roamLine.alllen,
    alltime: roamLine.alltimes
  })

  eventTarget.fire("loadOK")
  roamLine.on(mars3d.EventType.change, (event) => {
    // 面板显示相关信息
    showRealTimeInfo(event, roamLine.alltimes)
    eventTarget.fire("roamLineChange")
  })
}

function initUI() {
  const data = roamLine.options.camera

  changeLineData.select = data.type
  changeLineData.followedX = data.followedX
  changeLineData.followedZ = data.followedZ
  changeLineData.offsetZ = data.offsetZ || 0
  changeLineData.offsetY = data.offsetY || 0
  changeLineData.offsetX = data.offsetX || 0
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

function updateModel(isAuto, val) {
  var pitch = val.slidePitchStep
  var roll = val.slideRollStep

  roamLine.updateAngle(isAuto, {
    pitch: pitch,
    roll: roll
  })
}

// 改变视角模式
function updateCameraSetting(data) {
  var cameraType = data.select
  var followedX = data.followedX
  var followedZ = data.followedZ
  var offsetZ = data.offsetZ
  var offsetY = data.offsetY
  var offsetX = data.offsetX

  roamLine.setCameraOptions({
    type: cameraType,
    radius: cameraType == "gs" ? followedX : 0,
    followedX: followedX,
    followedZ: followedZ,
    offsetZ: offsetZ,
    offsetY: offsetY,
    offsetX: offsetX
  })
}

// 显示基本信息，名称、总长、总时间
var _alltime = 100

function showAllInfo(params) {
  _alltime = params.alltime

  // 显示基本信息，名称、总长、总时间
  roamLineData.td_alltimes = formatTime(roamLine.alltimes)
  roamLineData.td_alllength = mars3d.MeasureUtil.formatDistance(roamLine.alllen)
}
