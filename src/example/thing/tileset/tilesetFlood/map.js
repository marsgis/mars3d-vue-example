import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let tilesetFlood

export const mapOptions = {
  scene: {
    center: { lat: 25.074712, lng: 102.65196, alt: 3122, heading: 28, pitch: -41 }
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

  // 会执行多次，重新加载一次完成后都会回调
  tilesetLayer.on(mars3d.EventType.allTilesLoaded, function (event) {
    console.log("触发allTilesLoaded事件", event)
  })

  // 模型淹没处理类
  tilesetFlood = new mars3d.thing.TilesetFlood({
    layer: tilesetLayer,
    floodAll: false
  })
  map.addThing(tilesetFlood)

  tilesetFlood.on(mars3d.EventType.start, function (e) {
    console.log("开始分析", e)
  })
  tilesetFlood.on(mars3d.EventType.change, function (e) {
    // onChangeHeight(e.height)
  })
  tilesetFlood.on(mars3d.EventType.end, function (e) {
    console.log("结束分析", e)
  })
}

// 修改分析方式
export function changeFloodType(val) {
  if (val === "1") {
    tilesetFlood.floodAll = true
  } else {
    tilesetFlood.floodAll = false
  }
}

// 绘制矩形
export function btnDrawExtent() {
  stop()
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
      tilesetFlood.addArea(positions)
    }
  })
}
// 绘制多边形
export function btnDraw() {
  stop()
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    },
    success: function (graphic) {
      // 绘制成功后回调
      const positions = graphic.positionsShow
      tilesetFlood.addArea(positions)

      console.log("绘制坐标为", JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 方便测试拷贝坐标
    }
  })
}

// 开始分析
let tf = false
export function begin(data) {
  if (tf) {
    globalMsg("请先结束当前分析")
    return
  }

  if (!tilesetFlood.floodAll && tilesetFlood.length == 0) {
    globalMsg("请首先绘制分析区域！")
    return
  }
  map.graphicLayer.clear()

  const minValue = Number(data.minHeight)
  const maxValue = Number(data.maxHeight)
  const speed = Number(data.speed)
  if (minValue <= 1800) {
    globalMsg("最低海拔过低，请耐心等候几秒")
  }
  if (minValue > maxValue) {
    globalMsg("当前最低海拔高于最高海拔")
    return
  }

  console.log("当前参数", { minHeight: minValue, maxHeight: maxValue })

  tilesetFlood.setOptions({
    minHeight: minValue,
    maxHeight: maxValue,
    speed: speed
  })

  tilesetFlood.start()
  tf = true
}

export function stop() {
  tf = false
  tilesetFlood.clear()
}
