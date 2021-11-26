var map
function initMap() {


  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 31.82034, lng: 117.411297, alt: 56459, heading: 356, pitch: -87 },
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
        name: "腾讯电子",
        icon: "img/basemaps/gaode_vec.png",
        type: "tencent",
        layer: "vec",
        show: true
      },
      {
        name: "腾讯影像",
        icon: "img/basemaps/gaode_img.png",
        type: "group",
        layers: [
          { name: "底图", type: "tencent", layer: "img_d" },
          { name: "注记", type: "tencent", layer: "img_z" }
        ]
      },
      {
        name: "腾讯深蓝色",
        icon: "img/basemaps/bd-c-midnight.png",
        type: "tencent",
        layer: "custom",
        style: "4"
      }
    ]
  })


}

// 叠加的图层
var tileLayer

function addLayer() {
  removeLayer()

  // 方式2：在创建地球后调用addLayer添加图层(直接new对应type类型的图层类)
  tileLayer = new mars3d.layer.TencentLayer({
    layer: "custom",
    style: "4"
  })
  map.addLayer(tileLayer)
}

function removeLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
