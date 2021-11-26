var map
var graphicLayer
var polygonsLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.771917, lng: 117.373238, alt: 34263, heading: 336, pitch: -69 },
      fxaa: true
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  polygonsLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(polygonsLayer)

  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [117.271662, 31.870639, 21.49],
      [117.290605, 31.871517, 19.47],
      [117.302056, 31.858145, 16.27],
      [117.299439, 31.847545, 14.77],
      [117.267705, 31.8491, 22.11]
    ],
    style: {
      color: "#3388ff",
      opacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 绘制面
function drawPolygon() {
  graphicLayer.clear()
  polygonsLayer.clear()

  // 开始绘制
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: getColor(),
      opacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
}

// 旋转面
function spinPolygons(angle) {
  polygonsLayer.clear()
  graphicLayer.endDraw()

  const graphic = graphicLayer.getGraphics()[0]
  const poly = graphic.toGeoJSON({ closure: true })

  var centerPoint = mars3d.LatLngPoint.fromCartesian(graphic.center).toArray() // 围绕执行旋转的点

  // truf旋转操作
  var rotatedPoly = turf.transformRotate(poly, angle, { pivot: centerPoint })

  const spinGraphic = mars3d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      color: "#ff0000",
      opacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
  polygonsLayer.addGraphic(spinGraphic)
}

// 平移面
function translationPolygons(offset) {
  polygonsLayer.clear()
  graphicLayer.endDraw()

  const graphic = graphicLayer.getGraphics()[0]
  const poly = graphic.toGeoJSON({ closure: true })

  // truf平移操作
  var rotatedPoly = turf.transformTranslate(poly, offset, 10)

  const spinGraphic = mars3d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      color: "#ff0000",
      opacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
  polygonsLayer.addGraphic(spinGraphic)
}

// 缩放面
function zoomPolygons(scale) {
  polygonsLayer.clear()
  graphicLayer.endDraw()

  if (scale === 0) {
    return
  }

  const graphic = graphicLayer.getGraphics()[0]
  const poly = graphic.toGeoJSON({ closure: true })

  // truf缩放操作
  var rotatedPoly = turf.transformScale(poly, scale)

  const spinGraphic = mars3d.Util.geoJsonToGraphics(rotatedPoly, {
    style: {
      color: "#ff0000",
      opacity: 0.5,
      outline: true,
      outlineWidth: 2,
      outlineColor: "#ffffff"
    }
  })
  polygonsLayer.addGraphic(spinGraphic)
}

// 颜色
var index = 0
var colors = ["#99CCCC", "#66FF66", "#FF6666", "#00CCFF", "#00FF33", "#CC0000", "#CC00CC", "#CCFF00", "#0000FF"]
function getColor() {
  var i = index++ % colors.length
  return colors[i]
}
