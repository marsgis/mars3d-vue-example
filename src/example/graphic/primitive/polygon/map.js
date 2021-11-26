var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.61982, lng: 117.230607, alt: 22746, heading: 2, pitch: -49 }
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
}

// 取区域内的随机图标
function randomPoint() {
  var jd = random(116.955684 * 1000, 117.474003 * 1000) / 1000
  var wd = random(31.7576 * 1000, 32.008782 * 1000) / 1000
  return Cesium.Cartesian3.fromDegrees(jd, wd)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.218662, 31.800226, 37.68],
      [117.227836, 31.800388, 32.98],
      [117.229831, 31.792927, 37.91],
      [117.222571, 31.791298, 37.04],
      [117.216327, 31.79375, 37.49]
    ],
    style: {
      color: "#00ffff",
      opacity: 0.4,
      // clampToGround: true,
      // classificationType: Cesium.ClassificationType.BOTH,

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        // type: mars3d.EventType.click,
        opacity: 0.8
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // 演示个性化处理graphic，代码在\js\graphicManager.js
  // initGraphicManager(primitive)
}

// 图片材质
function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.187572, 31.823074, 45.53],
      [117.195377, 31.82418, 43.36],
      [117.204541, 31.818933, 37.06],
      [117.19775, 31.809539, 36.59],
      [117.183832, 31.814237, 38.76]
    ],
    style: {
      image: "img/textures/excavate_bottom_min.jpg",

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

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
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
      materialType: mars3d.MaterialType.Water,
      normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
      frequency: 1000.0, // 控制波数的数字。
      animationSpeed: 0.01, // 控制水的动画速度的数字。
      amplitude: 10, // 控制水波振幅的数字。
      specularIntensity: 0.5, // 控制镜面反射强度的数字。
      baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
      blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

// 面状：草地面效果
function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.319966, 31.842082, 12.29],
      [117.330034, 31.835286, 11.07],
      [117.330576, 31.823452, 11.01],
      [117.311457, 31.821023, 17.11],
      [117.308954, 31.828975, 16.29]
    ],
    style: {
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.PolyGrass, {
        grassColor: new Cesium.Color(0.25, 0.4, 0.1, 1.0),
        dirtColor: new Cesium.Color(0.1, 0.1, 0.1, 1.0),
        patchiness: 1.5 // 斑驳
      })
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

// 面状：木材面效果
function addGraphic_a5(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.271662, 31.870639, 21.49],
      [117.290605, 31.871517, 19.47],
      [117.302056, 31.858145, 16.27],
      [117.299439, 31.847545, 14.77],
      [117.267705, 31.8491, 22.11]
    ],
    style: {
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.PolyWood, {
        lightWoodColor: new Cesium.Color(0.6, 0.3, 0.1, 1.0),
        darkWoodColor: new Cesium.Color(0.4, 0.2, 0.07, 1.0),
        ringFrequency: 10.0, // 环 频率
        noiseScale: new Cesium.Cartesian2(0.7, 0.5),
        grainFrequency: 27.0 // 波纹 频率
      })
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

// 面状：混合效果
function addGraphic_a6(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
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
      [117.151215, 31.844734],
      [117.154815, 31.853495]
    ],
    style: {
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.PolyBlob, {
        lightColor: new Cesium.Color(1.0, 1.0, 1.0, 0.5),
        darkColor: new Cesium.Color(0.0, 0.0, 1.0, 0.5),
        frequency: 30.0 // 次数
      })
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

// 面状： 柏油路面效果
function addGraphic_a7(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.208302, 31.85757],
      [117.234234, 31.858263],
      [117.234261, 31.833317],
      [117.207414, 31.834541],
      [117.208302, 31.85757]
    ],
    style: {
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.PolyAsphalt, {
        asphaltColor: new Cesium.Color(0.15, 0.15, 0.15, 1.0),
        bumpSize: 0.005, // 凹凸大小
        roughness: 0.2 // 粗糙
      })
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

// 面状：碎石面效果
function addGraphic_a8(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.268479, 31.836646, 25.53],
      [117.282362, 31.827581, 34.28],
      [117.275399, 31.813784, 30.59],
      [117.256533, 31.817975, 31.95],
      [117.254811, 31.830772, 35.99]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.PolyFacet, {
        lightColor: new Cesium.Color(0.25, 0.25, 0.25, 0.75),
        darkColor: new Cesium.Color(0.75, 0.75, 0.75, 0.75),
        frequency: 50.0 // 次数
      })
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a9(graphicLayer) {
  var primitive = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.261476, 31.799865, 20.8],
      [117.270864, 31.804957, 26],
      [117.289609, 31.804853, 25.4],
      [117.290861, 31.79569, 25.2],
      [117.268148, 31.788912, 18.5]
    ],
    style: {
      height: 50,
      diffHeight: 300,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.PolyGradient, {
        color: "#3388cc",
        alphaPower: 1.5
      }),
      label: {
        text: "Mars3D平台",
        font_family: "楷体",
        color: "#ffff00",
        font_size: 18,
        setHeight: 400
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

// 生成数据
function addData(count) {
  graphicLayer.clear()

  showLoading()

  var startTime = new Date().getTime()

  count = count * 10000

  for (var j = 0; j < count; ++j) {
    // eslint-disable-next-line no-undef
    var position = randomPoint()
    var pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 45, 500)
    var pt2 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 135, 500)
    var pt3 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 225, 500)
    var pt4 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 315, 500)

    var primitive = new mars3d.graphic.PolygonPrimitive({
      positions: [pt1, pt2, pt3, pt4, pt1],
      style: {
        height: random(30, 4000),
        color: Cesium.Color.fromRandom().withAlpha(0.7)
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

// 保存为GeoJson文件
function btnExpFile() {
  // eslint-disable-next-line no-undef
  expFile(graphicLayer)
}
// 打开GeoJson文件
function btnImpFile(file) {
  // eslint-disable-next-line no-undef
  impFile(graphicLayer, file)
}

// 清除数据
function btnClear() {
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
