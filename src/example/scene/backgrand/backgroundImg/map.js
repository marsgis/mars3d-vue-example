var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 36.873519, lng: 106.863496, alt: 19999205, heading: 354, pitch: -89 },
      orderIndependentTranslucency: false,
      contextOptions: { webgl: { alpha: true } }, // 允许透明
      showSun: false,
      showMoon: false,
      showSkyBox: false,
      showSkyAtmosphere: false,
      fog: false,
      globe: {
        baseColor: "rgba(0,0,0,0)",
        showGroundAtmosphere: false,
        enableLighting: false
      }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

}

function show() {
  var dom = mars3d.DomUtil.get("mars3dContainer")
  dom.style.backgroundImage = "none"
}
function show1() {
  var dom = mars3d.DomUtil.get("mars3dContainer")
  dom.style.backgroundImage = "url(/img/tietu/backGroundImg.jpg)"
}
function show2() {
  var dom = mars3d.DomUtil.get("mars3dContainer")
  dom.style.backgroundImage = "url(//data.mars3d.cn/file/img/world/world.jpg)"
}
function show3() {
  var dom = mars3d.DomUtil.get("mars3dContainer")
  dom.style.backgroundImage = "url(/img/tietu/bg4.jpg)"
}
