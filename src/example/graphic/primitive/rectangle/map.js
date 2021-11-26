var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.516143, lng: 117.282937, alt: 46242, heading: 2, pitch: -49 }
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

  // 加一些演示数据
  addGraphic_a1(graphicLayer)
  addGraphic_a2(graphicLayer)
  addGraphic_a3(graphicLayer)
  addGraphic_a4(graphicLayer)
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.RectanglePrimitive({
    positions: [
      [117.220337, 31.786107],
      [117.278695, 31.832987]
    ],
    style: {
      color: Cesium.Color.CYAN.withAlpha(0.4),
      label: {
        text: "我是火星科技",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(primitive)
}

// 图片材质
function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.RectanglePrimitive({
    positions: [
      [117.337109, 31.881802],
      [117.377109, 31.941802]
    ],
    style: {
      image: "img/tietu/gugong.jpg"
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.RectanglePrimitive({
    positions: [
      [117.172852, 31.872736, 33.69],
      [117.251461, 31.956011, 26.44]
    ],
    style: {
      height: 1000,
      color: "#ffff00",
      opacity: 0.4,

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        // type: mars3d.EventType.click,
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

// 图片材质
function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.RectanglePrimitive({
    positions: [
      [117.353356, 31.82899, 10.7],
      [117.449547, 31.776242, 11.8]
    ],
    style: {
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.RectSlide, {
        image: "//data.mars3d.cn/file/img/world/world.jpg",
        color: Cesium.Color.WHITE.withAlpha(0.7),
        speed: 2
      })
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
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
