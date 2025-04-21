import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 图层

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.422407, lng: 115.820222, alt: 3498, heading: 67, pitch: -32 },
    globe: {
      depthTestAgainstTerrain: true
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
  addDemoGraphic1()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
  clear()
}

// 立体围墙扩散效果,面状
function addDemoGraphic1() {
  const dynamicRiver = new mars3d.graphic.DynamicRiver({
    positions: [
      [115.906607, 30.441582, 555.9],
      [115.899964, 30.438543, 467.3],
      [115.893105, 30.440714, 374.6],
      [115.88362, 30.443924, 340.7],
      [115.873948, 30.444827, 299],
      [115.864003, 30.442111, 292.2],
      [115.850741, 30.438108, 189.9]
    ],
    style: {
      image: "https://data.mars3d.cn/img/textures/poly-rivers.png",
      width: 280,
      height: 30,
      speed: 10
    }
  })
  graphicLayer.addGraphic(dynamicRiver)
}

// 生成演示数据(测试数据量)
export function addRandomGraphicByCount(count) {
  graphicLayer.clear()
  graphicLayer.enabledEvent = false // 关闭事件，大数据addGraphic时影响加载时间

  const bbox = [116.984788, 31.625909, 117.484068, 32.021504]
  const result = mars3d.PolyUtil.getGridPoints(bbox, count, 30)
  console.log("生成的测试网格坐标", result)

  for (let j = 0; j < result.points.length; ++j) {
    const position = result.points[j]
    const index = j + 1

    const pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 225, result.radius)
    const pt2 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 315, result.radius)

    const graphic = new mars3d.graphic.DynamicRiver({
      positions: [pt1, position, pt2],
      style: {
        image: "https://data.mars3d.cn/img/textures/poly-rivers.png",
        width: 280,
        height: 30,
        speed: 10
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
    type: "dynamicRiver",
    style: {
      image: "https://data.mars3d.cn/img/textures/poly-rivers.png",
      width: 280,
      height: 30,
      speed: 10
    }
  })
  console.log("标绘完成", graphic.toJSON())
}

let dynamicRiver
export function getGraphic(graphicId) {
  dynamicRiver = graphicLayer.getGraphicById(graphicId)
  return dynamicRiver
}

// 宽发生改变
export function widthChange(value) {
  if (dynamicRiver) {
    dynamicRiver.width = value
  }
}

// 高发生改变
export function heightChange(value) {
  if (dynamicRiver) {
    dynamicRiver.height = value
  }
}

// 速度发生改变
export function speedChange(value) {
  if (dynamicRiver) {
    dynamicRiver.speed = value
  }
}

let onOff = true
// 升高30米动画
export function addHeight() {
  if (!dynamicRiver) {
    return
  }
  if (!onOff) {
    globalMsg("上次操作未完成")
    return
  }
  dynamicRiver.setOffsetHeight(30, 5) // 5秒内抬高30米
  throttle()
}

// 下降30米动画
export function lowerHeight() {
  if (!dynamicRiver) {
    return
  }
  if (!onOff) {
    globalMsg("上次操作未完成")
    return
  }
  dynamicRiver.setOffsetHeight(-30, 5) // 5秒内降低30米
  throttle()
}

function throttle() {
  setTimeout(() => {
    onOff = true
  }, 2000)

  onOff = false
}

// 清除
export function clear() {
  graphicLayer.clear()
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
