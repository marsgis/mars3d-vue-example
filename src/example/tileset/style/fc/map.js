var map
var tiles3dLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.842449, lng: 117.251173, alt: 144, heading: 4, pitch: -35 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)



  // 模型
  tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "教学楼",
    type: "3dtiles",
    url: "//data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
    position: { lng: 117.251229, lat: 31.844015, alt: 31.2 },
    maximumScreenSpaceError: 16,
    maximumMemoryUsage: 1024,
    highlight: {
      type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
      color: "#00FF00"
    },
    flyTo: true
  })
  map.addLayer(tiles3dLayer)
  showCengByStyle("F5")

}

// API: http://mars3d.cn/api/TilesetLayer.html#style
// 说明：https://github.com/CesiumGS/3d-tiles/tree/master/specification/Styling

function showCengByStyle(ceng) {
  tiles3dLayer.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${标高} ==='" + ceng + "' || ${底部约束} ==='" + ceng + "'", "rgb(255, 255, 255)"],
        ["true", "rgba(255, 255, 255,0.03)"]
      ]
    }
  })
}

// 显示整栋楼
function showAll() {
  tiles3dLayer.style = undefined

}
// 负一层
function minusOne() {
  showCengByStyle("B1")
}

// 1~5层
function show(num) {
  var floor = "F" + num
  showCengByStyle(floor)
}
