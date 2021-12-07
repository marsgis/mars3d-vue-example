import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.51363, lng: 117.278891, alt: 46241, heading: 2, pitch: -49 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  initLayerManager()

  // 加一些演示数据
  addGraphicDemo1(graphicLayer)
  addGraphicDemo2(graphicLayer)
  addGraphicDemo3(graphicLayer)
  addGraphicDemo4(graphicLayer)
  addGraphicDemo5(graphicLayer)
  addGraphicDemo6(graphicLayer)
  addGraphicDemo7(graphicLayer)
  addGraphicDemo8(graphicLayer)
  addGraphicDemo9(graphicLayer)
  addGraphicDemo10(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  clearLayer()
}

export function addPrimitiveData(count) {
  graphicLayer.clear()

  showLoading()

  const startTime = new Date().getTime()

  count = count * 10000

  for (let j = 0; j < count; ++j) {
    const position = randomPoint()
    const pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, random(0, 360), 600)

    const primitive = new mars3d.graphic.PolylinePrimitive({
      positions: [pt1, position],
      style: {
        width: 4,
        color: Cesium.Color.fromRandom().withAlpha(0.9)
      },
      tooltip: "第" + j + "个"
    })
    graphicLayer.addGraphic(primitive)
  }

  hideLoading()
  const endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  const usedTime = (endTime - startTime) / 1000

  globalMsg("共耗时" + usedTime.toFixed(2) + "秒")
}

export function clearLayer() {
  graphicLayer.clear()
}

// 取区域内的随机图标
function randomPoint() {
  const jd = random(116.955684 * 1000, 117.474003 * 1000) / 1000
  const wd = random(31.7576 * 1000, 32.008782 * 1000) / 1000
  const height = random(700, 5000)
  return Cesium.Cartesian3.fromDegrees(jd, wd, height)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function addGraphicDemo1(graphicLayer) {
  const primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.220337, 31.832987],
      [117.220242, 31.835234],
      [117.216263, 31.835251],
      [117.217219, 31.819929],
      [117.223096, 31.818342],
      [117.249686, 31.818964],
      [117.263171, 31.816664],
      [117.278695, 31.816107],
      [117.279826, 31.804185],
      [117.286308, 31.804112],
      [117.28621, 31.801059]
    ],
    style: {
      width: 4,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineTrail, {
        color: Cesium.Color.CHARTREUSE,
        speed: 5
      }),
      clampToGround: true,

      label: {
        text: "我是线",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive)

  initGraphicManager(primitive)
}

function addGraphicDemo2(graphicLayer) {
  const primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.172852, 31.862736, 33.69],
      [117.251461, 31.856011, 26.44]
    ],
    style: {
      width: 6,
      materialType: mars3d.MaterialType.PolylineDash, // 虚线
      dashLength: 20,
      color: Cesium.Color.RED,

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        // type: mars3d.EventType.click,
        materialType: mars3d.MaterialType.Color
      }
    }
  })
  graphicLayer.addGraphic(primitive)

  // entity转geojson
  const geojson = primitive.toGeoJSON()
  console.log(geojson)
}

