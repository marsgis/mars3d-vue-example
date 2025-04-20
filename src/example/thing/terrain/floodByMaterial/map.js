import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
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

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 基于地球材质，可以多个区域
  floodByMaterial = new mars3d.thing.FloodByMaterial({
    color: "rgba(0, 123, 230, 0.5)" // 淹没颜色
  })
  map.addThing(floodByMaterial)

  floodByMaterial.on(mars3d.EventType.start, function (e) {
    console.log("开始分析", e)
  })

  floodByMaterial.on(mars3d.EventType.change, function (e) {
    const height = e.height
    eventTarget.fire("heightChange", { height })
  })

  floodByMaterial.on(mars3d.EventType.end, function (e) {
    console.log("结束分析", e)
    eventTarget.fire("floodEnd")
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 绘制矩形
export async function btnDrawExtent(callback, floodColor) {
  clearDraw()

  const graphic = await map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: floodColor || "rgba(0, 123, 230, 0.5)"
      // clampToGround: true
    }
  })
  const positions = graphic.getOutlinePositions(false)

  // 更新最大、最小高度值
  await updateHeightRange(graphic, positions, callback)

  // 区域
  floodByMaterial.addArea(positions)
}

// 绘制多边形
export async function btnDraw(callback, floodColor) {
  clearDraw()

  const graphic = await map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: floodColor || "rgba(0, 123, 230, 0.5)",
      outline: false
      // clampToGround: true
    }
  })
  const positions = graphic.positionsShow

  // 更新最大、最小高度值
  await updateHeightRange(graphic, positions, callback)
  floodByMaterial.addArea(positions)
}

// 求最大、最小高度值
async function updateHeightRange(graphic, positions, callback) {
  showLoading()

  // 求最大、最小高度值
  graphic.show = false // 会遮挡深度图，所以需要隐藏
  const result = await mars3d.PolyUtil.interPolygonByDepth({ scene: map.scene, positions })

  graphic.show = true // 恢复显示
  const minHeight = Math.floor(result.minHeight)
  const maxHeight = Math.ceil(result.maxHeight)

  callback(minHeight, maxHeight)

  hideLoading()
}

// 开始分析
export function begin(data) {
  if (floodByMaterial.length === 0) {
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
    speed
  })
  floodByMaterial.start()
}

// 高度选择
export function onChangeHeight(height) {
  floodByMaterial.height = height
}

// 颜色发生改变
export function onChangeColor(color) {
  floodByMaterial.color = color
}

// 自动播放
export function startPlay() {
  if (floodByMaterial.isStart) {
    floodByMaterial.stop() // 暂停
  } else {
    if (floodByMaterial.height >= floodByMaterial._maxHeight - 1) {
      floodByMaterial.restart() // 重新开始
    } else {
      floodByMaterial.start() // 开始或继续
    }
  }
}

// 是否显示非淹没区域
export function onChangeElse(val) {
  floodByMaterial.showElseArea = val
}

export function clearDraw() {
  floodByMaterial.clear()
  map.graphicLayer.clear()
}
