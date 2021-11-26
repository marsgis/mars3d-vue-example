
var map
var linePositions
var graphicPath

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 20.803452, lng: 116.629014, alt: 1734203, heading: 3, pitch: -57 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建矢量数据图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 半球
  var graphicQiu = new mars3d.graphic.EllipsoidEntity({
    position: new mars3d.LatLngPoint(117.276726, 31.864175, -10000.0),
    style: {
      radii: new Cesium.Cartesian3(200000.0, 200000.0, 200000.0),
      maximumConeDegree: 90,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.EllipsoidWave, {
        color: "#ff0000",
        speed: 5.0
      }),
      outline: false
    }
  })
  graphicLayer.addGraphic(graphicQiu)

  // 计算圆圈线
  linePositions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: Cesium.Cartesian3.fromDegrees(117.276726, 31.864175),
    radius: 500000,
    count: 60 // 共返回count*4个点
  })
  linePositions = mars3d.PointUtil.setPositionsHeight(linePositions, 100000)
  linePositions.push(linePositions[0]) // 闭合圆

  // 圆圈线
  // let graphicLine = new mars3d.graphic.PolylineEntity({
  //   positions: linePositions,
  //   style: {
  //     width: 8,
  //     material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.PolylineGlow, {
  //       glowPower: 0.2,
  //       color: Cesium.Color.GREEN,
  //     }),
  //   },
  // });
  // graphicLayer.addGraphic(graphicLine);

  // 飞机path路径
  var property = new Cesium.SampledPositionProperty()
  var start = map.clock.currentTime
  var alltimes = 0
  for (var i = 0, len = linePositions.length; i < len; i++) {
    alltimes += 1
    const time = Cesium.JulianDate.addSeconds(start, alltimes, new Cesium.JulianDate())
    property.addSample(time, linePositions[i])
  }
  const stop = Cesium.JulianDate.addSeconds(start, alltimes, new Cesium.JulianDate())

  // This is where it becomes a smooth path.
  property.setInterpolationOptions({
    interpolationDegree: 5,
    interpolationAlgorithm: Cesium.LagrangePolynomialApproximation
  })

  graphicPath = new mars3d.graphic.PathEntity({
    position: property,
    orientation: new Cesium.VelocityOrientationProperty(property),
    style: {
      width: 2,
      color: "#ffff00",
      opacity: 0.9
    },
    label: {
      text: "火星1号",
      font_size: 19,
      font_family: "楷体",
      color: Cesium.Color.AZURE,
      outline: true,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(10, -25) // 偏移量
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
      scale: 0.1,
      minimumPixelSize: 90
    }
  })
  graphicLayer.addGraphic(graphicPath)

  // Make sure viewer is at the desired time.
  map.clock.startTime = start.clone()
  map.clock.stopTime = stop.clone()
  map.clock.currentTime = start.clone()
  map.clock.clockRange = Cesium.ClockRange.LOOP_STOP // 到达终止时间后循环
  map.clock.multiplier = 1
  map.clock.shouldAnimate = true
}
function viewSeeTop() {
  // 顶视图
  map.trackedEntity = undefined
  map.flyToPositions(linePositions, { pitch: -90 })
}
function viewSeeCe() {
  // 侧视图
    map.trackedEntity = graphicPath.entity
    graphicPath.flyToPoint({
      radius: 50000,
      heading: 0
    })
}
function viewSeeHome() {
  // 主视图
  map.trackedEntity = graphicPath.entity
  graphicPath.flyToPoint({
    radius: 50000,
    heading: 90
  })
}
