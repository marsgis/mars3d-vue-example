var map
var graphicLayer
var pointAndLine

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.871794, lng: 116.800468, alt: 57020, heading: 0, pitch: -90 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)



  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  //  点、线矢量数据图层
  pointAndLine = new mars3d.layer.GraphicLayer()
  map.addLayer(pointAndLine)
}
// 绘制障碍面
function drawPolygon() {
  clearLayer()
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#00ffff",
      opacity: 0.4,
      outline: true,
      outlineWidth: 1,
      outlineColor: "#ffffff"
    }
  })
}
// 绘制起点
function startPoint() {
  pointAndLine.clear()
  pointAndLine.startDraw({
    type: "point",
    style: {
      pixelSize: 10,
      color: "red",
      label: {
        text: "起点",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
    }
  })
}

// 绘制终点
function endPoint() {
  pointAndLine.startDraw({
    type: "point",
    style: {
      pixelSize: 10,
      color: "red",
      label: {
        text: "终点",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
    }
  })
}

// 计算最短路径
function shortestPath() {
  const polygonLayer = graphicLayer.getGraphics()
  const allPoint = pointAndLine.getGraphics()

  if (polygonLayer.length < 1) {
    globalMsg("请绘制面")
    return
  }

  if (allPoint.length < 2) {
    globalMsg("请绘起点和终点")
    return
  }
  var polygon = polygonLayer[0].toGeoJSON() // 障碍面
  var startPoint = allPoint[0].toGeoJSON() // 起点
  var endPoint = allPoint[1].toGeoJSON() // 终点

  var options = {
    obstacles: polygon
  }
  var path = turf.shortestPath(startPoint, endPoint, options)

  var positions = path.geometry.coordinates
  const polyonLine = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      color: " #55ff33"
    }
  })
  pointAndLine.addGraphic(polyonLine)
}

function clearLayer() {
  graphicLayer.clear()
  pointAndLine.clear()
}
