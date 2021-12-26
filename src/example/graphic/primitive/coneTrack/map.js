import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let graphicLayer // 矢量图层对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.808137, lng: 116.411699, alt: 23221, heading: 347, pitch: -40 },
    clock: {
      currentTime: "2021-07-01 10:45:00"
    }
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

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

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

  // 加一些演示数据
  addGraphic01(graphicLayer)
  addGraphic02(graphicLayer)
  addGraphic03(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
  graphicLayer.clear()
}

// 静态的位置
function addGraphic01(graphicLayer) {
  const coneTrack = new mars3d.graphic.ConeTrackPrimitive({
    position: [116.327881, 31.018378, 5000],
    targetPosition: [116.365017, 30.996012, 898.6], // 可选
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
    }
  })
  graphicLayer.addGraphic(coneTrack)
}

// 静态的位置
let coneTrack
function addGraphic02(graphicLayer) {
  const position = [116.28782, 30.971557, 5000]
  // 加个飞机
  const primitive = new mars3d.graphic.ModelPrimitive({
    position: position,
    style: {
      url: "//data.mars3d.cn/gltf/mars/feiji.glb",
      scale: 1,
      minimumPixelSize: 50
    }
  })
  graphicLayer.addGraphic(primitive)

  // 圆锥追踪体
  coneTrack = new mars3d.graphic.ConeTrackPrimitive({
    position: position,
    // targetPosition: [116.317411, 30.972581, 1439.7], //可选
    style: {
      length: 4000,
      angle: 5, // 半场角度
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.CircleWave, {
        duration: 2000,
        color: "#02ff00"
      })
    }
  })
  graphicLayer.addGraphic(coneTrack)
}

// 修改飞机追踪的目标点
export function onClickSelPoint() {
  map.graphicLayer.startDraw({
    type: "point",
    style: {
      pixelSize: 8,
      color: "#ffff00"
    },
    success: function (graphic) {
      const position = graphic.positionShow
      map.graphicLayer.clear()

      coneTrack.targetPosition = position
    }
  })
}

// 动态的位置
function addGraphic03(graphicLayer) {
  var coneTrack = new mars3d.graphic.ConeTrackPrimitive({
    position: [116.364307, 31.03778, 5000],
    targetPosition: [116.417326, 31.046258, 841.2],
    style: {
      // length: 4000, //targetPosition存在时无需传
      angle: 5, // 半场角度
      // 自定义扩散波纹纹理
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.CylinderWave, {
        color: "#ffff00",
        repeat: 30.0
      }),
      faceForward: false, // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
      closed: true // 是否为封闭体，实际上执行的是 是否进行背面裁剪
    }
  })
  graphicLayer.addGraphic(coneTrack)
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
    }
  ])
}
