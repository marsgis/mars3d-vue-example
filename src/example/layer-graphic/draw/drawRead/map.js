import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.609076, lng: 117.292797, alt: 17106, heading: 350, pitch: -51 }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "马拉松",
    url: "https://data.mars3d.cn/file/geojson/hefei-marathon.json",
    toPrimitive: true, // 提高渲染效率
    filter: function (feature) {
      if (feature.properties?.type === "modelP") {
        return false // cesium 1.123+版本大量模型渲染崩溃，暂时过滤掉
      }
      return true
    }
  })
  map.addLayer(geoJsonLayer)
}

// 图层状态 在组件中进行管理的图层
export function getManagerLayer() {
  return map.getLayerByAttr("马拉松", "name")
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

export function startPoint() {
  map.setCameraView({ lat: 31.77566, lng: 117.226039, alt: 413, heading: 47, pitch: -48 })
}

export function halfWayPoint() {
  map.setCameraView({ lat: 31.723314, lng: 117.247933, alt: 159, heading: 270, pitch: -31 })
}
export function endPoint() {
  map.setCameraView({ lat: 31.712765, lng: 117.294325, alt: 377, heading: 336, pitch: -56 })
}

export function allLine() {
  map.setCameraView({ lat: 31.609076, lng: 117.292797, alt: 17106, heading: 350, pitch: -51 })
}
