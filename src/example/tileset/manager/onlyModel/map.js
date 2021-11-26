
var map
let tiles3dLayer

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
      backgroundColor: "#363635", // 天空背景色
      globe: {
        baseColor: "#363635", // 地球地面背景色
        showGroundAtmosphere: false,
        enableLighting: false
      },
      cameraController: {
        zoomFactor: 1.5,
        minimumZoomDistance: 0.1,
        maximumZoomDistance: 200000
      }
    },
    layers: [
      {
        name: "网格线",
        type: "grid",
        color: "#ffffff",
        alpha: 0.03,
        cells: 2,
        show: true
      }
    ]
  })
  delete mapOptions.control
  delete mapOptions.terrain
  delete mapOptions.basemaps

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
}

function changeColor(color) {
  var clr = Cesium.Color.fromCssColorString(color)
  map.scene.backgroundColor = clr // 空间背景色
  map.scene.globe.baseColor = clr // 地表背景色

  // map.setSceneOptions({
  //   backgroundColor: color, //天空背景色
  //   globe: {
  //     baseColor: color, //地球地面背景色
  //   },
  // })

  document.getElementById("body").css("background", color)
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
