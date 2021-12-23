import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

/**
 * 合并属性参数，可覆盖config.json中的对应配置
 * @type {object}
 */
export const mapOptions = {
  scene: {
    center: { lat: 28.439577, lng: 119.476925, alt: 229, heading: 57, pitch: -29 }
  },
  control: {
    homeButton: false, // 回到默认视域按钮
    navigationHelpButton: false, // 是否显示帮助信息控件
    fullscreenButton: false, // 右下角全屏按钮
    geocoder: false, // 地名查找控件按钮
    sceneModePicker: false, //  二三维视图切换按钮
    timeline: false, // 下侧时间线控件面板
    compass: false, // 导航球
    locationBar: false, // 鼠标提示控件
    distanceLegend: false, // 比例尺控件
    baseLayerPicker: false, // 是否显示图层选择控件
    vrButton: true
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

  // 加个模型，效果更NB
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "县城社区",
    url: "//data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 11.5 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    dynamicScreenSpaceError: true,
    cullWithChildrenBounds: false,
    skipLevelOfDetail: true,
    preferLeaves: true,
    center: { lat: 28.439577, lng: 119.476925, alt: 229, heading: 57, pitch: -29 }
  })
  map.addLayer(tiles3dLayer)

  // 这句话打开VR
  map.scene.useWebVR = true

  // WebVR相关参数: 眼镜的视角距离（单位：米）
  map.scene.eyeSeparation = 100.0

  // WebVR相关参数: 焦距
  map.scene.eyeSeparation.focalLength = 5.0

  globalNotify(
    "已知问题：",
    `(1) 请确保您的显示器调整到 3D模式。
      (2) 需要佩戴3D眼镜才能体验效果。`,
    { duration: null }
  )
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}
