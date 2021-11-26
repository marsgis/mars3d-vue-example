var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 20.349464, lng: 108.816138, alt: 7733636, heading: 358, pitch: -82 }
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
        name: "Bing影像",
        icon: "img/basemaps/bingAerial.png",
        type: "bing",
        layer: Cesium.BingMapsStyle.AERIAL,
        key: mars3d.Token.bing,
        show: true
      },
      {
        name: "Bing影像(含注记)",
        icon: "img/basemaps/bingAerialLabels.png",
        type: "bing",
        layer: Cesium.BingMapsStyle.AERIAL_WITH_LABELS,
        key: mars3d.Token.bing
      },
      {
        name: "Bing电子地图",
        icon: "img/basemaps/bingRoads.png",
        type: "bing",
        layer: Cesium.BingMapsStyle.ROAD,
        key: mars3d.Token.bing
      },
      {
        name: "Bing电子地图2",
        icon: "img/basemaps/bingRoads.png",
        type: "bing",
        layer: Cesium.BingMapsStyle.ROAD_ON_DEMAND,
        key: mars3d.Token.bing
      },
      {
        name: "Bing浅色电子​​",
        icon: "img/basemaps/bingAerialLabels.png",
        type: "bing",
        layer: Cesium.BingMapsStyle.CANVAS_LIGHT,
        key: mars3d.Token.bing
      },
      {
        name: "Bing深色地图",
        icon: "img/basemaps/bd-c-midnight.png",
        type: "bing",
        layer: Cesium.BingMapsStyle.CANVAS_DARK,
        key: mars3d.Token.bing
      },
      {
        name: "Bing灰色地图",
        icon: "img/basemaps/bingAerialLabels.png",
        type: "bing",
        layer: Cesium.BingMapsStyle.CANVAS_GRAY,
        key: mars3d.Token.bing
      }
    ]
  })
}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.BingLayer({
    layer: Cesium.BingMapsStyle.CANVAS_DARK,
    key: mars3d.Token.bing
  })
  map.addLayer(tileLayer)
}
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
