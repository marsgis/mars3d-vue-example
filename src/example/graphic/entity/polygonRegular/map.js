var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  const mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.404343, lng: 117.327155, alt: 46410, heading: 2, pitch: -49 }
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
    type: "regular",
    style: {
      border: 3, // 多边形边数量
      color: "#29cf34",
      opacity: 0.5,
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
    type: "regular",
    style: {
      color: "#00ff00",
      opacity: 0.5,
      diffHeight: 300
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
  const graphic = new mars3d.graphic.Regular({
    positions: [
      [117.237988, 31.827364, 30]
      // [117.180234, 31.826722, 30],
    ],
    style: {
      border: 3, // 多边形边数量
      radius: 5000,
      startAngle: 0, // 开始角度(正东方向为0,顺时针到360度)

      color: "#3388ff",
      opacity: 0.5,
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
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)
}

function addGraphic_02(graphicLayer) {
  const graphic = new mars3d.graphic.Regular({
    position: [117.357442, 31.854502, 30],
    style: {
      border: 4, // 多边形边数量
      radius: 3000,
      startAngle: 20, // 开始角度(正东方向为0,顺时针到360度)
      clampToGround: true,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.Image, {
        image: "img/textures/laker_surface.jpg",
        color: Cesium.Color.WHITE.withAlpha(0.8) // 透明度处理
      })
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_03(graphicLayer) {
  const graphic = new mars3d.graphic.Regular({
    position: [117.250028, 31.729021, 30],
    style: {
      border: 5, // 多边形边数量
      radius: 3000,
      startAngle: 30, // 开始角度(正东方向为0,顺时针到360度)
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.Water, {
        normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
        frequency: 8000.0, // 控制波数的数字。
        animationSpeed: 0.02, // 控制水的动画速度的数字。
        amplitude: 5.0, // 控制水波振幅的数字。
        specularIntensity: 0.8, // 控制镜面反射强度的数字。
        baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
        blendColor: "#006ab4" // 从水中混合到非水域时使用的rgba颜色对象。
      })
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_04(graphicLayer) {
  const graphic = new mars3d.graphic.Regular({
    position: [117.371943, 31.765769, 15.6],
    style: {
      border: 6, // 多边形边数量
      radius: 3000,
      startAngle: 40, // 开始角度(正东方向为0,顺时针到360度)
      diffHeight: 2000.0,
      color: Cesium.Color.YELLOW,
      opacity: 0.5,
      closeTop: false,
      closeBottom: false,

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.9
      }
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}
