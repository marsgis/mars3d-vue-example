import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
let routeLayer // 矢量数据图层
let query // 高德 路径规划

// 当前页面业务相关
let startGraphic, endGraphic

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.797919, lng: 117.281329, alt: 36236, heading: 358, pitch: -81 }
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  globalNotify("已知问题提示", `(1) token如果访问失效或超流量了，请您自行申请替换mars3d.Token.update相关方法`)

  query = new mars3d.query.QueryRoute({
    service: mars3d.QueryServiceType.GAODE
  })

  // 创建矢量数据图层
  routeLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(routeLayer)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 切换服务
export function changeService(type) {
  query.setOptions({ service: type })
}

// 开始分析按钮
export function btnAnalyse(type) {
  if (!startGraphic || !endGraphic) {
    globalMsg("请设置起点和终点")
    return
  }
  queryRouteServe(type)
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
 * @returns {string}
 */
export function startPoint(type) {
  if (startGraphic) {
    startGraphic.remove()
    startGraphic = null
  }

  return map.graphicLayer
    .startDraw({
      type: "billboard",
      style: {
        image: "https://data.mars3d.cn/img/marker/route-start.png",
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    })
    .then((graphic) => {
      startGraphic = graphic
      const point = graphic.point
      point.format()
      // 触发自定义事件，改变输入框的值
      queryRouteServe(type)

      return point.lng + "," + point.lat
    })
}

/**
 * 终点按钮
 *
 * @export
 * @param {string} type 不同方式路线查询
 * @returns {string}
 */
export function endPoint(type) {
  if (endGraphic) {
    endGraphic.remove()
    endGraphic = null
  }

  return map.graphicLayer
    .startDraw({
      type: "billboard",
      style: {
        image: "https://data.mars3d.cn/img/marker/route-end.png",
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    })
    .then((graphic) => {
      endGraphic = graphic
      const point = graphic.point
      point.format()
      queryRouteServe(type)

      return point.lng + "," + point.lat
    })
}

function queryRouteServe(type) {
  if (!startGraphic || !endGraphic) {
    return
  }

  routeLayer.clear()
  showLoading()

  query.query({
    type: type,
    points: [startGraphic.coord, endGraphic.coord],
    success: function (data) {
      hideLoading()
      const firstItem = data.paths[0]
      const points = firstItem.points
      if (!points || points.length < 1) {
        return
      }

      const time = mars3d.Util.formatTime(firstItem.allDuration)
      const distance = mars3d.MeasureUtil.formatDistance(firstItem.allDistance)
      const html = "<div>总距离：" + distance + "<br/>所需时间：" + time + "</div>"

      const graphic = new mars3d.graphic.PolylineEntity({
        positions: points,
        style: {
          clampToGround: true,
          material: Cesium.Color.AQUA.withAlpha(0.8),
          width: 5
        },
        attr: firstItem,
        popup: html
      })
      routeLayer.addGraphic(graphic)

      const allTime = mars3d.Util.formatTime(firstItem.allDuration)
      const allDistance = mars3d.MeasureUtil.formatDistance(firstItem.allDistance)
      let dhHtml = ""
      for (let i = 0; i < firstItem.steps.length; i++) {
        const item = firstItem.steps[i]
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

// 点击保存GeoJSON
export function saveGeoJSON() {
  if (routeLayer.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = routeLayer.toGeoJSON()
  mars3d.Util.downloadFile("导航路径.json", JSON.stringify(geojson))
}
