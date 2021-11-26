var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.852379, lng: 117.278594, alt: 25115, heading: 2, pitch: -89 }
    },
    control: {
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      infoBox: false,
      vrButton: false,
      geocoder: false,
      fullscreenButton: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  const toolButton = new mars3d.control.Geolocation({
    insertIndex: 1 // 插入的位置顺序, 1是home按钮后面
  })
  map.addControl(toolButton)

  // 手动调用，开始定位
  toolButton.startTracking()
}
