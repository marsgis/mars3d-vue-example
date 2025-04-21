import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
  addDemoGraphic3(graphicLayer)
  addDemoGraphic3b(graphicLayer)
  addDemoGraphic4(graphicLayer)
  addDemoGraphic5(graphicLayer)
  addDemoGraphic6(graphicLayer)
  addDemoGraphic7(graphicLayer)
  addDemoGraphic8(graphicLayer)
  addDemoGraphic9(graphicLayer)
  addDemoGraphic10(graphicLayer)
  addDemoGraphic11(graphicLayer)
  addDemoGraphic12(graphicLayer)
  addDemoGraphic13(graphicLayer)
  addDemoGraphic14(graphicLayer)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null

  graphicLayer.remove()
  graphicLayer = null
}

function addDemoGraphic1(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: [116.1, 31.0, 1000],
    style: {
      radii: new Cesium.Cartesian3(1000.0, 1000.0, 1500.0),
      color: "#00ff00",
      opacity: 0.5,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.9
      }
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  initGraphicManager(graphic)
}
// 也可以在单个Graphic上做个性化管理及绑定操作
function initGraphicManager(graphic) {
  // 3.在graphic上绑定监听事件
  // graphic.on(mars3d.EventType.click, function (event) {
  //   console.log("监听graphic，单击了矢量对象", event)
  // })
  // 绑定Tooltip
  // graphic.bindTooltip('我是graphic上绑定的Tooltip') //.openTooltip()

  // 绑定Popup
  const inthtml = `<table style="width: auto;">
            <tr>
              <th scope="col" colspan="2" style="text-align:center;font-size:15px;">我是graphic上绑定的Popup </th>
            </tr>
            <tr>
              <td>提示：</td>
              <td>这只是测试信息，可以任意html</td>
            </tr>
          </table>`
  graphic.bindPopup(inthtml).openPopup()

  // 绑定右键菜单
  graphic.bindContextMenu([
    {
      text: "开始编辑对象[graphic绑定的]",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return !graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "删除对象[graphic绑定的]",
      icon: "fa fa-trash-o",
      callback: (e) => {
        const graphic = e.graphic
        if (graphic) {
          graphic.remove()
        }
      }
    }
  ])
}

//
function addDemoGraphic2(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.2, 31.0, 1000),
    style: {
      radii: new Cesium.Cartesian3(1000.0, 1000.0, 1000.0),
      color: Cesium.Color.RED.withAlpha(0.5),
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

//
function addDemoGraphic3(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.307258, 30.999546, 1239.2),
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      maximumConeDegree: 90,
      materialType: mars3d.MaterialType.EllipsoidElectric,
      materialOptions: {
        color: Cesium.Color.GREEN,
        speed: 5.0
      }
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic3b(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.303345, 31.087028, 452.2),
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      maximumConeDegree: 90,
      materialType: mars3d.MaterialType.EllipsoidWave,
      materialOptions: {
        color: "#00ffff",
        speed: 5.0
      }
    }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

//
function addDemoGraphic4(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: [116.4, 31.0, 1000],
    style: {
      radii: new Cesium.Cartesian3(2500.0, 2500.0, 2500.0),
      innerRadii: new Cesium.Cartesian3(10.0, 10.0, 10.0),
      minimumClockDegree: -15.0,
      maximumClockDegree: 15.0,
      minimumConeDegree: 75.0,
      maximumConeDegree: 105.0,
      pitch: 30,
      color: "#f33349",
      opacity: 0.9,
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)",
      label: {
        text: "我是原始的",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -10,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)

  // graphic转geojson
  const geojson = graphic.toGeoJSON()
  console.log("转换后的geojson", geojson)
  addGeoJson(geojson, graphicLayer)
}

