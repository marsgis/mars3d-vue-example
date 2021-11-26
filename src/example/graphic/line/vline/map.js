
var map

function initMap(options) {
  // Echart图表 vline.js

  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 3.74685, lng: 103.588387, alt: 14532035, heading: 0, pitch: -86 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  map.basemap = 2017

  queryPopulationApiData()
    .then(function (data) {
      showData(data)
    })
    .otherwise(function (data) {
      console.log("ajax请求出错", data)
    })
}

// 访问后端接口，取数据
function queryPopulationApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/population.json" })
}

function showData(data) {
  const heightScale = 2000000

  for (let x = 0; x < 1; x++) {
    const series = data[x]
    const seriesName = series[0]
    const coordinates = series[1]

    // 创建Graphic图层
    const graphicLayer = new mars3d.layer.GraphicLayer()
    map.addLayer(graphicLayer)

    // Now loop over each coordinate in the series and create
    for (let i = 0; i < coordinates.length; i += 3) {
      const latitude = coordinates[i]
      const longitude = coordinates[i + 1]
      const height = coordinates[i + 2]

      // Ignore lines of zero height.
      if (height === 0) {
        continue
      }

      const color = Cesium.Color.fromHsl(0.6 - height * 0.5, 1.0, 0.5)
      const surfacePosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, 0)
      const heightPosition = Cesium.Cartesian3.fromDegrees(longitude, latitude, height * heightScale)

      const primitive = new mars3d.graphic.PolylineEntity({
        positions: [surfacePosition, heightPosition],
        style: {
          width: 4,
          color: color
        }
      })
      graphicLayer.addGraphic(primitive)
    }
  }
}


