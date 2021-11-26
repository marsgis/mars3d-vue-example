var map
var rotatePoint

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.851782, lng: 116.350493, alt: 7944, heading: 348, pitch: -31 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)




  rotatePoint = new mars3d.thing.RotatePoint({
    direction: false, // 方向 true逆时针，false顺时针
    time: 50 // 给定飞行一周所需时间(单位 秒)，控制速度
    // autoStopAngle: 360, //到达指定角度后自动停止
  })
  map.addThing(rotatePoint)

  // 开启旋转
  rotatePoint.start()
}

function startRotate() {
   // 获取当前视角
   var point = map.getCenter()
   rotatePoint.start(point) // 可以传指定的中心点坐标
}

function stopRotate() {
  rotatePoint.stop()
}
