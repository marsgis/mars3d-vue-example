import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.760749, lng: 117.247058, alt: 3824, heading: 359, pitch: -33 }
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

  // 固定光照，避免gltf模型随时间存在亮度不一致。
  map.fixedLight = true

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    const pickedItem = event.pickedObject?.data
    // let attr = event.graphic.attr
    console.log("单击了合并对象中的单个值为", pickedItem)

    // 测试修改model
    // let instance = event.pickedObject
    // let scaleMatrix = Cesium.Matrix4.fromUniformScale(1.1)
    // let modelMatrix = Cesium.Matrix4.multiply(instance.modelMatrix, scaleMatrix, new Cesium.Matrix4())
    // instance.modelMatrix = modelMatrix
  })

  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr
    if (!attr) {
      return false
    }
    return mars3d.Util.getTemplateHtml({ title: "建筑物", template: "all", attr: attr })
  })

  createCollection(1000)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function addCombineData(count) {
  graphicLayer.clear()

  showLoading()

  const startTime = new Date().getTime()

  createCollection(count)

  hideLoading()
  const endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  const usedTime = (endTime - startTime) / 1000

  globalMsg("共耗时" + usedTime.toFixed(2) + "秒")
}

export function clearLayer() {
  graphicLayer.clear()
}

// 合并渲染
function createCollection(count) {
  const arrData = []
  for (let j = 0; j < count; ++j) {
    arrData.push({
      position: randomPoint(),
      style: {
        heading: 270,
        scale: 30
      },
      attr: {
        name: "第" + j + "个模型"
      }
    })
  }

  const modelCombine = new mars3d.graphic.ModelCombine({
    url: "//data.mars3d.cn/gltf/mars/fengche.gltf",
    instances: arrData
  })
  graphicLayer.addGraphic(modelCombine)
}

// 取区域内的随机图标
function randomPoint() {
  const jd = random(117.184644 * 1000, 117.307163 * 1000) / 1000
  const wd = random(31.783595 * 1000, 31.87024 * 1000) / 1000
  return new mars3d.LatLngPoint(jd, wd, 50)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
