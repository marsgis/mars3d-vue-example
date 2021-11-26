var map
var arrView = []
var addView

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 27.765308, lng: 116.057297, alt: 267, heading: 5, pitch: -48 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)


}

// 飞向视角
function flytoView(center) {
  map.centerAt(center)
}


