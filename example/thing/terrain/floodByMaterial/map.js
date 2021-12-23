import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let floodByMaterial

export const mapOptions = {
  scene: {
    showSun: false,
    showMoon: false,
    showSkyBox: false,
    showSkyAtmosphere: false,
    fog: false,
    globe: {
      showGroundAtmosphere: false,
      enableLighting: false
    }
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

  // 基于地球材质，可以多个区域
  floodByMaterial = new mars3d.thing.FloodByMaterial({
    // speed: speed
  })
  map.addThing(floodByMaterial)

  floodByMaterial.on(mars3d.EventType.start, function (e) {
    console.log("开始分析", e)
  })
  floodByMaterial.on(mars3d.EventType.change, function (e) {
    onChangeHeight(e.height)
  })
  floodByMaterial.on(mars3d.EventType.end, function (e) {
    console.log("结束分析", e)
  })

  eventTarget.fire("loadOk", { floodByMaterial })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 绘制矩形
export function btnDrawExtent(callback) {
  floodByMaterial.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#007be6",
      opacity: 0.8,
      outline: false
    },
    success: function (graphic) {
      // 绘制成功后回调
      const positions = graphic.getOutlinePositions(false)

      // 更新最大、最小高度值
      updateHeightRange(positions, callback)

      // 区域
      floodByMaterial.addArea(positions)
    }
  })
}

// 绘制多边形
export function btnDraw(callback) {
  floodByMaterial.clear()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#007be6",
      opacity: 0.5,
      outline: false
    },
    success: function (graphic) {
      const positions = graphic.positionsShow

      // 更新最大、最小高度值
      updateHeightRange(positions, callback)
      floodByMaterial.addArea(positions)
    }
  })
}

// 求最大、最小高度值
function updateHeightRange(positions, callback) {
  showLoading()

  const result = mars3d.PolyUtil.getHeightRange(positions, map.scene)
  const minHeight = Math.ceil(result.minHeight)
  const maxHeight = Math.floor(result.maxHeight)

  callback(minHeight, maxHeight)
  hideLoading()
}

// 开始分析
export function begin(data) {
  if (floodByMaterial.length == 0) {
    globalMsg("请首先绘制分析区域！")
    return
  }
  map.graphicLayer.clear()

  const minValue = Number(data.minHeight)
  const maxValue = Number(data.maxHeight)
  const speed = Number(data.speed)

  floodByMaterial.setOptions({
    minHeight: minValue,
    maxHeight: maxValue,
    speed: speed
  })
  floodByMaterial.start()
}

function onChangeHeight(height) {
  console.log("高度发生了变化", height)
}

export function clearDraw() {
  floodByMaterial.clear()
  map.graphicLayer.clear()
}
