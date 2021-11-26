var map
var rotateOut

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.850468, lng: 116.354027, alt: 722, heading: 87, pitch: -6 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  rotateOut = new mars3d.thing.RotateOut({
    direction: false, // 方向 true逆时针，false顺时针
    time: 60 // 给定飞行一周所需时间(单位 秒)，控制速度
  })
  map.addThing(rotateOut)

  // 开启旋转
  rotateOut.start()
}
function startRotate() {
  rotateOut.start()
}

function stopRotate() {
  rotateOut.stop()
}
