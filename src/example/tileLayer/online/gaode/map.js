var map
var eventTarget = new mars3d.BaseClass()
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 31.675177, lng: 117.323257, alt: 81193, heading: 359, pitch: -79 },
      highDynamicRange: false
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
        name: "高德电子",
        icon: "img/basemaps/gaode_vec.png",
        type: "gaode",
        layer: "vec",
        show: true
      },
      {
        name: "高德影像",
        icon: "img/basemaps/gaode_img.png",
        type: "group",
        layers: [
          { name: "底图", type: "gaode", layer: "img_d" },
          { name: "注记", type: "gaode", layer: "img_z" }
        ]
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
  tileLayer = new mars3d.layer.GaodeLayer({
    layer: "time",
    minimumTerrainLevel: 4,
    minimumLevel: 4,
    proxy: "//server.mars3d.cn/proxy/"
  })
  map.addLayer(tileLayer)
}

function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
