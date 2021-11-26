
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.801072, lng: 117.208356, alt: 1250, heading: 35, pitch: -17 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 切换到蓝色底图

  var tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    marsJzwStyle: true, // 打开建筑物特效（内置Shader代码）
    center: { lat: 31.801072, lng: 117.208356, alt: 1250, heading: 35, pitch: -17 },
    popup: "all"
  })
  map.addLayer(tilesetLayer)

  // 创建Graphic图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  var arrData = []
  for (var j = 0; j < 100; ++j) {
    var startPt = randomPoint()

    const endPt = startPt.clone()
    endPt.alt = random(1000, 2000)

    arrData.push({
      positions: [startPt, endPt],
      style: {
        width: 1,
        material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlowColor, {
          color: "rgb(141,172,172)",
          speed: random(10, 20),
          percent: 0.1,
          alpha: 0.01
        })
      }
    })
  }

  // 多个线对象的合并渲染。
  var primitive = new mars3d.graphic.PolylineCombine({
    instances: arrData
  })
  graphicLayer.addGraphic(primitive)
}
// 取区域内的随机图标
function randomPoint() {
  var jd = random(117.208056 * 1000, 117.25548 * 1000) / 1000
  var wd = random(31.816617 * 1000, 31.855756 * 1000) / 1000
  return new mars3d.LatLngPoint(jd, wd, 100)
}

// 取随机数字
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
