import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

export const eventTarget = new mars3d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.622151, lng: 117.274595, alt: 28451, heading: 2, pitch: -49 },
    logarithmicDepthBuffer: false // 对数深度缓冲区[当 贴地面 出现 阴影体 时设置下]
  }
}
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  mars3d.DrawUtil.setAllEditPointStyle({
    type: mars3d.GraphicType.point // 支持设置type指定编辑点类型,默认是pointP
  })

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
  addDemoGraphic3(graphicLayer)
  addDemoGraphic4(graphicLayer)
  addDemoGraphic5(graphicLayer)
  addDemoGraphic6(graphicLayer)
  addDemoGraphic7(graphicLayer)
  addDemoGraphic8(graphicLayer)
  addDemoGraphic9(graphicLayer)
  addDemoGraphic10(graphicLayer)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null

  graphicLayer.remove()
  graphicLayer = null
}

function addDemoGraphic1(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [117.271662, 31.870639, 21.49],
      [117.290605, 31.871517, 19.47],
      [117.302056, 31.858145, 16.27],
      [117.299439, 31.847545, 14.77],
      [117.267705, 31.8491, 22.11]
    ],
    style: {
      color: "#3388ff",
      opacity: 0.5,
      outline: true,
      // outlineWidth: 3,
      // outlineColor: "#ffffff",
      outlineStyle: {
        width: 10,
        materialType: mars3d.MaterialType.LineBloom,
        materialOptions: {
          color: "#00BBFF",
          glow: 3.0,
          showRatio: -0.5,
          speed: 0
        }
      },
      label: {
        text: "我是火星科技",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic2(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [117.187572, 31.823074, 45.53],
      [117.195377, 31.82418, 43.36],
      [117.204541, 31.818933, 37.06],
      [117.19775, 31.809539, 36.59],
      [117.183832, 31.814237, 38.76]
    ],
    style: {
      materialType: mars3d.MaterialType.Image,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/poly-soil.jpg",
        opacity: 0.8 // 透明度
      },
      clampToGround: true
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 测试整体平移
  setTimeout(function () {
    const centerNew = [117.169529, 31.841169, 235.3]
    const positionsNew = mars3d.PolyUtil.movePoints(graphic.positions, {
      center: centerNew
    })
    graphic.positions = positionsNew
  }, 6000)
}

function addDemoGraphic3(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonEntity({
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
      materialOptions: {
        normalMap: "https://data.mars3d.cn/img/textures/waterNormals.jpg", // 水正常扰动的法线图
        frequency: 1000.0, // 控制波数的数字。
        animationSpeed: 0.01, // 控制水的动画速度的数字。
        amplitude: 10, // 控制水波振幅的数字。
        specularIntensity: 0.5, // 控制镜面反射强度的数字。
        baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
        blendColor: "#006ab4" // 从水中混合到非水域时使用的rgba颜色对象。
      },
      clampToGround: true
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic4(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [117.183593, 31.856606, 32.1],
      [117.197665, 31.86613, 33.9],
      [117.213155, 31.854726, 28.6],
      [117.203837, 31.842409, 30.4],
      [117.186741, 31.845103, 45.5]
    ],
    style: {
      color: "#00ff00",
      diffHeight: 2000.0,
      closeTop: false,
      closeBottom: false,
      opacity: 0.5,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic5(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [117.261476, 31.799865, 20.8],
      [117.270864, 31.804957, 26],
      [117.289609, 31.804853, 25.4],
      [117.290861, 31.79569, 25.2],
      [117.268148, 31.788912, 18.5]
    ],
    style: {
      height: 50,
      diffHeight: 200,

      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "#3388cc",
        alphaPower: 1.5
      },

      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        type: "click",
        materialOptions: {
          color: "#ff0000",
          alphaPower: 1.5
        }
      }
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic6(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      // 外环
      [
        [117.24679, 31.835806, 35.8],
        [117.258539, 31.832093, 36],
        [117.254762, 31.8219, 33.3],
        [117.24656, 31.8196, 24.8],
        [117.240134, 31.827664, 27.4]
      ],
      // 内环
      [
        [117.247433, 31.829648, 33.4],
        [117.253809, 31.828713, 33],
        [117.252086, 31.824081, 32.6],
        [117.247597, 31.825922, 31.6]
      ]
    ],
    style: {
      color: "#ffff00",
      opacity: 0.6
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic7(graphicLayer) {
  // const extent = { xmin: 73.0, xmax: 136.0, ymin: 3.0, ymax: 59.0 } //中国区域
  const extent = { xmin: 117.153681, xmax: 117.243941, ymin: 31.668831, ymax: 31.731177 } // 合肥南

  const circleOuterPositions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: [117.198898, 31.702784, 8],
    radius: 1000
  })

  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      // 外环
      [
        [extent.xmin, extent.ymax],
        [extent.xmin, extent.ymin],
        [extent.xmax, extent.ymin],
        [extent.xmax, extent.ymax],
        [extent.xmin, extent.ymax]
      ],
      // 内环
      mars3d.LngLatArray.toArray(circleOuterPositions)
    ],
    style: {
      fill: true,
      color: "rgb(2,26,79)",
      opacity: 0.9,
      outline: true,
      outlineColor: "#39E09B",
      outlineWidth: 4,
      outlineOpacity: 0.8,
      arcType: Cesium.ArcType.GEODESIC,
      clampToGround: true
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic8(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [117.152677, 31.800113, 27.9],
      [117.13312, 31.790543, 24.8],
      [117.144908, 31.761589, 12],
      [117.165334, 31.759237, 17.1]
    ],
    style: {
      textureCoordinates: new Cesium.PolygonHierarchy([
        new Cesium.Cartesian2(1, 1),
        new Cesium.Cartesian2(1, 0),
        new Cesium.Cartesian2(0, 0),
        new Cesium.Cartesian2(0, 1)
      ]),
      materialType: mars3d.MaterialType.Image2,
      materialOptions: {
        image: "https://data.mars3d.cn/img/map/gugong.jpg"
      }
    },
    attr: { remark: "示例8" }
    // hasEdit: false
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic9(graphicLayer) {
  const startTime = map.clock.startTime
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: {
      type: "time", // 时序动态坐标
      list: [
        {
          time: Cesium.JulianDate.addSeconds(startTime, 5, new Cesium.JulianDate()), // 也可以是 时间字符串
          positions: [
            [117.180746, 31.773744, 20.9],
            [117.188914, 31.778811, 24.7],
            [117.190797, 31.770772, 22],
            [117.19479, 31.766086, 22.2],
            [117.186984, 31.7629, 19.6],
            [117.182816, 31.767857, 19.9]
          ]
        },
        {
          time: Cesium.JulianDate.addSeconds(startTime, 10, new Cesium.JulianDate()),
          pauseTime: 4,
          positions: [
            [117.249277, 31.772246, 42.2],
            [117.253676, 31.776569, 22.6],
            [117.25947, 31.769772, 21],
            [117.264241, 31.763922, 18.6],
            [117.258261, 31.75841, 19.1],
            [117.252132, 31.763979, 21.2]
          ]
        },
        {
          time: Cesium.JulianDate.addSeconds(startTime, 20, new Cesium.JulianDate()),
          positions: [
            [117.2595, 31.78408, 19.9],
            [117.273542, 31.768839, 18.5],
            [117.272887, 31.749433, 15.6],
            [117.261442, 31.749063, 18.7],
            [117.244574, 31.754935, 20.1],
            [117.244313, 31.778447, 29.9]
          ]
        }
      ],
      interpolation: true // setInterpolationOptions插值
    },
    style: {
      color: "#3388ff",
      opacity: 0.5,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        color: "#ff0000"
      }
    },
    attr: { remark: "示例9" }
  })
  graphicLayer.addGraphic(graphic)
}
// 渐变面
function addDemoGraphic10(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [117.308161, 31.907334, 16.9],
      [117.302609, 31.877667, 12.2],
      [117.337423, 31.873329, 13.6],
      [117.340994, 31.902117, 19.7]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "#004DFF",
        isInner: true,
        alphaPower: 2.6,
        diffusePower: 1.3
      }
    },
    attr: { remark: "示例10" }
  })
  graphicLayer.addGraphic(graphic)
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 0, result.radius)
    const pt2 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 72, result.radius)
    const pt3 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 144, result.radius)
    const pt4 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 216, result.radius)
    const pt5 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 288, result.radius)

    const graphic = new mars3d.graphic.PolygonEntity({
      positions: [pt1, pt2, pt3, pt4, pt5],
      style: {
        color: Cesium.Color.fromRandom({ alpha: 0.6 })
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 开始绘制
export async function startDrawGraphic() {
  const graphic = await graphicLayer.startDraw({
    type: "polygon",
    style: {
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
  // graphic.positions = mars3d.PointUtil.setPositionsHeight(graphic.positionsShow, 2000)
  console.log("标绘完成", graphic.toJSON())
}

// 开始绘制 立体面
export async function startDrawGraphic2() {
  const graphic = await graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#00ff00",
      opacity: 0.5,
      diffHeight: 300
    }
  })
  console.log("标绘完成", graphic.toJSON())
}

// 在图层绑定Popup弹窗
export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    attr["类型"] = event.graphic.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })
  })
}

