var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 14.132213, lng: 107.948167, alt: 14854603, heading: 2, pitch: -89 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 经纬网
  var tileLayer = new mars3d.layer.GraticuleLayer({
    // lineStyle: {
    //   color: '#ffff00',
    // },
    // labelStyle: {
    //   color: '#ffff00',
    // },
  })
  map.addLayer(tileLayer)
}
