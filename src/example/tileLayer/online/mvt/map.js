var map
var eventTarget = new mars3d.BaseClass()
function initMap() {

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 20.758452, lng: 108.198353, alt: 7733736, heading: 358, pitch: -82 },
      globe: {
        baseColor: "#ffffff"
      },
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
        type: "mvt",
        url: "https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/{z}/{x}/{y}.vector.pbf?access_token={k}",
        key: mars3d.Token.mapbox,
        style: "mapbox-streets-v6",
        show: true
      }
    ]
  })
  eventTarget.fire("mapLoaded")
  // 另外的实现方式可以参考：https://github.com/robbo1975/MapboxVectorTileImageryProvider

}
