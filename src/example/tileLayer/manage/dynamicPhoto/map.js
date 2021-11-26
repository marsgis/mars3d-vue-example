var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 28.118943, lng: 114.834765, alt: 4038547, heading: 351, pitch: -83 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  var urlArr = [
    "//data.mars3d.cn/file/img/radar/201906211112.PNG",
    "//data.mars3d.cn/file/img/radar/201906211124.PNG",
    "//data.mars3d.cn/file/img/radar/201906211130.PNG",
    "//data.mars3d.cn/file/img/radar/201906211136.PNG",
    "//data.mars3d.cn/file/img/radar/201906211142.PNG"
  ]

  start(urlArr, 1)
}

var step = 0
var arrTileLayer

function start(urlArr, time) {
  var arr = []
  // 获取图层
  for (var i = 0, len = urlArr.length; i < len; i++) {
    var tileLayer = new mars3d.layer.ImageLayer({
      url: urlArr[i],
      rectangle: { xmin: 73.16895, xmax: 134.86816, ymin: 12.2023, ymax: 54.11485 },
      alpha: 0
    })
    map.addLayer(tileLayer)
    arr.push(tileLayer)
  }

  arrTileLayer = arr
  step = 0
  changeRadarAlpha(time)
}

let idxTimer
const alphaStep = 0.01

function changeRadarAlpha(time) {
  if (step > arrTileLayer.length - 1) {
    step = 0
    arrTileLayer[arrTileLayer.length - 1].alpha = 0
  }
  var layer1 = arrTileLayer[step]
  var layer2 = arrTileLayer[step + 1]
  if (!layer1 || !layer2) {
    return
  }
  layer1.alpha = 1
  layer2.alpha = 0

  clearInterval(idxTimer)
  idxTimer = window.setInterval(function () {
    layer1.alpha -= alphaStep
    layer2.alpha += alphaStep

    if (layer1.alpha < alphaStep) {
      layer1.alpha = 0
      step++
      changeRadarAlpha(time)
    }
  }, time * 1000 * alphaStep)
}
