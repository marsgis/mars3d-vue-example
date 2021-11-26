var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: -24.347273, lng: 140.716348, alt: 5849790, heading: 337, pitch: -64 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建mapv图层
  createMapvLayer()
}

function createMapvLayer() {
  // 构造数据
  var positions = []
  var geojson = []
  var randomCount = 300
  while (randomCount--) {
    // 取区域内的随机点
    var point = [random(113 * 1000, 119 * 1000) / 1000, random(28 * 1000, 35 * 1000) / 1000]
    positions.push(Cesium.Cartesian3.fromDegrees(point[0], point[1]))

    geojson.push({
      geometry: {
        type: "Point",
        coordinates: point
      },
      count: 30 * Math.random()
    })
  }
  map.camera.flyTo({
    destination: Cesium.Rectangle.fromCartesianArray(positions)
  })

  // mapv图层参数
  var options = {
    fillStyle: "rgba(55, 50, 250, 0.8)",
    shadowColor: "rgba(255, 250, 50, 1)",
    shadowBlur: 20,
    max: 100,
    size: 50,
    label: {
      show: true,
      fillStyle: "white"
    },
    globalAlpha: 0.5,
    gradient: {
      0.25: "rgb(0,0,255)",
      0.55: "rgb(0,255,0)",
      0.85: "yellow",
      1.0: "rgb(255,0,0)"
    },
    draw: "honeycomb"
  }
  var dataSet = new this.mapv.DataSet(geojson)

  // 创建MapV图层
  var mapVLayer = new mars3d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
