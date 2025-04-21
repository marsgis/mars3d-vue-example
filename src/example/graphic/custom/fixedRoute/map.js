import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer
export const eventTarget = new mars3d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.71887, lng: 117.225745, alt: 7101, heading: 2, pitch: -26 }
  },
  control: {
    clockAnimate: true, // 时钟动画控制(左下角)
    timeline: true, // 是否显示时间线控件
    compass: { style: { top: "10px", right: "5px" } }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.basemap = 2017
  // map.control.toolbar.container.style.bottom = "55px" // 修改toolbar控件的样式

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 绑定点击事件
  graphicLayer.on(mars3d.EventType.click, (event) => {
    console.log("单击了漫游路线", event)
  })
  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  // 加一些演示数据
  addRoamLines()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function addRoamLines() {
  const arrLine = [
    {
      id: "1",
      name: "A01",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.298794, 31.882442, 500],
          [117.249731, 31.88091, 600]
        ]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        leadTime: 0
      },
      coneTrack: {
        angle: 5, // 半场角度
        color: "rgba(255,0,0,0.5)"
      }
    },
    {
      id: "2",
      name: "A02",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.244308, 31.876828, 900],
          [117.246598, 31.815902, 900]
        ]
      },
      model: {
        show: true,
        url: "https://data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      billboard: {
        image: "https://data.mars3d.cn/img/marker/svg/huojian.svg",
        scale: 0.3
      },
      path: {
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        leadTime: 0
      }
    },
    {
      id: "3",
      name: "A03",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.160928, 31.82166, 400],
          [117.18824, 31.811822, 400],
          [117.227675, 31.790077, 400],
          [117.279938, 31.797397, 400]
        ],
        startTime: Cesium.JulianDate.addSeconds(map.clock.currentTime, 60, new Cesium.JulianDate()),
        backwardExtrapolationType: Cesium.ExtrapolationType.NONE, // 在第1个开始时间之前，NONE时不显示，HOLD时显示开始时间对应坐标位置
        forwardExtrapolationType: Cesium.ExtrapolationType.NONE // 在最后1个结束时间之后，NONE时不显示，HOLD时显示结束时间对应坐标位置
      },
      showStop: false,
      model: {
        url: "https://data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        leadTime: 0
      },
      wall: {
        color: "rgba(0,255,255,0.5)"
      }
    },
    {
      id: "4",
      name: "A04",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.24595, 31.843448, 800],
          [117.184863, 31.841885, 800]
        ]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      wall: {
        color: "rgba(255,0,0,0.5)"
      }
    },
    {
      id: "5",
      name: "A05",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.281458, 31.873736, 1000],
          [117.280849, 31.679814, 1000]
        ]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        leadTime: 0
      }
    },
    {
      id: "6",
      name: "A06",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.259156, 31.831094, 600],
          [117.22723, 31.791011, 700],
          [117.190839, 31.751602, 1000]
        ]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      path: {
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        leadTime: 0
      },
      wall: {
        color: "rgba(123,0,255,0.5)"
      }
    },
    {
      id: "7",
      name: "A07",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.224735, 31.868128, 500],
          [117.226971, 31.810324, 500]
        ]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        leadTime: 0
      }
    },
    {
      id: "8",
      name: "A08",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.169828, 31.83365, 900],
          [117.189117, 31.83417, 900],
          [117.211684, 31.83573, 900],
          [117.232588, 31.833755, 900]
        ]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      polyline: {
        width: 10,
        materialType: mars3d.MaterialType.LineFlow,
        materialOptions: {
          image: "https://data.mars3d.cn/img/textures/line-arrow-blue.png",
          color: "#ff0000",
          mixt: true,
          speed: 20,
          repeat: new Cesium.Cartesian2(10, 1)
        }
      }
    },
    {
      id: "9",
      name: "A09",
      position: {
        type: "time", // 时序动态坐标
        speed: 100,
        list: [
          [117.189192, 31.856163, 100],
          [117.188899, 31.818951, 100]
        ]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        leadTime: 0
      }
    },
    {
      id: "10",
      name: "A10",
      position: {
        type: "time", // 时序动态坐标
        speed: 200,
        list: [
          [117.163332, 31.853159, 1000],
          [117.181507, 31.853928, 1000],
          [117.210678, 31.858777, 1000],
          [117.232448, 31.853065, 1000]
        ]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      path: {
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        leadTime: 0
      },
      coneTrack: {
        angle: 15, // 半场角度
        color: "rgba(255,0,255,0.5)"
      }
    }
  ]

  let startTime
  let stopTime

  for (let i = 0, len = arrLine.length; i < len; i++) {
    const flydata = arrLine[i]

    flydata.updateClock = false // 多个FixedRoute模型，避免时钟冲突

    flydata.label = {
      text: flydata.name,
      font_size: 20,
      pixelOffsetX: 0,
      pixelOffsetY: -20,
      scaleByDistance: true,
      scaleByDistance_far: 80000,
      scaleByDistance_farValue: 0.4,
      distanceDisplayCondition: true,
      distanceDisplayCondition_far: 80000
    }
    flydata.model = {
      ...flydata.model,
      distanceDisplayCondition: true,
      distanceDisplayCondition_near: 0,
      distanceDisplayCondition_far: 80000
    }
    // 当视角距离超过80000米(distanceDisplayCondition_far定义的) 后显示为点对象的样式
    flydata.point = {
      color: "#ffff00",
      pixelSize: 5,
      distanceDisplayCondition: true,
      distanceDisplayCondition_near: 80000,
      distanceDisplayCondition_far: Number.MAX_VALUE
    }

    const fixedRoute = new mars3d.graphic.FixedRoute(flydata)
    graphicLayer.addGraphic(fixedRoute)

    // 启动漫游
    fixedRoute.start()

    if (i === 0) {
      startTime = fixedRoute.startTime
      stopTime = fixedRoute.stopTime
    } else {
      startTime = Cesium.JulianDate.lessThan(startTime, fixedRoute.startTime) ? startTime : fixedRoute.startTime
      stopTime = Cesium.JulianDate.greaterThan(stopTime, fixedRoute.stopTime) ? stopTime : fixedRoute.stopTime
    }
  }

  map.control.timeline.zoomTo(startTime, stopTime)
}

