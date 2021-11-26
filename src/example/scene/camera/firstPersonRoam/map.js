var map
var firstPersonRoam

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 30.929546, lng: 116.172289, alt: 559, heading: 168, pitch: -11 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  firstPersonRoam = new mars3d.thing.FirstPersonRoam()
  map.addThing(firstPersonRoam)

  firstPersonRoam.startAutoForward()
}
// 是否开启漫游
function chkOpen(value) {
  firstPersonRoam.enabled = value
}
// 开始自动漫游
function startAuto() {
  firstPersonRoam.startAutoForward()
}
// 停止自动漫游
function stopAuto() {
  firstPersonRoam.stopAutoForward()
}
