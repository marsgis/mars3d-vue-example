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


  // 创建矢量数据图层
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
function bindEdit(val) {
  graphicLayer.hasEdit = val
}

// 按钮事件
function btnDrawModel() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#ffff00",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
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
}
function btnDrawModelExtruded() {
  // 开始绘制
  graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#00ff00",
      opacity: 0.5,
      diffHeight: 600
    }
  })
}
function btnClear() {
  graphicLayer.clear()
}
function btnExpFile() {
  // 代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  expFile(graphicLayer)
}
function btnImpFile(file) {
  // 代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  impFile(graphicLayer, file)
}

// 定位至模型
var modelTest
function centerAtModel() {
  if (!modelTest) {
    modelTest = new mars3d.layer.TilesetLayer({
      url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
      position: { alt: 80.6 },
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      flyTo: true
    })
    map.addLayer(modelTest)
  }
}

function addGraphic_01(graphicLayer) {
  var graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [117.220337, 31.786107],
      [117.278695, 31.832987]
    ],
    style: {
      color: "#3388ff",
      opacity: 0.4,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)
}

function addGraphic_02(graphicLayer) {
  var graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [117.337109, 31.881802],
      [117.377109, 31.941802]
    ],
    style: {
      color: "rgba(255,0,0,0.5)",
      rotationDegree: 45,
      diffHeight: 1000.0,
      height: 100.0,
      outline: true, // height must be set for outline to display
      outlineColor: Cesium.Color.BLACK,

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
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_03(graphicLayer) {
  var rotation = Cesium.Math.toRadians(30)
  function getRotationValue() {
    rotation += 0.005
    return rotation
  }

  var graphic = new mars3d.graphic.RectangleEntity({
    positions: [
      [117.172852, 31.872736, 33.69],
      [117.251461, 31.956011, 26.44]
    ],
    style: {
      height: 100,
      image: "img/tietu/gugong.jpg",
      rotation: new Cesium.CallbackProperty(getRotationValue, false),
      stRotation: new Cesium.CallbackProperty(getRotationValue, false)
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_04(graphicLayer) {
  var graphicZP = new mars3d.graphic.RectangleEntity({
    positions: [
      [117.371661, 31.826814],
      [117.408131, 31.799931]
    ],
    style: {
      image: "img/tietu/hangpai.png",
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(graphicZP)
}

// function addGraphic_04(graphicLayer) {
//   var graphicZP = new mars3d.graphic.RectangleEntity({
//     positions: [
//       [112.577227713512, 37.9962695328675],
//       [112.580763278004, 37.9987875232216],
//     ],
//     style: {
//       color: '#00ff00',
//       clampToGround: true,
//     },
//   })
//   graphicLayer.addGraphic(graphicZP)

//   map.setCameraView({ lat: 37.996782, lng: 112.579535, alt: 1609, heading: 6, pitch: -83 })
// }
