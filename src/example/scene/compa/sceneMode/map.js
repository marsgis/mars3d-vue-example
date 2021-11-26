var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      sceneMode: Cesium.SceneMode.SCENE3D,
      cameraController: {
        minimumZoomDistance: 1,
        maximumZoomDistance: 300000000
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)



  // 切换场景
  var lastCameraView
  // 切换场景前事件
  map.on(mars3d.EventType.morphStart, function (event) {
    lastCameraView = map.getCameraView()
  })
  // 切换场景后事件
  map.on(mars3d.EventType.morphComplete, function (event) {
    setTimeout(function () {
      map.setCameraView(lastCameraView)
    }, 100)
  })
}
// 切换为二维视图
function to2d() {
  map.scene.morphTo2D()
}
// 切换为三维视图
function to3d() {
  map.scene.morphTo3D()
}
// 切换为2.5D维视图
function toGLB() {
  map.scene.morphToColumbusView()
}
