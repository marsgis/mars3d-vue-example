
var map
var floorGraphic

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.832215, lng: 117.219965, alt: 195, heading: 31, pitch: -36 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 该对象代码定义在：js/FloorGraphic.js
  // eslint-disable-next-line no-undef
  floorGraphic = new FloorGraphic({
    position: [117.220897, 31.833569, 41.1], // 楼栋位置
    style: {
      url: "//data.mars3d.cn/gltf/mars/floor/floor.glb",
      heading: 100,

      topUrl: "//data.mars3d.cn/gltf/mars/floor/top.glb", // 楼顶的模型
      count: 9, // 总层数（不含楼顶）
      spacing: 3 // 每层层高,单位:米
    }
  })
  graphicLayer.addGraphic(floorGraphic)

}

// 展开
function openFloorModel() {
  var height = 5 // 展开的每层间隔高度，单位：米
  floorGraphic.openAll(height)
}

// 合并
function mergeFloorModel() {
  floorGraphic.mergeAll()
}

// 还原
function resetModel() {
  floorGraphic.reset()
}

// 楼层显示
function showFloorModel(floorNum) {
  floorGraphic.showFloor(floorNum)
}
