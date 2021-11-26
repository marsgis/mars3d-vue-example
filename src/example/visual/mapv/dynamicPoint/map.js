var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 21.004037, lng: 107.525781, alt: 10103609, heading: 356, pitch: -83 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 蓝色底图

  queryWeibo2ApiData()
    .then(function (json) {
      // 创建Mapv
      createMapvLayer(json)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}
// 访问后端接口，取数据
function queryWeibo2ApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/weibo2.json" })
}
function createMapvLayer(rs) {
  var data = []
  for (var i = 0; i < rs[0].length; i++) {
    var geoCoord = rs[0][i].geoCoord
    data.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      },
      time: Math.random() * 10
    })
  }

  var options = {
    fillStyle: "rgba(255, 250, 50, 0.6)",
    // shadowColor: 'rgba(255, 250, 50, 0.5)',
    // shadowBlur: 3,
    updateCallback: function (time) {
      time = time.toFixed(2)
      // $('#time').html('时间' + time)
    },
    size: 3,
    draw: "simple",
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 10
      },
      trails: 1,
      duration: 6
    }
  }
  var dataSet = new this.mapv.DataSet(data)

  // 创建MapV图层
  var mapVLayer = new mars3d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
