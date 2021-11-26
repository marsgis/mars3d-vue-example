var map
var tiles3dLayerDTH

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 43.823957, lng: 125.136704, alt: 286, heading: 11, pitch: -24 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 添加三维模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "校园",
    url: "//data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",
    position: { alt: 15.8 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tiles3dLayer)

  // 创建单体化图层
  tiles3dLayerDTH = new mars3d.layer.TilesetLayer({
    name: "学校-单体",
    url: "//data.mars3d.cn/3dtiles/qx-xuexiao-dth/tileset.json",
    position: { alt: 217 },
    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
    style: {
      color: {
        conditions: [
          ["${thisFloor} ===1", "rgba(7, 184, 134, 0.3)"],
          ["${thisFloor} ===2", "rgba(224, 148, 18, 0.3)"],
          ["${thisFloor} ===3", "rgba(15, 212, 186, 0.3)"],
          ["${thisFloor} ===4", "rgba(15, 134, 214, 0.3)"],
          ["${thisFloor} ===5", "rgba(204, 14, 191, 0.3)"],
          ["true", "rgba(255, 255, 0,0.3)"]
        ]
      }
    },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    highlight: {
      type: mars3d.EventType.click,
      color: "#00ff00",
      opacity: 0.4
    },
    popup: "房号：{name}<br/>楼层：第{thisFloor}层 (共{allFloor}层)<br/>班级：{remark}<br/>说明：教学楼"
  })
  map.addLayer(tiles3dLayerDTH)
}

// 各层颜色显示
function chkShowColor(val) {
  if (val) {
    tiles3dLayerDTH.style = {
      color: {
        conditions: [
          ["${thisFloor} ===1", "rgba(7, 184, 134, 0.3)"],
          ["${thisFloor} ===2", "rgba(224, 148, 18, 0.3)"],
          ["${thisFloor} ===3", "rgba(15, 212, 186, 0.3)"],
          ["${thisFloor} ===4", "rgba(15, 134, 214, 0.3)"],
          ["${thisFloor} ===5", "rgba(204, 14, 191, 0.3)"],
          ["true", "rgba(255, 255, 0,0.3)"]
        ]
      }
    }
  } else {
    tiles3dLayerDTH.style = {
      color: "rgba(255, 255, 255, 0.01)"
    }
  }
}
