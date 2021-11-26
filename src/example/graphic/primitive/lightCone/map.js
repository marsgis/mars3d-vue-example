var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 27.375302, lng: 115.43395, alt: 631709, heading: 26, pitch: -49 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 合肥市
  var lightCone = new mars3d.graphic.LightCone({
    position: Cesium.Cartesian3.fromDegrees(117.29, 32.0581, 117.8),
    style: {
      color: "rgba(255,0,0,0.9)",
      radius: 8000, // 底部半径
      height: 150000 // 椎体高度
    },
    show: true
  })
  graphicLayer.addGraphic(lightCone)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(lightCone)

  var cities = [
    { name: "六安市", lon: 116.3123, lat: 31.8329 },
    { name: "安庆市", lon: 116.7517, lat: 30.5255 },
    { name: "滁州市", lon: 118.1909, lat: 32.536 },
    { name: "宣城市", lon: 118.8062, lat: 30.6244 },
    { name: "阜阳市", lon: 115.7629, lat: 32.9919 },
    { name: "宿州市", lon: 117.5208, lat: 33.6841 },
    { name: "黄山市", lon: 118.0481, lat: 29.9542 },
    { name: "巢湖市", lon: 117.7734, lat: 31.4978 },
    { name: "亳州市", lon: 116.1914, lat: 33.4698 },
    { name: "池州市", lon: 117.3889, lat: 30.2014 },
    { name: "蚌埠市", lon: 117.4109, lat: 33.1073 },
    { name: "芜湖市", lon: 118.3557, lat: 31.0858 },
    { name: "淮北市", lon: 116.6968, lat: 33.6896 },
    { name: "淮南市", lon: 116.7847, lat: 32.7722 },
    { name: "马鞍山市", lon: 118.6304, lat: 31.5363 },
    { name: "铜陵市", lon: 117.9382, lat: 30.9375 }
  ]
  for (var i = 0; i < cities.length; i++) {
    var item = cities[i]

    var coneGlow2 = new mars3d.graphic.LightCone({
      position: Cesium.Cartesian3.fromDegrees(item.lon, item.lat, 0),
      style: {
        radius: 5000,
        height: 80000,
        distanceDisplayCondition: new Cesium.DistanceDisplayConditionGeometryInstanceAttribute(80000, 3010000),

        // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
        highlight: {
          type: mars3d.EventType.click,
          color: "#ffff00"
        }
      }
      // popup: item.name,
    })
    graphicLayer.addGraphic(coneGlow2)
  }
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
