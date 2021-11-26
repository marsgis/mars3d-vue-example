var map
var eventTarget
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 33.588378, lng: 119.031749, alt: 172, heading: 3, pitch: -23 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  eventTarget = new mars3d.BaseClass()

  // 三维模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
    position: { alt: 80.6 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tilesetLayer)
}

// 查看场景出图
function showMapImg() {
  map.expImage({
    download: false,
    callback: function (base64, size) {
      // 回调
      eventTarget.fire("loadOk", { base64 })
    }
  })
}

// 下载场景出图
function downLoad() {
  map.expImage()
}
// 下载场景缩略图
function downLoad2() {
  map.expImage({
    height: 300, // 指定 高度 或 宽度(指定1种就行，对应的自动缩放)
    download: true
  })
}
