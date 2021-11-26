
var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.756263, lng: 117.209077, alt: 7696, heading: 5, pitch: -33 }
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
  addGraphic_a1(graphicLayer)
  addGraphic_a2(graphicLayer)
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


function addGraphic_a1(graphicLayer) {
  var property = new Cesium.SampledPositionProperty()
  var tempTime

  // 起点
  tempTime = map.clock.currentTime // 飞行开始时间
  property.addSample(tempTime, Cesium.Cartesian3.fromDegrees(117.172852, 31.862736, 50))

  // 移动到的第1个目标点
  tempTime = Cesium.JulianDate.addSeconds(tempTime, 120, new Cesium.JulianDate())
  property.addSample(tempTime, Cesium.Cartesian3.fromDegrees(117.251461, 31.856011, 50))

  // 移动到的第2个目标点
  tempTime = Cesium.JulianDate.addSeconds(tempTime, 120, new Cesium.JulianDate())
  property.addSample(tempTime, Cesium.Cartesian3.fromDegrees(117.265321, 31.876336, 50))

  tempTime = Cesium.JulianDate.addSeconds(tempTime, 600, new Cesium.JulianDate())
  property.addSample(tempTime, Cesium.Cartesian3.fromDegrees(117.160215, 31.890639, 50))

  var graphic = new mars3d.graphic.PathEntity({
    position: property,
    style: {
      width: 2,
      color: "#ffff00",
      opacity: 1.0,

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        type: mars3d.EventType.click,
        color: "#ff0000"
      }
    },
    label: {
      text: "火星1号",
      font_size: 19,
      font_family: "楷体",
      color: Cesium.Color.AZURE,
      outline: true,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(10, -25) // 偏移量
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/wrj.glb",
      scale: 0.5,
      minimumPixelSize: 40
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addGraphic_a2(graphicLayer) {
  var graphic = new mars3d.graphic.PathEntity({
    style: {
      width: 2,
      color: "#00ffff",
      opacity: 1.0,
      leadTime: 0, // 前方的路线不显示

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        type: mars3d.EventType.click,
        color: "#ff0000"
      }
    },
    label: {
      text: "火星车",
      font_size: 18,
      font_family: "楷体",
      color: Cesium.Color.AZURE,
      outline: true,
      outlineColor: Cesium.Color.BLACK,
      outlineWidth: 2,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(10, -25) // 偏移量
    },
    model: {
      url: "//data.mars3d.cn/gltf/mars/qiche.gltf",
      scale: 0.5,
      minimumPixelSize: 30
    }
  })
  graphicLayer.addGraphic(graphic)

  graphic.addDynamicPosition(randomPoint(), 0)
  graphic.addDynamicPosition(randomPoint(), 20)

  // 定时更新动态位置（setInterval为演示）
  setInterval(() => {
    graphic.addDynamicPosition(randomPoint(), 20)
  }, 20000)
}

// 取区域内的随机图标
function randomPoint() {
  var jd = random(117.207666 * 1000, 117.287241 * 1000) / 1000
  var wd = random(31.817099 * 1000, 31.876848 * 1000) / 1000
  return Cesium.Cartesian3.fromDegrees(jd, wd, 30)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
