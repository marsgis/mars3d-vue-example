import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

let drawLayer // 绘制操作矢量图层对象
let showResultLayer // 分析结果显示图层
let pointQD
let pointZD

let shortestPath

// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()

export const mapOptions = {
  scene: {
    center: { lat: 34.038028, lng: 109.000072, alt: 4605.9, heading: 187.1, pitch: -43.1 }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  drawLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(drawLayer)
  showResultLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(showResultLayer)

  shortestPath = new mars3d.thing.ShortestPath()
  map.addThing(shortestPath)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 绘制起点
export async function startPoint() {
  if (pointQD) {
    pointQD.remove()
    pointQD = null
  }
  showResultLayer.clear()

  pointQD = await drawLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 10,
      color: "red",
      clampToGround: true,
      label: {
        text: "起点",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
    }
  })
}

// 绘制终点
export async function endPoint() {
  if (pointZD) {
    pointZD.remove()
    pointZD = null
  }
  showResultLayer.clear()

  pointZD = await drawLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 10,
      color: "red",
      clampToGround: true,
      label: {
        text: "终点",
        font_size: 20,
        color: "#ffffff",
        outline: true,
        outlineColor: "#000000",
        pixelOffsetY: -20
      }
    }
  })
}

export function clearLayer() {
  pointQD = null
  pointZD = null
  drawLayer.clear()
  showResultLayer.clear()
}

// 根据地形分析最短路径算法，
export async function shortPathByTerrain(options) {
  if (!pointQD) {
    globalMsg("请绘制起点")
    return
  }
  if (!pointZD) {
    globalMsg("请绘制终点")
    return
  }

  showResultLayer.clear()
  drawLayer.show = false // 会遮挡深度图，所以需要隐藏

  const path = await shortestPath.analyze(pointQD.point, pointZD.point, options)
  if (path) {
    const polyonLine = new mars3d.graphic.PolylinePrimitive({
      positions: path,
      style: {
        clampToGround: true,
        width: 3,
        color: " #ffff00"
      }
    })
    showResultLayer.addGraphic(polyonLine)
  } else {
    globalMsg("没有找到最短路径")
  }

  drawLayer.show = true // 恢复显示
}
