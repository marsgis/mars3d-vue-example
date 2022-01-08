import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let mapEx

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.754115, lng: 116.341283, alt: 14041, heading: 5, pitch: -49 }
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

  const centerDivEx = mars3d.DomUtil.create("div", "", document.body)
  centerDivEx.setAttribute("id", "centerDivEx")
  const sourceContainer = mars3d.DomUtil.create("div", "mars3d-container", centerDivEx)
  sourceContainer.setAttribute("id", "mars3dContainerEx")

  // 获取原来地图的参数
  const mapOptions2 = map.getOptions()
  mapOptions2.control.baseLayerPicker = true // basemaps底图切换按钮
  mapOptions2.control.sceneModePicker = false

  // 用于双屏同图层，不同配置展示
  for (let i = 0, len = mapOptions2.layers.length; i < len; i++) {
    const item = mapOptions2.layers[i]
    if (item.compare) {
      // 存在compare属性时
      for (const key in item.compare) {
        item[key] = item.compare[key]
      }
    }
  }

  // 后置加的图层的处理
  const mapLayers = map.getLayers({
    filter: true
  })

  for (let i = mapLayers.length - 1; i >= 0; i--) {
    const layer = mapLayers[i]
    if (layer.noLayerManage || layer.parent) {
      continue
    }
    mapOptions2.layers.push(layer.toJSON())
  }

  console.log("分屏地图配置", mapOptions2)

  mapEx = new mars3d.Map(sourceContainer, mapOptions2)
  mapEx.basemap = "天地图电子"

  // 场景模式(2D/3D/哥伦布)变换完成
  map.on(mars3d.EventType.morphComplete, function (event) {
    if (map.scene.mode === Cesium.SceneMode.SCENE2D) {
      mapEx.scene.screenSpaceCameraController.enableTilt = false
    } else {
      mapEx.scene.screenSpaceCameraController.enableTilt = true
    }
  })

  map.on(mars3d.EventType.cameraChanged, _map_extentChangeHandler)
  map.camera.percentageChanged = 0.01

  mapEx.on(mars3d.EventType.cameraChanged, _mapEx_extentChangeHandler)
  mapEx.camera.percentageChanged = 0.01

  _map_extentChangeHandler()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function _map_extentChangeHandler(e) {
  mapEx.off(mars3d.EventType.cameraChanged, _mapEx_extentChangeHandler)

  updateView(map, mapEx)
  mapEx.on(mars3d.EventType.cameraChanged, _mapEx_extentChangeHandler)
}

function _mapEx_extentChangeHandler(e) {
  map.off(mars3d.EventType.cameraChanged, _map_extentChangeHandler)

  updateView(mapEx, map)
  map.on(mars3d.EventType.cameraChanged, _map_extentChangeHandler)
}

// “变化屏”mapChange变化，将“被更新屏”mapUpdate同步更新
function updateView(mapChange, mapUpdate) {
  const view = mapChange.getCameraView()
  mapUpdate.setCameraView(view, { duration: 0 })
}
