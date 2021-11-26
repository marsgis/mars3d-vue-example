var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.255881, lng: 117.271026, alt: 60133, heading: 360, pitch: -46 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)


}

var turfOptions = { units: "kilometers" }
const bbox = [116.984788, 31.625909, 117.484068, 32.021504]

// 蜂窝网格
function hexGrid(cellSide) {
  var geojson = turf.hexGrid(bbox, cellSide, turfOptions)
  drawPolyon(geojson)
}

// 点网格
function pointGrid(cellSide) {
  var geojson = turf.pointGrid(bbox, cellSide, turfOptions)
  drawPoint(geojson)
}

// 正方形网格
function squareGrid(cellSide) {
  var geojson = turf.squareGrid(bbox, cellSide, turfOptions)
  drawPolyon(geojson)
}
// 三角形网格
function triangleGrid(cellSide) {
  var geojson = turf.triangleGrid(bbox, cellSide, turfOptions)
  drawPolyon(geojson)
}

// 蜂窝网格、正方形网格、三角形网格
function drawPolyon(geojson) {
  graphicLayer.clear()
  const polygons = mars3d.Util.geoJsonToGraphics(geojson) // 解析geojson

  for (var i = 0; i < polygons.length; i++) {
    var item = polygons[i]

    const graphic = new mars3d.graphic.PolygonEntity({
      positions: item.positions,
      style: {
        color: "#ffff00",
        opacity: 0.2,
        outline: true,
        outlineWidth: 2,
        outlineColor: "#ffff00",
        outlineOpacity: 0.5,
        clampToGround: true
      },
      attr: item.attr,
      popup: "第" + i + "个"
    })
    graphicLayer.addGraphic(graphic)
  }
}

// 点网格
function drawPoint(geojson) {
  graphicLayer.clear()

  const points = mars3d.Util.geoJsonToGraphics(geojson) // 解析geojson

  for (var i = 0; i < points.length; i++) {
    var item = points[i]

    const graphic = new mars3d.graphic.PointPrimitive({
      position: item.position,
      style: {
        color: "#ffff00",
        pixelSize: 8
      },
      popup: "第" + i + "个"
    })
    graphicLayer.addGraphic(graphic)
  }
}