export async function startAll() {
  graphicLayer.eachGraphic((graphic) => {
    if (!graphic || graphic.isPrivate) {
      return
    }
    graphic.start && graphic.start()
  })
}
export async function stopAll() {
  graphicLayer.eachGraphic((graphic) => {
    if (!graphic || graphic.isPrivate) {
      return
    }
    graphic.stop && graphic.stop()
  })
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  let tempTime

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 225, result.radius)
    const pt2 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 315, result.radius)

    const graphic = new mars3d.graphic.FixedRoute({
      position: {
        type: "time", // 时序动态坐标
        speed: 160,
        list: [pt1, position, pt2]
      },
      model: {
        url: "https://data.mars3d.cn/gltf/mars/man/walk.gltf",
        scale: 5,
        minimumPixelSize: 50,
        clampToGround: true
      },
      polyline: {
        color: "#ffff00",
        width: 2,
        showAll: true
      },
      attr: { index: j + 1 }
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 开始绘制
export async function startDrawGraphic() {
  const graphic = await graphicLayer.startDraw({
    type: "fixedRoute",
    camera: {
      type: "gs",
      radius: 300
    },
    model: {
      url: "https://data.mars3d.cn/gltf/mars/jingche/jingche.gltf",
      heading: 90,
      mergeOrientation: true, // 用于设置模型不是标准的方向时的纠偏处理,在orientation基础的方式值上加上设置是heading值
      minimumPixelSize: 50
    },
    polyline: {
      width: 6,
      materialType: mars3d.MaterialType.LineFlow,
      materialOptions: {
        color: "#00ffff",
        image: "https://data.mars3d.cn/img/textures/arrow-small.png",
        repeat: new Cesium.Cartesian2(80, 1),
        speed: 30,
        bgColor: "rgba(0, 255, 255, 0.3)"
      },
      showAll: true
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
