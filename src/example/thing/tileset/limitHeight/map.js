import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let limitHeight

export const mapOptions = {
  scene: {
    center: { lat: 25.092295, lng: 102.64431, alt: 2815, heading: 104, pitch: -32 }
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

  map.fixedLight = true // 固定光照，避免gltf模型随时间存在亮度不一致。

  // 加模型
  const tilesetLayer = new mars3d.layer.TilesetLayer({
    url: "//data.mars3d.cn/3dtiles/qx-xiaoqu/tileset.json",
    maximumScreenSpaceError: 6,
    maximumMemoryUsage: 2048
  })
  map.addLayer(tilesetLayer)

  // 限高分析类
  limitHeight = new mars3d.thing.LimitHeight({
    color: "rgba(255,0,0,0.5)",
    height: 80, // 限高
    bottomHeight: 1865, // 模型地面的海拔高度（单位：米）
    positions: [
      [102.662083, 25.09593, 0],
      [102.665105, 25.078242, 0],
      [102.650108, 25.085209, 0],
      [102.655136, 25.097225, 0]
    ]
  })
  map.addThing(limitHeight)

  // 自动读取模型的高度，但不一定准确。
  // tilesetLayer.on(mars3d.EventType.load, function (event) {
  //   limitHeight.bottomHeight = mars3d.LngLatPoint.fromCartesian(tilesetLayer.boundingSphere.center).alt
  // })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

// 滑动条
export function currHeight(value) {
  limitHeight.height = value
}

// 绘制矩形
export function drawExtent() {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "rectangle",
    style: {
      color: "#ffff00",
      opacity: 0.3,
      clampToGround: true
    },
    success: function (graphic) {
      // 绘制成功后回调
      const positions = graphic.getOutlinePositions(false)
      limitHeight.positions = positions

      map.graphicLayer.clear()
    }
  })
}

// 绘制面
export function drawPolygon() {
  map.graphicLayer.clear()
  map.graphicLayer.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      opacity: 0.3,
      clampToGround: true
    },
    success: function (graphic) {
      // 绘制成功后回调
      const positions = graphic.positionsShow
      limitHeight.positions = positions

      map.graphicLayer.clear()
      console.log("绘制坐标为", JSON.stringify(mars3d.PointTrans.cartesians2lonlats(positions))) // 方便测试拷贝坐标
    }
  })
}

export function clear() {
  limitHeight.clear()
  map.graphicLayer.clear()
}
