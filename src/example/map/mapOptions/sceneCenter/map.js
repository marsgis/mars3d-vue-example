var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 25.389914, lng: 119.084961, alt: 1179575, heading: 346, pitch: -60 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 2也可以通过下面方法获取center参数
  var center = map.getCameraView()
  console.log(JSON.stringify(center))

  // 可以通过centerAt切换视角
  map.setCameraView(center)
}

function changeView1() {
  map.setCameraView({ lat: 39.904128, lng: 116.391643, alt: 1054, heading: 356, pitch: -39 })
}

function changeView2() {
  map.setCameraView({ lat: 28.13059, lng: 86.835138, alt: 7627, heading: 148, pitch: -7 })
}
function changeView3() {
  map.setCameraView({ lat: 34.560392, lng: 110.052393, alt: 1724, heading: 171, pitch: -5 })
}
function changeView4() {
  map.setCameraView({ lat: 30.83463, lng: 115.86774, alt: 710, heading: 303, pitch: -7 })
}
