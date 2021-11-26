var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 23.54104, lng: 121.083097, alt: 10219674, heading: 355, pitch: -85 },
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
      type: "gee",
      url: "http://www.earthenterprise.org/3d",
      // "proxy": "//server.mars3d.cn/proxy/",
      show: true
    },
    basemaps: [
      {
        name: "GEE地图",
        icon: "img/basemaps/osm.png",
        type: "gee",
        url: "http://www.earthenterprise.org/3d",
        // "proxy": "//server.mars3d.cn/proxy/",
        show: true
      }
    ]
  })
}

function openTipView(content, title) {
  window.layer.open({
    type: 1,
    title: title || "功能 和 已知问题 提示",
    offset: "rt",
    shade: false,
    skin: "layer-mars-dialog animation-scale-up",
    content: content
  })
}