function addGraphicDemo3(graphicLayer) {
  const primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.358187, 31.838662, 12.23],
      [117.4384, 31.819405, 11.78]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlowColor, {
        color: "#FFFF00",
        speed: 10,
        percent: 0.15,
        alpha: 0.2
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo4(graphicLayer) {
  const primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.348938, 31.805369, 7.63],
      [117.429496, 31.786715, 8.41]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        color: "#1a9850",
        image: "img/textures/ArrowOpacity.png",
        speed: 10
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo5(graphicLayer) {
  const primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.313682, 31.7416, 10.85],
      [117.311934, 31.774753, 19.71],
      [117.305473, 31.800304, 23.86]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "./img/textures/arrow2.png",
        axisY: false,
        repeat: new Cesium.Cartesian2(20.0, 1.0),
        color: "#ffff00",
        speed: 40
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo6(graphicLayer) {
  const primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.169646, 31.769171],
      [117.194579, 31.806466]
    ],
    style: {
      width: 3,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.ODLine, {
        color: "#FF0000",
        speed: 5 + 1.0 * Math.random(),
        startTime: Math.random()
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo7(graphicLayer) {
  const startPoint = Cesium.Cartesian3.fromDegrees(117.025419, 32.00651, 51.2)
  const endPoint = Cesium.Cartesian3.fromDegrees(117.323963, 32.050384, 33.8)
  const positions = mars3d.PolyUtil.getLinkedPointList(startPoint, endPoint, 20000, 50) // 计算曲线点

  const primitive = new mars3d.graphic.PolylinePrimitive({
    positions: positions,
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        color: Cesium.Color.CHARTREUSE,
        image: "img/textures/lineClr.png",
        speed: 15
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo8(graphicLayer) {
  const primitive = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.225811, 31.772658, 28],
      [117.251371, 31.771603, 24.8],
      [117.24979, 31.739408, 25.4],
      [117.229487, 31.751584, 27.5]
    ],
    style: {
      width: 5,
      closure: true,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlicker, {
        color: new Cesium.Color(0.0, 1.0, 0.0, 0.7),
        speed: 5
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo9(graphicLayer) {
  const graphic = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.208284, 31.809663, 36.2],
      [117.221568, 31.793622, 32.7],
      [117.271391, 31.797771, 24.3]
    ],
    style: {
      width: 5,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlowColor, {
        color: "#00ffff",
        speed: 10,
        percent: 0.15,
        alpha: 0.2
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addGraphicDemo10(graphicLayer) {
  const colors = []
  for (let i = 0; i < 7; ++i) {
    colors.push(Cesium.Color.fromRandom({ alpha: 1.0 }))
  }

  const graphic = new mars3d.graphic.PolylinePrimitive({
    positions: [
      [117.063958, 31.831931, 35.1],
      [117.094926, 31.83328, 33.3],
      [117.099639, 31.812169, 30.9],
      [117.120429, 31.811357, 32.3],
      [117.120415, 31.785387, 21.3],
      [117.142865, 31.784693, 23.6],
      [117.142902, 31.784508, 23.6]
    ],
    style: {
      width: 5,
      colors: colors // 每一段都不同颜色,
      // colorsPerVertex: true,
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 显示隐藏 绑定popup和tooltip和右键菜单以及是否编辑
function bindShowHide(val) {
  graphicLayer.show = val
}

function bindPopup(val) {
  if (val) {
    bindLayerPopup()
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
    bindLayerContextMenu()
  } else {
    graphicLayer.unbindContextMenu(true)
  }
}

// 在图层级处理一些事物
function initLayerManager() {
  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  /* graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听layer，鼠标移入了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听layer，鼠标移出了矢量对象", event)
  }) */

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerPopup()

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu()
}

// 绑定图层的弹窗
function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr || {}
    attr.test1 = "测试属性"
    // attr["视频"] = `<video src='http://data.mars3d.cn/file/video/lukou.mp4' controls autoplay style="width: 300px;" ></video>`;

    return mars3d.Util.getTemplateHtml({ title: "layer上绑定的Popup", template: "all", attr: attr })
  })
}

// 绑定右键菜单
function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.startEditing) {
          return false
        }
        return !graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.stopEditing(graphic)
        }
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "polyline" ||
          graphic.type === "polylineP" ||
          graphic.type === "curve" ||
          graphic.type === "curveP" ||
          graphic.type === "polylineVolume" ||
          graphic.type === "polylineVolumeP" ||
          graphic.type === "corridor" ||
          graphic.type === "corridorP" ||
          graphic.type === "wall" ||
          graphic.type === "wallP"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP" ||
          graphic.type === "scrollWall" ||
          graphic.type === "water"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}

// 也可以在单个Graphic上做个性化管理及绑定操作
function initGraphicManager(graphic) {
  // 3.在graphic上绑定监听事件
  /* graphic.on(mars3d.EventType.click, function (event) {
    console.log("监听graphic，单击了矢量对象", event)
  })
  graphic.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听graphic，鼠标移入了矢量对象", event)
  })
  graphic.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听graphic，鼠标移出了矢量对象", event)
  }) */

  // 绑定Tooltip
  // graphic.bindTooltip('我是graphic上绑定的Tooltip') //.openTooltip()

  // 绑定Popup
  const inthtml = `<table style="width: auto;">
            <tr>
              <th scope="col" colspan="2" style="text-align:center;font-size:15px;">我是graphic上绑定的Popup </th>
            </tr>
            <tr>
              <td>提示：</td>
              <td>这只是测试信息，可以任意html</td>
            </tr>
          </table>`
  graphic.bindPopup(inthtml).openPopup()

  // 绑定右键菜单
  graphic.bindContextMenu([
    {
      text: "删除对象[graphic绑定的]",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        const graphic = e.graphic
        if (graphic) {
          graphic.remove()
        }
      }
    }
  ])

  // 测试 颜色闪烁
  if (graphic.startFlicker) {
    graphic.startFlicker({
      time: 20, // 闪烁时长（秒）
      maxAlpha: 0.5,
      color: Cesium.Color.YELLOW,
      onEnd: function () {
        // 结束后回调
      }
    })
  }
}
