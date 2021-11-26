
var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.653865, lng: 116.262622, alt: 54556, heading: 360, pitch: -60 }
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
  addGraphic_05(graphicLayer)
  addGraphic_06(graphicLayer)
  addGraphic_07(graphicLayer)
  addGraphic_08(graphicLayer)
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

// 按钮事件
function btnClear() {
  graphicLayer.clear()
}
function btnExpFile() {
  // eslint-disable-next-line no-undef
  expFile(graphicLayer)
}
function btnImpFile(file) {
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

//
function addGraphic_01(graphicLayer) {
  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: [116.1, 31.0, 1000],
    style: {
      radii: new Cesium.Cartesian3(2500.0, 2500.0, 1000.0),
      maximumConeDegree: 90, // 半球
      fill: false,
      subdivisions: 64,
      stackPartitions: 32,
      slicePartitions: 32,
      outline: true,
      outlineColor: Cesium.Color.YELLOW,

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        outlineColor: Cesium.Color.RED
      }
    },
    // 添加扫描面
    scanPlane: {
      step: 0.5, // 步长
      style: {
        color: "#ffff00",
        opacity: 0.4
      }
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(graphic)
}

//
function addGraphic_02(graphicLayer) {
  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: new mars3d.LatLngPoint(116.2, 31.0, 1000),
    style: {
      radii: new Cesium.Cartesian3(2500.0, 2500.0, 1000.0),
      maximumConeDegree: 90, // 半球
      color: Cesium.Color.RED.withAlpha(0.3),
      subdivisions: 128,
      stackPartitions: 32,
      slicePartitions: 32,
      outline: true,
      outlineColor: Cesium.Color.RED.withAlpha(0.7)
    },
    // 添加扫描面
    scanPlane: [
      { step: 0.9, style: { color: "#ffff00", minimumConeDegree: 70.0, maximumConeDegree: 90.0 } },
      { step: 0.9, style: { heading: 120, color: "#ffff00", minimumConeDegree: 70.0, maximumConeDegree: 90.0 } },
      { step: 0.9, style: { heading: 240, color: "#ffff00", minimumConeDegree: 70.0, maximumConeDegree: 90.0 } }
    ]
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_03(graphicLayer) {
  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: new mars3d.LatLngPoint(116.307258, 30.999546, 1239.2),
    style: {
      radii: 2500,
      maximumConeDegree: 90,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.EllipsoidElectric, {
        color: Cesium.Color.GREEN,
        speed: 5.0
      }),
      outline: false
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

//
function addGraphic_04(graphicLayer) {
  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: [116.4, 31.0, 1000],
    style: {
      radii: 2500,
      maximumConeDegree: 90,
      material: mars3d.MaterialUtil.createMaterialProperty(mars3d.MaterialType.EllipsoidWave, {
        color: "#00ffff",
        speed: 5.0
      }),
      outline: false
    }
  })
  graphicLayer.addGraphic(graphic)
}

//
function addGraphic_05(graphicLayer) {
  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: [116.1, 30.9, 1000],
    style: {
      radii: 2500,
      maximumConeDegree: 90, // 半球
      fill: false,
      subdivisions: 128,
      stackPartitions: 32,
      slicePartitions: 32,
      outline: true,
      outlineColor: "#f33349"
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 添加扫描面
  graphic.addScanPlane({
    type: "roll", // 扫描类型
    step: 0.5, // 步长
    style: {
      minimumConeDegree: -90.0,
      maximumConeDegree: 90.0
    }
  })
}

// 半圆顶球体
function addGraphic_06(graphicLayer) {
  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: new mars3d.LatLngPoint(116.2, 30.9, 1000),
    style: {
      radii: 2500,
      maximumConeDegree: 90,
      fill: false,
      outline: true,
      outlineColor: Cesium.Color.BLUE.withAlpha(0.6)
    }
  })
  graphicLayer.addGraphic(graphic)

  // 添加扫描面
  graphic.addScanPlane({
    type: "pitch", // 扫描类型
    step: 0.5, // 步长
    style: {
      roll: 90,
      minimumConeDegree: 0.0,
      maximumConeDegree: 180.0
    }
  })
}

// 含内半径 半圆顶球体
function addGraphic_07(graphicLayer) {
  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: new mars3d.LatLngPoint(116.3, 30.9, 1000),
    style: {
      radii: 2500,
      innerRadii: 1000,
      maximumConeDegree: 90,
      color: Cesium.Color.RED.withAlpha(0.3),
      outline: true
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 添加扫描面
  graphic.addScanPlane({
    step: 1.5, // 步长
    style: {
      innerRadii: 1000
    }
  })
}

// 被切开的含内半径 半圆顶球体
function addGraphic_08(graphicLayer) {
  var graphic = new mars3d.graphic.EllipsoidEntity({
    position: new mars3d.LatLngPoint(116.4, 30.9, 1000),
    style: {
      radii: 2500,
      innerRadii: 1000,
      minimumConeDegree: 20.0,
      maximumConeDegree: 90,
      color: Cesium.Color.YELLOW.withAlpha(0.3),
      outline: true
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 添加扫描面
  graphic.addScanPlane({
    step: 0.8, // 步长
    style: {
      innerRadii: 1000
    }
  })
}
