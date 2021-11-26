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

  // 创建mapv图层
  createMapvLayer()
}
function createMapvLayer() {
  // var randomCount = 500;

  var nodeData = {
    0: {
      x: 108.154518,
      y: 36.643346
    },
    1: {
      x: 121.485124,
      y: 31.235317
    }
  }

  var edgeData = [
    {
      source: "1",
      target: "0"
    }
  ]

  var citys = [
    "北京",
    "天津",
    "上海",
    "重庆",
    "石家庄",
    "太原",
    "呼和浩特",
    "哈尔滨",
    "长春",
    "沈阳",
    "济南",
    "南京",
    "合肥",
    "杭州",
    "南昌",
    "福州",
    "郑州",
    "武汉",
    "长沙",
    "广州",
    "南宁",
    "西安",
    "银川",
    "兰州",
    "西宁",
    "乌鲁木齐",
    "成都",
    "贵阳",
    "昆明",
    "拉萨",
    "海口"
  ]

  // 自定义数据
  for (let i = 1; i < 500; i++) {
    var cityCenter = this.mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
    nodeData[i] = {
      x: cityCenter.lng - 5 + Math.random() * 10,
      y: cityCenter.lat - 5 + Math.random() * 10
    }
    edgeData.push({
      source: ~~(i * Math.random()),
      target: "0"
    })
  }

  var fbundling = this.mapv.utilForceEdgeBundling().nodes(nodeData).edges(edgeData)

  var results = fbundling()

  var data = []
  var timeData = []

  for (var i = 0; i < results.length; i++) {
    var line = results[i]
    var coordinates = []
    for (var j = 0; j < line.length; j++) {
      coordinates.push([line[j].x, line[j].y])
      timeData.push({
        geometry: {
          type: "Point",
          coordinates: [line[j].x, line[j].y]
        },
        count: 1,
        time: j
      })
    }
    data.push({
      geometry: {
        type: "LineString",
        coordinates: coordinates
      }
    })
  }

  var options1 = {
    strokeStyle: "rgba(55, 50, 250, 0.3)",
    globalCompositeOperation: "lighter",
    shadowColor: "rgba(55, 50, 250, 0.5)",
    shadowBlur: 10,
    lineWidth: 1.0,
    draw: "simple"
  }
  var dataSet1 = new this.mapv.DataSet(data)
  // 创建MapV图层
  var mapVLayer1 = new mars3d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer1)

  var options2 = {
    fillStyle: "rgba(255, 250, 250, 0.9)",
    globalCompositeOperation: "lighter",
    size: 1.5,
    animation: {
      type: "time",
      stepsRange: {
        start: 0,
        end: 100
      },
      trails: 1,
      duration: 5
    },
    draw: "simple"
  }
  var dataSet2 = new this.mapv.DataSet(timeData)
  // 创建MapV图层
  var mapVLayer2 = new mars3d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer2)
}
