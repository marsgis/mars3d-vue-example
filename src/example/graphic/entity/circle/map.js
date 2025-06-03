import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象
export const eventTarget = new mars3d.BaseClass()

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.740724, lng: 116.363055, alt: 23499, heading: 351, pitch: -54 }
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
  addDemoGraphic11(graphicLayer)
  addDemoGraphic12(graphicLayer)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

//
function addDemoGraphic1(graphicLayer) {
  const graphic = new mars3d.graphic.CircleEntity({
    position: [116.253946, 30.865476, 881.9],
    style: {
      radius: 800.0,
      color: "#00ff00",
      opacity: 0.3,
      outline: true,
      outlineWidth: 3,
      outlineColor: "#ffffff",
      clampToGround: true
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

  // 演示个性化处理graphic
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

  // 测试 颜色闪烁
  if (graphic.startFlicker) {
    graphic.startFlicker({
      time: 20, // 闪烁时长（秒）
      maxAlpha: 0.5,
      color: Cesium.Color.YELLOW,
      onEnd: function () {
        // 结束后回调
      }
    })
  }
}

//
function addDemoGraphic2(graphicLayer) {
  const graphic = new mars3d.graphic.CircleEntity({
    position: [116.244399, 30.920459],
    style: {
      radius: 2000,
      height: 200,
      materialType: mars3d.MaterialType.CircleWave,
      materialOptions: {
        color: "#ffff00",
        count: 2,
        speed: 20
      },
      label: {
        text: "我是原始的\n测试换行",
        font_size: 18,
        color: "#ffffff",
        pixelOffsetY: -10,
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)

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
  graphicCopy.position = [116.301991, 30.933872, 624.03]
  graphicCopy.style.label = graphicCopy.style.label || {}
  graphicCopy.style.label.text = "我是转换后生成的"
  graphicLayer.addGraphic(graphicCopy)
}

function addDemoGraphic3(graphicLayer) {
  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.392526, 30.903729, 933.55),
    style: {
      radius: 1500.0,
      diffHeight: 1000.0,
      color: "#00ff00",
      opacity: 0.3,
      rotationDegree: 45,

      label: { text: "鼠标移入会高亮", pixelOffsetY: -30 },
      // 高亮时的样式（默认为鼠标移入，也可以指定type:'click'单击高亮），构造后也可以openHighlight、closeHighlight方法来手动调用
      highlight: {
        opacity: 0.8
      }
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic4(graphicLayer) {
  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.329199, 30.881595, 390.3),
    style: {
      radius: 1500.0,
      materialType: mars3d.MaterialType.CircleWave,
      materialOptions: {
        // color: "#ff0000",
        color: new Cesium.CallbackProperty(function () {
          return Cesium.Color.BLUE
        }, false),
        count: 1, // 单个圆圈
        speed: 20
      }
    },
    hasMoveEdit: false, // 编辑示例：不允许移动，只能调整半径
    attr: { remark: "示例4" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic5(graphicLayer) {
  let _rotation = Math.random()

  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.37617, 30.847384, 396.12),
    style: {
      radius: 1500.0,
      clampToGround: false,
      // 扫描材质
      materialType: mars3d.MaterialType.Image2,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/circle-scan.png",
        noWhite: false,
        color: "#5fc4ee"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation -= 0.1
        return _rotation
      }, false),
      classificationType: Cesium.ClassificationType.BOTH
    },
    attr: { remark: "示例5" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic6(graphicLayer) {
  let _rotation = Math.random()
  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.326329, 30.84786, 421.7),
    style: {
      radius: 1000.0,
      // 扫描材质
      materialType: mars3d.MaterialType.Image2,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/circle-two.png",
        color: "#ffff00"
      },
      stRotation: new Cesium.CallbackProperty(function (e) {
        _rotation += 0.1
        return _rotation
      }, false)
    },
    attr: { remark: "示例6" },
    hasEdit: false // 不允许编辑
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic7(graphicLayer) {
  let currentRadius = 1
  const duration = 5000 // 毫秒
  const maxRadius = 2000 // 米

  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.271298, 30.831822, 634),
    style: {
      semiMajorAxis: new Cesium.CallbackProperty(function (event) {
        currentRadius += (1000 / duration) * 50
        if (currentRadius > maxRadius) {
          currentRadius = 1
        }
        return currentRadius
      }, false),
      semiMinorAxis: new Cesium.CallbackProperty(function (event) {
        return currentRadius
      }, false),
      // 扫描材质
      materialType: mars3d.MaterialType.Image2,
      materialOptions: {
        image: "https://data.mars3d.cn/img/textures/poly-hexa.png"
      }
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic8(graphicLayer) {
  const canvasCollection = document.createElement("canvas")
  canvasCollection.setAttribute("width", "800px")
  canvasCollection.setAttribute("height", "800px")

  let rotation = 0
  const step = -0.02

  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.326672, 30.811903, 605),
    style: {
      radius: 2000,
      rotation: new Cesium.CallbackProperty(() => {
        rotation -= step
        return rotation
      }, false),
      stRotation: new Cesium.CallbackProperty(() => {
        rotation -= step
        return rotation
      }, false),
      material: new Cesium.ImageMaterialProperty({
        image: new Cesium.CallbackProperty(() => {
          const context = canvasCollection.getContext("2d")
          context.clearRect(0, 0, canvasCollection.width, canvasCollection.height) // 清空画布

          const scanColor0 = "rgba(0,255,255,1)"
          const scanColorTmp = scanColor0.split(",")
          scanColorTmp[3] = "0)"
          const scanColor1 = scanColorTmp.join()

          const grd = context.createLinearGradient(175, 100, canvasCollection.width, canvasCollection.height / 2)
          grd.addColorStop(0, scanColor0)
          grd.addColorStop(1, scanColor1)
          context.fillStyle = grd
          context.globalAlpha = graphic.style.globalAlpha ?? 1.0

          context.beginPath()
          context.moveTo(400, 400)
          context.arc(400, 400, 400, (-30 / 180) * Math.PI, (0 / 180) * Math.PI)
          context.fill()

          const newImg = new Image(canvasCollection.width, canvasCollection.height)
          newImg.src = canvasCollection.toDataURL("image/png")

          return newImg
        }, false),
        transparent: true
      })
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic) // 还可以另外一种写法: graphic.addTo(graphicLayer)
}

function addDemoGraphic9(graphicLayer) {
  const lastPosition = Cesium.Cartesian3.fromDegrees(116.231006, 30.80374, 499.8)
  const circleEntity = new mars3d.graphic.CircleEntity({
    position: new Cesium.CallbackProperty(function (time) {
      return lastPosition
    }, false),
    style: {
      radius: 500,
      materialType: mars3d.MaterialType.Image2,
      materialOptions: {
        image: getMarsCanves()
      },
      clampToGround: true
    },
    attr: { remark: "示例9" },
    hasEdit: false
  })
  graphicLayer.addGraphic(circleEntity)

  // map.on(mars3d.EventType.mouseMove, function (event) {
  //   lastPosition = event.cartesian
  // })
}

function getMarsCanves() {
  // 获取画布元素
  const canvas = document.createElement("canvas")
  canvas.width = 400
  canvas.height = 400

  const ctx = canvas.getContext("2d")

  // 设置圆的半径和中心点坐标
  const centerX = canvas.width / 2
  const centerY = canvas.height / 2
  const radius = Math.min(centerX, centerY) - 20

  // 绘制空心圆
  ctx.translate(centerX, centerY) // 平移到圆心
  ctx.rotate(Math.PI) // 旋转180度
  ctx.beginPath()
  ctx.arc(0, 0, radius, 0, 2 * Math.PI)
  ctx.strokeStyle = "transparent"
  ctx.lineWidth = 2
  ctx.stroke()

  // 绘制刻度
  const numTicks = 360 // 总刻度数
  let tickLength = 10 // 刻度长度

  for (let i = 0; i < numTicks; i++) {
    ctx.save()
    const angle = ((i - numTicks / 2) * (Math.PI * 2)) / numTicks - Math.PI / 2
    // let angle = ((2 * Math.PI) / numTicks) * i - Math.PI / 2; // 计算刻度线的角度
    // 计算文本的角度
    let textAngle = angle + Math.PI * 1.75
    ctx.rotate(angle) // 计算旋转角度
    // ctx.rotate((Math.PI * 2 * i) / numTicks); // 计算旋转角度
    ctx.beginPath()
    // 绘制刻度线、标注刻度文本
    if (i % 5 === 0 && (i / 5) % 2 !== 0) {
      tickLength = 15 // 修改刻度长度
    } else if (i % 5 === 0 && (i / 5) % 2 === 0) {
      tickLength = 20
    } else {
      tickLength = 10
    }
    ctx.moveTo(radius, 0) // 刻度线起点
    ctx.lineTo(radius - tickLength, 0) // 刻度线终点
    ctx.translate(radius - tickLength - 10, 0)
    let magnification = 2
    // 判断各个刻度的角度
    switch (i) {
      case 0:
        textAngle = angle + Math.PI * magnification
        break
      case 45:
        magnification = 1.75
        textAngle = angle + Math.PI * magnification
        break
      case 90:
        magnification = 1.5
        textAngle = angle + Math.PI * magnification
        break
      case 135:
        magnification = 1.25
        textAngle = angle + Math.PI * magnification
        break
      case 180:
        magnification = 1
        textAngle = angle + Math.PI * magnification
        break
      case 225:
        magnification = 0.75
        textAngle = angle + Math.PI * magnification
        break
      case 270:
        magnification = 0.5
        textAngle = angle + Math.PI * magnification
        break
      case 315:
        magnification = 0.25
        textAngle = angle + Math.PI * magnification
        break
      case 360:
        magnification = 0
        textAngle = angle + Math.PI * magnification
        break

      default:
        break
    }
    ctx.rotate(textAngle)
    ctx.textAlign = "center"
    ctx.font = "14px Arial"
    ctx.fillStyle = "#ffffff"
    if (i > -1 && i <= 180) {
      ctx.strokeStyle = "red"
    } else {
      ctx.strokeStyle = "blue"
    }
    ctx.stroke()
    // 修改刻度文本的位置
    if (i % 45 === 0 && i <= 180) {
      ctx.fillText(i, 0, 5) // 顺时针角度刻度数
    } else if (i % 45 === 0 && i > 180) {
      if (i < 270) {
        ctx.fillText(i - 90, 0, 5)
      } else if (i === 270) {
        ctx.fillText(i - 180, 0, 5)
      } else if (i > 270) {
        ctx.fillText(360 - i, 0, 5)
      }
    }
    ctx.restore()
  }
  return canvas.toDataURL("image/png")
}

function addDemoGraphic10(graphicLayer) {
  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.365776, 30.963614, 1090.7),
    style: {
      radius: 500,
      opacity: 0.4,
      color: "#02D4FD",
      clampToGround: true,

      outline: true,
      outlineStyle: {
        width: 12,
        materialType: mars3d.MaterialType.Image2,
        materialOptions: {
          image: "https://data.mars3d.cn/img/textures/line-air.svg",
          repeat: new mars3d.Cesium.Cartesian2(1000, 1)
        }
      }
    },
    attr: { remark: "示例10" }
  })
  graphicLayer.addGraphic(graphic)

  let newRadius = 500

  graphic.radius = new Cesium.CallbackProperty(function (time) {
    if (newRadius < 2000) {
      newRadius += 10
    }
    return newRadius
  }, false)
}

// 闪烁圆，原理：callback回调属性，自动修改 alpha 透明度
function addDemoGraphic11(graphicLayer) {
  let alpha = 1
  let biaoshi = true

  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.261813, 30.9766, 1310.1),
    style: {
      radius: 900,
      material: new Cesium.ColorMaterialProperty(
        new Cesium.CallbackProperty(function () {
          if (biaoshi) {
            alpha = alpha - 0.05
            if (alpha <= 0) {
              biaoshi = false // hide
            }
          } else {
            alpha = alpha + 0.05
            if (alpha >= 1) {
              biaoshi = true // show
            }
          }
          return Cesium.Color.RED.withAlpha(alpha)
        }, false)
      )
    },
    attr: { remark: "示例11" }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic12(graphicLayer) {
  const graphic = new mars3d.graphic.CircleEntity({
    position: new mars3d.LngLatPoint(116.155132, 30.956363, 677.2),
    style: {
      radius: 1000,
      fill: false,

      outline: true,
      outlineStyle: {
        width: 12,
        materialType: mars3d.MaterialType.LineCross,
        materialOptions: {
          color: Cesium.Color.RED, // 中心线颜色
          dashLength: 36, // 十字长度
          maskLength: 10, // 空隙间隔长度
          centerPower: 0.1, // 中心宽百分比
          dashPower: 0.2 // 虚线百分比
        }
        // materialType: mars3d.MaterialType.Image2,
        // materialOptions: {
        //   image: "https://data.mars3d.cn/img/textures/line-air.svg",
        //   repeat: new mars3d.Cesium.Cartesian2(500, 1)
        // }
      }
    },
    attr: { remark: "示例12" }
  })
  graphicLayer.addGraphic(graphic)
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

    const graphic = new mars3d.graphic.CircleEntity({
      position,
      style: {
        radius: result.radius,
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
    type: "circle",
    style: {
      color: "#ffff00",
      opacity: 0.6,
      clampToGround: false,
      outline: true,
      outlineStyle: {
        width: 20,
        materialType: mars3d.MaterialType.LineCross,
        materialOptions: {
          color: Cesium.Color.RED, // 中心线颜色
          dashLength: 36, // 十字长度
          maskLength: 10, // 空隙间隔长度
          centerPower: 0.1, // 中心宽百分比
          dashPower: 0.2 // 虚线百分比
        }
      },
      label: {
        text: "我是火星科技",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    },
    drawShowRadius: true
  })
  console.log("标绘完成", graphic.toJSON())
}

// 开始绘制 圆柱
export async function startDrawGraphic2() {
  const graphic = await graphicLayer.startDraw({
    type: "circle",
    style: {
      color: "#ff0000",
      opacity: 0.5,
      diffHeight: 600,

      highlight: {
        type: "click",
        opacity: 0.9
      }
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
      text: "计算周长",
      icon: "fa fa-medium",
      show: (event) => {
        const graphic = event.graphic
        return !graphic.isPoint
      },
      callback: (e) => {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      icon: "fa fa-reorder",
      show: (event) => {
        const graphic = event.graphic
        return !graphic.isPoint
      },
      callback: (e) => {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}
