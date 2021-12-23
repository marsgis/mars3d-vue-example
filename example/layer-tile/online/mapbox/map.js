import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 25.816726, lng: 114.165359, alt: 3339610, heading: 356, pitch: -81 }
  },
  control: {
    baseLayerPicker: true, // basemaps底图切换按钮
    homeButton: true, // 视角复位按钮
    sceneModePicker: true, // 二三维切换按钮
    defaultContextMenu: true, // 右键菜单
    locationBar: { fps: true } // 状态栏
  },
  terrain: {
    url: "http://data.mars3d.cn/terrain",
    show: true
  },
  // 方式1：在创建地球前的参数中配置
  basemaps: [
    {
      name: "mapbox影像图",
      icon: "img/basemaps/mapboxSatellite.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki0adkar2b0e19mv9tpiewld",
      token: mars3d.Token.mapbox,
      show: true
    },
    {
      name: "mapbox街道图",
      icon: "img/basemaps/mapboxStreets.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki0a0ire3jvh19r92vwfau1e",
      token: mars3d.Token.mapbox
    },
    {
      name: "mapbox基础底图",
      icon: "img/basemaps/mapboxTerrain.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki09kw472a8j19mvog00aoe0",
      token: mars3d.Token.mapbox
    },
    {
      name: "mapbox黑色底图",
      icon: "img/basemaps/bd-c-dark.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki0a2mtc2vyo1bqu76p8ks8m",
      token: mars3d.Token.mapbox
    },
    {
      name: "mapbox灰色底图",
      icon: "img/basemaps/bd-c-grayscale.png",
      type: "mapbox",
      username: "marsgis",
      styleId: "cki0a92b123qo1aluk0e5v7sb",
      token: mars3d.Token.mapbox
    }
  ]
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  eventTarget.fire("mapLoaded")
  map.on(mars3d.EventType.cameraChanged, () => {
    eventTarget.fire("mapCameraChange")
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 叠加的图层
let tileLayer
export function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.MapboxLayer({
    username: "marsgis",
    styleId: "cki0a92b123qo1aluk0e5v7sb",
    token: mars3d.Token.mapbox
  })
  map.addLayer(tileLayer)
}

export function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
