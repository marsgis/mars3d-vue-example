var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.794762, lng: 116.332103, alt: 26889, heading: 7, pitch: -72 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 演示个性化处理graphic，代码在\common\script\graphicManager.js
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
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.CirclePrimitive({
    position: [116.282587, 30.859197, 544.31],
    style: {
      radius: 2000.0,
      color: "#00FFFF",
      opacity: 0.4,
      clampToGround: true,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
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

function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.CirclePrimitive({
    position: new mars3d.LatLngPoint(116.329199, 30.881595, 390.3),
    style: {
      radius: 1500.0,
      image: "img/textures/excavate_bottom_min.jpg"
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.CirclePrimitive({
    position: new mars3d.LatLngPoint(116.392526, 30.903729, 933.55),
    style: {
      radius: 1500.0,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.CircleWave, {
        color: "#FF0000",
        count: 1, // 圆圈数量
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.CirclePrimitive({
    position: [116.244399, 30.920459],
    style: {
      radius: 2000,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.ScanLine, {
        color: new Cesium.Color(1.0, 1.0, 0.0, 1.0),
        speed: 10
      })
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a5(graphicLayer) {
  var primitive = new mars3d.graphic.CirclePrimitive({
    position: new mars3d.LatLngPoint(116.37617, 30.847384, 396.12),
    style: {
      radius: 900.0,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.CircleWave, {
        color: "#ffff00",
        count: 3, // 圆圈数量
        speed: 20,
        gradient: 0.1
      })
    }
  })
  graphicLayer.addGraphic(primitive) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_a6(graphicLayer) {
  var primitive = new mars3d.graphic.CirclePrimitive({
    position: new mars3d.LatLngPoint(116.258301, 30.979046, 1483.7),
    style: {
      radius: 1200.0,
      clampToGround: true,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.RadarWave, {
        color: "#00ffff",
        speed: 10
      })
    }
  })
  graphicLayer.addGraphic(primitive) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_a7(graphicLayer) {
  var primitive = new mars3d.graphic.CirclePrimitive({
    position: new mars3d.LatLngPoint(116.318342, 30.972578, 1431.9),
    style: {
      radius: 1200.0,
      clampToGround: true,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.RadarLine, {
        color: "#00ff00",
        speed: 10
      })
    }
  })
  graphicLayer.addGraphic(primitive) // 还可以另外一种写法: graphic.addTo(graphicLayer)
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
