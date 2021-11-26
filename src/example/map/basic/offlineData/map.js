
var map

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initMap (options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 14.741847, lng: 108.420914, alt: 10003793, heading: 356, pitch: -83 }
    },
    basemaps: [
      {
        pid: 10,
        name: "卫星地图",
        type: "xyz",
        icon: "img/basemaps/mapboxSatellite.png",
        url: "//data.mars3d.cn/tile/googleImg/{z}/{x}/{y}.jpg",
        minimumLevel: 0,
        maximumLevel: 12,
        show: true
      },
      {
        pid: 10,
        name: "单张图片",
        icon: "img/basemaps/offline.png",
        type: "image",
        url: "//data.mars3d.cn/file/img/world/world.jpg"
      }
    ]
  })

  // 创建三维地球场景
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  map = new mars3d.Map("mars3dContainer", mapOptions)
}
