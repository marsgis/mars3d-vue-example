var map
var geoJsonLayerDTH
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 43.821193, lng: 125.143124, alt: 990, heading: 342, pitch: -50 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 三维模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "校园",
    url: "//data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",
    position: { alt: 15.8 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tilesetLayer)

  // 单体化图层
   geoJsonLayerDTH = new mars3d.layer.GeoJsonLayer({
    name: "学校-单体化",
    url: "//data.mars3d.cn/file/geojson/dth-xuexiao-fd.json",
    symbol: {
      type: "polygonP",
      styleOptions: {
        // 单体化默认显示样式
        color: "#00ffff",
        opacity: 0.2,
        clampToGround: true,
        classification: true,
        buffer: 1,
        // 单体化鼠标移入或单击后高亮的样式
        highlight: {
          type: mars3d.EventType.click,
          color: "#ffff00",
          opacity: 0.6
        },

        label: {
          text: "{name}",
          height: 240, // 单体化面没有高度，所以中心点文字需要指定一个高度值。
          opacity: 1,
          font_size: 30,
          color: "#ffffff",
          font_family: "楷体",
          outline: true,
          outlineColor: "#000000",
          outlineWidth: 3,
          background: false,
          backgroundColor: "#000000",
          backgroundOpacity: 0.1,
          scaleByDistance: true,
          scaleByDistance_far: 1000,
          scaleByDistance_farValue: 0.3,
          scaleByDistance_near: 10,
          scaleByDistance_nearValue: 1
        }
      }
    },
    popup: [
      { field: "name", name: "学校场所" },
      { field: "sfkf", name: "是否开放" },
      { field: "remark", name: "备注信息" }
    ]
  })
  map.addLayer(geoJsonLayerDTH)
}
// 是否显示各栋颜色
function chkShowColor(val) {

    geoJsonLayerDTH.closePopup()
    if (val) {
      geoJsonLayerDTH.eachGraphic((graphic, index) => {
        graphic.setStyle({
          opacity: 0.2
        })
      })
    } else {
      geoJsonLayerDTH.eachGraphic((graphic) => {
        graphic.setStyle({
          opacity: 0.01
        })
      })
    }
}
