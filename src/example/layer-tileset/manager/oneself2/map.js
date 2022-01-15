import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let tiles3dLayer
export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 *方便演示，移除默认配置的control
 *
 * @param {object} option 默认配置的参数
 * @return {object} option
 */
export const mapOptions = function (option) {
  option = {
    scene: {
      center: { lat: 33.597401, lng: 119.031399, alt: 514, heading: 0, pitch: -46 },
      showSun: false,
      showMoon: false,
      showSkyBox: false,
      showSkyAtmosphere: false,
      fog: false,
      backgroundColor: "rgba(0,0,0,0)",
      orderIndependentTranslucency: false,
      contextOptions: { webgl: { alpha: true } }, // 允许透明
      globe: {
        show: false, // 不显示地球
        showGroundAtmosphere: false,
        enableLighting: false
      },
      cameraController: {
        zoomFactor: 1.5,
        minimumZoomDistance: 0.1,
        maximumZoomDistance: 200000,
        enableCollisionDetection: false
      }
    },
    control: {
      baseLayerPicker: false,
      sceneModePicker: false,
      locationBar: {
        fps: true,
        template: "<div>经度:{lng}</div> <div>纬度:{lat}</div><div>方向：{heading}°</div> <div>俯仰角：{pitch}°</div>"
      }
    }
  }
  delete mapOptions.terrain
  delete mapOptions.basemaps
  delete mapOptions.layers

  return option
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  const a = document.getElementsByClassName("mars3d-container")[0]
  a.style.backgroundImage = "url(/img/tietu/backGroundImg.jpg)"
  a.style.backgroundRepeat = "no-repeat"
  a.style.backgroundSize = "100% 100%"
  eventTarget.fire("loadOk")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function removeLayer() {
  if (tiles3dLayer) {
    map.removeLayer(tiles3dLayer, true)
    tiles3dLayer = null
  }
}

// 当前页面业务相关
export function showModel(_url) {
  removeLayer()
  if (!_url) {
    return
  }

  tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: _url,
    maximumScreenSpaceError: 1,
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  // 单击事件
  tiles3dLayer.on(mars3d.EventType.load, function (event) {
    console.log("模型加载完成", event)

    // 限定缩放级别
    map.scene.screenSpaceCameraController.maximumZoomDistance = tiles3dLayer.boundingSphere.radius * 5

    // 自动贴地处理
    tiles3dLayer.clampToGround(10)
  })
}

export function flyTo() {
  tiles3dLayer.flyTo()
}
