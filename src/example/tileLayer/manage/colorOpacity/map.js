
var tileLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.601462, lng: 117.246888, alt: 56825, heading: 359, pitch: -69 }
    },
    control: {
      baseLayerPicker: false
    },
    basemaps: [],
    layers: [
      {
        name: "单张图片",
        icon: "img/basemaps/bingmap.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/world.jpg",
        show: true
      }
    ]
  })

  // 创建三维地球场景
  var map = new mars3d.Map("mars3dContainer", mapOptions)


  // The viewModel tracks the state of our mini application.
  var viewModel = {
    brightness: 1, // 亮度
    contrast: 1, // 对比度
    hue: 0.1, // 色彩
    saturation: 1, // 饱和度
    gamma: 0.2, // 伽马值
    opacity: 1 // 透明度
  }

  // 添加图层
  tileLayer = new mars3d.layer.GaodeLayer({
    layer: "vec",
    ...viewModel
  })
  map.addLayer(tileLayer)

  // // Convert the viewModel members into knockout observables.
  // Cesium.knockout.track(viewModel)
  // var toolbar = document.getElementById("toolbar")
  // Cesium.knockout.applyBindings(viewModel, toolbar)

  // // Make the active imagery layer a subscriber of the viewModel.
  // function subscribeLayerParameter(name) {
  //   Cesium.knockout.getObservable(viewModel, name).subscribe(function (newValue) {
  //     tileLayer[name] = newValue
  //   })
  // }
  // subscribeLayerParameter("brightness")
  // subscribeLayerParameter("contrast")
  // subscribeLayerParameter("hue")
  // subscribeLayerParameter("saturation")
  // subscribeLayerParameter("gamma")
  // subscribeLayerParameter("opacity")
}
function changeOpacity(name, val) {
  tileLayer[name] = val
}
