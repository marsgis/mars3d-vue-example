import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.931953, lng: 117.352307, alt: 207201, heading: 360, pitch: -64 }
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
      name: "ArcGIS影像",
      icon: "img/basemaps/esriWorldImagery.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer",
      enablePickFeatures: false,
      show: true
    },
    {
      name: "ArcGIS电子街道",
      icon: "img/basemaps/google_vec.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      enablePickFeatures: false
    },
    {
      name: "ArcGIS NatGeo",
      icon: "img/basemaps/esriWorldStreetMap.png",
      type: "arcgis",
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer",
      enablePickFeatures: false
    },
    {
      name: "蓝色底图",
      icon: "img/basemaps/bd-c-midnight.png",
      type: "arcgis",
      url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer",
      enablePickFeatures: false,
      chinaCRS: mars3d.ChinaCRS.GCJ02
    },
    {
      name: "灰色底图",
      icon: "img/basemaps/bd-c-grayscale.png",
      type: "arcgis",
      url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer",
      enablePickFeatures: false,
      chinaCRS: mars3d.ChinaCRS.GCJ02
    }
  ]
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 叠加的图层
let arcGisLayer
export function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  arcGisLayer = new mars3d.layer.ArcGisLayer({
    name: "合肥建筑物",
    url: "//server.mars3d.cn/arcgis/rest/services/mars/guihua/MapServer",
    // layerDefs: `{ 0: "用地编号 = 'R2'" }`,

    // url: '//server.mars3d.cn/arcgis/rest/services/crs/ssjzw4326/MapServer',
    // url: '//server.mars3d.cn/arcgis/rest/services/crs/ssjzw4490/MapServer', //大地2000地理坐标系
    // url: '//server.mars3d.cn/arcgis/rest/services/crs/ssjzw4548/MapServer', //大地2000高斯投影坐标系
    // url: '//server.mars3d.cn/arcgis/rest/services/crs/ssjzw2000/MapServer',  //大地2000高斯投影坐标系
    // usePreCachedTilesIfAvailable: false, //大地2000高斯投影坐标系时，如果是瓦片，请打开此参数
    highlight: {
      clampToGround: true,
      fill: true,
      color: "#2deaf7",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#e000d9",
      outlineOpacity: 1.0
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(arcGisLayer)

  // 绑定事件
  arcGisLayer.on(mars3d.EventType.loadConfig, function (event) {
    console.log("加载完成服务信息", event)
  })

  arcGisLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了矢量数据，共" + event.features.length + "条", event)
  })
}
export function removeLayer() {
  if (arcGisLayer) {
    map.removeLayer(arcGisLayer, true)
    arcGisLayer = null
  }
}
