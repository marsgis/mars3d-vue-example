
var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.794428, lng: 117.235343, alt: 2351.9, heading: 1.6, pitch: -28.8, roll: 0 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 蓝色底图



  // 加载城市模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    center: { lat: 31.805004, lng: 117.222617, alt: 1457.4, heading: 1.6, pitch: -30.5, roll: 0 },
    popup: "all"
  })
  map.addLayer(tilesetLayer)

  // 视角切换（分步执行）
  map.setCameraViewList([
    { lat: 31.813938, lng: 117.240085, alt: 3243, heading: 357, pitch: -52 },
    { lat: 31.821728, lng: 117.253605, alt: 1702, heading: 319, pitch: -37 },
    { lat: 31.836674, lng: 117.260762, alt: 1779, heading: 269, pitch: -37 }
  ])

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 测试点数据，实际开发时换掉
  var arrPoints = getRandomPoints(1000)

  // 热力图 图层
  var heatLayer = new mars3d.layer.HeatLayer({
    positions: arrPoints,
    // 以下为热力图本身的样式参数，可参阅api：https://www.patrick-wied.at/static/heatmapjs/docs.html
    heatStyle: {
      radius: 60,
      blur: 0.85
    },
    // 以下为矩形矢量对象的样式参数
    style: {
      arc: true, // 是否为曲面
      height: 200.0
    }
    // flyTo: true,
  })
  map.addLayer(heatLayer)

  // 显示地面对应的点，测试渲染结果的正确性
  for (var i = 0; i < arrPoints.length; i++) {
    var item = arrPoints[i]

    var primitive = new mars3d.graphic.PointPrimitive({
      position: [item.lng, item.lat, 90],
      style: {
        color: "#ffff00",
        pixelSize: 7
      }
    })
    graphicLayer.addGraphic(primitive)
  }
  graphicLayer.show = false
}

// 显示对应的数据点
function chkUnderground(val) {
  graphicLayer.show = val
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
