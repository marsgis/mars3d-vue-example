var map
var graphicLayer
var pointLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.871794, lng: 116.800468, alt: 57020, heading: 90, pitch: -51 },
      fxaa: true
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 点矢量数据图层
  pointLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(pointLayer)
}

// 绘制线
function drawLine() {
  if (pointLayer) {
    pointLayer.clear()
  }
  graphicLayer.clear()

  graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3,
      clampToGround: true
    },
    success: function () {
      // 绘制成功之后回调
    }
  })
}

// 绘制点
function drawPoint() {
  pointLayer.clear()
  pointLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 10,
      color: "red"
    },
    success: function () {
      nearPoint()
    }
  })
}

// 最近点计算
function nearPoint() {
  const lineLayer = graphicLayer.getGraphics()
  const point = pointLayer.getGraphics()

  if (lineLayer.length < 1 || point.length < 1) {
    return
  }

  const line = lineLayer[0].toGeoJSON()
  const pt = point[0].toGeoJSON()

  const snapped = turf.nearestPointOnLine(line, pt, { units: "miles" })
  const position = snapped.geometry.coordinates

  // 最近点（图标点）
  const primitive = new mars3d.graphic.BillboardPrimitive({
    position: position,
    style: {
      image: "img/marker/mark3.png",
      scale: 1,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1),
      clampToGround: false
    },
    popup: "最近点"
  })
  pointLayer.addGraphic(primitive)
}

// 清除数据
function clearLayer() {
  graphicLayer.clear()
  pointLayer.clear()
}
