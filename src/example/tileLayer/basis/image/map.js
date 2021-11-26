var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 26.436462, lng: 107.501392, alt: 3484877, heading: 75, pitch: -86 },
      highDynamicRange: false
    },
    control: {
      baseLayerPicker: true, // basemaps底图切换按钮
      homeButton: true, // 视角复位按钮
      sceneModePicker: true, // 二三维切换按钮
      defaultContextMenu: true // 右键菜单
    },
    terrain: {
      url: "//data.mars3d.cn/terrain",
      show: true
    },
    // 方式1：在创建地球前的参数中配置
    basemaps: [
      {
        name: "单张图片",
        icon: "img/basemaps/bingmap.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/world.jpg"
      },
      {
        name: "夜晚图片",
        icon: "img/basemaps/blackMarble.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/night.jpg"
      },
      {
        name: "蓝色底图",
        icon: "img/basemaps/bd-c-midnight.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/blue.jpg",
        show: true
      }
    ]
  })
}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.ImageLayer({
    url: "//data.mars3d.cn//file/img/radar/201906211112.PNG",
    rectangle: { xmin: 73.16895, xmax: 134.86816, ymin: 12.2023, ymax: 54.11485 },
    alpha: 0.7
  })
  map.addLayer(tileLayer)
}
// 移除图层
function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
