var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 30.468743, lng: 116.499464, alt: 67446, heading: 0, pitch: -45 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建DIV数据图层
  graphicLayer = new mars3d.layer.DivLayer()
  map.addLayer(graphicLayer)

  // 图层管理的相关处理，代码在\js\graphicManager.js
  // eslint-disable-next-line no-undef
  initLayerManager(graphicLayer)

  graphicLayer.unbindPopup()

  // 加一些演示数据
  addGraphic_01(graphicLayer)
  addGraphic_02(graphicLayer)
  addGraphic_03(graphicLayer)
  addGraphic_04(graphicLayer)
  addGraphic_05(graphicLayer)
  addGraphic_06(graphicLayer)
  addGraphic_07(graphicLayer)
  addGraphic_08(graphicLayer)
  addGraphic_09(graphicLayer)
  addGraphic_10(graphicLayer)
  addGraphic_11(graphicLayer)
}

// 显示隐藏 绑定popup和tooltip和右键菜单以及是否编辑
function bindShowHide(val) {
  graphicLayer.show = val
}
function bindPopup(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerPopup(graphicLayer)
  } else {
    graphicLayer.unbindPopup()
  }
}
function bindTooltip(val) {
  if (val) {
    graphicLayer.bindTooltip("我是layer上绑定的Tooltip")
  } else {
    graphicLayer.unbindTooltip()
  }
}
function bindRightMenu(val) {
  if (val) {
    // eslint-disable-next-line no-undef
    bindLayerContextMenu(graphicLayer)
  } else {
    graphicLayer.unbindContextMenu(true)
  }
}
function bindEdit(val) {
  graphicLayer.hasEdit = val
}

