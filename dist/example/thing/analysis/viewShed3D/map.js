import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let arrViewField = []

export const mapOptions = {
  scene: {
    center: { lat: 28.440942, lng: 119.482189, alt: 191, heading: 227, pitch: -28 },
    fxaa: true, // 不开启抗锯齿，可视域会闪烁
    globe: {
      depthTestAgainstTerrain: true // 不加无法投射到地形上
    }
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

  // 添加参考三维模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 11.5 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false,
    luminanceAtZenith: 0.6
  })
  map.addLayer(tiles3dLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

/**
 * 添加可视域
 *
 * @export
 * @param {number} horizontalAngle 水平张角
 * @param {number} verticalAngle 垂直张角
 * @param {number} distance 视角距离
 * @param {boolean} showFrustum 视椎线框
 * @returns {void}
 */
export function addPoint(horizontalAngle, verticalAngle, distance, showFrustum) {
  const thisViewField = new mars3d.thing.ViewShed3D({
    horizontalAngle: horizontalAngle,
    verticalAngle: verticalAngle,
    distance: distance,
    showFrustum: showFrustum,
    offsetHeight: 1.5 // 加人的身高等因素，略微抬高一些
  })
  map.addThing(thisViewField)

  arrViewField.push(thisViewField)
}

export function clear() {
  for (let i = 0, len = arrViewField.length; i < len; i++) {
    map.removeThing(arrViewField[i], true)
  }
  arrViewField = []
}

// 视椎线框
export function chkDebugFrustum(showFrustum) {
  for (let i = 0, len = arrViewField.length; i < len; i++) {
    arrViewField[i].showFrustum = showFrustum
  }
}

/**
 * 参数更新
 *
 * @export
 * @param {number} horizontalAngle 水平张角
 * @param {number} verticalAngle 垂直张角
 * @param {number} distance 视角距离
 * @returns {void}
 */
export function updateParams(horizontalAngle, verticalAngle, distance) {
  if (arrViewField.length === 0) {
    return
  }

  const thisViewField = arrViewField[arrViewField.length - 1]
  if (!thisViewField) {
  }
  thisViewField.distance = distance
  thisViewField.horizontalAngle = horizontalAngle
  thisViewField.verticalAngle = verticalAngle
}
