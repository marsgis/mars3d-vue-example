
var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 20.772952, lng: 82.609338, alt: 22604251, heading: 360, pitch: -90 }
    }
  })
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


}

// 视图切换
function sceneMode(name) {
  var value = Number(name)
  setSceneOptions("sceneMode", value)
}

function setSceneOptions(name, value) {
  var options = {}
  options[name] = value
  map.setSceneOptions(options)
}

function setSceneGlobeOptions(name, value) {
  var options = { globe: {} }
  options.globe[name] = value
  map.setSceneOptions(options)
}

function setSceneCameraControllerOptions(name, value) {
  var options = { cameraController: {} }
  options.cameraController[name] = value
  map.setSceneOptions(options)
}
