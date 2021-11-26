var map
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 22.126801, lng: 119.173814, alt: 4100099, heading: 351, pitch: -74 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  queryMapvChinaData()
    .then(function (data) {
      createMapvLayer(data)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}
// 数据获取
function queryMapvChinaData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/mapvchina.json" })
}
// 创建mapv图层
function createMapvLayer(geojson) {
  var geojsonDataSet = this.mapv.geojson.getDataSet(geojson)

  var to = "北京"
  var qianxi = new this.mapv.DataSet([
    {
      from: "河北",
      count: 354551,
      to: to
    },
    {
      from: "天津",
      count: 97323,
      to: to
    },
    {
      from: "山东",
      count: 28664,
      to: to
    },
    {
      from: "山西",
      count: 16650,
      to: to
    },
    {
      from: "辽宁",
      count: 14379,
      to: to
    },
    {
      from: "河南",
      count: 10980,
      to: to
    },
    {
      from: "内蒙古自治区",
      count: 9603,
      to: to
    },
    {
      from: "江苏",
      count: 4536,
      to: to
    },
    {
      from: "上海",
      count: 3556,
      to: to
    },
    {
      from: "广东",
      count: 2600,
      to: to
    }
  ])

  var lineData = []
  var pointData = []
  var textData = []
  var timeData = []

  var citys = {}

  var qianxiData = qianxi.get()
  for (let i = 0; i < qianxiData.length; i++) {
    var fromCenter = this.mapv.utilCityCenter.getCenterByCityName(qianxiData[i].from)
    var toCenter = this.mapv.utilCityCenter.getCenterByCityName(qianxiData[i].to)
    if (!fromCenter || !toCenter) {
      continue
    }
    citys[qianxiData[i].from] = qianxiData[i].count
    citys[qianxiData[i].to] = 100
    pointData.push({
      geometry: {
        type: "Point",
        coordinates: [fromCenter.lng, fromCenter.lat]
      }
    })
    pointData.push({
      geometry: {
        type: "Point",
        coordinates: [toCenter.lng, toCenter.lat]
      }
    })
    textData.push({
      geometry: {
        type: "Point",
        coordinates: [fromCenter.lng, fromCenter.lat]
      },
      text: qianxiData[i].from
    })
    textData.push({
      geometry: {
        type: "Point",
        coordinates: [toCenter.lng, toCenter.lat]
      },
      text: qianxiData[i].to
    })

    var curve = this.mapv.utilCurve.getPoints([fromCenter, toCenter])

    for (let j = 0; j < curve.length; j++) {
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: curve[j]
        },
        count: 1,
        time: j
      })
    }

    lineData.push({
      geometry: {
        type: "LineString",
        coordinates: curve
        // coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
      },
      count: 30 * Math.random()
    })
  }

  var data = geojsonDataSet.get({
    filter: function (item) {
      if (!citys[item.name]) {
        return false
      }

      item.count = citys[item.name]
      return true
    }
  })
  geojsonDataSet = new this.mapv.DataSet(data)

  var geojsonOptions = {
    gradient: {
      0: "rgba(55, 50, 250, 0.4)",
      1: "rgba(55, 50, 250, 1)"
    },
    max: 354551,
    draw: "intensity",
    depthTest: false
  }

  // 创建MapV图层
  var mapVLayer = new mars3d.layer.MapVLayer(geojsonOptions, geojsonDataSet)
  map.addLayer(mapVLayer)

  var textDataSet = new this.mapv.DataSet(textData)
  var textOptions = {
    draw: "text",
    font: "14px Arial",
    fillStyle: "white",
    shadowColor: "yellow",
    shadowBlue: 10,
    zIndex: 11,
    shadowBlur: 10
  }
  // 创建MapV图层
  var textmapVLayer = new mars3d.layer.MapVLayer(textOptions, textDataSet)
  map.addLayer(textmapVLayer)

  var lineOptions = {
    strokeStyle: "rgba(255, 250, 50, 0.8)",
    shadowColor: "rgba(255, 250, 50, 1)",
    shadowBlur: 20,
    lineWidth: 2,
    zIndex: 100,
    draw: "simple"
  }
  var lineDataSet = new this.mapv.DataSet(lineData)
  // 创建MapV图层
  var linemapVLayer = new mars3d.layer.MapVLayer(lineOptions, lineDataSet)
  map.addLayer(linemapVLayer)

  var pointOptions = {
    fillStyle: "rgba(254,175,3,0.7)",
    shadowColor: "rgba(55, 50, 250, 0.5)",
    shadowBlur: 10,
    size: 5,
    zIndex: 10,
    draw: "simple"
  }
  var pointDataSet = new this.mapv.DataSet(pointData)
  // 创建MapV图层
  var pointmapVLayer = new mars3d.layer.MapVLayer(pointOptions, pointDataSet)
  map.addLayer(pointmapVLayer)

  var timeDataSet = new this.mapv.DataSet(timeData)
  var timeOptions = {
    fillStyle: "rgba(255, 250, 250, 0.5)",
    zIndex: 200,
    size: 2.5,
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 50
      },
      trails: 10,
      duration: 2
    },
    draw: "simple"
  }

  // 创建MapV图层
  var timemapVLayer = new mars3d.layer.MapVLayer(timeOptions, timeDataSet)
  map.addLayer(timemapVLayer)
}
