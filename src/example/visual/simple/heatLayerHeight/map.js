var map
var heatLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.80232, lng: 117.206907, alt: 1996, heading: 39, pitch: -22 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 蓝色底图

  // 图层1
  var arrPoints = getRandomPoints(1000) // 测试点数据，实际开发时换掉
  showHeatMap(arrPoints, 300)

  // 图层2
  var arrPoints2 = getRandomPoints(1000) // 测试点数据，实际开发时换掉
  showHeatMap(arrPoints2, 800)
}

function showHeatMap(arrPoints, height) {
  // 热力图 图层
  heatLayer = new mars3d.layer.HeatLayer({
    positions: arrPoints,
    // 以下为热力图本身的样式参数，可参阅api：https://www.patrick-wied.at/static/heatmapjs/docs.html
    heatStyle: {
      radius: 40,
      blur: 0.85
    },
    // 以下为矩形矢量对象的样式参数
    style: {
      height: height
    }
  })
  map.addLayer(heatLayer)
}

// 更新数据
function btnUpdate() {
  heatLayer.positions = getRandomPoints(1000)
}

// 获取bbox矩形区域内的count个随机点
function getRandomPoints(count) {
  var xmin = 117.226189
  var xmax = 117.245831
  var ymin = 31.828858
  var ymax = 31.842967
  var arr = []
  var arrPoint = turf.randomPoint(count, { bbox: [xmin, ymin, xmax, ymax] }).features // 随机点
  for (var i = 0; i < arrPoint.length; i++) {
    var item = arrPoint[i].geometry.coordinates
    var val = Math.floor(Math.random() * 100) // 热力值
    arr.push({ lng: item[0], lat: item[1], value: val })
  }
  return arr
}
