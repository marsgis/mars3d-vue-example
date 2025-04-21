import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.468743, lng: 116.499464, alt: 67446, heading: 0, pitch: -45 }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  map.on(mars3d.EventType.click, function (event) {
    console.log("监听map，单击了矢量对象", event)
  })

  // 创建DIV数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    // event.stopPropagation()
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

// 一个黑色面板，指向左下角黄色连线
function addDemoGraphic1(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: [116.741611, 31.408068, 75.5],
    style: {
      html: `<div class="marsBlackPanel  animation-spaceInDown">
              <div class="marsBlackPanel-text">大湖名城,创新高地</div>
          </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 400000), // 按视距距离显示
      clampToGround: true,
      // 高亮时的样式
      highlight: {
        // type: mars3d.EventType.click,
        className: "marsBlackPanel-highlight"
      }
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

// 一个渐变的文本面板,中间竖直连线
function addDemoGraphic2(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: [116.510732, 31.403786, 176.4],
    style: {
      html: `<div class="marsBlueGradientPnl">
              <div>合肥火星科技有限公司</div>
          </div>`,
      offsetY: -60,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 400000), // 按视距距离显示

      // 高亮时的样式
      highlight: {
        type: mars3d.EventType.click,
        className: "marsBlueGradientPnl-highlight"
      }
    },
    attr: { remark: "示例2" }
  })
  graphicLayer.addGraphic(graphic)
}

//
function addDemoGraphic3(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: [116.960075, 31.19609, 237.4],
    style: {
      html: `<div class="marsGreenGradientPnl" >安徽欢迎您</div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM

      // 高亮时的样式
      // highlight: {
      //   type: mars3d.EventType.click,
      //   className: "marsGreenGradientPnl-highlight"
      // }
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)

  // 在指定时间范围显示对象 0-10，20-30,40-max
  const now = map.clock.currentTime
  graphic.availability = [
    { start: now, stop: Cesium.JulianDate.addSeconds(now, 10, new Cesium.JulianDate()) },
    { start: Cesium.JulianDate.addSeconds(now, 20, new Cesium.JulianDate()), stop: Cesium.JulianDate.addSeconds(now, 30, new Cesium.JulianDate()) },
    { start: Cesium.JulianDate.addSeconds(now, 40, new Cesium.JulianDate()), stop: "2999-01-01 00:00:00" }
  ]
}

// 添加GIF图标，DIV方式
function addDemoGraphic4(graphicLayer) {
  // const graphic = new mars3d.graphic.DivGraphic({
  //   position: [116.79013, 31.164872, 289],
  //   style: {
  //     html: '<img src="https://data.mars3d.cn/img/marker/gif/typhoon.gif" style="width:50px;height:50px;" ></img>',
  //     distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
  //     horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
  //     verticalOrigin: Cesium.VerticalOrigin.CENTER
  //   },
  //   attr: { remark: "示例4" },
  //   pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
  // })
  // graphicLayer.addGraphic(graphic)

  const graphic = new mars3d.graphic.DivGif({
    position: [116.79013, 31.164872, 289],
    style: {
      image: "https://data.mars3d.cn/img/marker/gif/typhoon.gif",
      width: 50,
      height: 50,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000) // 按视距距离显示
    },
    attr: { remark: "示例4" },
    pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
  })
  graphicLayer.addGraphic(graphic)
}

// 加css动画的扩散点 DivLightPoint
function addDemoGraphic5(graphicLayer) {
  const graphic = new mars3d.graphic.DivLightPoint({
    position: [116.630276, 31.213813],
    style: {
      color: "#f33349",
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    attr: { remark: "示例5" },
    popup: "测试popup"
  })
  graphicLayer.addGraphic(graphic)
}

// 内置扩展的动态文本 DivBoderLabel
function addDemoGraphic6(graphicLayer) {
  const graphic = new mars3d.graphic.DivBoderLabel({
    position: [116.460722, 31.140888, 781],
    style: {
      text: "火星科技Mars3D平台",
      font_size: 15,
      font_family: "微软雅黑",
      color: "#ccc",
      boderColor: "#15d1f2"
    },
    attr: { remark: "示例6" }
  })

  // 测试修改className
  graphic.on(mars3d.EventType.load, function (e) {
    graphic.addClass("className1")
    graphic.addClass("className2")

    setTimeout(() => {
      graphic.removeClass("className1")
    }, 9000)
  })
  graphicLayer.addGraphic(graphic)
}

// 内置扩展的竖立文本 DivBoderLabel
function addDemoGraphic7(graphicLayer) {
  const graphic = new mars3d.graphic.DivUpLabel({
    position: [116.327136, 30.99723, 914.6],
    style: {
      text: "我是竖立的文本",
      color: "#fff",
      font_size: 16,
      font_family: "微软雅黑",
      lineHeight: 60,
      circleSize: 8,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000) // 按视距距离显示
    },
    attr: { remark: "示例7" }
  })
  graphicLayer.addGraphic(graphic)
}

