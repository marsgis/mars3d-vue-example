var map
var tiles3dLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.786828, lng: 117.181704, alt: 3393, heading: 38, pitch: -34 }
    }
  })
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  map.basemap = 2017 // 切换到蓝色底图
  // 模型
  tiles3dLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "合肥市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    style: {
      color: {
        conditions: [
          ["${height} >= 300", "rgba(45, 0, 75, 0.5)"],
          ["${height} >= 200", "rgb(102, 71, 151)"],
          ["${height} >= 100", "rgb(170, 162, 204)"],
          ["${height} >= 50", "rgb(224, 226, 238)"],
          ["${height} >= 30", "rgb(252, 230, 200)"],
          ["${height} >= 20", "rgb(248, 176, 87)"],
          ["${height} >= 10", "rgb(198, 106, 11)"],
          ["true", "rgb(127, 59, 8)"]
        ]
      }
    },
    highlight: { type: "click", color: "#FFFF00" },
    popup: [
      { field: "objectid", name: "编号" },
      { field: "name", name: "名称" },
      { field: "height", name: "楼高", unit: "米" }
    ]
  })
  map.addLayer(tiles3dLayer)
}

function setStyle1() {
  tiles3dLayer.style = undefined
}

function setStyle2() {
  tiles3dLayer.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [
        ["${height} >= 300", "rgba(45, 0, 75, 0.5)"],
        ["${height} >= 200", "rgb(102, 71, 151)"],
        ["${height} >= 100", "rgb(170, 162, 204)"],
        ["${height} >= 50", "rgb(224, 226, 238)"],
        ["${height} >= 30", "rgb(252, 230, 200)"],
        ["${height} >= 20", "rgb(248, 176, 87)"],
        ["${height} >= 10", "rgb(198, 106, 11)"],
        ["true", "rgb(127, 59, 8)"]
      ]
    }
  })
}
function selectColor(col) {
  tiles3dLayer.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [["true", `color("${col}")`]]
    }
  })
}
