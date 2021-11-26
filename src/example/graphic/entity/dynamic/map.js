
var map
var graphicLayer

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      fxaa: true,
      center: { lat: 31.754913, lng: 117.248572, alt: 6220, heading: 357, pitch: -31 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  map.basemap = 2017 // 蓝色底图

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  // 加一些演示数据
  for (let i = 0; i < 20; i++) {
    const graphic = new mars3d.graphic.ModelEntity({
      attr: { index: i },
      style: {
        url: "//data.mars3d.cn/gltf/mars/qiche.gltf",
        scale: 0.5,
        minimumPixelSize: 20,

        // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
        highlight: {
          type: mars3d.EventType.click,
          silhouette: true,
          silhouetteColor: "#ff0000",
          silhouetteSize: 4
        },

        label: {
          // 不需要文字时，去掉label配置即可
          text: "皖A000" + i,
          font_size: 16,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          pixelOffsetY: -20,
          distanceDisplayCondition: true,
          distanceDisplayCondition_far: 50000,
          distanceDisplayCondition_near: 0
        }
      }
    })
    graphicLayer.addGraphic(graphic)

    // graphic.on(mars3d.EventType.stop, function (event) {
    //   console.log("已停止运行", event.target?.attr);
    // });
  }
  for (let i = 0; i < 20; i++) {
    const graphic = new mars3d.graphic.BillboardEntity({
      style: {
        image: "img/marker/mark3.png",
        scale: 0.6,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scaleByDistance: new Cesium.NearFarScalar(10000, 1.0, 500000, 0.1)
      }
    })
    graphicLayer.addGraphic(graphic)
  }
  for (let i = 0; i < 3; i++) {
    const graphic = new mars3d.graphic.DivUpLabel({
      style: {
        text: "火星科技",
        color: "#fff",
        font_size: 13,
        font_family: "微软雅黑",
        lineHeight: 20,
        circleSize: 5,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000)
      }
    })
    graphicLayer.addGraphic(graphic)
  }

  // 设置动态位置
  graphicLayer.eachGraphic((graphic) => {
    graphic.addDynamicPosition(randomPoint())
  })
  graphicLayer.eachGraphic((graphic) => {
    graphic.addDynamicPosition(randomPoint(), 20)
  })

  // 定时更新动态位置（setInterval为演示）
  setInterval(() => {
    graphicLayer.eachGraphic((graphic) => {
      graphic.addDynamicPosition(randomPoint(), 20)
    })
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
