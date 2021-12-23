import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.665038, lng: 117.26431, alt: 40054, heading: 360, pitch: -62 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

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

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 获取数据
function queryMapvLayerData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/hefei-road.json" })
}

// 创建mapv图层
function createMapvLayer(rs) {
  const timeData = []
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

  const options1 = {
    strokeStyle: "rgba(53,57,255,0.5)",
    shadowColor: "rgba(53,57,255,0.2)",
    shadowBlur: 3,
    lineWidth: 3.0,
    draw: "simple",
    depthTest: false
  }
  const dataSet1 = new this.mapv.DataSet(rs)

  // 创建MapV图层  线图层
  const mapVLayer1 = new mars3d.layer.MapVLayer(options1, dataSet1)
  map.addLayer(mapVLayer1)

  const options2 = {
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
  const dataSet2 = new this.mapv.DataSet(timeData)

  // 创建MapV图层  动态轨迹图层
  const mapVLayer2 = new mars3d.layer.MapVLayer(options2, dataSet2)
  map.addLayer(mapVLayer2)
}
