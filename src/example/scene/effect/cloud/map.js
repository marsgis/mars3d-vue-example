var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 12.845055, lng: 112.931363, alt: 24286797, heading: 3, pitch: -90 },
      cameraController: {
        zoomFactor: 3.0,
        minimumZoomDistance: 1000,
        maximumZoomDistance: 300000000,
        constrainedAxis: false // 解除在南北极区域鼠标操作限制
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  var graphic = new mars3d.graphic.RectangleEntity({
    coordinates: Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
    style: {
      height: 6000,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.RectSlide, {
        image: "img/tietu/cloud.png",
        color: Cesium.Color.WHITE.withAlpha(0.6),
        speed: 0.5,
        pure: true
      }),
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(3000000, 100000000)
    }
  })
  map.graphicLayer.addGraphic(graphic)
}
