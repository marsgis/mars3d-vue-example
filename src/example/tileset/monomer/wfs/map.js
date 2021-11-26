var map
var viewer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 31.838348, lng: 117.206494, alt: 752, heading: 359, pitch: -54 }
    },
    infoBox: false
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  viewer = map.viewer

  // 三维模型【目前没有全合肥的模型，下面模型为了测试下】
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "合肥国家大学科技园",
    url: "//data.mars3d.cn/3dtiles/qx-hfdxy/tileset.json",
    position: { alt: -24 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    show: true
  })
  map.addLayer(tilesetLayer)

  // 单体化图层【支持geoserver的wfs服务配置dth属性】
  var wfsLayer = new mars3d.layer.WfsLayer({
    name: "建筑物面",
    url: "//server.mars3d.cn/geoserver/mars/wfs",
    layer: "mars:hfjzw",
    parameters: {
      // 支持所有wfs的参数
      maxFeatures: 500
    },
    minimumLevel: 15,
    debuggerTileInfo: false,
    popup: "名称：{NAME}<br />层数：{floor}",
    symbol: {
      type: "polygonP",
      styleOptions: {
        // 单体化默认显示样式
        color: "rgba(255, 255, 255, 0.01)",
        clampToGround: true,
        classification: true,
        buffer: 1,
        // 单体化鼠标移入或单击后高亮的样式
        highlight: {
          // type: mars3d.EventType.click,
          color: "rgba(255,255,0,0.4)"
        }
      }
    },
    show: true
  })
  map.addLayer(wfsLayer)

  // 单体化图层【也支持arcgis的wfs服务配置dth属性】
  // var wfsLayer = new mars3d.layer.ArcGisWfsLayer({
  //   name: '建筑物面矢量图层',
  //   url: '//server.mars3d.cn/arcgis/rest/services/mars/hefei/MapServer/37',
  //   minimumLevel: 15,
  //   debuggerTileInfo: false,
  //   popup: '名称：{NAME}<br />层数：{floor}',
  //   symbol: {
  //     type: 'polygonP',
  //     styleOptions: {
  //       //单体化默认显示样式
  //       color: 'rgba(255, 255, 255, 0.01)',
  //       clampToGround: true,
  //       classification: true,
  //       //单体化鼠标移入或单击后高亮的样式
  //       highlight: {
  //         // type: mars3d.EventType.click,
  //         color: 'rgba(255,255,0,0.4)',
  //       },
  //     },
  //   },
  // })
  // map.addLayer(wfsLayer)
}
