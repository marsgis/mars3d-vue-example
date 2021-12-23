import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let fogEffect

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.251138, lng: 121.463588, alt: 1730, heading: 111, pitch: -25 }
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

  // 创建gltf模型，
  const gltfLayer = new mars3d.layer.ModelLayer({
    name: "上海浦东",
    url: "//data.mars3d.cn/gltf/mars/shanghai/scene.gltf",
    style: { scale: 520, heading: 215 }, // style同标绘的model类型
    position: [121.507762, 31.233975, 200],
    center: { lat: 31.251138, lng: 121.463588, alt: 1729.97, heading: 110.7, pitch: -25, roll: 0.2 },
    flyTo: true
  })
  map.addLayer(gltfLayer)

  // 雾效果
  fogEffect = new mars3d.effect.FogEffect({
    maxHeight: 20000, // 大于此高度后不显示
    fogByDistance: new Cesium.Cartesian4(100, 0.0, 9000, 0.9),
    color: Cesium.Color.WHITE
  })
  map.addEffect(fogEffect)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 是否开始雾效果
export function bindShowEffect(val) {
  fogEffect.enabled = val
}

// 改变雾的颜色
export function changeColor(color) {
  fogEffect.color = Cesium.Color.fromCssColorString(color)
}

let setTimeoutNum
// 修改近距离和远距离
export function fogByDistanceX(val) {
  clearTimeout(setTimeoutNum)
  if (val > fogEffect.fogByDistance.z) {
    setTimeoutNum = setTimeout(() => {
      globalMsg("近距离不能大于远距离")
    }, 1000)
    return
  }
  fogEffect.fogByDistance.x = val
}

export function fogByDistanceZ(val) {
  clearTimeout(setTimeoutNum)
  if (val < fogEffect.fogByDistance.x) {
    setTimeoutNum = setTimeout(() => {
      globalMsg("远距离 不能小于 近距离")
    }, 1000)
    return
  }
  fogEffect.fogByDistance.z = val
}
