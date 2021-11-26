var map
let tiles3dLayer
var eventTarget = new mars3d.BaseClass()

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 33.597401, lng: 119.031399, alt: 514, heading: 0, pitch: -46 },
      showSun: false,
      showMoon: false,
      showSkyBox: false,
      showSkyAtmosphere: false,
      fog: false,
      backgroundColor: "rgba(0,0,0,0)",
      orderIndependentTranslucency: false,
      contextOptions: { webgl: { alpha: true } }, // 允许透明
      globe: {
        show: false, // 不显示地球
        showGroundAtmosphere: false,
        enableLighting: false
      },
      cameraController: {
        zoomFactor: 1.5,
        minimumZoomDistance: 0.1,
        maximumZoomDistance: 200000
      }
    }
  })
  delete mapOptions.control
  delete mapOptions.terrain
  delete mapOptions.basemaps
  delete mapOptions.layers

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  const a = document.getElementsByClassName("mars3d-container")[0]
  a.style.backgroundImage = "url(/img/tietu/backGroundImg.jpg)"
  a.style.backgroundRepeat = "no-repeat"
  a.style.backgroundSize = "100%"
  eventTarget.fire("loadOk")
}

function removeLayer() {
  if (tiles3dLayer) {
    map.removeLayer(tiles3dLayer, true)
    tiles3dLayer = null
  }
}

// 当前页面业务相关
function showModel(_url) {
  removeLayer()
  if (!_url) {
    return
  }

  tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: _url,
    maximumScreenSpaceError: 1,
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  // 单击事件
  tiles3dLayer.on(mars3d.EventType.load, function (event) {
    console.log("模型加载完成", event)

    // 限定缩放级别
    map.scene.screenSpaceCameraController.maximumZoomDistance = tiles3dLayer.boundingSphere.radius * 5

    // 自动贴地处理
    tiles3dLayer.clampToGround(10)
  })
}

function flyTo() {
  tiles3dLayer.flyTo()
}
