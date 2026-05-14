import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

let drawLayer // 绘制操作矢量图层对象
let showResultLayer // 分析结果显示图层

let polygonZAM
let pointQD
let pointZD

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
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 绘制障碍面
export async function drawPolygon() {
  if (polygonZAM) {
    polygonZAM.remove()
    polygonZAM = null
  }
  polygonZAM = await drawLayer.startDraw({
    type: "polygon",
    style: {
      color: "#00ffff",
      opacity: 0.4,
      clampToGround: true,
      outline: true,
      outlineWidth: 1,
      outlineColor: "#ffffff"
    }
  })
}

let computePolygon

// 绘制需要计算路径的面
export async function drawComputePolygon() {
  if (computePolygon) {
    computePolygon.remove()
    computePolygon = null
  }
  const lineGraphic = drawLayer.getGraphicById("lineByTerrain")
  if (lineGraphic) {
    lineGraphic.remove()
  }

  computePolygon = await drawLayer.startDraw({
    type: "polygon",
    style: {
      color: "#00ffff",
      opacity: 0.4,
      outline: true,
      clampToGround: true,
      outlineWidth: 1
    }
  })
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
  polygonZAM = null
  pointQD = null
  pointZD = null

  drawLayer.clear()
  showResultLayer.clear()
}

// 计算最短路径
export function shortestPath() {
  if (!pointQD) {
    globalMsg("请绘制起点")
    return
  }
  if (!pointZD) {
    globalMsg("请绘制终点")
    return
  }
  showResultLayer.clear()

  const polygon = polygonZAM && polygonZAM.toGeoJSON({ closure: true }) // 障碍面
  const startPoint = pointQD.coord // 起点
  const endPoint = pointZD.coord // 终点

  const options = {
    obstacles: polygon?.geometry,
    units: "meters",
    resolution: 100
  }
  const path = turf.shortestPath(startPoint, endPoint, options)

  const positions = path.geometry.coordinates
  const polyonLine = new mars3d.graphic.PolylinePrimitive({
    positions,
    style: {
      clampToGround: true,
      color: " #55ff33"
    }
  })
  showResultLayer.addGraphic(polyonLine)
}
