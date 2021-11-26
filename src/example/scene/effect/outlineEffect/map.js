var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.653633, lng: 117.075814, alt: 310, heading: 33, pitch: -29 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 加模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "石化工厂",
    url: "//data.mars3d.cn/3dtiles/max-shihua/tileset.json",
    position: { lng: 117.077158, lat: 31.659116, alt: 24.6 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  // 加矢量数据
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  var graphicBox = new mars3d.graphic.BoxEntity({
    position: Cesium.Cartesian3.fromDegrees(117.074033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      material: Cesium.Color.GREY
    }
  })
  graphicLayer.addGraphic(graphicBox)

  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: Cesium.Cartesian3.fromDegrees(117.074423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      material: Cesium.Color.GREY
    }
  })
  graphicLayer.addGraphic(graphic)

  var graphicModel = new mars3d.graphic.ModelEntity({
    name: "汽车",
    position: Cesium.Cartesian3.fromDegrees(117.078572, 31.663526, 27.7),
    style: {
      url: "//data.mars3d.cn/gltf/mars/qiche.gltf",
      scale: 1,
      minimumPixelSize: 50
    }
  })
  graphicLayer.addGraphic(graphicModel)

  /// ///////////////////////////////////////////////

  // 添加特效
  var outlineEffect = new mars3d.effect.OutlineEffect({
    color: "#FFFF00",
    width: 4,
    eventType: mars3d.EventType.click
  })
  map.addEffect(outlineEffect)
}
