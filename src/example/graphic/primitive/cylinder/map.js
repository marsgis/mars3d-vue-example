var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.63693, lng: 116.271312, alt: 25226, heading: 350, pitch: -38 }
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
  addGraphic_01(graphicLayer)
  addGraphic_02(graphicLayer)
  addGraphic_03(graphicLayer)
  addGraphic_04(graphicLayer)
  addGraphic_05(graphicLayer)
  addGraphic_06(graphicLayer)
}

function addGraphic_01(graphicLayer) {
  var primitive = new mars3d.graphic.CylinderPrimitive({
    position: [116.282587, 30.859197, 1544.31],
    style: {
      length: 2000.0,
      topRadius: 0.0,
      bottomRadius: 1000.0,
      color: "#ff0000",
      opacity: 0.7
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 演示个性化处理graphic，代码在\common\script\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(primitive)

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_02(graphicLayer) {
  var primitive = new mars3d.graphic.CylinderPrimitive({
    position: new mars3d.LatLngPoint(116.22457, 30.883148, 1035.2),
    style: {
      length: 2000.0,
      topRadius: 0.0,
      bottomRadius: 1000.0,
      color: "#ff0000",
      opacity: 0.4,
      heading: 45,
      roll: 45,
      pitch: 0
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_03(graphicLayer) {
  var primitive = new mars3d.graphic.CylinderPrimitive({
    position: [116.177214, 30.842242, 2000],
    style: {
      slices: 4, // 四凌锥
      length: 4000.0,
      topRadius: 0.0,
      bottomRadius: 900.0,
      color: "#00ffff",
      opacity: 0.4,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_04(graphicLayer) {
  var primitive = new mars3d.graphic.CylinderPrimitive({
    position: [116.244399, 30.920459, 573.6],
    style: {
      length: 2000.0,
      topRadius: 1000.0,
      bottomRadius: 1000.0,
      color: "#00FFFF",
      opacity: 0.4
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_05(graphicLayer) {
  var primitive = new mars3d.graphic.CylinderPrimitive({
    position: [116.328775, 30.954602, 5000],
    style: {
      length: 10000.0,
      topRadius: 0.0,
      bottomRadius: 1500.0,
      // 自定义扩散波纹纹理
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.CylinderWave, {
        color: "#ffff00",
        repeat: 30.0
      }),
      faceForward: false, // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
      closed: true // 是否为封闭体，实际上执行的是 是否进行背面裁剪
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_06(graphicLayer) {
  // 添加卫星1
  var point = new mars3d.LatLngPoint(116.148832, 30.920609, 9000)

  // 添加模型
  var graphicModel = new mars3d.graphic.ModelPrimitive({
    position: point,
    style: {
      url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
      scale: 1,
      minimumPixelSize: 50
    }
  })
  graphicLayer.addGraphic(graphicModel)

  // 效果1
  var pointQY = point.clone()
  pointQY.alt = pointQY.alt / 2

  var graphic = new mars3d.graphic.CylinderPrimitive({
    position: pointQY,
    style: {
      length: point.alt,
      topRadius: 0.0,
      bottomRadius: 3000,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.CircleWave, {
        duration: 2000,
        color: "#02ff00"
      })
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
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
