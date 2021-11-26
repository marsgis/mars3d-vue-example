var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.78828, lng: 117.219198, alt: 6885, heading: 346, pitch: -62 }
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
}

function addPit(graphicLayer, positions, height) {
  console.log(JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 打印下边界

  var primitive = new mars3d.graphic.Pit({
    positions: positions,
    style: {
      diffHeight: height, // 井的深度
      image: "./img/textures/excavate_side_min.jpg",
      imageBottom: "./img/textures/excavate_bottom_min.jpg",
      splitNum: 50 // 井边界插值数
    }
  })
  graphicLayer.addGraphic(primitive)
}
// 绘制矩形
function drawExtent(height) {
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      // 构造井对象
      addPit(graphicLayer, positions, height)
    }
  })
}

// 绘制多边形
function drawPolygon(height) {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5
    },
    success: function (graphic) {
      // 绘制成功后回调
      var positions = graphic.positionsShow
      map.graphicLayer.clear()

      // 构造井对象
      addPit(graphicLayer, positions, height)
    }
  })
}
// 井的深度发生改变
function heightChange(num) {
  graphicLayer.eachGraphic((graphic) => {
    graphic.diffHeight = num
  })
}

// 开启深度监测
function depthTest(val) {
  map.scene.globe.depthTestAgainstTerrain = val
  if (val) {
    globalMsg("深度监测打开后，您将无法看到地下或被地形遮挡的对象。")
  }
}

function clear() {
  graphicLayer.clear() // 清除挖地区域
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.Pit({
    positions: [
      [117.216544, 31.835278, 40],
      [117.225898, 31.834257, 40],
      [117.226338, 31.828961, 40],
      [117.216592, 31.830586, 40]
    ],
    style: {
      diffHeight: 300, // 井的深度
      image: "./img/textures/excavate_side_min.jpg",
      imageBottom: "./img/textures/excavate_bottom_min.jpg",
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
  var primitive = new mars3d.graphic.Pit({
    positions: [
      [117.187572, 31.823074, 45.53],
      [117.195377, 31.82418, 43.36],
      [117.204541, 31.818933, 37.06],
      [117.19775, 31.809539, 36.59],
      [117.183832, 31.814237, 38.76]
    ],
    style: {
      diffHeight: 200, // 井的深度
      image: "./img/textures/excavate_kuangqu.jpg",
      imageBottom: "./img/textures/excavate_bottom_min.jpg",
      splitNum: 50 // 井边界插值数
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.Pit({
    positions: [
      [117.216386, 31.815376, 35.16],
      [117.222533, 31.81729, 29.21],
      [117.22642, 31.814983, 28.43],
      [117.22681, 31.810739, 28.55],
      [117.212868, 31.811302, 34.4],
      [117.212538, 31.81424, 31.87],
      [117.214681, 31.81402, 32.97]
    ],
    style: {
      diffHeight: 200, // 井的深度
      image: "./img/textures/excavate_side_min.jpg",
      imageBottom: "./img/textures/excavationregion_top.jpg",
      splitNum: 50 // 井边界插值数
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
