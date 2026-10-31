 import * as mars3d from "mars3d"

const Cesium = mars3d.Cesium

let map: mars3d.Map // 地图对象
let layer:mars3d.layer.GraphicLayer
export let graphic : mars3d.graphic.BaseGraphic

// 初始化当前业务
export function onMounted(mapInstance: mars3d.Map): void {
  map = mapInstance // 记录map
}
// 释放当前业务
export function onUnmounted(): void {
  map = null
}

function selectGraphicById(layerId: string | number, graphicId: string | number): void {
  graphic = null
  if (!map) {
    layer = null
    return
  }
  layer = map.getLayerById(layerId)
  if (!layer) {
    console.log("没有获取到图层", layerId)
    return
  }

  graphic = layer.getGraphicById(graphicId)
  if (!graphic) {
    console.log("没有获取到矢量", graphicId)
  }
}

export function getGraphicOptions(layerId, graphicId) {
  if (!layer || !graphic || layerId !== layer.id || graphicId !== graphic.id) {
    selectGraphicById(layerId, graphicId)
  }
  if (!graphic) {
    return null
  }

  const graphicOptions: any = graphic.toJSON()

  // 绑定 面板中需要的 相关值
  graphicOptions.attr = graphicOptions.attr || {}

  graphicOptions.isPoint = graphic.isPoint // 判断是否是点对象
  graphicOptions.positionType = getPositionType(graphicOptions)
  if (graphic.isPoint) {
    // @ts-expect-error
    graphicOptions.minPointNum = graphic._minPointNum ?? 1
    // @ts-expect-error
    graphicOptions.maxPointNum = graphic._maxPointNum ?? 1
  } else {
    // @ts-expect-error
    graphicOptions.minPointNum = graphic._minPointNum ?? 3
    // @ts-expect-error
    graphicOptions.maxPointNum = graphic._maxPointNum ?? 999
  }

  return graphicOptions
}

function getPositionType(graphicOptions) {
  let val: string = "static"
  if (graphicOptions.position?.type) {
    val = graphicOptions.position.type
  } else if (graphicOptions.positions?.type) {
    val = graphicOptions.positions.type
  }
  return val
}

export function downloadFile(fileName: string, content: string) {
  mars3d.Util.downloadFile(fileName, content)
}

export function setGraphicOptions(options) {
  if (!graphic) {
    return
  }
  graphic.setOptions(options)

  // console.log("改变后的矢量对象", graphic)
}
