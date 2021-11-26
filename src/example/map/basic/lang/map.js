var map
var drawLayer
var measure

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    control: {
      homeButton: true,
      sceneModePicker: true,
      navigationHelpButton: true,
      infoBox: true,
      vrButton: true,
      fullscreenButton: true,
      geocoder: true,
      baseLayerPicker: true,
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件

      defaultContextMenu: true, // 涉及到多语言的模块：右键菜单
      compass: { top: "10px", left: "5px" },
      distanceLegend: { left: "180px", bottom: "30px" },
      locationBar: {
        fps: true,
        template:
          "<div>lng:{lng}</div> <div>lat:{lat}</div> <div>alt：{alt} m</div> <div>level：{level}</div><div>heading：{heading}°</div> <div>pitch：{pitch}°</div><div>cameraHeight：{cameraHeight}m</div>"
      }
    },
    lang: mars3d.LangType.EN // 使用英文
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0]
  toolbar.style.bottom = "110px"

  var zoom = new mars3d.control.Zoom({
    insertIndex: 1, // 插入的位置顺序
    zoomInIcon: "img/icon/zoom-in.svg",
    zoomOutIcon: "img/icon/zoom-out.svg"
  })
  map.addControl(zoom)

  // 涉及到多语言的模块：标绘提示
  drawLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true // 绘制完成后是否自动激活编辑
  })
  map.addLayer(drawLayer)

  drawLayer.bindContextMenu([
    {
      text: map.getLangText("_删除"),
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
        const parent = graphic._parent // 右击是编辑点时
        drawLayer.removeGraphic(graphic)
        if (parent) {
          drawLayer.removeGraphic(parent)
        }
      }
    }
  ])

  // 涉及到多语言的模块：图上量算
  measure = new mars3d.thing.Measure({
    // 可设置文本样式
    label: {
      color: "#ffffff",
      font_family: "楷体",
      font_size: 20,
      background: false
    }
  })
  map.addThing(measure)
}

function startDraw(type) {
  drawLayer.startDraw({
    type: type,
    style: {
      color: "#00ffff",
      opacity: 0.6
    }
  })
}
