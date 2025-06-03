import * as mars3d from "mars3d"
const Cesium = mars3d.Cesium

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

export const eventTarget = new mars3d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.61982, lng: 117.230607, alt: 22746, heading: 2, pitch: -49 },
    logarithmicDepthBuffer: false // 对数深度缓冲区[当 贴地面 出现 阴影体 时设置下]
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

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
  addDemoGraphic11(graphicLayer)
  addDemoGraphic12(graphicLayer)
  addDemoGraphic13(graphicLayer)
  addDemoGraphic14(graphicLayer)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
  graphicLayer.remove()
  graphicLayer = null
}

function addDemoGraphic1(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
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
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 图片材质
function addDemoGraphic2(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.187572, 31.823074, 45.53],
      [117.195377, 31.82418, 43.36],
      [117.204541, 31.818933, 37.06],
      [117.19775, 31.809539, 36.59],
      [117.183832, 31.814237, 38.76]
    ],
    style: {
      image: "https://data.mars3d.cn/img/textures/poly-soil.jpg",
      // image: "https://data.mars3d.cn/img/map/gugong.jpg",
      vertexFormat: Cesium.MaterialAppearance.MaterialSupport.TEXTURED.vertexFormat,
      textureCoordinates: {
        positions: [new Cesium.Cartesian2(0, 1), new Cesium.Cartesian2(0, 0), new Cesium.Cartesian2(0.5, 0), new Cesium.Cartesian2(0.5, 1)] // 矩形平铺
      },
      clampToGround: true,

      label: {
        text: "我是火星科技",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic3(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
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
      }
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示：平滑移动高度
  let height = 0
  setInterval(() => {
    if (height > 10000 || graphic.isDestroy) {
      return
    }
    height += 1
    graphic.offsetHeight = height
  }, 10)
}

// 面状：草地面效果
function addDemoGraphic4(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.319966, 31.842082, 12.29],
      [117.330034, 31.835286, 11.07],
      [117.330576, 31.823452, 11.01],
      [117.311457, 31.821023, 17.11],
      [117.308954, 31.828975, 16.29]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGrass,
      materialOptions: {
        evenColor: new Cesium.Color(0.25, 0.4, 0.1, 1.0),
        oddColor: new Cesium.Color(0.1, 0.1, 0.1, 1.0),
        frequency: 1.5 // 斑驳
      }
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 面状：木材面效果
function addDemoGraphic5(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.271662, 31.870639, 21.49],
      [117.290605, 31.871517, 19.47],
      [117.302056, 31.858145, 16.27],
      [117.299439, 31.847545, 14.77],
      [117.267705, 31.8491, 22.11]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyWood,
      materialOptions: {
        evenColor: new Cesium.Color(0.6, 0.3, 0.1, 1.0),
        oddColor: new Cesium.Color(0.4, 0.2, 0.07, 1.0),
        frequency: 10.0, // 环 频率
        noiseScale: new Cesium.Cartesian2(0.7, 0.5),
        grainFrequency: 27.0 // 波纹 频率
      }
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 面状：混合效果
function addDemoGraphic6(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
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
      materialType: mars3d.MaterialType.PolyBlob,
      materialOptions: {
        evenColor: new Cesium.Color(1.0, 1.0, 1.0, 0.5),
        oddColor: new Cesium.Color(0.0, 0.0, 1.0, 0.5),
        frequency: 30.0 // 次数
      }
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 面状： 柏油路面效果
function addDemoGraphic7(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.208302, 31.85757],
      [117.234234, 31.858263],
      [117.234261, 31.833317],
      [117.207414, 31.834541],
      [117.208302, 31.85757]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyAsphalt,
      materialOptions: {
        color: new Cesium.Color(0.15, 0.15, 0.15, 1.0),
        size: 0.005, // 凹凸大小
        frequency: 0.2 // 粗糙
      }
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 面状：碎石面效果
function addDemoGraphic8(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
    unit: "mu",
    positions: [
      [117.275127, 31.839641, 25.1],
      [117.291876, 31.83181, 23.6],
      [117.289005, 31.82154, 20.1],
      [117.281431, 31.816607, 23.2],
      [117.268173, 31.826157, 34.8],
      [117.268478, 31.82567, 34.2]
    ],
    style: {
      width: 5,
      materialType: mars3d.MaterialType.PolyFacet,
      materialOptions: {
        evenColor: new Cesium.Color(0.25, 0.25, 0.25, 0.75),
        oddColor: new Cesium.Color(0.75, 0.75, 0.75, 0.75),
        frequency: 50.0 // 次数
      }
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic9(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
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
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "#3388cc",
        alphaPower: 1.5
      },
      vertexFormat: Cesium.MaterialAppearance.MaterialSupport.TEXTURED.vertexFormat,
      textureCoordinates: {
        positions: [
          new Cesium.Cartesian2(0, 1),
          new Cesium.Cartesian2(0, 0),
          new Cesium.Cartesian2(0.5, 0),
          new Cesium.Cartesian2(1, 0),
          new Cesium.Cartesian2(1, 1)
        ]
      },
      label: {
        text: "Mars3D平台",
        font_family: "楷体",
        color: "#ffff00",
        font_size: 18,
        setHeight: 400
      }
    },
    attr: { remark: "示例9" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic10(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
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
    attr: { remark: "示例10" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic11(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.232633, 31.816532, 31.2],
      [117.247045, 31.816953, 25.8],
      [117.246916, 31.815743, 23.5],
      [117.243156, 31.811025, 25.7],
      [117.232491, 31.811307, 27.3]
    ],
    style: {
      materialType: mars3d.MaterialType.WaterLight,
      materialOptions: {
        specularMap: "https://data.mars3d.cn/img/textures/poly-stone.jpg",
        alpha: 0.6
      },
      clampToGround: true
    },
    attr: { remark: "示例11" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic12(graphicLayer) {
  // const extent = { xmin: 73.0, xmax: 136.0, ymin: 3.0, ymax: 59.0 } //中国区域
  const extent = { xmin: 117.153681, xmax: 117.243941, ymin: 31.668831, ymax: 31.731177 } // 合肥南

  // 计算圆的边线
  const circleOuterPositions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: [117.198898, 31.702784, 8],
    radius: 1000
  })

  const graphic = new mars3d.graphic.PolygonPrimitive({
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
    attr: { remark: "示例12" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic13(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
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
    attr: { remark: "示例13" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic14(graphicLayer) {
  const graphic = new mars3d.graphic.PolygonPrimitive({
    positions: [
      [117.243724, 31.912542, 26.8],
      [117.24524, 31.89712, 22.3],
      [117.271467, 31.889732, 19],
      [117.284579, 31.904554, 17.6],
      [117.260362, 31.916844, 20.5]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient2,
      materialOptions: {
        color: Cesium.Color.RED,
        color2: Cesium.Color.WHITE,
        alphaPower: 1.0,
        diffusePower: 0.1 // 漫射系数 -0.5至0.5
      }
    },
    attr: { remark: "示例14" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
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

    const graphic = new mars3d.graphic.PolygonPrimitive({
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
    type: "polygonP",
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
  console.log("标绘完成", graphic.toJSON())
}
// 开始绘制
export async function startDrawGraphic2() {
  const graphic = await graphicLayer.startDraw({
    type: "polygonP",
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
