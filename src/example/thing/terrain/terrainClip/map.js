import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
let terrainClip

export const mapOptions = {
  scene: {
    center: { lat: 30.827414, lng: 116.378229, alt: 16933, heading: 0, pitch: -56 }
  }
}

export const eventTabel = new mars3d.BaseClass()

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

export function addTerrainClip(height) {
  terrainClip = new mars3d.thing.TerrainClip({
    stylePit: {
      diffHeight: height, // 井的深度
      image: "https://data.mars3d.cn/img/textures/poly-stone.jpg",
      imageBottom: "https://data.mars3d.cn/img/textures/poly-soil.jpg",
      splitNum: 80 // 井边界插值数
    }
  })
  map.addThing(terrainClip)

  const areaItem = terrainClip.addArea(
    [
      [116.334222, 30.899171, 645.46],
      [116.370874, 30.899171, 645.46],
      [116.370874, 30.944509, 645.46],
      [116.334222, 30.944509, 645.46]
    ],
    { diffHeight: 900, exact: true }
  )
  addTableItem(areaItem)

  const areaItem2 = terrainClip.addArea(
    [
      [116.416497, 30.934256, 775.89],
      [116.427392, 30.962941, 1084.88],
      [116.434838, 30.932608, 900.43],
      [116.462994, 30.923081, 771.42],
      [116.437571, 30.916044, 906.39],
      [116.44977, 30.894487, 776.06],
      [116.424183, 30.908752, 727.02],
      [116.402218, 30.898406, 593.08],
      [116.414309, 30.918806, 588.78],
      [116.387022, 30.933539, 700.65]
    ],
    { diffHeight: 200, exact: true }
  )
  addTableItem(areaItem2)
}

// 添加矩形
export async function btnDrawExtent(isShow) {
  const graphic = await map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8
    }
  })
  const positions = graphic.getOutlinePositions(false)
  map.graphicLayer.clear()

  console.log(JSON.stringify(mars3d.LngLatArray.toArray(positions))) // 打印下边界

  // 挖地区域
  const areaItem = terrainClip.addArea(positions)
  addTableItem(areaItem, isShow)
}
// 添加多边形
export async function btnDraw(isShow) {
  const graphic = await map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    }
  })
  const positions = graphic.positionsShow
  map.graphicLayer.clear()

  console.log(JSON.stringify(mars3d.LngLatArray.toArray(positions))) // 打印下边界

  const areaItem = terrainClip.addArea(positions)
  addTableItem(areaItem, isShow)
}

// 清除
export function removeAll() {
  terrainClip.clear() // 清除挖地区域
}

// 改变切割的深度
export function changeClipHeight(val) {
  terrainClip.diffHeight = val
}

// 是否挖地
export function chkClippingPlanes(val) {
  terrainClip.enabled = val
}

// 是否外切割
export function chkUnionClippingRegions(val) {
  terrainClip.clipOutSide = val
}

// 是否深度检测
export function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}

// 区域表格添加一行记录
function addTableItem(item) {
  eventTabel.fire("tableObject", { tableItem: { key: item.id, name: "开挖区域" + item.id, show: item.show } })
}

// 表格操作
export function flyToGraphic(item) {
  const graphic = terrainClip.getAreaById(item)
  map.flyToPositions(graphic.positions)
}

export function deletedGraphic(item) {
  const graphic = terrainClip.getAreaById(item)
  terrainClip.removeArea(graphic)
}

export function showHideArea(id, selected) {
  if (selected) {
    terrainClip.showArea(id)
  } else {
    terrainClip.hideArea(id)
  }
}
