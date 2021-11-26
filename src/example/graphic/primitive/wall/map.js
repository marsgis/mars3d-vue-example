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
  addGraphic_a1()
  addGraphic_a2()
  addGraphic_a3()
  addGraphic_a4()
  addGraphic_a5()
  addGraphic_a6()
  addGraphic_a7()
  addGraphic_a8()
  queryAreasData()
}

function addGraphic_a1() {
  var primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.153945, 31.881122, 36.4],
      [117.168352, 31.880147, 32.6],
      [117.178047, 31.885925, 29.25]
    ],
    style: {
      diffHeight: 200,
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
  graphicLayer.addGraphic(primitive)

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initGraphicManager(primitive)
}

function addGraphic_a2() {
  var primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.208302, 31.85757],
      [117.234234, 31.858263],
      [117.234261, 31.833317],
      [117.207414, 31.834541]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/arrow.png",
        color: Cesium.Color.CHARTREUSE,
        repeat: new Cesium.Cartesian2(30, 1),
        speed: 20 // 速度，建议取值范围1-100
      })
    }
  })
  graphicLayer.addGraphic(primitive)

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_a3() {
  // 圆形时
  var positions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: Cesium.Cartesian3.fromDegrees(117.276257, 31.866351, 19.57),
    radius: 1200, // 半径
    count: 50 // 共返回(count*4)个点
  })

  var primitive = new mars3d.graphic.WallPrimitive({
    positions: positions,
    style: {
      diffHeight: 800,
      closure: true,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/fence.png",
        color: "#ffff00",
        speed: 10, // 速度，建议取值范围1-100
        axisY: true
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a4() {
  var primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.154815, 31.853495],
      [117.181255, 31.854257],
      [117.182284, 31.848255],
      [117.184748, 31.840141],
      [117.180557, 31.835556],
      [117.180023, 31.833741],
      [117.166846, 31.833737],
      [117.155531, 31.833151],
      [117.154787, 31.835978],
      [117.151994, 31.839036],
      [117.150691, 31.8416],
      [117.151215, 31.844734]
    ],
    style: {
      closure: true,
      diffHeight: 700,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        // 动画线材质
        image: "img/textures/fence.png",
        axisY: true,
        color: "#ff0000",
        speed: 10 // 速度，建议取值范围1-100
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a5() {
  var primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.229659, 31.908221],
      [117.240804, 31.908175]
    ],
    style: {
      diffHeight: 500,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        // 动画线材质
        image: "img/textures/fence.png",
        axisY: true,
        color: "#ff0000",
        hasImage2: true,
        image2: "img/textures/tanhao.png",
        color2: "#ffff00",
        speed: 10 // 速度，建议取值范围1-100
      }),
      label: {
        text: "我是墙",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a6() {
  var primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.169646, 31.769171],
      [117.194579, 31.806466]
    ],
    style: {
      diffHeight: 400,
      image: "img/textures/movingRiver.png"
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a7() {
  var primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.353776, 31.887406, 21.2],
      [117.321028, 31.887207, 21.3],
      [117.290341, 31.902469, 15.1]
    ],
    style: {
      diffHeight: 400,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/arrow.png",
        color: "#00eba8",
        repeat: new Cesium.Cartesian2(20, 1),
        speed: 20 // 速度，建议取值范围1-100
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphic_a8() {
  var primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.251382, 31.824055, 28.4],
      [117.278989, 31.819766, 27.3],
      [117.279566, 31.799699, 3.9],
      [117.265249, 31.797702, 26.3],
      [117.245146, 31.811783, 29]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.WallScroll, {
        image: "img/textures/fence.png",
        color: Cesium.Color.CHARTREUSE,
        count: 3,
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(primitive)

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

// 显示合肥市边界
function addGraphic_a9(data) {
  const arr = mars3d.Util.geoJsonToGraphics(data) // 解析geojson
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    var primitive = new mars3d.graphic.WallPrimitive({
      positions: item.positions,
      style: {
        diffHeight: 3000,
        material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
          image: "img/textures/fence.png",
          color: "#bdf700",
          repeat: new Cesium.Cartesian2(5, 1),
          axisY: true, // 方向，true时上下，false左右
          speed: 10 // 速度，建议取值范围1-100
        })
      },
      attr: item.attr
    })
    graphicLayer.addGraphic(primitive)
    primitive.bindTooltip("合肥欢迎您 - 火星科技")
  }
}

// 数据获取
function queryAreasData() {
  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/areas/340100.json" })
    .then(function (data) {
      addGraphic_a9(data)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
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
