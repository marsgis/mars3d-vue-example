import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.353044, lng: 117.230763, alt: 58544, heading: 1, pitch: -51 }
  },
  terrain: {
    show: false
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    const pickedItem = event.pickedObject?.data
    // let attr = event.graphic.attr
    console.log("单击了合并对象中的单个值为", pickedItem)
  })

  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效

  // 加演示数据
  addRandomGraphicByCount(10000)
  graphicLayer.flyTo()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  const radius = result.radius
  const dimensions = new Cesium.Cartesian3(radius, radius, radius)

  const arrData = []
  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    arrData.push({
      position,
      style: {
        dimensions,
        color: Cesium.Color.fromRandom({ alpha: 0.6 })
      },
      attr: { index }
    })
  }

  // 多个矢量对象的合并渲染。
  const graphic = new mars3d.graphic.BoxCombine({
    instances: arrData,
    // style: {
    //   outline: true,
    //   outlineWidth: 1,
    //   outlineColor: "#ffffff",
    // },
    // 高亮时的样式
    highlight: {
      type: mars3d.EventType.click,
      color: Cesium.Color.YELLOW.withAlpha(0.9)
    }
  })
  graphicLayer.addGraphic(graphic)

  // 演示：主动弹出Popup
  // graphic.openPopup(0)

  // 演示：平滑移动高度
  // let height = 0
  // setInterval(() => {
  //   if (height > 10000 || graphic.isDestroy) {
  //     return
  //   }
  //   height += 1
  //   graphic.offsetHeight = height
  // }, 10)

  // 演示：设置颜色
  // graphic.readyPromise.then(() => {
  //   graphic.setColorStyle({ color: "#ff0000" }, 0)
  // })

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 在图层绑定Popup弹窗
export function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic.attr || {}
    attr["类型"] = event.graphic.type
    attr["来源"] = "我是layer上绑定的Popup"
    attr["备注"] = "我支持鼠标交互"

    return mars3d.Util.getTemplateHtml({ title: "矢量图层", template: "all", attr })
  })
}
