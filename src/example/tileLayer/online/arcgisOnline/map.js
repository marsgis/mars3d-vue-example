var map
function initMap() {


  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 22.752876, lng: 113.208726, alt: 57251, heading: 360, pitch: -57 }
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
        layer: "img_d", // 使用layer时会自动用内部固定url "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
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
  })


}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.ArcGisLayer({
    url: "http://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetGray/MapServer",
    enablePickFeatures: false
    // queryParameters: {
    //   mosaicRule: `{"where":"t='20180525'"}`,
    // },
  })
  map.addLayer(tileLayer)
}
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
