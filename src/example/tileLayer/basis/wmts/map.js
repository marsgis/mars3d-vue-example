var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 36.468047, lng: 104.069505, alt: 16801717, heading: 356, pitch: -88 }
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
        name: "山西天地图",
        icon: "img/basemaps/blackMarble.png",
        type: "wmts",
        url: "http://shanxi.tianditu.gov.cn/service/SX_DOM/wmts",
        layer: "WD_DOM",
        format: "image/tile",
        tileMatrixSetID: "Matrix_WD_DOM_1",
        crs: "EPSG:4490",
        proxy: "//server.mars3d.cn/proxy/", // 代理服务，解决跨域问题
        show: true
      },
      {
        name: "单张图片",
        icon: "img/basemaps/offline.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/world.jpg",
        show: false
      }
    ]
  })
}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.WmtsLayer({
    url: "//server.mars3d.cn/geoserver/gwc/service/wmts",
    layer: "mars:hfgh",
    format: "image/png",
    tileMatrixSetID: "EPSG:4326",
    crs: "EPSG:4326",
    alpha: 0.8,

    pickFeaturesUrl: "//server.mars3d.cn/geoserver/mars/wms",
    popup: "all",
    highlight: {
      type: "wallP",
      diffHeight: 100,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/fence.png",
        color: "#ffff00",
        speed: 10, // 速度，建议取值范围1-100
        axisY: true
      })
    },

    flyTo: true
  })
  map.addLayer(tileLayer)
}
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
