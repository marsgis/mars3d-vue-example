import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.516143, lng: 117.282937, alt: 46242, heading: 2, pitch: -49 }
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

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  initLayerManager()

  // 加一些演示数据
  addGraphicDemo1()
  addGraphicDemo2()
  addGraphicDemo3()
  addGraphicDemo4()
  addGraphicDemo5()
  addGraphicDemo6()
  addGraphicDemo7()
  addGraphicDemo8()
  queryAreasData()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  graphicLayer.clear()
}

function addGraphicDemo1() {
  const primitive = new mars3d.graphic.WallPrimitive({
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
    }
  })
  graphicLayer.addGraphic(primitive)

  initGraphicManager(primitive)
}

function addGraphicDemo2() {
  const primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.208302, 31.85757],
      [117.234234, 31.858263],
      [117.234261, 31.833317],
      [117.207414, 31.834541]
    ],
    style: {
      closure: true,
      diffHeight: 500,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/arrow.png",
        color: Cesium.Color.CHARTREUSE,
        repeat: new Cesium.Cartesian2(30, 1),
        speed: 20 // 速度，建议取值范围1-100
      })
    }
  })
  graphicLayer.addGraphic(primitive)

}

function addGraphicDemo3() {
  // 圆形时
  const positions = mars3d.PolyUtil.getEllipseOuterPositions({
    position: Cesium.Cartesian3.fromDegrees(117.276257, 31.866351, 19.57),
    radius: 1200, // 半径
    count: 50 // 共返回(count*4)个点
  })

  const primitive = new mars3d.graphic.WallPrimitive({
    positions: positions,
    style: {
      diffHeight: 800,
      closure: true,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/fence.png",
        color: "#ffff00",
        speed: 10, // 速度，建议取值范围1-100
        axisY: true
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo4() {
  const primitive = new mars3d.graphic.WallPrimitive({
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
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        // 动画线材质
        image: "img/textures/fence.png",
        axisY: true,
        color: "#ff0000",
        speed: 10 // 速度，建议取值范围1-100
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo5() {
  const primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.229659, 31.908221],
      [117.240804, 31.908175]
    ],
    style: {
      diffHeight: 500,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        // 动画线材质
        image: "img/textures/fence.png",
        axisY: true,
        color: "#ff0000",
        hasImage2: true,
        image2: "img/textures/tanhao.png",
        color2: "#ffff00",
        speed: 10 // 速度，建议取值范围1-100
      }),
      label: {
        text: "我是墙",
        font_size: 18,
        color: "#ffffff",
        distanceDisplayCondition: true,
        distanceDisplayCondition_far: 500000,
        distanceDisplayCondition_near: 0
      }
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo6() {
  const primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.169646, 31.769171],
      [117.194579, 31.806466]
    ],
    style: {
      diffHeight: 400,
      image: "img/textures/movingRiver.png"
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo7() {
  const primitive = new mars3d.graphic.WallPrimitive({
    positions: [
      [117.353776, 31.887406, 21.2],
      [117.321028, 31.887207, 21.3],
      [117.290341, 31.902469, 15.1]
    ],
    style: {
      diffHeight: 400,
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
        image: "img/textures/arrow.png",
        color: "#00eba8",
        repeat: new Cesium.Cartesian2(20, 1),
        speed: 20 // 速度，建议取值范围1-100
      })
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo8() {
  const primitive = new mars3d.graphic.WallPrimitive({
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
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.WallScroll, {
        image: "img/textures/fence.png",
        color: Cesium.Color.CHARTREUSE,
        count: 3,
        speed: 20
      })
    }
  })
  graphicLayer.addGraphic(primitive)

}

// 显示合肥市边界
function addGraphicDemo9(data) {
  const arr = mars3d.Util.geoJsonToGraphics(data) // 解析geojson
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    const primitive = new mars3d.graphic.WallPrimitive({
      positions: item.positions,
      style: {
        diffHeight: 3000,
        material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
          image: "img/textures/fence.png",
          color: "#bdf700",
          repeat: new Cesium.Cartesian2(5, 1),
          axisY: true, // 方向，true时上下，false左右
          speed: 10 // 速度，建议取值范围1-100
        })
      },
      attr: item.attr
    })
    graphicLayer.addGraphic(primitive)
    primitive.bindTooltip("合肥欢迎您 - 火星科技")
  }
}

// 数据获取
function queryAreasData() {
  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/geojson/areas/340100.json" })
    .then(function (data) {
      addGraphicDemo9(data)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}
// 显示隐藏 绑定popup和tooltip和右键菜单以及是否编辑
function bindShowHide(val) {
  graphicLayer.show = val
}
function bindPopup(val) {
  if (val) {
    bindLayerPopup()
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
    bindLayerContextMenu()
  } else {
    graphicLayer.unbindContextMenu(true)
  }
}

// 在图层级处理一些事物
function initLayerManager() {
  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  /* graphicLayer.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听layer，鼠标移入了矢量对象", event)
  })
  graphicLayer.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听layer，鼠标移出了矢量对象", event)
  }) */

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerPopup()

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu()
}

// 绑定图层的弹窗
function bindLayerPopup() {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr || {}
    attr.test1 = "测试属性"
    // attr["视频"] = `<video src='http://data.mars3d.cn/file/video/lukou.mp4' controls autoplay style="width: 300px;" ></video>`;

    return mars3d.Util.getTemplateHtml({ title: "layer上绑定的Popup", template: "all", attr: attr })
  })
}

// 绑定右键菜单
function bindLayerContextMenu() {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.startEditing) {
          return false
        }
        return !graphic.isEditing
      },
      callback: function (e) {
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
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.stopEditing(graphic)
        }
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "polyline" ||
          graphic.type === "polylineP" ||
          graphic.type === "curve" ||
          graphic.type === "curveP" ||
          graphic.type === "polylineVolume" ||
          graphic.type === "polylineVolumeP" ||
          graphic.type === "corridor" ||
          graphic.type === "corridorP" ||
          graphic.type === "wall" ||
          graphic.type === "wallP"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP" ||
          graphic.type === "scrollWall" ||
          graphic.type === "water"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}

// 也可以在单个Graphic上做个性化管理及绑定操作
function initGraphicManager(graphic) {
  // 3.在graphic上绑定监听事件
  /* graphic.on(mars3d.EventType.click, function (event) {
    console.log("监听graphic，单击了矢量对象", event)
  })
  graphic.on(mars3d.EventType.mouseOver, function (event) {
    console.log("监听graphic，鼠标移入了矢量对象", event)
  })
  graphic.on(mars3d.EventType.mouseOut, function (event) {
    console.log("监听graphic，鼠标移出了矢量对象", event)
  }) */

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
      text: "删除对象[graphic绑定的]",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
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
