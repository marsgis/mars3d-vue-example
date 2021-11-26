var map
var fogEffect

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.251138, lng: 121.463588, alt: 1730, heading: 111, pitch: -25 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建gltf模型，
  const gltfLayer = new mars3d.layer.ModelLayer({
    name: "上海浦东",
    url: "//data.mars3d.cn/gltf/mars/shanghai/scene.gltf",
    style: { scale: 520, heading: 215 }, // style同标绘的model类型
    position: [121.507762, 31.233975, 200],
    center: { lat: 31.251138, lng: 121.463588, alt: 1729.97, heading: 110.7, pitch: -25, roll: 0.2 },
    flyTo: true
  })
  map.addLayer(gltfLayer)

  // 雾效果
  fogEffect = new mars3d.effect.FogEffect({
    maxHeight: 20000, // 大于此高度后不显示
    fogByDistance: new Cesium.Cartesian4(100, 0.0, 9000, 0.9),
    color: Cesium.Color.WHITE
  })
  map.addEffect(fogEffect)
}

// 是否开始雾效果
function bindShowEffect(val) {
  fogEffect.enabled = val
}
// 改变雾的颜色
function changeColor(color) {
  fogEffect.color = Cesium.Color.fromCssColorString(color)
}
// 修改近距离和远距离
function fogByDistanceX(val) {
  if (val > fogEffect.fogByDistance.z) {
    globalMsg("近距离不能大于远距离")
    return
  }
  fogEffect.fogByDistance.x = val
}
function fogByDistanceZ(val) {
  if (val < fogEffect.fogByDistance.x) {
    globalMsg("远距离 不能小于 近距离")
    return
  }
  fogEffect.fogByDistance.z = val
}
