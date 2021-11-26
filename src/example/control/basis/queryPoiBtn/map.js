var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.805875, lng: 117.237115, alt: 11874, heading: 1, pitch: -69 }
    },
    control: {
      geocoder: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // eslint-disable-next-line no-undef
  const poiQueryButton = new PoiQueryButton({
    insertIndex: 0 // 插入的位置顺序
  })
  map.addControl(poiQueryButton)
}
