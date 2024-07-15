import * as mars3d from "mars3d"
import { BillboardIndicator } from "./BillboardIndicator"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  // 创建DIV数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })

  // bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addDemoGraphic1(graphicLayer) {
  const divIndicator = new BillboardIndicator({
    position: [116.115794, 30.973847, 1455.6],
    style: {
      // 圆点(不动的)
      pointColor: "#0000ff", // 颜色
      pointSize: 10, // 像素大小
      pointOutline: true, // 是否边框
      pointOutlineWidth: 2, // 边框宽度
      pointOutlineColor: "#ffffff", // 边框颜色

      // 连线（自动的）
      lineColor: "#00ff00",
      lineWidth: 2,
      lineDash: "5,5", // 虚线

      // 文本
      text: "自动连线最近角",
      textFont: "40px 楷体",
      textColor: "#ffffff",

      // 矩形（可拖拽的）
      rectX: 100,
      rectY: -50,
      rectColor: "rgb(16 238 220)"
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(divIndicator)
}

function addDemoGraphic2(graphicLayer) {
  const divIndicator = new BillboardIndicator({
    position: [116.326555, 30.849435, 410.2],
    style: {
      autoPoistion: false,
      lineDash: "5,5", // 虚线
      // 文本
      text: "连线位置固定"
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(divIndicator)
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间
  graphicLayer.clear()

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const graphic = new BillboardIndicator({
      position,
      style: {
        // 圆点(不动的)
        pointColor: "#0000ff", // 颜色
        pointSize: 10, // 像素大小
        pointOutline: true, // 是否边框
        pointOutlineWidth: 2, // 边框宽度
        pointOutlineColor: "#ffffff", // 边框颜色

        // 连线（自动的）
        lineColor: "#00ff00",
        lineWidth: 2,
        lineDash: "5, 5", // 虚线

        // 矩形（可拖拽的）
        rectX: 100,
        rectY: -50,

        // 矩形内文本
        text: "数据" + index,
        textFont: "20px 楷体",
        textColor: "#ffffff"
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 开始绘制
export function startDrawGraphic() {
  graphicLayer.startDraw({
    type: "billboardIndicator",
    style: {
      // 圆点(不动的)
      pointColor: "#0000ff", // 颜色
      pointSize: 10, // 像素大小
      pointOutline: true, // 是否边框
      pointOutlineWidth: 2, // 边框宽度
      pointOutlineColor: "#ffffff", // 边框颜色

      // 连线（自动的）
      lineColor: "#00ff00",
      lineWidth: 2,
      lineDash: "5, 5", // 虚线

      // 矩形（可拖拽的）
      rectX: 100,
      rectY: -50,

      // 矩形内文本
      text: "我是文本信息",
      textFont: "20px 楷体",
      textColor: "#ffffff"
    }
  })
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
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
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
    }
  ])
}
