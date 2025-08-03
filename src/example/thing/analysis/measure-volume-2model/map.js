import * as mars3d from "mars3d"
import Volume2ModelMeasure from "./Volume2ModelMeasure.js"

let map // mars3d.Map三维地图对象

export let graphicLayer

export let compareTileset
export let baseTileset

export const mapOptions = {
  scene: {
    center: { lat: 32.160865, lng: 118.65795, alt: 1324.7, heading: 357.2, pitch: -57.4 },
    globe: { depthTestAgainstTerrain: true }
  },
  layers: []
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 如果模型地址内有“+”符号，可以加下面方法进行自定义处理
Cesium.Resource.ReplaceUrl = function (url) {
  if (url.endsWith(".json") || url.endsWith(".b3dm")) {
    return url.replace(/\+/gm, "%2B") // 将3dtiles中的“+”符号转义下
  } else {
    return url
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.on(mars3d.EventType.start, function (event) {
    console.log("开始分析", event)
    eventTarget.fire("start")
    console.log("坐标为", JSON.stringify(mars3d.LngLatArray.toArray(event.positions))) // 方便测试拷贝坐标
  })

  graphicLayer.on(mars3d.EventType.end, function (event) {
    console.log("分析完成", event)
    eventTarget.fire("end")
    hideLoading()
  })

  initTilesets()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 基于两个模型之间的的方量分析 需要注意：
// 1. 需要等待模型完全加载完成后才能分析。
// 2. 如果有遮挡了分析区域的任何矢量对象，都需要分析前隐藏下，分析结束后再改回显示。

async function initTilesets() {
  await map.readyPromise

  baseTileset = new mars3d.layer.TilesetLayer({
    name: "基础模型",
    url: "https://data.mars3d.cn/3dtiles/qx-gongdi-0918/tileset.json",
    position: { alt: 26.6 },
    maximumScreenSpaceError: 1
  })
  map.addLayer(baseTileset)

  compareTileset = new mars3d.layer.TilesetLayer({
    name: "比较模型",
    url: "https://data.mars3d.cn/3dtiles/qx-gongdi-1108/tileset.json",
    position: { alt: 26.6 },
    maximumScreenSpaceError: 1
  })
  map.addLayer(compareTileset)

  // await baseTileset.readyPromise
  // await compareTileset.readyPromise
}

export function addDemoGraphic1() {
  graphicLayer.clear()

  const graphic = new Volume2ModelMeasure({
    positions: [
      [118.651726, 32.171813, 26.5],
      [118.662995, 32.171748, 27.2],
      [118.663173, 32.169311, 27.4],
      [118.661613, 32.169246, 27.3],
      [118.661665, 32.16591, 33.2],
      [118.651926, 32.165632, 28.4]
    ],
    baseModel: baseTileset,
    compareModel: compareTileset,

    maxHeightDifference: 50,
    decimal: 4,
    offsetHeight: 10 // 偏移高度来展示
    // showFillBox: false, // 是否显示填方盒子
    // showFillVolume: false // 是否显示填方体积结果文本
  })
  graphicLayer.addGraphic(graphic)
}

// 方量分析
export async function analysisMeasure() {
  graphicLayer.clear()

  await graphicLayer.startDraw({
    type: "volume2Model",
    baseModel: baseTileset,
    compareModel: compareTileset
  })
}

// 清除
export function clear() {
  graphicLayer.clear()
}