// 按钮事件
function btnDrawModel() {
  // 开始绘制
  graphicLayer.startDraw({
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
}
function btnClear() {
  graphicLayer.clear()
}
function btnExpFile() {
  // eslint-disable-next-line no-undef
  expFile(graphicLayer)
}
function btnImpFile(file) {
  // eslint-disable-next-line no-undef
  impFile(graphicLayer, file)
}

// 一个黑色面板，指向左下角黄色连线
function addGraphic_01(graphicLayer) {
  var graphic = new mars3d.graphic.DivGraphic({
    position: [116.741611, 31.408068, 75.5],
    style: {
      html: `<div class="marsBlackPanel  animation-spaceInDown">
              <div class="marsBlackPanel-text">大湖名城,创新高地</div>
          </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.CENTER,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 400000), // 按视距距离显示

      // 高亮时的样式
      highlight: {
        // type: mars3d.EventType.click,
        className: "marsBlackPanel-highlight"
      }
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 一个渐变的文本面板,中间竖直连线
function addGraphic_02(graphicLayer) {
  var graphic = new mars3d.graphic.DivGraphic({
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
    }
  })
  graphicLayer.addGraphic(graphic)
}

//
function addGraphic_03(graphicLayer) {
  var graphic = new mars3d.graphic.DivGraphic({
    position: [116.960075, 31.19609, 237.4],
    style: {
      html: `<div class="marsGreenGradientPnl" >安徽欢迎您</div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,

      // 高亮时的样式
      highlight: {
        type: mars3d.EventType.click,
        className: "marsGreenGradientPnl-highlight"
      }
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 添加GIF图标，DIV方式
function addGraphic_04(graphicLayer) {
  var graphic = new mars3d.graphic.DivGraphic({
    position: [116.79013, 31.164872, 289],
    style: {
      html: '<img src="img/marker/tf.gif" style="width:50px;height:50px;" ></img>',
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.CENTER
    },
    pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
  })
  graphicLayer.addGraphic(graphic)
}

// 加css动画的扩散点 DivLightPoint
function addGraphic_05(graphicLayer) {
  var graphic = new mars3d.graphic.DivLightPoint({
    position: [116.630276, 31.213813],
    style: {
      color: "#f33349",
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示
      heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
    },
    popup: "测试popup"
  })
  graphicLayer.addGraphic(graphic)
}

// 内置扩展的动态文本 DivBoderLabel
function addGraphic_06(graphicLayer) {
  var graphic = new mars3d.graphic.DivBoderLabel({
    position: [116.460722, 31.140888, 781],
    style: {
      text: "火星科技Mars3D平台",
      font_size: 15,
      font_family: "微软雅黑",
      color: "#ccc",
      boderColor: "#15d1f2"
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 内置扩展的竖立文本 DivBoderLabel
function addGraphic_07(graphicLayer) {
  var graphic = new mars3d.graphic.DivUpLabel({
    position: [116.327136, 30.99723, 914.6],
    style: {
      text: "我是竖立的文本",
      color: "#fff",
      font_size: 16,
      font_family: "微软雅黑",
      lineHeight: 60,
      circleSize: 8,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000) // 按视距距离显示
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 类似popup/toolitp的自定义html
function addGraphic_08(graphicLayer) {
  var graphic = new mars3d.graphic.Popup({
    position: [116.146461, 31.380152, 395.1],
    style: {
      html: `这里可以放入任意html代码<br /> Popup和Tooltip也是继承自DivGraphic`,
      closeButton: false,
      horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 200000), // 按视距距离显示

      // 高亮时的样式
      highlight: {
        type: mars3d.EventType.click,
        className: "mars-popup-highlight"
      }
    }
  })
  graphicLayer.addGraphic(graphic)
}

// 倾斜指向左下角的面板样式
function addGraphic_09(graphicLayer) {
  var graphic = new mars3d.graphic.DivGraphic({
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
                                <span id="lablSBZT1"  class="label-tag data-value-status-1" alt="中间状态">1号</span>
                                <span id="lablSBZT2"  class="label-tag data-value-status-0" alt="关闭状态">2号</span>
                                </div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">出水阀门：</div>
                              <div class="data-value">
                                <span id="lablCSFM1"   class="label-tag data-value-status-1" alt="中间状态">1号</span>
                                <span id="lablCSFM2"   class="label-tag data-value-status-2" alt="打开状态">2号</span>
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
    pointerEvents: false // false时不允许拾取和触发任意鼠标事件，但可以穿透div缩放地球
  })
  graphicLayer.addGraphic(graphic)

  // 刷新局部DOM,不影响面板的其他控件操作
  // [建议读取到后端接口数据后主动去修改DOM，比下面演示的实时刷新效率高些]
  graphic.on(mars3d.EventType.postRender, function (event) {
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

  // 演示绑定单击事件
  // $("#lablSBZT1").click(function () {
  //   globalMsg("单击了1号水泵")
  // })
  // $("#lablSBZT2").click(function () {
  //   globalMsg("单击了2号水泵")
  // })
  // $("#lablCSFM1").click(function () {
  //   globalMsg("单击了1号出水阀门")
  // })
  // $("#lablCSFM2").click(function () {
  //   globalMsg("单击了2号出水阀门")
  // })
}

// 倾斜指向左下角的面板样式
function addGraphic_10(graphicLayer) {
  var graphic = new mars3d.graphic.DivGraphic({
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
                              <div class="data-value"><span class="label-tag data-value-status-1" alt="中间状态">1号</span><span
                                      class="label-tag data-value-status-0" alt="关闭状态">2号</span></div>
                          </div>
                          <div class="data-li">
                              <div class="data-label">出水阀门：</div>
                              <div class="data-value"><span class="label-tag data-value-status-1" alt="中间状态">1号</span><span
                                      class="label-tag data-value-status-2" alt="打开状态">2号</span></div>
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
function addGraphic_11(graphicLayer) {
  var graphic = new mars3d.graphic.DivGraphic({
    position: Cesium.Cartesian3.fromDegrees(116.706926, 30.945346, 457.5),
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
                              <div class="data-value"><span class="label-tag data-value-status-1" alt="中间状态">1号</span><span
                                      class="label-tag data-value-status-0" alt="关闭状态">2号</span></div>
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
    }
  })
  graphicLayer.addGraphic(graphic)

  movePoint(graphic) // 动画移动示例
}

//
function movePoint(graphic) {
  map.clock.shouldAnimate = true

  // 动画移动
  var property = new Cesium.SampledPositionProperty()
  var time = 20 // 移动的时长 ，秒
  var tempTime

  // 起点
  var startPoint = Cesium.Cartesian3.fromDegrees(116.706926, 30.945346, 457.5)
  tempTime = map.clock.currentTime // 飞行开始时间
  property.addSample(tempTime, startPoint)

  // 移动到的第1个目标点
  var point1 = Cesium.Cartesian3.fromDegrees(116.311439, 30.76485, 423.7)
  tempTime = Cesium.JulianDate.addSeconds(tempTime, time, new Cesium.JulianDate())
  property.addSample(tempTime, point1)

  // 移动到的第2个目标点
  var point2 = Cesium.Cartesian3.fromDegrees(116.63081, 30.786585, 85)
  tempTime = Cesium.JulianDate.addSeconds(tempTime, time, new Cesium.JulianDate())
  property.addSample(tempTime, point2)

  // 移动到的第3个目标点
  var point3 = Cesium.Cartesian3.fromDegrees(116.706926, 30.945346, 457.5)
  tempTime = Cesium.JulianDate.addSeconds(tempTime, time, new Cesium.JulianDate())
  property.addSample(tempTime, point3)

  // 为了保证到结束时间了，一直停留在那，所以加个很远的时间
  tempTime = Cesium.JulianDate.addDays(tempTime, 365, new Cesium.JulianDate())
  property.addSample(tempTime, point3)

  graphic.position = property
}
