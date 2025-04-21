import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.808137, lng: 116.411699, alt: 23221, heading: 347, pitch: -40 },
    clock: {
      currentTime: "2021-07-01 10:45:00"
    }
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
    console.log("监听layer，单击了矢量对象", event)
  })
  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
  addDemoGraphic3(graphicLayer)
  addDemoGraphic4(graphicLayer)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null

  graphicLayer.remove()
  graphicLayer = null
}

// 静态的位置
function addDemoGraphic1(graphicLayer) {
  const coneTrack = new mars3d.graphic.ConeTrack({
    position: [116.327881, 31.018378, 5000],
    targetPosition: [116.311135, 30.998408, 1264.9], // 可选
    style: {
      slices: 4, // 四凌锥
      // length: 4000,//targetPosition存在时无需传
      angle: 5, // 半场角度
      color: "#ff0000",
      opacity: 0.3,

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(coneTrack)
}

// 静态的位置
let coneTrack
function addDemoGraphic2(graphicLayer) {
  const position = [116.28782, 30.971557, 5000]
  // 加个飞机
  const graphic = new mars3d.graphic.ModelPrimitive({
    position,
    style: {
      url: "https://data.mars3d.cn/gltf/mars/feiji.glb",
      scale: 1,
      minimumPixelSize: 50
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)

  // 圆锥追踪体
  coneTrack = new mars3d.graphic.ConeTrack({
    position,
    // targetPosition: [116.317411, 30.972581, 1439.7], // 可选
    style: {
      length: 4000,
      angle: 5, // 半场角度
      materialType: mars3d.MaterialType.CircleWave,
      materialOptions: {
        color: "#02ff00"
      }
    }
  })
  graphicLayer.addGraphic(coneTrack)
}


// 修改飞机追踪的目标点
export async function onClickSelPoint() {
  const graphic = await map.graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 8,
      color: "#ffff00"
    }
  })
  const position = graphic.positionShow
  map.graphicLayer.clear()

  coneTrack.targetPosition = position
}

// 动态的位置
function addDemoGraphic3(graphicLayer) {
  // 飞机
  const graphicModel = new mars3d.graphic.ModelEntity({
    position: {
      type: "time", // 时序动态坐标
      speed: 530,
      list: [
        [116.364307, 31.03778, 5000],
        [116.42794, 31.064786, 5000],
        [116.474002, 31.003825, 5000],
        [116.432393, 30.951142, 5000],
        [116.368497, 30.969006, 5000],
        [116.364307, 31.03778, 5000]
      ]
    },
    style: {
      url: "https://data.mars3d.cn/gltf/mars/zhanji.glb",
      scale: 0.3,
      minimumPixelSize: 30
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphicModel)

  // 汽车
  const graphicQC = new mars3d.graphic.PathEntity({
    position: {
      type: "time", // 时序动态坐标
      speed: 360,
      list: [
        [116.391268, 30.956038, 827.2],
        [116.37934, 30.980835, 898.1],
        [116.382514, 30.999031, 921.5],
        [116.40338, 31.009258, 1214],
        [116.412254, 31.021635, 1224.1],
        [116.432328, 31.045508, 804.3]
      ]
    },
    style: {
      width: 1,
      color: "#ffff00",
      opacity: 0.4,
      leadTime: 0
    },
    model: {
      url: "https://data.mars3d.cn/gltf/mars/qiche.gltf",
      scale: 0.5,
      minimumPixelSize: 50
    }
  })
  graphicLayer.addGraphic(graphicQC)

  // 圆锥追踪体（动态position=>动态targetPosition）
  const coneTrack = new mars3d.graphic.ConeTrack({
    position: graphicModel.property,
    targetPosition: graphicQC.property,
    style: {
      // length: 4000, //targetPosition存在时无需传
      angle: 3, // 半场角度
      // 自定义扩散波纹纹理
      materialType: mars3d.MaterialType.CylinderWave,
      materialOptions: {
        color: "#ffff00",
        repeat: 30.0,
        thickness: 0.2
      },
      label: {
        text: "HX2017",
        font_size: 8,
        background: true,
        visibleDepth: true
      }
    }
  })
  graphicLayer.addGraphic(coneTrack)
}

function addDemoGraphic4(graphicLayer) {
  const model = new mars3d.graphic.ModelEntity({
    name: "地面站模型",
    position: [117.170264, 31.840312, 258],
    style: {
      url: "https://data.mars3d.cn/gltf/mars/leida.glb",
      scale: 1,
      minimumPixelSize: 40,
      clampToGround: true
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(model)

  // 卫星
  const weixin = new mars3d.graphic.Satellite({
    name: "GAOFEN 1",
    tle1: "1 39150U 13018A   21180.50843864  .00000088  00000-0  19781-4 0  9997",
    tle2: "2 39150  97.8300 252.9072 0018449 344.7422  15.3253 14.76581022440650",
    model: {
      url: "https://data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 90
    },
    path: { color: "#00ff00", opacity: 0.5, width: 1 }
  })
  graphicLayer.addGraphic(weixin)

  const coneTrack = new mars3d.graphic.ConeTrack({
    position: model.position,
    targetPosition: weixin.property,
    style: {
      angle: 1, // 半场角度
      color: "#ff0000",
      opacity: 0.4
    }
  })
  graphicLayer.addGraphic(coneTrack)
}

// 开始绘制
export async function startDrawGraphic() {
  const graphic = await graphicLayer.startDraw({
    type: "coneTrack",
    style: {
      color: "#ff0000",
      opacity: 0.3
    }
  })
  console.log("标绘完成", graphic.toJSON())
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 1000)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const graphic = new mars3d.graphic.ConeTrack({
      position,
      style: {
        angle: 15, // 半场角度
        length: result.radius * 2,
        topRadius: 0.0,
        bottomRadius: result.radius,
        color: Cesium.Color.fromRandom({ alpha: 0.6 })
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

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
