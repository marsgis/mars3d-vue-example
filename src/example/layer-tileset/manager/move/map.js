import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let x = 0
let y = 0
let z = 0
let step = 1
let tiles3dLayer

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true
  eventTarget.fire("loadOk")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  removeLayer()
}

function removeLayer() {
  if (tiles3dLayer) {
    map.basemap = 2021 // 切换到默认卫星底图

    map.removeLayer(tiles3dLayer, true)
    tiles3dLayer = null
  }
}

// 是否有地形
export function chkHasTerrain(isStkTerrain) {
  map.hasTerrain = isStkTerrain
}

// 深度检测
export function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}

// 当前页面业务相关
export function showModel(modelUrl) {
  removeLayer()
  if (!modelUrl) {
    return
  }

  tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: modelUrl,
    maximumScreenSpaceError: 1,

    // 高亮时的样式
    highlight: {
      type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
      color: "#00FF00"
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  // 加载完成事件
  tiles3dLayer.on(mars3d.EventType.load, function (event) {
    console.log("模型加载完成", event)
  })
}

export function changeStep(val) {
  step = val
}

export function change(type) {
  switch (type) {
    case 0:
      x += step
      break
    case 1:
      x -= step
      break
    case 2:
      y += step
      break
    case 3:
      y -= step
      break
    case 4:
      z += step
      break
    case 5:
      z -= step
      break
    default:
  }

  const result = "x:" + x.toFixed(1) + " y:" + y.toFixed(1) + " z:" + z.toFixed(1)
  // 触发自定义事件
  eventTarget.fire("changeStep", { result })
  // 创建平移矩阵方法二
  const translation = Cesium.Cartesian3.fromArray([x, y, z])
  tiles3dLayer.tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation)
}
