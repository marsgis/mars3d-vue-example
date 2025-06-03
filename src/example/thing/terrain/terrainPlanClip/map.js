import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
let terrainPlanClip

export const mapOptions = {
  scene: {
    center: { lat: 31.840043, lng: 117.21586, alt: 554, heading: 0, pitch: -59 },
    globe: {
      depthTestAgainstTerrain: true
    }
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

export function addLayer(height) {
  // 管网模型图层
  const tilesetLayer = new mars3d.layer.TilesetLayer({
    name: "地下管网",
    url: "https://data.mars3d.cn/3dtiles/max-piping/tileset.json",
    position: { lng: 117.215457, lat: 31.843363, alt: -3.6 },
    rotation: { z: 336.7 },
    maximumScreenSpaceError: 2,
    highlight: { type: "click", color: "#00FFFF" },
    popup: "all",
    center: { lat: 31.840525, lng: 117.217024, alt: 495.12, heading: 0, pitch: -59.3, roll: 0 }
  })
  map.addLayer(tilesetLayer)

  terrainPlanClip = new mars3d.thing.TerrainPlanClip({
    positions: [
      [117.214491, 31.841736, 42.83],
      [117.21764, 31.841736, 42.83],
      [117.21764, 31.843807, 42.83],
      [117.214491, 31.843807, 42.83]
    ],
    exact: true,
    stylePit: {
      diffHeight: height, // 井的深度
      image: "https://data.mars3d.cn/img/textures/poly-stone.jpg", // 边界墙材质
      imageBottom: "https://data.mars3d.cn/img/textures/poly-soil.jpg", // 底部区域材质
      stRotationDegree: 45,
      splitNum: 50 // 井边界插值数
    }
  })
  map.addThing(terrainPlanClip)
}

// 是否挖地
export function chkClippingPlanes(val) {
  terrainPlanClip.enabled = val
}

// 是否外切割
export function chkUnionClippingRegions(val) {
  terrainPlanClip.clipOutSide = val
}

// 是否深度检测
export function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}

// 改变切割的深度
export function changeClipHeight(val) {
  terrainPlanClip.diffHeight = val
}

// 添加矩形
export async function btnDrawExtent() {
  const graphic = await map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
    }
  })
  const positions = graphic.getOutlinePositions(false)
  map.graphicLayer.clear()

  console.log("绘制坐标为", JSON.stringify(mars3d.LngLatArray.toArray(positions))) // 方便测试拷贝坐标

  // 挖地区域
  terrainPlanClip.positions = positions
}

// 添加多边形
export async function btnDraw() {
  const graphic = await map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5
    }
  })
  const positions = graphic.positionsShow
  map.graphicLayer.clear()

  console.log("绘制坐标为", JSON.stringify(mars3d.LngLatArray.toArray(positions))) // 方便测试拷贝坐标

  // 挖地区域
  terrainPlanClip.positions = positions
}
// 清除
export function removeAll() {
  terrainPlanClip.clear() // 清除挖地区域
}

// 绘制线
export async function drawLine() {
  terrainPlanClip.clear()

  const graphic = await map.graphicLayer.startDraw({
    type: "polyline",
    maxPointNum: 2,
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
    }
  })
  const positions = graphic.positionsShow
  map.graphicLayer.clear()
  console.log("绘制坐标为", JSON.stringify(mars3d.LngLatArray.toArray(positions))) // 方便测试拷贝坐标

  terrainPlanClip.positions = positions
}
