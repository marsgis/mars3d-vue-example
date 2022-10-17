import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
let geoJsonLayerDTH

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 43.823957, lng: 125.136704, alt: 286, heading: 11, pitch: -24 }
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

  // 模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    pid: 2030,
    type: "3dtiles",
    name: "校园",
    url: "//data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",
    position: { alt: 15.8 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    center: { lat: 43.821193, lng: 125.143124, alt: 990, heading: 342, pitch: -50 }
  })
  map.addLayer(tiles3dLayer)

  // 创建单体化图层
  geoJsonLayerDTH = new mars3d.layer.GeoJsonLayer()
  map.addLayer(geoJsonLayerDTH)

  geoJsonLayerDTH.bindPopup((e) => {
    const item = e.graphic.attr
    const html = `房号：${item.name}<br/>
                楼层：第${item.thisFloor}层 (共${item.allFloor}层)<br/>`
    return html
  })
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

let pointsArr = [] // 绘制面的四个点
const tableArr = [] // 表格数据

// 添加单体化数据
export function addData() {
  return map.graphicLayer.startDraw({
    type: "polygonP",
    style: {
      color: "#00FF00",
      opacity: 0.3,
      outline: true,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    success: function (graphic) {
      geoJsonLayerDTH.addGraphic(graphic)

      pointsArr = []
      graphic.points.forEach((item) => {
        pointsArr.push([item.lng, item.lat])
      })
    }
  })
}

// 生成表格数据，绘制每层
export function produceData(drawGraphicId, position, floorCount, minHeight, maxHeight, lastGraphicArrId) {
  console.log("map.js中的drawGraphicId", drawGraphicId)
  if (floorCount === 0) {
    globalMsg("楼层不能为0 ！")
    return
  } else if (minHeight === 0) {
    globalMsg("最低高度不能为0 ！")
    return
  } else if (maxHeight === 0) {
    globalMsg("最高高度不能为0 ！")
    return
  } else if (maxHeight <= minHeight) {
    globalMsg("最高高度不能小于等于最低高度 ！")
    return
  }

  const floorHeight = (maxHeight - minHeight) / floorCount

  // 清除矢量数据
  if (lastGraphicArrId) {
    lastGraphicArrId.forEach((item) => {
      quitDraw(item)
    })
  }

  if (drawGraphicId) {
    quitDraw(drawGraphicId)
  }

  const generateGraphicIdArr = []

  for (let i = 0; i < floorCount; i++) {
    const height = minHeight * 1 + floorHeight * i
    const extrudedHeight = minHeight * 1 + floorHeight * (i + 1)
    const color = i % 2 === 0 ? "red" : "#1e1e1e"
    const attr = {
      name: i + 1,
      thisFloor: i + 1,
      allFloor: floorCount,
      floorHeight: floorHeight.toFixed(2)
    }
    const graphic = new mars3d.graphic.PolygonPrimitive({
      positions: position,
      style: {
        height: height,
        extrudedHeight: extrudedHeight,
        // 单体化默认显示样式
        color: getColor(),
        opacity: 0.3,
        classification: true,
        // 单体化鼠标移入或单击后高亮的样式
        highlight: {
          type: mars3d.EventType.click,
          color: color,
          opacity: 0.6
        }
      },
      attr
    })
    console.log("graphic", graphic)
    generateGraphicIdArr.push(graphic.id)
    tableArr.push(attr)

    geoJsonLayerDTH.addGraphic(graphic)
  }

  const produceObj = {
    floorHeight,
    floorCount,
    minHeight,
    maxHeight,
    generateGraphicIdArr
  }

  return produceObj
}

export function getBuildingHeight() {
  return map.graphicLayer.startDraw({
    type: "point",
    style: {
      color: "#00fff2"
    },
    success: (graphic) => {
      const height = graphic.point?.alt
      map.graphicLayer.removeGraphic(graphic)

      if (!height) {
        return
      }
      return height
    }
  })
}

// 取消绘制
export function quitDraw(id) {
  console.log("清除的", id)
  const quitGraphic = geoJsonLayerDTH.getGraphicById(id)
  geoJsonLayerDTH.removeGraphic(quitGraphic)
}

// 颜色
let index = 0
const colors = ["#99CCCC", "#66FF66", "#FF6666", "#00CCFF", "#00FF33", "#CC0000", "#CC00CC", "#CCFF00", "#0000FF"]
function getColor() {
  const i = index++ % colors.length
  return colors[i]
}
