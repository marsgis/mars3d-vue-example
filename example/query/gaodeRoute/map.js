import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let routeLayer
let gaodeRoute

// 当前页面业务相关
let startGraphic, endGraphic

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.797919, lng: 117.281329, alt: 36236, heading: 358, pitch: -81 }
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

  // 创建矢量数据图层
  routeLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(routeLayer)

  gaodeRoute = new mars3d.query.GaodeRoute({
    // key: ['ae29a37307840c7ae4a785ac905927e0'],
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 开始分析按钮
export function btnAnalyse(type) {
  if (!startGraphic || !endGraphic) {
    globalMsg("请设置起点和终点")
    return
  }
  queryRoute(type)
}
// 清除按钮
export function removeAll() {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }
  if (endGraphic) {
    endGraphic.remove()
    endGraphic = null
  }

  routeLayer.clear()
}

/**
 * 起点按钮
 *
 * @export
 * @param {string} type 不同方式路线查询
 * @returns {void}
 */
export function startPoint(type) {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }

  map.graphicLayer.startDraw({
    type: "billboard",
    style: {
      image: "img/marker/start.png",
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    },
    success: function (graphic) {
      startGraphic = graphic

      const point = graphic.point
      point.format()

      // 触发自定义事件，改变输入框的值
      eventTarget.fire("start", { point })

      queryRoute(type)
    }
  })
}

/**
 * 终点按钮
 *
 * @export
 * @param {string} type 不同方式路线查询
 * @returns {void}
 */
export function endPoint(type) {
  if (endGraphic) {
    endGraphic.remove()
    endGraphic = null
  }

  map.graphicLayer.startDraw({
    type: "billboard",
    style: {
      image: "img/marker/end.png",
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
    },
    success: function (graphic) {
      endGraphic = graphic

      const point = graphic.point
      point.format()

      // 触发自定义事件，改变输入框的值
      eventTarget.fire("end", { point })

      queryRoute(type)
    }
  })
}

function queryRoute(type) {
  if (!startGraphic || !endGraphic) {
    return
  }

  routeLayer.clear()
  showLoading()

  gaodeRoute.query({
    type: type,
    points: [startGraphic.coordinate, endGraphic.coordinate],
    success: function (data) {
      hideLoading()
      const lineFirst = data.paths[0]
      const points = lineFirst.points
      if (!points || points.length < 1) {
        return
      }

      const time = formatTime(lineFirst.allDuration)
      const distance = mars3d.MeasureUtil.formatDistance(lineFirst.allDistance)
      const html = "<div>总距离：" + distance + "<br/>所需时间：" + time + "</div>"

      const graphic = new mars3d.graphic.PolylineEntity({
        positions: points,
        style: {
          clampToGround: true,
          material: Cesium.Color.AQUA.withAlpha(0.8),
          width: 5
        },
        popup: html
      })
      routeLayer.addGraphic(graphic)

      const allTime = formatTime(data.paths[0].allDuration)
      const allDistance = mars3d.MeasureUtil.formatDistance(data.paths[0].allDistance)

      let dhHtml = ""
      for (let i = 0; i < data.paths[0].steps.length; i++) {
        const item = data.paths[0].steps[i]
        dhHtml += item.instruction + "；"
      }

      eventTarget.fire("analyse", { allTime, allDistance, dhHtml })
    },
    error: function (msg) {
      hideLoading()
      globalAlert(msg)
    }
  })
}

// 格式化时间
function formatTime(strtime) {
  strtime = Number(strtime) || 0

  if (strtime < 60) {
    return strtime.toFixed(0) + "秒"
  } else if (strtime >= 60 && strtime < 3600) {
    const miao = Math.floor(strtime % 60)
    return Math.floor(strtime / 60) + "分钟" + (miao != 0 ? miao + "秒" : "")
  } else {
    strtime = Math.floor(strtime / 60) // 秒转分钟
    return Math.floor(strtime / 60) + "小时" + Math.floor(strtime % 60) + "分钟"
  }
}