// 添加单个geojson为graphic，多个直接用graphicLayer.loadGeoJSON
function addGeoJson(geojson, graphicLayer) {
  const graphicCopy = mars3d.Util.geoJsonToGraphics(geojson)[0]
  delete graphicCopy.attr
  // 新的坐标
  graphicCopy.position = [116.5, 31.0, 1000]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

// 2圈平面扇形
function addDemoGraphic5(graphicLayer) {
  const outerRadius = 5000.0
  const innerRadius = 1000

  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: [116.1, 30.9, 1000],
    style: {
      radii: new Cesium.Cartesian3(outerRadius, outerRadius, outerRadius),
      innerRadii: new Cesium.Cartesian3(innerRadius, innerRadius, innerRadius),
      minimumClockDegree: -20.0,
      maximumClockDegree: 20.0,
      minimumConeDegree: 90,
      maximumConeDegree: 90,
      color: "rgba(255,255,0,0.2)",
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 半圆顶球体
function addDemoGraphic6(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.2, 30.9, 1000),
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      maximumConeDegree: 90,
      color: Cesium.Color.BLUE.withAlpha(0.3),
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 含内半径 半圆顶球体
function addDemoGraphic7(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.3, 30.9, 1000),
    style: {
      radii: new Cesium.Cartesian3(2500.0, 2000.0, 1500.0),
      innerRadii: new Cesium.Cartesian3(1000.0, 800.0, 600.0),
      maximumConeDegree: 90,
      color: Cesium.Color.RED.withAlpha(0.3),
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示：平滑移动高度
  let height = 0
  setInterval(() => {
    if (height > 10000 || graphic.isDestroy) {
      return
    }
    height += 1
    graphic.offsetHeight = height
  }, 10)
}

// 被切开的含内半径 半圆顶球体
function addDemoGraphic8(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.4, 30.9, 1000),
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      innerRadii: new Cesium.Cartesian3(1000.0, 1000.0, 1000.0),
      minimumConeDegree: 20.0,
      maximumConeDegree: 90,
      color: Cesium.Color.YELLOW.withAlpha(0.3),
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

// 顶部和底部切出的桶形体
function addDemoGraphic9(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.5, 30.9, 1000),
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      innerRadii: new Cesium.Cartesian3(1000.0, 1000.0, 1000.0),
      minimumConeDegree: 60.0,
      maximumConeDegree: 140.0,
      color: "rgba(31,254,230,0.3)",
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例9" }
  })
  graphicLayer.addGraphic(graphic)
}

// 碗行体
function addDemoGraphic10(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.1, 30.8, 1000),
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      innerRadii: new Cesium.Cartesian3(1800.0, 1800.0, 1800.0),
      minimumConeDegree: 110.0,
      color: "rgba(149,228,12,0.3)",
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例10" }
  })
  graphicLayer.addGraphic(graphic)
}

// 时钟开孔
function addDemoGraphic11(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.2, 30.8, 1000),
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      innerRadii: new Cesium.Cartesian3(1500.0, 1500.0, 1500.0),
      minimumClockDegree: -90.0,
      maximumClockDegree: 180.0,
      minimumConeDegree: 20.0,
      maximumConeDegree: 70.0,
      color: "rgba(149,228,12,0.3)",
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例11" }
  })
  graphicLayer.addGraphic(graphic)
}

// 局部圆顶
function addDemoGraphic12(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.3, 30.8, 1000),
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      minimumClockDegree: -90.0,
      maximumClockDegree: 180.0,
      maximumConeDegree: 90.0,
      color: "rgba(242,250,25,0.3)",
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例12" }
  })
  graphicLayer.addGraphic(graphic)
}

// 部分椭圆体
function addDemoGraphic13(graphicLayer) {
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    position: new mars3d.LngLatPoint(116.4, 30.8, 1000),
    style: {
      radii: new Cesium.Cartesian3(3000.0, 3000.0, 3000.0),
      innerRadii: new Cesium.Cartesian3(700.0, 700.0, 700.0),
      minimumClockDegree: 180.0,
      maximumClockDegree: 400.0,
      maximumConeDegree: 90.0,
      color: "rgba(247,154,44,0.3)",
      outline: true,
      outlineColor: "rgba(255,255,255,0.5)"
    },
    attr: { remark: "示例13" }
  })
  graphicLayer.addGraphic(graphic)
}

