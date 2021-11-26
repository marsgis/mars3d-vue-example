
var map
var graphicLayer

var pathEntity = null

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 32.550222, lng: 117.366824, alt: 2696, heading: 273, pitch: -67 }
    },
    control: {
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true // 是否显示时间线控件
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/flypath.json" })
    .then(function (res) {
      console.log(res)
      initPath(res)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

// 添加事件
function viewAircraft() {
  map.trackedEntity = pathEntity.entity

    pathEntity.flyToPoint({
      radius: 500, // 距离目标点的距离
      heading: 40,
      pitch: -50,
      duration: 0.01
    })
}
function viewTopDown() {
  map.trackedEntity = undefined

  map.flyToPoint(pathEntity.positionShow, {
    radius: 2000,
    heading: -90,
    pitch: -89
  })
}
function viewSide() {
  map.trackedEntity = undefined

    map.flyToPoint(pathEntity.positionShow, {
      radius: 3000,
      heading: -90,
      pitch: -25
    })
}

function initPath(data) {
  var property = new Cesium.SampledPositionProperty()

  var start
  var stop
  for (var i = 0, len = data.length; i < len; i++) {
    var item = data[i]
    var lng = Number(item.x.toFixed(6)) // 经度
    var lat = Number(item.y.toFixed(6)) // 纬度
    var height = item.z // 高度
    var time = item.time // 时间

    var position = null
    if (lng && lat) {
      position = Cesium.Cartesian3.fromDegrees(lng, lat, height)
    }
    var juliaDate = null
    if (time) {
      juliaDate = Cesium.JulianDate.fromIso8601(time)
    }
    if (position && juliaDate) {
      property.addSample(juliaDate, position)
    }

    if (i == 0) {
      start = juliaDate
    } else if (i == len - 1) {
      stop = juliaDate
    }

    var primitive = new mars3d.graphic.PointPrimitive({
      position: position,
      style: {
        pixelSize: 4,
        color: "#cccccc"
      },
      popup: "编号:" + item.id + "<br/>时间:" + time
    })
    graphicLayer.addGraphic(primitive)
  }

  // 设置时钟属性
  map.clock.startTime = start.clone()
  map.clock.stopTime = stop.clone()
  map.clock.currentTime = start.clone()
  map.clock.clockRange = Cesium.ClockRange.LOOP_STOP
  map.clock.multiplier = 5

  if (map.viewer.timeline) {
    map.viewer.timeline.zoomTo(start, stop)
  }

  // 创建path对象
  pathEntity = new mars3d.graphic.PathEntity({
    position: property,
    orientation: new Cesium.VelocityOrientationProperty(property),
    style: {
      resolution: 1,
      leadTime: 0,
      trailTime: 3600,
      color: "#ff0000",
      width: 3
    },
    label: {
      text: "飞机1号",
      font_size: 19,
      font_family: "楷体",
      color: Cesium.Color.AZURE,
      outline: true,
      visibleDepth: false,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(10, -25) // 偏移量
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/wrj.glb",
      scale: 0.1,
      minimumPixelSize: 20
    },
    popup: "飞行1号"
  })
  graphicLayer.addGraphic(pathEntity)

  // 圆锥追踪体
  var coneTrack = new mars3d.graphic.ConeTrack({
    position: property,
    style: {
      length: 100,
      angle: 12, // 半场角度
      color: "#ff0000",
      opacity: 0.5
    }
  })
  graphicLayer.addGraphic(coneTrack)
}
