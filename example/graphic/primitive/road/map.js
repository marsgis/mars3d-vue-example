import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象
let road

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.808563, lng: 117.187762, alt: 234, heading: 95, pitch: -15 }
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

  // 2.在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听layer，鼠标移入了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听layer，鼠标移出了矢量对象", event)
  })

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindPopup("我是layer上绑定的Popup")

  // 可在图层上绑定tooltip,对所有加到这个图层的矢量数据都生效
  // graphicLayer.bindTooltip('我是layer上绑定的Tooltip')

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  graphicLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        const primitive = e.graphic
        if (primitive) {
          graphicLayer.removeGraphic(primitive)
        }
      }
    }
  ])

  // 加一些演示数据
  road = new mars3d.graphic.Road({
    positions: [
      [117.181132, 31.814245, 45.95],
      [117.185542, 31.8125, 43.23],
      [117.190607, 31.810037, 38.95],
      [117.195048, 31.807351, 39.03],
      [117.198338, 31.804961, 39.86],
      [117.201378, 31.802543, 33.1],
      [117.204316, 31.80064, 34.33],
      [117.209094, 31.798011, 33.56],
      [117.212615, 31.796325, 33.75],
      [117.216706, 31.794731, 39.96]
    ],
    style: {
      image: "./img/textures/road.jpg",
      width: 15,
      height: 1
    }
  })
  graphicLayer.addGraphic(road)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  clear()
}

// 绘制道路
export function drawLine(width, height, opacity) {
  map.graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3
    },
    success: (graphic) => {
      const points = graphic.points

      graphic.remove() // 删除绘制的线

      road = new mars3d.graphic.Road({
        positions: points,
        style: {
          image: "./img/textures/road.jpg",
          width: width,
          height: height,
          opacity: opacity
        }
      })
      graphicLayer.addGraphic(road)
    }
  })
}

// 宽度发生改变
export function widthChange(value) {
  if (!road) {
    return
  }
  road.width = value
}

// 路高度发生改变
export function heightChange(value) {
  if (!road) {
    return
  }
  road.height = value
}

// 透明度发生改变
export function alphaChange(value) {
  if (!road) {
    return
  }
  road.opacity = value
}

// 清除
export function clear() {
  graphicLayer.clear()
  road = null
}
