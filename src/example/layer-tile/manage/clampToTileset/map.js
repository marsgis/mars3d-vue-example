import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 事件对象，用于抛出事件给面板
export const eventTarget = new mars3d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.931953, lng: 117.352307, alt: 207201, heading: 0, pitch: -64 }
  },
  terrain: {
    show: false
  },
  method: {
    basemap: "无底图"
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  globalNotify(
    "已知问题提示",
    `(1)多个图层调整时会全部重新渲染；
    (2)目前EPSG:3857 Web墨卡托投影坐标系的瓦片显示存在投影模糊问题。`
  )

  // const graphic = new mars3d.graphic.RectanglePrimitive({
  //   positions: [
  //     [119.474794, 28.442985, 142.6],
  //     [119.478693, 28.43993, 131.1]
  //   ],
  //   style: {
  //     color: Cesium.Color.BLUE,
  //     clampToGround: true
  //   },
  //   attr: { remark: "示例4" }
  // })
  // map.graphicLayer.addGraphic(graphic)

  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "县城社区",
    url: "https://data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 15 },
    maximumScreenSpaceError: 1,
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  // 注记 EPSG:4326
  const tdtLayer = new mars3d.layer.TdtLayer({
    name: "贴模型注记4326",
    layer: "img_z",
    key: mars3d.Token.tiandituArr,
    crs: mars3d.CRS.EPSG4326,
    clampToTileset: true // 关键代码
  })
  map.addLayer(tdtLayer)

  // 注记 EPSG:3857 Web墨卡托投影坐标系
  // const tdtLayer2 = new mars3d.layer.GaodeLayer({
  //   name: "贴模型注记3857",
  //   layer: "img_z",
  //   clampToTileset: true // 关键代码
  // })
  // map.addLayer(tdtLayer2)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 叠加的图层
let tileLayer
export function addTileLayer() {
  removeTileLayer()

  tileLayer = new mars3d.layer.TileInfoLayer({
    name: "瓦片信息",
    clampToTileset: true
  })
  map.addLayer(tileLayer)
}

export function removeTileLayer() {
  if (tileLayer) {
    map.removeLayer(tileLayer, true)
    tileLayer = null
  }
}
