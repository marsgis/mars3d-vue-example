import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

export const eventTarget = new mars3d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.516143, lng: 117.282937, alt: 46242, heading: 2, pitch: -49 }
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
  addDemoGraphic5(graphicLayer)
  addDemoGraphic6(graphicLayer)
  addDemoGraphic7(graphicLayer)
  addDemoGraphic8(graphicLayer)
  addDemoGraphic9(graphicLayer)
  addDemoGraphic10(graphicLayer)

  mars3d.Util.fetchJson({ url: "https://data.mars3d.cn/file/geojson/areas/340100.json" }).then(function (data) {
    addDemoGraphic11(data)
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null

  graphicLayer.remove()
  graphicLayer = null
}

function addDemoGraphic1() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.153945, 31.881122, 36.4],
      [117.168352, 31.880147, 32.6],
      [117.178047, 31.885925, 29.25]
    ],
    style: {
      diffHeight: 200,
      color: "#ffff00",
      opacity: 0.4,

      label: { text: "鼠标移入会高亮" },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        // type: mars3d.EventType.click,
        opacity: 0.8
      }
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)

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

function addDemoGraphic2() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.208302, 31.85757],
      [117.234234, 31.858263],
      [117.234261, 31.833317],
      [117.207414, 31.834541]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      materialType: mars3d.MaterialType.LineFlow,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/arrow.png",
        color: Cesium.Color.CHARTREUSE,
        repeat: new Cesium.Cartesian2(30, 1),
        speed: 20 // 速度，建议取值范围1-100
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic3() {
  // 圆形时
  const positions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: Cesium.Cartesian3.fromDegrees(117.276257, 31.866351, 19.57),
    radius: 1200, // 半径
    count: 50 // 共返回(count*4)个点
  })

  const graphic = new mars3d.graphic.WallPrimitive({
    positions,
    style: {
      diffHeight: 800,
      closure: true,
      materialType: mars3d.MaterialType.LineFlow,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/fence.png",
        color: "#ffff00",
        mixt: true,
        speed: 10, // 速度，建议取值范围1-100
        axisY: true
      }
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic4() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.154815, 31.853495],
      [117.181255, 31.854257],
      [117.182284, 31.848255],
      [117.184748, 31.840141],
      [117.180557, 31.835556],
      [117.180023, 31.833741],
      [117.166846, 31.833737],
      [117.155531, 31.833151],
      [117.154787, 31.835978],
      [117.151994, 31.839036],
      [117.150691, 31.8416],
      [117.151215, 31.844734]
    ],
    style: {
      closure: true,
      diffHeight: 700,
      materialType: mars3d.MaterialType.LineFlow,
      materialOptions: {
        // 动画线材质
        image: "https://data.mars3d.cn/img/textures/fence.png",
        axisY: true,
        color: "#ff0000",
        speed: 10 // 速度，建议取值范围1-100
      }
    },
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic5() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.229659, 31.908221],
      [117.240804, 31.908175]
    ],
    style: {
      diffHeight: 500,
      materialType: mars3d.MaterialType.LineFlow,
      materialOptions: {
        // 动画线材质
        image: "https://data.mars3d.cn/img/textures/fence.png",
        axisY: true,
        color: "#ff0000",
        hasImage2: true,
        image2: "https://data.mars3d.cn/img/textures/tanhao.png",
        color2: "#ffff00",
        speed: 10 // 速度，建议取值范围1-100
      },
      label: {
        text: "我是墙",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic6() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.169646, 31.769171],
      [117.194579, 31.806466]
    ],
    style: {
      diffHeight: 400,
      image: "https://data.mars3d.cn/img/textures/poly-rivers.png"
    },
    attr: { remark: "示例6" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic7() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.353776, 31.887406, 21.2],
      [117.321028, 31.887207, 21.3],
      [117.290341, 31.902469, 15.1]
    ],
    style: {
      diffHeight: 400,
      materialType: mars3d.MaterialType.LineFlow,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/arrow.png",
        color: "#00eba8",
        repeat: new Cesium.Cartesian2(20, 1),
        speed: 20 // 速度，建议取值范围1-100
      }
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic8() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.251382, 31.824055, 28.4],
      [117.278989, 31.819766, 27.3],
      [117.279566, 31.799699, 3.9],
      [117.265249, 31.797702, 26.3],
      [117.245146, 31.811783, 29]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      materialType: mars3d.MaterialType.WallScroll,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/fence.png",
        color: Cesium.Color.CHARTREUSE,
        count: 3,
        speed: 20,
        bloom: false
      }
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic9() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.31104, 31.821121, 14],
      [117.330257, 31.823798, 9.9],
      [117.334015, 31.804235, 9.8],
      [117.317901, 31.802142, 14.9],
      [117.312515, 31.807128, 6.2]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      materialType: mars3d.MaterialType.WallScroll,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/poly-san.png",
        color: Cesium.Color.RED,
        count: 2,
        direction: false,
        speed: 20,
        bloom: true
      }
    },
    attr: { remark: "示例9" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic10() {
  const graphic = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.374042, 31.838945, 11.6],
      [117.392644, 31.835948, 4.7],
      [117.397659, 31.820042, 8],
      [117.378515, 31.810404, 2]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      materialType: mars3d.MaterialType.WallScroll,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/flow-wall-1.png",
        image2: "https://data.mars3d.cn/img/textures/flow-wall-2.png",
        image3: "https://data.mars3d.cn/img/textures/flow-wall-3.png",
        color: Cesium.Color.BLUE,
        count: 5,
        reverse: true,
        speed: 20,
        bloom: true
      }
    },
    attr: { remark: "示例9" }
  })
  graphicLayer.addGraphic(graphic)
}

// 显示合肥市边界
function addDemoGraphic11(data) {
  const arr = mars3d.Util.geoJsonToGraphics(data) // 解析geojson
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const graphic = new mars3d.graphic.WallPrimitive({
      positions: item.positions,
      style: {
        diffHeight: 3000,
        materialType: mars3d.MaterialType.LineFlow,
        materialOptions: {
          image: "https://data.mars3d.cn/img/textures/fence.png",
          color: "#bdf700",
          repeat: new Cesium.Cartesian2(5, 1),
          axisY: true, // 方向，true时上下，false左右
          speed: 10 // 速度，建议取值范围1-100
        }
      },
      attr: item.attr
    })
    graphicLayer.addGraphic(graphic)
    graphic.bindTooltip("合肥欢迎您 - 火星科技")
  }
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

    const graphic = new mars3d.graphic.WallPrimitive({
      positions: [pt1, position, pt2],
      style: {
        diffHeight: result.radius,
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
    type: "wallP",
    style: {
      color: "#55ff33",
      opacity: 0.8,
      diffHeight: 800
    }
  })
  console.log("标绘完成", graphic.toJSON())
}

// 开始绘制
export async function startDrawGraphic2() {
  const graphic = await graphicLayer.startDraw({
    type: "wallP",
    style: {
      color: "#55ff33",
      opacity: 0.8,
      diffHeight: 800,
      closure: true
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
    },
    {
      text: "计算长度",
      icon: "fa fa-medium",
      show: (event) => {
        const graphic = event.graphic
        return !graphic.isPoint
      },
      callback: (e) => {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的长度为:" + strDis)
      }
    },
   {
      text: "计算围合面积",
      icon: "fa fa-reorder",
      show: (event) => {
        return event.graphic?.positionsShow?.length > 2
      },
      callback: (e) => {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}
