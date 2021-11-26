var map
var graphicLayer
var graphicFrustum
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.808451, lng: 116.295952, alt: 15993, heading: 2, pitch: -29 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\common\script\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 加一些演示数据
  addGraphic_01(graphicLayer)
  addGraphic_02(graphicLayer)
  addGraphic_03(graphicLayer)
}
// 追踪目标点
function selPoint() {
  map.graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 8,
      color: "#ffff00"
    },
    success: function (graphic) {
      var position = graphic.positionShow
      map.graphicLayer.clear()

      graphicFrustum.targetPosition = position
    }
  })
}

function addGraphic_01(graphicLayer) {
  const position = [116.359147, 30.990366, 6000]

  // 加个飞机
  var graphicFJ = new mars3d.graphic.ModelPrimitive({
    position: position,
    style: {
      url: "//data.mars3d.cn/gltf/mars/feiji.glb",
      scale: 1,
      minimumPixelSize: 50,
      heading: 150
    }
  })
  graphicLayer.addGraphic(graphicFJ)

  // 四凌锥追踪体
  graphicFrustum = new mars3d.graphic.FrustumPrimitive({
    position: position,
    targetPosition: [116.317411, 30.972581, 1439.7], // 可选
    style: {
      angle: 10,
      // length: 4000, //targetPosition存在时无需传
      color: "#02ff00",
      opacity: 0.4,
      outline: true,
      outlineColor: "#ffffff",
      outlineOpacity: 1.0
    },
    asynchronous: false
  })
  graphicLayer.addGraphic(graphicFrustum)
}

function addGraphic_02(graphicLayer) {
  var graphic = new mars3d.graphic.FrustumPrimitive({
    position: [116.25813, 30.983059, 5000],
    style: {
      angle: 7,
      length: 4000,
      color: "#FF0000",
      opacity: 0.4,
      outline: true,
      outlineColor: "#ffffff",
      outlineOpacity: 1.0,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    },
    asynchronous: false
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphic_03(graphicLayer) {
  // 加个卫星
  var graphicFJ = new mars3d.graphic.ModelPrimitive({
    position: [116.303349, 31.070789, 7000],
    style: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 50,
      heading: 70
    }
  })
  graphicLayer.addGraphic(graphicFJ)

  var graphic = new mars3d.graphic.FrustumPrimitive({
    position: [116.303349, 31.070789, 7000],
    style: {
      angle: 10,
      angle2: 0.01,
      length: 7000,
      heading: 70,
      color: "#00ffff",
      opacity: 0.7
    },
    asynchronous: false
  })
  graphicLayer.addGraphic(graphic)
}
