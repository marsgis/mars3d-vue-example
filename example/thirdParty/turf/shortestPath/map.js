import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象
let pointAndLine

export const mapOptions = {
  scene: {
    center: { lat: 31.871794, lng: 116.800468, alt: 57020, heading: 0, pitch: -90 }
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

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  //  点、线矢量数据图层
  pointAndLine = new mars3d.layer.GraphicLayer()
  map.addLayer(pointAndLine)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 绘制障碍面
export function drawPolygon() {
  clearLayer()
  graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#00ffff",
      opacity: 0.4,
      outline: true,
      outlineWidth: 1,
      outlineColor: "#ffffff"
    }
  })
}
// 绘制起点
export function startPoint() {
  pointAndLine.clear()
  pointAndLine.startDraw({
    type: "point",
    style: {
      pixelSize: 10,
      color: "red",
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
export function endPoint() {
  pointAndLine.startDraw({
    type: "point",
    style: {
      pixelSize: 10,
      color: "red",
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

// 计算最短路径
 export function shortestPath() {
  const polygonLayer = graphicLayer.getGraphics()
  const allPoint = pointAndLine.getGraphics()

  if (polygonLayer.length < 1) {
    globalMsg("请绘制面")
    return
  }

  if (allPoint.length < 2) {
    globalMsg("请绘起点和终点")
    return
  }
  const polygon = polygonLayer[0].toGeoJSON() // 障碍面
  const startPoint = allPoint[0].toGeoJSON() // 起点
  const endPoint = allPoint[1].toGeoJSON() // 终点

  const options = {
    obstacles: polygon
  }
  const path = turf.shortestPath(startPoint, endPoint, options)

  const positions = path.geometry.coordinates
  const polyonLine = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      color: " #55ff33"
    }
  })
  pointAndLine.addGraphic(polyonLine)
}

export function clearLayer() {
  graphicLayer.clear()
  pointAndLine.clear()
}