// 土星综合对象
function addDemoGraphic14(graphicLayer) {
  const position = new mars3d.LngLatPoint(116.5, 30.8, 1000)
  const graphic = new mars3d.graphic.EllipsoidPrimitive({
    name: "土星",
    position,
    style: {
      radii: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      color: new Cesium.Color(0.95, 0.82, 0.49)
    },
    attr: { remark: "示例14" }
  })
  graphicLayer.addGraphic(graphic)

  const graphicNei = new mars3d.graphic.EllipsoidPrimitive({
    name: "土星的内圈",
    position,
    style: {
      radii: new Cesium.Cartesian3(4000.0, 4000.0, 4000.0),
      innerRadii: new Cesium.Cartesian3(3000.0, 3000.0, 3000.0),
      minimumConeDegree: 89.8,
      maximumConeDegree: 90.2,
      color: new Cesium.Color(0.95, 0.82, 0.49, 0.5),
      heading: 30,
      pitch: 30
    }
  })
  graphicLayer.addGraphic(graphicNei)

  const graphicWai = new mars3d.graphic.EllipsoidPrimitive({
    name: "土星外圈",
    position,
    style: {
      radii: new Cesium.Cartesian3(4600.0, 4600.0, 4600.0),
      innerRadii: new Cesium.Cartesian3(4150.0, 4150.0, 4150.0),
      minimumConeDegree: 89.8,
      maximumConeDegree: 90.2,
      color: new Cesium.Color(0.95, 0.82, 0.49, 0.5),
      heading: 30,
      pitch: 30
    }
  })
  graphicLayer.addGraphic(graphicWai)
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  const radius = result.radius

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const graphic = new mars3d.graphic.EllipsoidPrimitive({
      position,
      style: {
        radii: new Cesium.Cartesian3(radius, radius, radius),
        color: Cesium.Color.fromRandom({ alpha: 0.6 })
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 开始绘制
export async function startDrawGraphic() {
  const graphic = await graphicLayer.startDraw({
    type: "ellipsoidP",
    style: {
      color: "rgba(0,255,255,0.6)"
    }
  })
  console.log("标绘完成", graphic.toJSON())
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

// 绑定右键菜单
export function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return !graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      icon: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.hasEdit) {
          return false
        }
        return graphic.isEditing
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphic.stopEditing()
        }
      }
    },
    {
      text: "复制",
      icon: "fa fa-copy",
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          map.contextmenu.copyGraphic = graphic.toJSON() // map内置右键中"粘贴"菜单使用
          map.contextmenu.copyGraphic.layerId = graphicLayer.id
        }
      }
    },
    {
      text: "剪切",
      icon: "fa fa-scissors",
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          map.contextmenu.copyGraphic = graphic.toJSON() // map内置右键中"粘贴"菜单使用
          map.contextmenu.copyGraphic.layerId = graphicLayer.id

          graphic.remove(true) // 移除原有对象
        }
      }
    },
    {
      text: "还原编辑(还原到初始)",
      icon: "fa fa-pencil",
      show: (event) => {
        function hasRestore(graphic) {
          if (!graphic || !graphic.hasEdit || !graphic.isEditing) {
            return false
          }
          return graphic.editing?.hasRestore()
        }

        const graphic = event.graphic
        if (hasRestore(graphic)) {
          return true
        }
        if (graphic.isPrivate && graphic.parent) {
          return hasRestore(graphic.parent) // 右击是编辑点时
        }
        return false
      },
      callback: (event) => {
        const graphic = event.graphic
        if (graphic.editing?.restore) {
          graphic.editing.restore() // 撤销编辑，可直接调用
        } else if (graphic.parent?.editing?.restore) {
          graphic.parent.editing.restore() // 右击是编辑点时
        }
      }
    },
    {
      text: "撤销编辑(还原到上一步)",
      icon: "fa fa-pencil",
      show: (event) => {
        function hasRevoke(graphic) {
          if (!graphic || !graphic.hasEdit || !graphic.isEditing) {
            return false
          }
          return graphic.editing?.hasRevoke()
        }

        const graphic = event.graphic
        if (hasRevoke(graphic)) {
          return true
        }
        if (graphic.isPrivate && graphic.parent) {
          return hasRevoke(graphic.parent) // 右击是编辑点时
        }
        return false
      },
      callback: (event) => {
        const graphic = event.graphic
        if (graphic.editing?.revoke) {
          graphic.editing.revoke() // 撤销编辑，可直接调用
        } else if (graphic.parent?.editing?.revoke) {
          graphic.parent.editing.revoke() // 右击是编辑点时
        }
      }
    },
    {
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy || graphic.isPrivate || graphic.graphicIds) {
          return false
        } else {
          return true
        }
      },
      callback: (e) => {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        const parent = graphic.parent // 右击是编辑点时
        graphicLayer.removeGraphic(graphic)
        if (parent) {
          graphicLayer.removeGraphic(parent)
        }
      }
    },
    {
      text: "查看聚合列表",
      icon: "fa fa-info",
      show: (event) => {
        const graphic = event.graphic
        if (graphic.cluster && graphic.graphics) {
          return true
        } else {
          return false
        }
      },
      callback: (e) => {
        const graphics = e.graphic?.graphics
        if (graphics) {
          const names = []
          for (let index = 0; index < graphics.length; index++) {
            const g = graphics[index]
            names.push(g.attr.name || g.attr.text || g.id)
          }
          return globalAlert(`${names.join(",")}`, `共${graphics.length}个聚合对象`)
        }
      }
    }
  ])
}
