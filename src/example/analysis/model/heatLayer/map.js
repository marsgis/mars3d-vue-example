var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.654436, lng: 117.083883, alt: 759, heading: 316, pitch: -50 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  var tilesetLayer = new mars3d.layer.TilesetLayer({
    name: "石化工厂",
    url: "//data.mars3d.cn/3dtiles/max-shihua/tileset.json",
    position: { lng: 117.077158, lat: 31.659116, alt: 24.6 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    center: {
      lat: 31.654436,
      lng: 117.083883,
      alt: 758.53,
      heading: 316.4,
      pitch: -50.1,
      roll: 359.8
    },
    popup: "all"
  })
  map.addLayer(tilesetLayer)

  // 测试点数据，实际开发时换掉
  var arrPoints = getRandomPoints(900)

  // 热力图 图层
  var heatLayer = new mars3d.layer.HeatLayer({
    positions: arrPoints,
    // 以下为热力图本身的样式参数，可参阅api：https://www.patrick-wied.at/static/heatmapjs/docs.html
    heatStyle: {
      radius: 40,
      blur: 0.8
    },
    // 以下为矩形矢量对象的样式参数
    style: {
      opacity: 0.6,
      classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
      clampToGround: true
    }
  })
  map.addLayer(heatLayer)
}

// 获取bbox矩形区域内的count个随机点
function getRandomPoints(count) {
  var xmin = 117.075718
  var xmax = 117.083508
  var ymin = 31.654645
  var ymax = 31.661744

  var arr = []
  var arrPoint = turf.randomPoint(count, { bbox: [xmin, ymin, xmax, ymax] }).features // 随机点
  for (var i = 0; i < arrPoint.length; i++) {
    var item = arrPoint[i].geometry.coordinates
    var val = Math.floor(Math.random() * 100) // 热力值

    arr.push({ lng: item[0], lat: item[1], value: val })
  }
  return arr
}