// 绑定右键菜单
export function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return !graphic.isEditing
      },
      callback: (e) => {
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
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphic.stopEditing()
        }
      }
    },
    {
      text: "复制",
      icon: "fa fa-copy",
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          map.contextmenu.copyGraphic = graphic.toJSON() // map内置右键中"粘贴"菜单使用
          map.contextmenu.copyGraphic.layerId = graphicLayer.id
        }
      }
    },
    {
      text: "剪切",
      icon: "fa fa-scissors",
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          map.contextmenu.copyGraphic = graphic.toJSON() // map内置右键中"粘贴"菜单使用
          map.contextmenu.copyGraphic.layerId = graphicLayer.id

          graphic.remove(true) // 移除原有对象
        }
      }
    },
    {
      text: "还原编辑(还原到初始)",
      icon: "fa fa-pencil",
      show: (event) => {
        function hasRestore(graphic) {
          if (!graphic || !graphic.hasEdit || !graphic.isEditing) {
            return false
          }
          return graphic.editing?.hasRestore()
        }

        const graphic = event.graphic
        if (hasRestore(graphic)) {
          return true
        }
        if (graphic.isPrivate && graphic.parent) {
          return hasRestore(graphic.parent) // 右击是编辑点时
        }
        return false
      },
      callback: (event) => {
        const graphic = event.graphic
        if (graphic.editing?.restore) {
          graphic.editing.restore() // 撤销编辑，可直接调用
        } else if (graphic.parent?.editing?.restore) {
          graphic.parent.editing.restore() // 右击是编辑点时
        }
      }
    },
    {
      text: "撤销编辑(还原到上一步)",
      icon: "fa fa-pencil",
      show: (event) => {
        function hasRevoke(graphic) {
          if (!graphic || !graphic.hasEdit || !graphic.isEditing) {
            return false
          }
          return graphic.editing?.hasRevoke()
        }

        const graphic = event.graphic
        if (hasRevoke(graphic)) {
          return true
        }
        if (graphic.isPrivate && graphic.parent) {
          return hasRevoke(graphic.parent) // 右击是编辑点时
        }
        return false
      },
      callback: (event) => {
        const graphic = event.graphic
        if (graphic.editing?.revoke) {
          graphic.editing.revoke() // 撤销编辑，可直接调用
        } else if (graphic.parent?.editing?.revoke) {
          graphic.parent.editing.revoke() // 右击是编辑点时
        }
      }
    },
    {
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy || graphic.isPrivate || graphic.graphicIds) {
          return false
        } else {
          return true
        }
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        const parent = graphic.parent // 右击是编辑点时
        graphicLayer.removeGraphic(graphic)
        if (parent) {
          graphicLayer.removeGraphic(parent)
        }
      }
    },
    {
      text: "查看聚合列表",
      icon: "fa fa-info",
      show: (event) => {
        const graphic = event.graphic
        if (graphic.cluster && graphic.graphics) {
          return true
        } else {
          return false
        }
      },
      callback: (e) => {
        const graphics = e.graphic?.graphics
        if (graphics) {
          const names = []
          for (let index = 0; index < graphics.length; index++) {
            const g = graphics[index]
            names.push(g.attr.name || g.attr.text || g.id)
          }
          return globalAlert(`${names.join(",")}`, `共${graphics.length}个聚合对象`)
        }
      }
    },

    {
      text: "计算周长",
      icon: "fa fa-medium",
      show: (event) => {
        const graphic = event.graphic
        return !graphic.isPoint
      },
      callback: (e) => {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      icon: "fa fa-reorder",
      show: (event) => {
        const graphic = event.graphic
        return !graphic.isPoint
      },
      callback: (e) => {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}
