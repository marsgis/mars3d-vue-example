import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.466724, lng: 119.306582, alt: 182294, heading: 359, pitch: -68 }
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

  queryWindyuvApiData()
    .then(function (data) {
      const arrPoints = []
      for (let i = 0; i < data.Data.length; i++) {
        const item = data.Data[i]
        arrPoints.push({ lng: item.X, lat: item.Y, value: item.Count })
      }
      showHeatMap(arrPoints)
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

// 访问后端接口，取数据
function queryWindyuvApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/heat.json" })
}

function showHeatMap(arrPoints) {
  // 热力图 图层
  const heatLayer = new mars3d.layer.HeatLayer({
    positions: arrPoints,
    // 以下为热力图本身的样式参数，可参阅api：https://www.patrick-wied.at/static/heatmapjs/docs.html
    heatStyle: {
      radius: 120,
      blur: 0.85
    },
    // 以下为矩形矢量对象的样式参数
    style: {
      opacity: 1.0
      // clampToGround: true,
    },
    flyTo: true
  })
  map.addLayer(heatLayer)
}
