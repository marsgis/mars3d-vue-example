import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let canvasWindLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 17.262069, lng: 118.610529, alt: 21466323, heading: 359, pitch: -89 }
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
  map.basemap = 2017 // 蓝色底图

  // 风场
  canvasWindLayer = new mars3d.layer.CanvasWindLayer({
    color: "#ffffff", // 颜色
    frameRate: 20, // 每秒刷新次数
    speedRate: 60, // 风前进速率
    particlesNumber: 5000,
    maxAge: 120,
    lineWidth: 1
  })
  map.addLayer(canvasWindLayer)

  loadEarthData()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 滑动条事件
// 修改粒子数量
export function changeCount(val) {
  if (val) {
    canvasWindLayer.particlesNumber = val
  }
}

// 修改存活时间
export function changeAge(val) {
  if (val) {
    canvasWindLayer.maxAge = val
  }
}

// 修改移动速率
export function changeSpeed(val) {
  if (val) {
    canvasWindLayer.speedRate = val
  }
}

// 修改线宽
export function changeLinewidth(val) {
  if (val) {
    canvasWindLayer.lineWidth = val
  }
}

// 改变颜色
export function changeColor(color) {
  canvasWindLayer.color = color
}

// 加载全球数据
let earthWindData
// 加载气象
let dongnanWindData
export function loadEarthData() {
  map.flyHome()

  canvasWindLayer.speedRate = 50
  canvasWindLayer.reverseY = false // false时表示 纬度顺序从大到小

  queryWindyuvApiData()
    .then(function (res) {
      if (earthWindData) {
        canvasWindLayer.data = earthWindData
        return
      }
      earthWindData = res
      canvasWindLayer.data = earthWindData
    })
    .otherwise(function (err) {
      console.log("请求数据失败!", err)
    })
}
// 加载局部数据
export function loadDongnanData() {
  map.setCameraView({
    y: 30.484229,
    x: 116.627601,
    z: 1719951,
    heading: 0,
    pitch: -90,
    roll: 0
  })

  canvasWindLayer.speedRate = 85
  canvasWindLayer.reverseY = true // true时表示 纬度顺序从小到到大

  queryWindpointApiData()
    .then(function (res) {
      if (dongnanWindData) {
        canvasWindLayer.data = dongnanWindData
        return
      }
      dongnanWindData = convertWindData(res.data)
      canvasWindLayer.data = dongnanWindData
    })
    .otherwise(function () {
      globalMsg("实时查询气象信息失败，请稍候再试")
    })
}

// 访问windyuv.json后端接口，取数据
function queryWindyuvApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/windyuv.json" })
  // }
}
// 访问windpoint.json后端接口，取数据
function queryWindpointApiData() {
  return mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/windpoint.json" })
}

// 将数据转换为需要的格式:风向转UV
function convertWindData(arr) {
  const arrU = []
  const arrV = []

  let xmin = arr[0].x
  let xmax = arr[0].x
  let ymin = arr[0].y
  let ymax = arr[0].y

  // 风向是以y轴正方向为零度顺时针转，0度表示北风。90度表示东风。
  // u表示经度方向上的风，u为正，表示西风，从西边吹来的风。
  // v表示纬度方向上的风，v为正，表示南风，从南边吹来的风。
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]

    if (xmin > item.x) {
      xmin = item.x
    }
    if (xmax < item.x) {
      xmax = item.x
    }
    if (ymin > item.y) {
      ymin = item.y
    }
    if (ymax < item.y) {
      ymax = item.y
    }

    const u = mars3d.WindUtil.getU(item.speed, item.dir)
    arrU.push(u)

    const v = mars3d.WindUtil.getV(item.speed, item.dir)
    arrV.push(v)
  }

  const rows = getKeyNumCount(arr, "y") // 计算 行数
  const cols = getKeyNumCount(arr, "x") // 计算 列数

  return {
    xmin: xmin,
    xmax: xmax,
    ymax: ymax,
    ymin: ymin,
    rows: rows,
    cols: cols,
    udata: arrU, // 横向风速
    vdata: arrV // 纵向风速
  }
}

function getKeyNumCount(arr, key) {
  const obj = {}
  arr.forEach((item) => {
    obj[item[key]] = true
  })

  let count = 0
  for (const col in obj) {
    count++
  }
  return count
}
