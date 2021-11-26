var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.188596, lng: 121.474422, alt: 4541, heading: 15, pitch: -40 }
    }
  })
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 蓝色底图

  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "上海市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-shanghai/tileset.json",
    maximumScreenSpaceError: 8,
    maximumMemoryUsage: 1024,
    marsJzwStyle: true,
    style: {
      color: {
        conditions: [["true", "rgb(3, 104, 255)"]]
      }
    },
    popup: "all"
  })
  map.addLayer(tiles3dLayer)

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 加一些演示数据

  // 立体围墙扩散效果,面状
  var diffuseWallGlow = new mars3d.graphic.DiffuseWall({
    positions: [
      [121.475616, 31.255374, 5.87],
      [121.482578, 31.248681, 10.85],
      [121.479447, 31.240235, 14.25],
      [121.470002, 31.240496, 12.92],
      [121.46538, 31.249206, 9.53],
      [121.475616, 31.255374, 5.87]
    ],
    style: {
      color: "#ffff00",
      diffHeight: 2000, // 高度
      speed: 10, // 速度

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        color: "#ff0000"
      }
    }
  })
  graphicLayer.addGraphic(diffuseWallGlow)

  // 立体围墙扩散效果,圆状
  var circleDiffuseWallGlow = new mars3d.graphic.DiffuseWall({
    position: Cesium.Cartesian3.fromDegrees(121.504242, 31.23805, 27.88), // 圆中心点
    style: {
      diffHeight: 2000, // 高度
      radius: 600, // 半径
      color: "#ff0000",
      speed: 10 // 速度
    }
  })
  graphicLayer.addGraphic(circleDiffuseWallGlow)
}

// 显示隐藏 绑定popup和tooltip和右键菜单以及是否编辑
function bindShowHide(val) {
  graphicLayer.show = val
}
function bindPopup(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerPopup(graphicLayer)
  } else {
    graphicLayer.unbindPopup()
  }
}
function bindTooltip(val) {
  if (val) {
    graphicLayer.bindTooltip("我是layer上绑定的Tooltip")
  } else {
    graphicLayer.unbindTooltip()
  }
}
function bindRightMenu(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerContextMenu(graphicLayer)
  } else {
    graphicLayer.unbindContextMenu(true)
  }
}
