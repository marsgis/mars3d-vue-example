var map
function initMap() {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 25.229785, lng: 113.226084, alt: 3339440, heading: 356, pitch: -81 },
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
        name: "Ion影像地图",
        icon: "img/basemaps/bingAerial.png",
        type: "ion",
        assetId: 2,
        accessToken: mars3d.Token.ion,
        show: true
      },
      {
        name: "Ion电子地图",
        icon: "img/basemaps/bingmap.png",
        type: "ion",
        assetId: 4,
        accessToken: mars3d.Token.ion
      }
    ]
  })

  // poi查询栏
  // activatePOIQuery(map)
}
