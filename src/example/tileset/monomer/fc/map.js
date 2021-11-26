var map
var geoJsonLayerDTH

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 43.823957, lng: 125.136704, alt: 286, heading: 11, pitch: -24 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    pid: 2030,
    type: "3dtiles",
    name: "校园",
    url: "//data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",
    position: { alt: 15.8 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    center: { lat: 43.821193, lng: 125.143124, alt: 990, heading: 342, pitch: -50 }
  })
  map.addLayer(tiles3dLayer)

  // 创建单体化图层
  geoJsonLayerDTH = new mars3d.layer.GeoJsonLayer({
    name: "分层单体化",
    url: "//data.mars3d.cn/file/geojson/dth-xuexiao-fc.json",
    onCreateGraphic: createDthGraphic // 自定义解析数据
  })
  map.addLayer(geoJsonLayerDTH)

  geoJsonLayerDTH.bindPopup((e) => {
    const item = e.graphic.attr
    const html = `楼层：第${item.thisFloor}层 (共${item.allFloor}层)<br/>
                      备注：${item.remark} `
    return html
  })
}

// 添加单体化矢量对象
function createDthGraphic(options) {
  var points = options.positions // 各顶点的坐标
  var attr = options.attr // 楼层层高配置信息

  var minHight = attr.bottomHeight // 当前层的 底部海拔高度
  var maxHight = attr.topHeight // 当前层的 顶部海拔高度

  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: points,
    style: {
      height: minHight,
      extrudedHeight: maxHight,
      // 单体化默认显示样式
      color: getColor(),
      opacity: 0.3,
      classification: true,
      // 单体化鼠标移入或单击后高亮的样式
      highlight: {
        type: mars3d.EventType.click,
        color: "#ffff00",
        opacity: 0.6
      }
    },
    attr: attr
  })
  geoJsonLayerDTH.addGraphic(primitive)
}

// 颜色
var index = 0
var colors = ["#99CCCC", "#66FF66", "#FF6666", "#00CCFF", "#00FF33", "#CC0000", "#CC00CC", "#CCFF00", "#0000FF"]
function getColor() {
  var i = index++ % colors.length
  return colors[i]
}

// 各层颜色显示
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