// 类似popup/toolitp的自定义html
function addDemoGraphic8(graphicLayer) {
  const graphic = new mars3d.graphic.Popup({
    position: [116.146461, 31.380152, 395.1],
    style: {
      html: `这里可以放入任意html代码<br /> Popup和Tooltip也是继承自DivGraphic<br /> {name} {remark}`,
      templateEmptyStr: " - ",
      closeButton: false,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示

      // 高亮时的样式
      highlight: {
        type: mars3d.EventType.click,
        className: "mars3d-template-highlight"
      }
    },
    attr: { remark: "示例8" }
  })
  graphicLayer.addGraphic(graphic)
}

// 倾斜指向左下角的面板样式
function addDemoGraphic9(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: [116.138686, 31.101009, 1230],
    style: {
      html: `<div class="marsTiltPanel marsTiltPanel-theme-red">
          <div class="marsTiltPanel-wrap">
              <div class="area">
                  <div class="arrow-lt"></div>
                  <div class="b-t"></div>
                  <div class="b-r"></div>
                  <div class="b-b"></div>
                  <div class="b-l"></div>
                  <div class="arrow-rb"></div>
                  <div class="label-wrap">
                      <div class="title">火星水厂</div>
                      <div class="label-content">
                          <div class="data-li">
                              <div class="data-label">实时流量：</div>
                              <div class="data-value"><span id="lablLiuliang" class="label-num">39</span><span class="label-unit">m³/s</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">水池液位：</div>
                              <div class="data-value"><span id="lablYeWei"  class="label-num">10.22</span><span class="label-unit">m</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">水泵状态：</div>
                              <div class="data-value">
                                <span id="lablSBZT1"  class="label-tag data-value-status-1" title="中间状态">1号</span>
                                <span id="lablSBZT2"  class="label-tag data-value-status-0" title="关闭状态">2号</span>
                                </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">出水阀门：</div>
                              <div class="data-value">
                                <span id="lablCSFM1"   class="label-tag data-value-status-1" title="中间状态">1号</span>
                                <span id="lablCSFM2"   class="label-tag data-value-status-2" title="打开状态">2号</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="b-t-l"></div>
              <div class="b-b-r"></div>
          </div>
          <div class="arrow" ></div>
      </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
      scaleByDistance: new Cesium.NearFarScalar(1000, 1.0, 200000, 0.2),
      clampToGround: true
    },
    attr: { remark: "示例9" },
    pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
  })
  graphicLayer.addGraphic(graphic)

  // 刷新局部DOM,不影响面板的其他控件操作
  // [建议读取到后端接口数据后主动去修改DOM，比下面演示的实时刷新效率高些]
  graphic.on(mars3d.EventType.popupRender, function (event) {
    const container = event.container // popup对应的DOM

    const lablLiuliang = container.querySelector("#lablLiuliang")
    if (lablLiuliang) {
      lablLiuliang.innerHTML = (Math.random() * 100).toFixed(0) // 测试的随机数
    }

    const lablYeWei = container.querySelector("#lablYeWei")
    if (lablYeWei) {
      lablYeWei.innerHTML = mars3d.Util.formatDate(new Date(), "ss.S") // 测试的随机数
    }
  })
}

// 倾斜指向左下角的面板样式
function addDemoGraphic10(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: [116.228043, 30.882207],
    style: {
      html: `<div class="marsTiltPanel marsTiltPanel-theme-green">
          <div class="marsTiltPanel-wrap">
              <div class="area">
                  <div class="arrow-lt"></div>
                  <div class="b-t"></div>
                  <div class="b-r"></div>
                  <div class="b-b"></div>
                  <div class="b-l"></div>
                  <div class="arrow-rb"></div>
                  <div class="label-wrap">
                      <div class="title">大别山水厂</div>
                      <div class="label-content">
                          <div class="data-li">
                              <div class="data-label">实时流量：</div>
                              <div class="data-value"><span class="label-num">99</span><span class="label-unit">m³/s</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">水池液位：</div>
                              <div class="data-value"><span class="label-num">20.02</span><span class="label-unit">m</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">水泵状态：</div>
                              <div class="data-value"><span class="label-tag data-value-status-1" title="中间状态">1号</span><span
                                      class="label-tag data-value-status-0" title="关闭状态">2号</span></div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">出水阀门：</div>
                              <div class="data-value"><span class="label-tag data-value-status-1" title="中间状态">1号</span><span
                                      class="label-tag data-value-status-2" title="打开状态">2号</span></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="b-t-l"></div>
              <div class="b-b-r"></div>
          </div>
          <div class="arrow" ></div>
      </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
      scaleByDistance: new Cesium.NearFarScalar(1000, 1.0, 200000, 0.2),
      clampToGround: true
    },
    attr: { remark: "示例10" },
    // 可以传入自定义测试点样式
    // testPoint: {
    //   color: '#ff0000',
    //   pixelSize: 8,
    // },
    pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
  })
  graphicLayer.addGraphic(graphic)

  graphic.testPoint = true // 打开测试点，与DIV点进行对比位置调整css
}

