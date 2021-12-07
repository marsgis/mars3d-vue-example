import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    // 此处参数会覆盖config.json中的对应配置
    center: { lat: 30.841762, lng: 116.26537, alt: 3281, heading: 39, pitch: -63 }
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
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

export function removeAll() {
  map.graphicLayer.clear()
  // eslint-disable-next-line no-undef
  clearInterResult()
}

/**
 * 面插值
 *
 * @export
 * @param {number} val 步长
 * @returns {void}
 */
export function interPolygon(val) {
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#29cf34",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    success: function (graphic) {
      const positions = graphic.positionsShow
      map.graphicLayer.clear()

      // let splitNum = Number($("#txtSplitNum").val())
      const resultInter = mars3d.PolyUtil.interPolygon({
        scene: map.scene,
        positions: positions,
        splitNum: val // splitNum插值分割的个数
      })

      // eslint-disable-next-line no-undef
      showInterResult(resultInter.list)
    }
  })
}

/**
 * 线插值
 *
 * @export
 * @param {number} val 步长
 * @returns {void}
 */
export function interLine(val) {
  map.graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3
    },
    success: function (graphic) {
      const positions = graphic.positionsShow
      map.graphicLayer.clear()

      const arrLine = mars3d.PolyUtil.interLine(positions, {
        splitNum: val // 插值分割的个数
      })

      // eslint-disable-next-line no-undef
      showInterLineResult(arrLine)
    }
  })
}

/**
 * 线插值(高度等分)
 *
 * @export
 * @param {number} val 步长
 * @returns {void}
 */
export function interPolyline(val) {
  map.graphicLayer.startDraw({
    type: "polyline",
    style: {
      color: "#55ff33",
      width: 3,
      clampToGround: true
    },
    success: function (graphic) {
      const positions = graphic.positionsShow
      map.graphicLayer.clear()

      const arrLine = mars3d.PolyUtil.interPolyline({
        scene: map.scene,
        positions: positions,
        splitNum: val // 插值分割的个数
      })

      // eslint-disable-next-line no-undef
      showInterLineResult(arrLine)
    }
  })
}
