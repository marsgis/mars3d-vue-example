function initMap() {
  // 创建三维地球场景
  var map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 25.816726, lng: 114.165359, alt: 3339610, heading: 356, pitch: -81 },
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
        name: "OSM开源地图",
        icon: "img/basemaps/osm.png",
        type: "osm",
        show: true
      }
    ]
  })
}
