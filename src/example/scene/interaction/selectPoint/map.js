
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.728284, lng: 117.274164, alt: 25061, heading: 358, pitch: -69 },
      fxaa: true
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
}


var pointEntity
function updateMarker(hasCenter, jd, wd, alt) {
  var position = [jd, wd, alt]

  if (pointEntity == null) {
    pointEntity = new mars3d.graphic.PointEntity({
      position: position,
      style: {
        color: "#3388ff",
        pixelSize: 10,
        outlineColor: "#ffffff",
        outlineWidth: 2
      }
    })
    map.graphicLayer.addGraphic(pointEntity)
  } else {
    pointEntity.position = position
  }

  if (hasCenter) {
    pointEntity.flyTo({ radius: 1000 })
  }
}
