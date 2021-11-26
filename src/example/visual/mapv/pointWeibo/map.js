var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 29.808307, lng: 110.597446, alt: 7852846, heading: 353, pitch: -86 }
    }
  })
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  queryWeiboApiData()
    .then(function (json) {
      // 创建Mapv
      createMapvLayer(json)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

function queryWeiboApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/weibo.json" })
}
function createMapvLayer(rs) {
  var data1 = []
  var data2 = []
  var data3 = []
  for (let i = 0; i < rs[0].length; i++) {
    const geoCoord = rs[0][i].geoCoord
    data1.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      }
    })
  }

  for (let i = 0; i < rs[1].length; i++) {
    const geoCoord = rs[1][i].geoCoord
    data2.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      },
      time: Math.random() * 10
    })
  }

  for (let i = 0; i < rs[2].length; i++) {
    const geoCoord = rs[2][i].geoCoord
    data3.push({
      geometry: {
        type: "Point",
        coordinates: geoCoord
      }
    })
  }

  var animation = {
    animation: {
      stepsRange: {
        start: 0,
        end: 10
      },
      trails: 1,
      duration: 6
    }
  }
  addMapvLayer(data1, "rgba(200, 200, 0, 0.8)", 0.7)
  addMapvLayer(data2, "rgba(255, 250, 0, 0.8)", 0.7)
  addMapvLayer(data3, "rgba(255, 250, 250, 0.6)", 0.7)
  addMapvLayer(data2, "rgba(255, 250, 250, 0.9)", 1.1, animation)
}

function addMapvLayer(data, color, size, animation) {
  var options1 = {
    fillStyle: color,
    bigData: "Point",
    size: size,
    draw: "simple",
    depthTest: false,
    ...animation
  }
  var dataSet = new this.mapv.DataSet(data)
  // 创建MapV图层
  var mapVLayer = new mars3d.layer.MapVLayer(options1, dataSet)
  map.addLayer(mapVLayer)
}