// 倾斜指向左下角的面板样式
function addDemoGraphic11(graphicLayer) {
  const graphic = new mars3d.graphic.DivGraphic({
    position: {
      type: "time", // 时序动态坐标
      speed: 1500,
      list: [
        [116.38546, 30.965609, 864.3],
        [116.472052, 30.876167, 579.1],
        [116.682461, 30.859745, 68],
        [116.900543, 30.92267, 37.4],
        [116.943531, 31.144053, 330.7]
      ]
    },
    style: {
      html: `<div class="marsTiltPanel marsTiltPanel-theme-blue">
          <div class="marsTiltPanel-wrap">
              <div class="area">
                  <div class="arrow-lt"></div>
                  <div class="b-t"></div>
                  <div class="b-r"></div>
                  <div class="b-b"></div>
                  <div class="b-l"></div>
                  <div class="arrow-rb"></div>
                  <div class="label-wrap">
                      <div class="title">岳西水厂</div>
                      <div class="label-content">
                          <div class="data-li">
                              <div class="data-label">实时流量：</div>
                              <div class="data-value"><span class="label-num">98</span><span class="label-unit">m³/s</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">水池液位：</div>
                              <div class="data-value"><span class="label-num">13.14</span><span class="label-unit">m</span>
                              </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">水泵状态：</div>
                              <div class="data-value">
                                <span id="btn-status1" class="label-tag data-value-status-1" title="中间状态">1号</span>
                                <span id="btn-status2" class="label-tag data-value-status-0" title="关闭状态">2号</span>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="b-t-l"></div>
              <div class="b-b-r"></div>
          </div>
          <div class="arrow" ></div>
      </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(1000, 200000) // 按视距距离显示
    },
    attr: { remark: "示例11" }
  })
  graphic.on(mars3d.EventType.load, function (event) {
    const container = event.graphic.container // popup对应的DOM

    const btnStatus1 = container.querySelector("#btn-status1")
    if (btnStatus1) {
      btnStatus1.addEventListener("click", (e) => {
        e.stopPropagation()
        globalMsg("您单击了1号水泵")
      })
    }

    const btnStatus2 = container.querySelector("#btn-status2")
    if (btnStatus2) {
      btnStatus2.addEventListener("click", (e) => {
        e.stopPropagation()
        globalMsg("您单击了2号水泵")
      })
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic12(graphicLayer) {
  const divGraphic = new mars3d.graphic.DivGraphic({
    position: [116.520548, 31.873034, 100],
    style: {
      html: `<div class="mars-spot">
        <div class="mars-spot-board">
        <h5>我是中国人</h5>
        </div>
        <div class="mars-spot-line"></div>
      </div>`,
      offsetY: -60,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BTOOM
    }
  })
  graphicLayer.addGraphic(divGraphic)
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

    const graphic = new mars3d.graphic.DivGraphic({
      position,
      style: {
        html: `<div class="marsGreenGradientPnl" >安徽欢迎您</div>`,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      },
      attr: { index },
      depthTest: false,
      hasZIndex: false,
      frameRate: 1
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

// 开始绘制
export async function startDrawGraphic() {
  const graphic = await graphicLayer.startDraw({
    type: "div",
    style: {
      html: `<div class="marsImgPanel2">
                    <div class="title">测试DIV点</div>
                    <div class="content">此处可以绑定任意Html代码和css效果</div>
                </div >`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM
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
      text: "删除对象",
      icon: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy || graphic.graphicIds) {
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
        graphic.stopEditing()
        graphicLayer.removeGraphic(graphic)
      }
    }
  ])
}
