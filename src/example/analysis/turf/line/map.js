var map
var graphicLayer
var lineLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.855058, lng: 117.312337, alt: 79936, heading: 0, pitch: -90 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)



  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 基础线矢量数据
  lineLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(lineLayer)
}

function drawLine() {
  clearLayer()

  lineLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3,
      clampToGround: false
    }
  })
}

// 计算曲线
function calculationCurve() {
  graphicLayer.clear()

  let line = lineLayer.getGraphics()
  if (line.length === 0) {
    globalMsg("请绘制线！")
    return
  }
  line = line[0].toGeoJSON()

  var curved = turf.bezierSpline(line)
  var positions = curved.geometry.coordinates

  var graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      width: 4,
      color: "#00ffff"
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 计算平行线
function parallelLines(distance) {
  let line = lineLayer.getGraphics()
  if (line.length === 0) {
    globalMsg("请绘制线！")
    return
  }
  line = line[0].toGeoJSON()

  graphicLayer.clear()

  var offsetLine = turf.lineOffset(line, distance, { units: "miles" })

  var positions = offsetLine.geometry.coordinates

  var graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      width: 4,
      color: "#ff0000"
    }
  })
  graphicLayer.addGraphic(graphic)
}

function clearLayer() {
  graphicLayer.clear()
  lineLayer.clear()
}
