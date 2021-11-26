var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.81008, lng: 117.291538, alt: 5537, heading: 282, pitch: -38 }
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
}

function addGraphic_a1(graphicLayer) {
  var primitive = new mars3d.graphic.Water({
    positions: [
      [117.218662, 31.800226, 37.68],
      [117.227836, 31.800388, 32.98],
      [117.229831, 31.792927, 37.91],
      [117.222571, 31.791298, 37.04],
      [117.216327, 31.79375, 37.49]
    ],
    style: {
      height: 3, // 水面高度
      normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
      frequency: 8000.0, // 控制波数的数字。
      animationSpeed: 0.02, // 控制水的动画速度的数字。
      amplitude: 5.0, // 控制水波振幅的数字。
      specularIntensity: 0.8, // 控制镜面反射强度的数字。
      baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
      blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
      opacity: 0.7, // 透明度
      clampToGround: false, // 是否贴地
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

function addGraphic_a2(graphicLayer) {
  var primitive = new mars3d.graphic.Water({
    positions: [
      [117.187572, 31.823074, 45.53],
      [117.195377, 31.82418, 43.36],
      [117.204541, 31.818933, 37.06],
      [117.19775, 31.809539, 36.59],
      [117.183832, 31.814237, 38.76]
    ],
    style: {
      height: 3, // 水面高度
      normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
      frequency: 8000.0, // 控制波数的数字。
      animationSpeed: 0.02, // 控制水的动画速度的数字。
      amplitude: 5.0, // 控制水波振幅的数字。
      specularIntensity: 0.8, // 控制镜面反射强度的数字。
      baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
      blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
      opacity: 0.7, // 透明度
      clampToGround: true // 是否贴地
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法

  // entity转geojson
  var geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphic_a3(graphicLayer) {
  var primitive = new mars3d.graphic.Water({
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
      normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
      frequency: 8000.0, // 控制波数的数字。
      animationSpeed: 0.02, // 控制水的动画速度的数字。
      amplitude: 5.0, // 控制水波振幅的数字。
      specularIntensity: 0.8, // 控制镜面反射强度的数字。
      baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
      blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
      opacity: 0.6, // 透明度
      clampToGround: true, // 是否贴地

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.9
      }
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}

function addGraphic_a4(graphicLayer) {
  var primitive = new mars3d.graphic.Water({
    positions: [
      [117.208302, 31.85757],
      [117.234234, 31.858263],
      [117.234261, 31.833317],
      [117.207414, 31.834541],
      [117.208302, 31.85757]
    ],
    style: {
      height: 100, // 水面高度
      diffHeight: 700,
      normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
      frequency: 8000.0, // 控制波数的数字。
      animationSpeed: 0.02, // 控制水的动画速度的数字。
      amplitude: 5.0, // 控制水波振幅的数字。
      specularIntensity: 0.8, // 控制镜面反射强度的数字。
      baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
      blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
      opacity: 0.6, // 透明度
      clampToGround: false // 是否贴地
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
