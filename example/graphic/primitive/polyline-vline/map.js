import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 3.74685, lng: 103.588387, alt: 14532035, heading: 0, pitch: -86 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  map.basemap = 2017

  queryPopulationApiData()
    .then(function (data) {
      showData(data)
    })
    .otherwise(function (data) {
      console.log("ajax请求出错", data)
    })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 访问后端接口，取数据
function queryPopulationApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/population.json" })
}

function showData(data) {
  const heightScale = 2000000

  for (let x = 0; x < 1; x++) {
    const series = data[x]
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
