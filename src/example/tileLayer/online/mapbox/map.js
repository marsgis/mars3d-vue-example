var map
var eventTarget = new mars3d.BaseClass()
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
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
  })
  eventTarget.fire("mapLoaded")
}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.MapboxLayer({
    username: "marsgis",
    styleId: "cki0a92b123qo1aluk0e5v7sb",
    token: mars3d.Token.mapbox
  })
  map.addLayer(tileLayer)
}

function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
