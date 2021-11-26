var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    control: {
      homeButton: true, // 回到默认视域按钮
      navigationHelpButton: false, // 是否显示帮助信息控件
      fullscreenButton: false, // 右下角全屏按钮
      geocoder: false,
      sceneModePicker: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  var zoom = new mars3d.control.Zoom({
    insertIndex: 1, // 插入的位置顺序
    zoomInIcon: "img/icon/zoom-in.svg",
    zoomOutIcon: "img/icon/zoom-out.svg"
  })
  map.addControl(zoom)
}
