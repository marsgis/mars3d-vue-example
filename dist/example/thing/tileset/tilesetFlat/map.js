import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let tilesetFlat

export const mapOptions = {
  scene: {
    center: { lat: 25.072996, lng: 102.648666, alt: 3773, heading: 29, pitch: -45 }
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true
  addLayer()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addLayer() {
  // 加模型
  const tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-xiaoqu/tileset.json",
    maximumScreenSpaceError: 6,
    maximumMemoryUsage: 2048,
    flyTo: true
  })
  map.addLayer(tilesetLayer)

  // 模型压平处理类
  tilesetFlat = new mars3d.thing.TilesetFlat({
    layer: tilesetLayer,
    positions: [
      [102.656385, 25.087349, 1865],
      [102.660091, 25.085633, 1865],
      [102.658175, 25.081644, 1865],
      [102.654452, 25.084029, 1865]
    ],
    height: 0
  })
  map.addThing(tilesetFlat)

  // 模型加载完成
  tilesetLayer.on(mars3d.EventType.load, function () {
    // 触发自定义事件 dataLoaded
    eventTarget.fire("dataLoaded", { list: tilesetFlat.list })
  })

  // 会执行多次，重新加载一次完成后都会回调
  tilesetLayer.on(mars3d.EventType.allTilesLoaded, function (event) {
    console.log("触发allTilesLoaded事件", event)
  })
}

// 添加矩形
export export function btnDrawExtent(chkShowLine) {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.2,
      outline: false
    },
    success: function (graphic) {
      // 绘制成功后回调
      const positions = graphic.getOutlinePositions(false)
      map.graphicLayer.clear()

      addTestLine(chkShowLine, positions)
      console.log("绘制坐标为", JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 方便测试拷贝坐标

      const item = tilesetFlat.addArea(positions)

      addTableItem(item)
    }
  })
}
// 绘制多边形
export export function btnDraw(chkShowLine) {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5
    },
    success: function (graphic) {
      // 绘制成功后回调
      const positions = graphic.positionsShow
      map.graphicLayer.clear()

      addTestLine(chkShowLine, positions)
      console.log("绘制坐标为", JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 方便测试拷贝坐标

      const item = tilesetFlat.addArea(positions)

      addTableItem(item)
    }
  })
}
// 清除
export function removeAll() {
  tilesetFlat.clear()
  map.graphicLayer.clear()
}

// 改变压平的高度
export function changeFlatHeight(val) {
  tilesetFlat.height = val
}

// 是否显示测试边界线
export function chkShowLine(val) {
  if (!val) {
    map.graphicLayer.clear()
  }
}

function addTestLine(chkShowLine, positions) {
  if (!chkShowLine) {
    return
  }

  const graphic = new mars3d.graphic.PolylineEntity({
    positions: positions,
    style: {
      closure: true,
      color: "#ffffff",
      opacity: 0.8,
      width: 2,
      clampToGround: true
    }
  })
  map.graphicLayer.addGraphic(graphic)
}

// 触发自定义事件 addItem
function addTableItem(item) {
  eventTarget.fire("addItem", { item })
}
// 定位至模型
export function flyToGraphic(item) {
  const graphic = tilesetFlat.getAreaById(item)
  map.flyToPositions(graphic.positions)
}

// 删除模型
export function deletedGraphic(item) {
  const graphic = tilesetFlat.getAreaById(item)
  tilesetFlat.removeArea(graphic)
  map.graphicLayer.clear()
}
