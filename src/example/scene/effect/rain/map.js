var map
var rainEffect
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.789209, lng: 117.214049, alt: 603, heading: 10, pitch: -11 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 大气层外光圈
  map.scene.skyAtmosphere.hueShift = -0.8
  map.scene.skyAtmosphere.saturationShift = -0.7
  map.scene.skyAtmosphere.brightnessShift = -0.33
  // 雾化效果
  map.scene.fog.density = 0.001
  map.scene.fog.minimumBrightness = 0.8

  // 雨效果
  rainEffect = new mars3d.effect.RainEffect({
    speed: 10,
    size: 20,
    direction: -30
  })
  map.addEffect(rainEffect)
}
// 是否开启特效
function chkShowEffect(val) {
  rainEffect.enabled = val
}
// 粒子速度
function rainSpeed(value) {
  rainEffect.speed = value
}

// 粒子大小
function rainSize(value) {
  rainEffect.size = value
}
// 粒子方向
function rainDirection(value) {
  rainEffect.direction = value
}
