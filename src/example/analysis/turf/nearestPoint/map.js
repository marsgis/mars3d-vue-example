var map
var pointLayer
var graphicLayer

var pointStyle = {
  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  scale: 1,
  scaleByDistance: true,
  scaleByDistance_far: 20000,
  scaleByDistance_farValue: 0.7,
  scaleByDistance_near: 1000,
  scaleByDistance_nearValue: 1,
  clampToGround: true
}

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.967015, lng: 117.316406, alt: 9150, heading: 206, pitch: -42 },
      fxaa: true
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)



  pointLayer = new mars3d.layer.GeoJsonLayer({
    name: "体育设施点",
    url: "//data.mars3d.cn/file/geojson/hfty-point.json",
    symbol: {
      styleOptions: {
        ...pointStyle,
        image: "img/marker/mark3.png"
      }
    },
    popup: "{项目名称}",
    zIndex: 10
  })
  map.addLayer(pointLayer)

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer({
    zIndex: 20
  })
  map.addLayer(graphicLayer)

  // 地球点击事件
  map.on(mars3d.EventType.click, (e) => {
    clickPoint(e.cartesian)
  })
}

function clickPoint(position) {
  if (pointLayer.length === 0) {
    globalMsg("正在加载数据,请稍等......")
    return
  }

  graphicLayer.clear()

  // 生成查询点
  var queryPoint = new mars3d.graphic.BillboardEntity({
    position: position,
    style: {
      ...pointStyle,
      image: "img/marker/start.png"
    },
    popup: "查询点"
  })
  graphicLayer.addGraphic(queryPoint)

  // turf分析
  var targetPoint = queryPoint.toGeoJSON()
  var points = pointLayer.toGeoJSON()
  var nearest = turf.nearestPoint(targetPoint, points)
  if (!nearest) { return }

  const nearestPoint = mars3d.Util.geoJsonToGraphics(nearest)[0]

  // 连线
  const polyline = new mars3d.graphic.PolylineEntity({
    positions: [position, nearestPoint.position],
    style: {
      width: 5,
      clampToGround: true,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.LineFlow, {
        color: "rgba(89,249,255,0.8)",
        image: "img/textures/LineDataTrans.png",
        speed: 8
      })
    }
  })
  graphicLayer.addGraphic(polyline)

  // 终点
  var endPoint = new mars3d.graphic.CircleEntity({
    position: nearestPoint.position,
    style: {
      radius: polyline.distance / 10,
      height: 40,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.CircleWave, {
        color: "#00ffff",
        count: 2,
        speed: 20
      })
    },
    popup: "最近的体育场所是:<br />" + nearestPoint.attr["项目名称"]
  })
  graphicLayer.addGraphic(endPoint)
  endPoint.openPopup()
}

function clearAll() {
  graphicLayer.clear()
}
