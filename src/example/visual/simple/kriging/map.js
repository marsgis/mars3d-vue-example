
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 24.018309, lng: 109.414236, alt: 8607884, heading: 356, pitch: -82 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  queryTemperatureData()
  .then(function (geojson) {
    // kriging_bounds, kriging_colors在js/temperature_data.js中定义
    // eslint-disable-next-line no-undef
    var image = loadkriging(geojson.features, kriging_bounds, kriging_colors)
    var tileLayer = new mars3d.layer.ImageLayer({
      url: image,
      rectangle: {
        xmin: 73.4766,
        xmax: 135.088,
        ymin: 18.1055,
        ymax: 53.5693
      },
      alpha: 0.4
    })
    map.addLayer(tileLayer)
  })
  .otherwise(function(error) {
    console.log(error)
  })
}

// 数据获取
function queryTemperatureData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/temperature.json" })
}

// 根据 克里金法 插值绘制图片
function loadkriging(tempture, bounds, colors) {
  // var canvas = document.createElement("canvas")
  var canvas = mars3d.DomUtil.create("canvas")
  canvas.width = 2000
  canvas.height = 2000

  var t = []
  var x = []
  var y = []
  for (var i = 0, len = tempture.length; i < len; i++) {
    t.push(tempture[i].properties.Temperatur) // 权重值
    x.push(tempture[i].geometry.coordinates[0]) // x
    y.push(tempture[i].geometry.coordinates[1]) // y
  }
  // 1.用克里金训练一个variogram对象
  // eslint-disable-next-line no-undef
  var variogram = kriging.train(t, x, y, "exponential", 0, 100)

  // 2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
  // bounds:普通的geojson格式的面的格式的coordinates。
  // eslint-disable-next-line no-undef
  var grid = kriging.grid(bounds, variogram, 0.05)
  // 3.将得到的格网预测值渲染到canvas画布上
  // eslint-disable-next-line no-undef
  kriging.plot(canvas, grid, [73.4766, 135.088], [18.1055, 53.5693], colors)

  var image = canvas.toDataURL("image/png")
  return image
}
