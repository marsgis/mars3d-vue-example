var map
var lineLayer
var pointLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.855058, lng: 117.312337, alt: 79936, heading: 0, pitch: -90 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 添加线 矢量数据图层
  lineLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(lineLayer)

  lineLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        const graphic = e.graphic
        if (graphic) {
          graphic.remove()
          pointLayer.clear()
        }
      }
    }
  ])

  // 添加相交点 矢量数据图层
  pointLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(pointLayer)
}

function drawLine() {
  // 开始绘制
  lineLayer.startDraw({
    type: "polyline",
    style: {
      color: getColor(),
      width: 3,
      clampToGround: true
    }
  })
}

function crossPoint() {
  lineLayer.stopDraw()
  pointLayer.clear()

  if (lineLayer.length <= 1) {
    globalMsg("请至少绘制两条线")
    return
  }

  const geojson = lineLayer.toGeoJSON()
  const allCount = geojson.features.length

  for (let i = 0; i < allCount; i++) {
    const line1 = geojson.features[i]

    for (let j = i + 1; j < allCount; j++) {
      const line2 = geojson.features[j]

      // 计算相交点
      const intersects = turf.lineIntersect(line1, line2)

      if (intersects.features.length > 0) {
        const intersectsPointGrahic = mars3d.Util.geoJsonToGraphics(intersects.features, {
          style: {
            color: "#0000ff",
            pixelSize: 8,
            outlineColor: "#ffffff",
            outlineWidth: 2,
            clampToGround: true
          }
        })
        pointLayer.addGraphic(intersectsPointGrahic)
      }
    }
  }
}

function clearAll() {
  pointLayer.clear()
  lineLayer.clear()
}

// 颜色
var index = 0
var colors = ["#99CCCC", "#66FF66", "#FF6666", "#00CCFF", "#00FF33", "#CC0000", "#CC00CC", "#CCFF00", "#00FF"]
function getColor() {
  var i = index++ % colors.length
  return colors[i]
}
