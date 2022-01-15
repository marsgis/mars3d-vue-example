import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.806147, lng: 117.236965, alt: 3307, heading: 359, pitch: -54 }
  },
  terrain: {
    show: false
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

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    const pickedItem = event.pickedObject?.data
    console.log("单击了合并对象中的单个值为", pickedItem)
  })

  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr
    if (!attr) {
      return false
    }
    return mars3d.Util.getTemplateHtml({ title: "线", template: "all", attr: attr })
  })

  // 加一些演示数据
 addGraphicDemo1(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  clearLayer()
}

export function addCombineData(count) {
  graphicLayer.clear()

  showLoading()
  const startTime = new Date().getTime()

  count = count * 10000

  const arrData = []
  for (let j = 0; j < count; ++j) {
    const position = randomPoint()
    const pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 225, 500)
    const pt3 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 315, 500)

    arrData.push({
      positions: [pt1, position, pt3],
      style: {
        width: 2.0,
        height: random(30, 9000),
        color: Cesium.Color.fromRandom({ alpha: 1.0 })
      },
      attr: {
        name: "第" + j + "个"
      }
    })
  }

  // 多个线对象的合并渲染。
  const primitive = new mars3d.graphic.PolylineCombine({
    instances: arrData,
    // 高亮时的样式
    highlight: {
      type: mars3d.EventType.click,
      color: Cesium.Color.YELLOW
    }
  })
  graphicLayer.addGraphic(primitive)

  hideLoading()
  const endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  const usedTime = (endTime - startTime) / 1000

  globalMsg("共耗时" + usedTime.toFixed(2) + "秒")
}

export function clearLayer() {
  graphicLayer.clear()
}

function addGraphicDemo1(graphicLayer) {
  // 加一些演示数据
  Cesium.Resource.fetchJson({
    url: "//data.mars3d.cn/file/geojson/buildings-hf.json"
  })
    .then((data) => {
      const arr = mars3d.Util.geoJsonToGraphics(data, {
        symbol: {
          callback: function (attr, styleOpt) {
            return {
              width: 2.0,
              color: Cesium.Color.fromRandom({ alpha: 1.0 }) // 随机色
            }
          }
        }
      })

      globalMsg("共加载" + arr.length + "个线")

      // 多个线对象的合并渲染。
      const primitive = new mars3d.graphic.PolylineCombine({
        instances: arr,

        // 高亮时的样式
        highlight: {
          type: mars3d.EventType.click,
          color: Cesium.Color.YELLOW
        }
      })
      graphicLayer.addGraphic(primitive)
    })
    .otherwise(function (error) {
      console.log("服务出错", error)
    })
}

// 取区域内的随机图标
function randomPoint() {
  const jd = random(115.955684 * 1000, 117.474003 * 1000) / 1000
  const wd = random(30.7576 * 1000, 32.008782 * 1000) / 1000
  return Cesium.Cartesian3.fromDegrees(jd, wd)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
