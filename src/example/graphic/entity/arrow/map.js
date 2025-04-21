import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

export const eventTarget = new mars3d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 29.620733, lng: 119.509245, alt: 657931, heading: 0, pitch: -80 }
  }
}
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  globalNotify("已知问题提示", `(1) 当在180度经线或南北极时,存在渲染错乱问题。`)

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
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function addDemoGraphic1(graphicLayer) {
  const graphic = new mars3d.graphic.StraightArrow({
    positions: [
      [117.76314, 30.671648, 440.5],
      [117.885026, 32.030943, 440.5]
    ],
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic2(graphicLayer) {
  const graphic = new mars3d.graphic.FineArrow({
    positions: [
      [118.351476, 30.646825, 286.6],
      [118.419077, 32.05059, 286.6]
    ],
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic3(graphicLayer) {
  const graphic = new mars3d.graphic.FineArrowYW({
    positions: [
      [119.527562, 30.549996, 481.3],
      [119.645216, 31.987335, 481.3]
    ],
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic4(graphicLayer) {
  const graphic = new mars3d.graphic.AttackArrow({
    positions: [
      [119.162167, 30.627124, 206.6],
      [118.734841, 30.661996, 206.6],
      [119.136736, 31.175837, 206.6],
      [119.001217, 32.015687, 206.6]
    ],
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic5(graphicLayer) {
  const graphic = new mars3d.graphic.AttackArrowYW({
    positions: [
      [120.472593, 30.475435, 1429.5],
      [120.859927, 30.410491, 1429.5],
      [120.874151, 31.09718, 1429.5],
      [120.709928, 31.883932, 1429.5]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "#ff0000",
        alphaPower: 0.8,
        center: new Cesium.Cartesian2(0.5, 0.0)
      }
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic6(graphicLayer) {
  const graphic = new mars3d.graphic.AttackArrowPW({
    positions: [
      [120.159212, 30.51614, 0],
      [120.073352, 31.163911, 0],
      [120.248902, 31.922699, 0]
    ],
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic7(graphicLayer) {
  const graphic = new mars3d.graphic.DoubleArrow({
    positions: [
      [115.967691, 31.446636],
      [116.361355, 30.623772],
      [117.147102, 31.455161],
      [116.887987, 31.578392],
      [116.391773, 31.085218]
    ],
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic8(graphicLayer) {
  const graphic = new mars3d.graphic.GatheringPlace({
    positions: [
      [116.76866, 31.79288, 0],
      [117.336959, 31.678728, 0],
      [117.363407, 32.203935, 0]
    ],
    style: {
      materialType: mars3d.MaterialType.PolyGradient,
      materialOptions: {
        color: "#ff0000",
        alphaPower: 0.8
      },
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}


function addDemoGraphic9(graphicLayer) {
  const startTime = map.clock.startTime

  const graphicTriangle = new mars3d.graphic.AttackArrowYW({
    positions: {
      type: "time", // 时序动态坐标
      speed: 260,
      list: [
        {
          time: Cesium.JulianDate.addSeconds(startTime, 5, new Cesium.JulianDate()), // 也可以是 时间字符串
          positions: [
            [116.146959, 30.679276, 326.9],
            [115.772659, 30.513065, 74],
            [116.297582, 30.265435, 59.9],
            [117.020524, 30.131104, 57.3]
          ]
        },
        {
          time: Cesium.JulianDate.addSeconds(startTime, 10, new Cesium.JulianDate()), // 也可以是 时间字符串
          positions: [
            [116.146959, 30.679276, 326.9],
            [115.772659, 30.513065, 74],
            [116.505745, 30.227261, 53.4],
            [117.587161, 30.105014, 155.1]
          ]
        },
        {
          time: Cesium.JulianDate.addSeconds(startTime, 15, new Cesium.JulianDate()), // 也可以是 时间字符串
          positions: [
            [116.088611, 30.658878, 364.8],
            [115.647116, 30.140971, 61.7],
            [118.217808, 30.209116, 276.3],
            [119.809601, 29.747937, 382]
          ]
        }
      ],
      interpolation: true,
      forwardExtrapolationType: Cesium.ExtrapolationType.HOLD, // 在第1个开始时间之前，NONE时不显示，HOLD时显示开始时间对应坐标位置
      backwardExtrapolationType: Cesium.ExtrapolationType.NONE // 在最后1个结束时间之后，NONE时不显示，HOLD时显示结束时间对应坐标位置
    },
    style: {
      color: "#FF0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff"
    }
  })
  graphicLayer.addGraphic(graphicTriangle)
}



// 该方法演示 自定义点状军标（png或svg图片即可），复杂的也可以Canvas绘制，参考  graphic\entity\billboard-canvas\CanvasBillboard.js
function addDemoGraphic10(graphicLayer) {
  const graphic = new mars3d.graphic.BillboardEntity({
    position: [116.699972, 29.004322],
    style: {
      image: "https://data.mars3d.cn/img/marker/military/qianjin.png",
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT, // 横向的定位点，LEFT左侧
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM // 竖向的定位点，BOTTOM底部
    },
    attr: { remark: "示例9 - 自定义点状军标" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 该方法演示 自定义线状军标（定义在 CurveEntity.js 中） ，可以参考自行扩展算法实现相关标号
function addDemoGraphic11(graphicLayer) {
  // eslint-disable-next-line no-undef
  const graphic = new CurveEntity({
    positions: [
      [118.901633, 29.84308, 423.4],
      [118.030482, 29.323071, 214.3],
      [118.935367, 28.88123, 208.9],
      [117.973442, 28.441806, 223.9]
    ],
    style: {
      color: "#0000ff",
      opacity: 0.6,
      width: 4
    },
    attr: { remark: "示例10 - 自定义线状军标" }
  })
  graphicLayer.addGraphic(graphic)
}

// 该方法演示 自定义面状军标（定义在 CloseVurveEntity.js 中） ，可以参考自行扩展算法实现相关标号
function addDemoGraphic12(graphicLayer) {
  // eslint-disable-next-line no-undef
  const graphic = new CloseVurveEntity({
    positions: [
      [120.2849, 29.773135, 26.8],
      [119.26029, 28.767787, 297.3],
      [120.904109, 28.756734, 698.9]
    ],
    style: {
      color: "#0000ff",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff"
    },
    attr: { remark: "示例11 - 自定义面状军标" }
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
    const pt2 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 120, result.radius)

    const graphic = new mars3d.graphic.FineArrowYW({
      positions: [pt1, position, pt2],
      style: {
        color: Cesium.Color.fromRandom({ alpha: 0.6 }),
        outline: true,
        outlineWidth: 3,
        outlineColor: "#ffffff"
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
    type: "fineArrowYW",
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    }
  })
  console.log("标绘完成", graphic.toJSON())
}

// 开始绘制  绘制立体面
export async function startDrawGraphic2() {
  const graphic = await graphicLayer.startDraw({
    type: "attackArrowYW",
    style: {
      color: "#ff0000",
      opacity: 0.6,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
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
