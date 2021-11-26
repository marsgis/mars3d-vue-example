var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: -7.606383, lng: 119.069383, alt: 10521145, heading: 0, pitch: -82 },
      cameraController: {
        zoomFactor: 3.0,
        minimumZoomDistance: 1000,
        maximumZoomDistance: 300000000,
        constrainedAxis: false // 解除在南北极区域鼠标操作限制
      },
      clock: {
        multiplier: 5 // 速度
      }
    },
    control: {
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件,
      compass: { top: "10px", left: "5px" }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0]
  toolbar.style.bottom = "110px"

  // 移除2.5D视图
  // var arr = $(".cesium-sceneModePicker-wrapper").children()
  // if (arr.length > 3) {
  //   arr[3].remove()
  // }

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  globalMsg("非实际卫星轨道，随机模拟的坐标，只是为了演示追踪！")

  //= ==========================================================
  // 取数据
  var property = getDynamicProperty(function (timeInterval) {
    graphic.entity.availability = new Cesium.TimeIntervalCollection([new Cesium.TimeInterval(timeInterval)])
  })

  var times = property._property._times
  var startTime = times[0].clone()
  var stopTime = times[times.length - 1].clone()

  var graphic = new mars3d.graphic.PathEntity({
    availability: new Cesium.TimeIntervalCollection([
      new Cesium.TimeInterval({
        start: startTime,
        stop: stopTime
      })
    ]),
    position: property, // 点集
    orientation: new Cesium.VelocityOrientationProperty(property),
    style: {
      leadTime: 0,
      trailTime: 2800,
      resolution: 1,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineGlow, {
        glowPower: 0.1,
        color: Cesium.Color.YELLOW
      }),
      width: 10
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 150
    }
  })
  graphicLayer.addGraphic(graphic)

  //= ==========================================================

  // 视锥体 展示
  var satelliteSensor = new mars3d.graphic.SatelliteSensor({
    position: property,
    autoHeading: true, // 是否自动角度，根据监听的卫星模型
    style: {
      sensorType: mars3d.graphic.SatelliteSensor.Type.Rect,
      angle1: 20,
      angle2: 10,
      heading: 0,
      pitch: 0,
      roll: 0,
      color: "rgba(110,245,0,0.5)"
    }
  })
  graphicLayer.addGraphic(satelliteSensor)

  satelliteSensor.trackedEntity = graphic // 本身跟随卫星

  // 地面站 展示
  var localStart = Cesium.Cartesian3.fromDegrees(109.51856, 18.258736, 2)
  var conicSensor = new mars3d.graphic.ConicSensor({
    position: localStart,
    style: {
      angle: 5, // 雷达最小扫描仰角
      length: 2500000,
      color: Cesium.Color.fromBytes(255, 0, 0, 85)
    }
  })
  graphicLayer.addGraphic(conicSensor)

  conicSensor.lookAt = property // 追踪卫星

  // 测试连接线
  const testLine = new mars3d.graphic.PolylineEntity({
    positions: new Cesium.CallbackProperty(function (time) {
      var localEnd = conicSensor.rayPosition
      if (!localEnd) {
        return []
      }
      return [localStart, localEnd]
    }, false),
    style: {
      arcType: Cesium.ArcType.NONE,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineDash, {
        color: "#ff0000"
      }),
      width: 1
    }
  })
  graphicLayer.addGraphic(testLine)
}

// 构造模拟数据，实际项目应改为服务读取返回
function getDynamicProperty(callback) {
  var arr = dataWork.getTestData(Cesium.JulianDate.toIso8601(map.clock.currentTime), 2 * 60)

  var property = new Cesium.SampledPositionProperty()
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]

    var thisTime = Cesium.JulianDate.fromIso8601(item.time)
    var position = Cesium.Cartesian3.fromDegrees(item.x, item.y, item.z)

    // 添加每一个链接点的信息，到达的时间以及坐标位置
    property.addSample(thisTime, position)
  }

  var times = property._property._times
  var startTime = times[0].clone()
  var stopTime = times[times.length - 1].clone()

  var allTimes = Cesium.JulianDate.secondsDifference(stopTime, map.clock.currentTime) * 0.3 // 判断剩下多少时长时加载下一步数据
  var loading = false
  map.on(mars3d.EventType.clockTick, function (clock) {
    var sxTimes = Cesium.JulianDate.secondsDifference(stopTime, map.clock.currentTime) // 剩下时长

    if (!loading && sxTimes < allTimes) {
      loading = true
      var arr = dataWork.getTestData(Cesium.JulianDate.toIso8601(stopTime), 2 * 60)

      // console.log('new loading……');
      for (var i = 1; i < arr.length; i++) {
        var item = arr[i]

        var thisTime = Cesium.JulianDate.fromIso8601(item.time)
        var position = Cesium.Cartesian3.fromDegrees(item.x, item.y, item.z)

        // console.log(JSON.stringify(item));

        // 添加每一个链接点的信息，到达的时间以及坐标位置
        property.addSample(thisTime, position)
      }

      var times = property._property._times
      stopTime = times[times.length - 1].clone()

      loading = false
      if (callback) {
        // eslint-disable-next-line standard/no-callback-literal
        callback({ start: startTime, stop: stopTime })
      }
    }
  })

  return property
}

// 模拟数据生产类
var dataWork = {
  thisPoint: {
    x: 100.245989,
    y: 0,
    z: 1000000
  },
  // data开始时间，seconds 秒数
  getTestData: function (date, seconds) {
    var startTime = Cesium.JulianDate.fromIso8601(date) // 飞行开始时间

    var arr = []

    var thisTime
    for (var i = 0; i <= seconds; i += 5) {
      thisTime = Cesium.JulianDate.addSeconds(startTime, i, new Cesium.JulianDate())

      // 生成随机的坐标
      this.thisPoint.x += i * 0.01
      this.thisPoint.y += i * 0.01

      arr.push({
        time: Cesium.JulianDate.toIso8601(thisTime),
        x: this.thisPoint.x,
        y: this.thisPoint.y,
        z: this.thisPoint.z
      })
    }
    return arr
  }
}
