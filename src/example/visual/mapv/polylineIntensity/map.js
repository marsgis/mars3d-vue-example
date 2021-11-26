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
  var randomCount = 1000
  var data = []
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
  while (randomCount--) {
    var cityCenter1 = this.mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
    var cityCenter2 = this.mapv.utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)])
    data.push({
      geometry: {
        type: "LineString",
        coordinates: [
          [cityCenter1.lng - 1 + Math.random() * 1, cityCenter1.lat - 1 + Math.random() * 1],
          [cityCenter2.lng - 1 + Math.random() * 1, cityCenter2.lat - 1 + Math.random() * 1]
        ]
      },
      count: 30 * Math.random()
    })
  }

  var options = {
    gradient: {
      0: "blue",
      0.5: "yellow",
      1: "red"
    },
    lineWidth: 0.5,
    max: 30,
    draw: "intensity"
  }
  var dataSet = new this.mapv.DataSet(data)
  // 创建MapV图层
  var mapVLayer = new mars3d.layer.MapVLayer(options, dataSet)
  map.addLayer(mapVLayer)
}
