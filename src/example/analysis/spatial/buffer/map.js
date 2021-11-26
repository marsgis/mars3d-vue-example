var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  graphicLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(graphicLayer)

  graphicLayer.on(mars3d.EventType.drawCreated, function (e) {
    updateBuffer(e.graphic)
  })
  graphicLayer.on(mars3d.EventType.editMovePoint, function (e) {
    updateBuffer(e.graphic)
  })
}

function drawPoint() {
  deleteAll()

  graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 12,
      color: "#ffff00"
    }
  })
}

function drawPolyline() {
  deleteAll()

  graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#ffff00",
      width: 3,
      clampToGround: true
    }
  })
}

function drawPolygon() {
  deleteAll()

  graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      outline: true,
      outlineColor: "#f0ce22",
      outlineWidth: 4,
      opacity: 0.5,
      clampToGround: true
    }
  })
}

function deleteAll() {
  graphicLayer.clear()
  map.graphicLayer.clear()
  lastgeojson = null
}

let width
function radiusChange(val) {
  width = val * 1000 // km
  if (lastgeojson) {
    updateBuffer()
  }
}

let lastgeojson
function updateBuffer(graphic) {
  let buffere
  try {
    const geojson = graphic ? graphic.toGeoJSON() : lastgeojson
    geojson.properties = {}

    buffere = mars3d.PolyUtil.buffer(geojson, width)

    lastgeojson = geojson
  } catch (e) {
    console.log("缓冲分析异常", e)
  }
  if (!buffere) {
    return
  }

  const graphicsOptions = mars3d.Util.geoJsonToGraphics(buffere, {
    type: "polygon",
    style: {
      color: "rgba(255,0,0,0.4)",
      clampToGround: true
    }
  })

  map.graphicLayer.clear()
  map.graphicLayer.addGraphic(graphicsOptions)
}
