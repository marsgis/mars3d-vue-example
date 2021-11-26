var map
var cameraHistory
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  cameraHistory = new mars3d.thing.CameraHistory({
    limit: {
      // 限定视角范围
      position: Cesium.Cartesian3.fromDegrees(117.27462, 31.864196, 34.85),
      radius: 5000.0,
      debugExtent: true
    },
    maxCacheCount: 999
  })
  map.addThing(cameraHistory)

  cameraHistory.on(mars3d.EventType.change, function (event) {
    // 触发自定义事件
    const count = event.count
    eventTarget.fire("changeCamera", { count })
  })
}

// 是否开启限定范围
function chkUnderground(val) {
  cameraHistory.debugExtent = val
}
