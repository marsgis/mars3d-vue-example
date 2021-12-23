import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let dynamicRiver
let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.422407, lng: 115.820222, alt: 3498, heading: 67, pitch: -32 },
    globe: {
      depthTestAgainstTerrain: true
    }
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
  dynamicRiver = new mars3d.graphic.DynamicRiver({
    positions: [
      [115.906607, 30.441582, 555.9],
      [115.899964, 30.438543, 467.3],
      [115.893105, 30.440714, 374.6],
      [115.88362, 30.443924, 340.7],
      [115.873948, 30.444827, 299],
      [115.864003, 30.442111, 292.2],
      [115.850741, 30.438108, 189.9]
    ],
    style: {
      image: "./img/textures/movingRiver.png",
      width: 280,
      height: 30,
      speed: 10
    }
  })
  graphicLayer.addGraphic(dynamicRiver)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  clear()
}

// 绘制河流
export function drawLine(width, height, speed) {
  map.graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3
    },
    success: (graphic) => {
      const points = graphic.points

      console.log(JSON.stringify(graphic.coordinates)) // 打印下边界

      graphic.remove() // 删除绘制的线
      dynamicRiver = new mars3d.graphic.DynamicRiver({
        positions: points,
        style: {
          image: "./img/textures/movingRiver.png",
          width: width,
          height: height,
          speed: speed
        }
      })
      graphicLayer.addGraphic(dynamicRiver)
    }
  })
}

// 宽发生改变
export function widthChange(value) {
  if (!dynamicRiver) {
    return
  }
  dynamicRiver.width = value
}

// 高发生改变
export function heightChange(value) {
  if (!dynamicRiver) {
    return
  }
  dynamicRiver.height = value
}

// 速度发生改变
export function speedChange(value) {
  if (!dynamicRiver) {
    return
  }
  dynamicRiver.speed = value
}

let onOff = true
// 升高30米动画
export function addHeight() {
  if (!dynamicRiver) {
    return
  }
  if (!onOff) {
    globalMsg("上次操作未完成")
    return
  }
  dynamicRiver.offsetHeight(30, 5) // 5秒内抬高30米
  throttle()
}

// 下降30米动画
export function lowerHeight() {
  if (!dynamicRiver) {
    return
  }
  if (!onOff) {
    globalMsg("上次操作未完成")
    return
  }
  dynamicRiver.offsetHeight(-30, 5) // 5秒内降低30米
  throttle()
}

function throttle() {
  setTimeout(() => {
    onOff = true
  }, 2000)

  onOff = false
}
// 清除
export function clear() {
  graphicLayer.clear()
  dynamicRiver = null
}
