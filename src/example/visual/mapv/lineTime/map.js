var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.665038, lng: 117.26431, alt: 40054, heading: 360, pitch: -62 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 蓝色底图

  queryMapvLayerData()
    .then(function (data) {
      // 创建Mapv
      createMapvLayer(data.features)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

// 获取数据
function queryMapvLayerData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/hefei-road.json" })
}

// 创建mapv图层
function createMapvLayer(rs) {
  var timeData = []
  const arr = mars3d.Util.geoJsonToGraphics(rs) // 解析geojson
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]

    for (let j = 0; j < item.positions.length; j++) {
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: item.positions[j]
        },
        count: 1,
        time: j
      })
    }
  }

  var options1 = {
    strokeStyle: "rgba(53,57,255,0.5)",
    shadowColor: "rgba(53,57,255,0.2)",
    shadowBlur: 3,
    lineWidth: 3.0,
    draw: "simple",
    depthTest: false
  }
  var dataSet1 = new this.mapv.DataSet(rs)

  // 创建MapV图层  线图层
  var mapVLayer1 = new mars3d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer1)

  var options2 = {
    fillStyle: "rgba(255, 250, 250, 0.2)",
    globalCompositeOperation: "lighter",
    size: 1.5,
    animation: {
      stepsRange: {
        start: 0,
        end: 100
      },
      trails: 3,
      duration: 5
    },
    draw: "simple",
    depthTest: false
  }
  var dataSet2 = new this.mapv.DataSet(timeData)

  // 创建MapV图层  动态轨迹图层
  var mapVLayer2 = new mars3d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer2)
}
