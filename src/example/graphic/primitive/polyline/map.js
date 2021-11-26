var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.51363, lng: 117.278891, alt: 46241, heading: 2, pitch: -49 }
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
  addGraphic_a5(graphicLayer)
  addGraphic_a6(graphicLayer)
  addGraphic_a7(graphicLayer)
  addGraphic_a8(graphicLayer)
  addGraphic_a9(graphicLayer)
  addGraphic_a10(graphicLayer)
}

function addData(count) {
  graphicLayer.clear()

  showLoading()

  var startTime = new Date().getTime()

  count = count * 10000

  for (var j = 0; j < count; ++j) {
    var position = randomPoint()
    var pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, random(0, 360), 600)

    var primitive = new mars3d.graphic.PolylinePrimitive({
      positions: [pt1, position],
      style: {
        width: 4,
        color: Cesium.Color.fromRandom().withAlpha(0.9)
      },
      tooltip: "第" + j + "个"
    })
    graphicLayer.addGraphic(primitive)
  }

  hideLoading()
  var endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  var usedTime = (endTime - startTime) / 1000
  console.log(usedTime)

  globalMsg("共耗时" + usedTime.toFixed(2) + "秒")
}

// 取区域内的随机图标
function randomPoint() {
  var jd = random(116.955684 * 1000, 117.474003 * 1000) / 1000
  var wd = random(31.7576 * 1000, 32.008782 * 1000) / 1000
  var height = random(700, 5000)
  return Cesium.Cartesian3.fromDegrees(jd, wd, height)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.220337, 31.832987],
      [117.220242, 31.835234],
      [117.216263, 31.835251],
      [117.217219, 31.819929],
      [117.223096, 31.818342],
      [117.249686, 31.818964],
      [117.263171, 31.816664],
      [117.278695, 31.816107],
      [117.279826, 31.804185],
      [117.286308, 31.804112],
      [117.28621, 31.801059]
    ],
    style: {
      width: 4,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineTrail, {
        color: Cesium.Color.CHARTREUSE,
        speed: 5
      }),
      clampToGround: true,

      label: {
        text: "我是线",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(primitive)
}

function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.172852, 31.862736, 33.69],
      [117.251461, 31.856011, 26.44]
    ],
    style: {
      width: 6,
      materialType: mars3d.MaterialType.PolylineDash, // 虚线
      dashLength: 20,
      color: Cesium.Color.RED,

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        // type: mars3d.EventType.click,
        materialType: mars3d.MaterialType.Color
      }
    }
  })
  graphicLayer.addGraphic(primitive)

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.358187, 31.838662, 12.23],
      [117.4384, 31.819405, 11.78]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlowColor, {
        color: "#FFFF00",
        speed: 10,
        percent: 0.15,
        alpha: 0.2
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.348938, 31.805369, 7.63],
      [117.429496, 31.786715, 8.41]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        color: "#1a9850",
        image: "img/textures/ArrowOpacity.png",
        speed: 10
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a5(graphicLayer) {
  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.313682, 31.7416, 10.85],
      [117.311934, 31.774753, 19.71],
      [117.305473, 31.800304, 23.86]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "./img/textures/arrow2.png",
        axisY: false,
        repeat: new Cesium.Cartesian2(20.0, 1.0),
        color: "#ffff00",
        speed: 40
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a6(graphicLayer) {
  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.169646, 31.769171],
      [117.194579, 31.806466]
    ],
    style: {
      width: 3,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.ODLine, {
        color: "#FF0000",
        speed: 5 + 1.0 * Math.random(),
        startTime: Math.random()
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a7(graphicLayer) {
  var startPoint = Cesium.Cartesian3.fromDegrees(117.025419, 32.00651, 51.2)
  var endPoint = Cesium.Cartesian3.fromDegrees(117.323963, 32.050384, 33.8)
  var positions = mars3d.PolyUtil.getLinkedPointList(startPoint, endPoint, 20000, 50) // 计算曲线点

  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: positions,
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        color: Cesium.Color.CHARTREUSE,
        image: "img/textures/lineClr.png",
        speed: 15
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a8(graphicLayer) {
  var primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.225811, 31.772658, 28],
      [117.251371, 31.771603, 24.8],
      [117.24979, 31.739408, 25.4],
      [117.229487, 31.751584, 27.5]
    ],
    style: {
      width: 5,
      closure: true,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlicker, {
        color: new Cesium.Color(0.0, 1.0, 0.0, 0.7),
        speed: 5
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a9(graphicLayer) {
  const graphic = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.208284, 31.809663, 36.2],
      [117.221568, 31.793622, 32.7],
      [117.271391, 31.797771, 24.3]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlowColor, {
        color: "#00ffff",
        speed: 10,
        percent: 0.15,
        alpha: 0.2
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_a10(graphicLayer) {
  var colors = []
  for (var i = 0; i < 7; ++i) {
    colors.push(Cesium.Color.fromRandom({ alpha: 1.0 }))
  }

  const graphic = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.063958, 31.831931, 35.1],
      [117.094926, 31.83328, 33.3],
      [117.099639, 31.812169, 30.9],
      [117.120429, 31.811357, 32.3],
      [117.120415, 31.785387, 21.3],
      [117.142865, 31.784693, 23.6],
      [117.142902, 31.784508, 23.6]
    ],
    style: {
      width: 5,
      colors: colors // 每一段都不同颜色,
      // colorsPerVertex: true,
    }
  })
  graphicLayer.addGraphic(graphic)
}

function clearLayer() {
  graphicLayer.clear()
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
