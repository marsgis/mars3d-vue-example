import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象

let videoElement
let videoGraphic

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    // 此处参数会覆盖config.json中的对应配置
    center: { lat: 28.441587, lng: 119.482898, alt: 222, heading: 227, pitch: -28 }
  }
}
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map

  globalNotify("已知问题提示", `如视频未播放或服务URL访问超时，可能是在线演示URL链接已失效，您可以替换代码中URL为本地服务后使用。`)

  // 添加参考三维模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "县城社区",
    url: "https://data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
    position: { alt: 148.2 },
    maximumScreenSpaceError: 1
  })
  map.addLayer(tiles3dLayer)

  // 创建矢量数据图层
  graphicLayer = new mars3d.layer.GraphicLayer({
    hasEdit: true
  })
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  bindLayerPopup() // 在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu() // 在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效

  createVideoDom()

  // 加一些演示数据
  addDemoGraphic1()
  addDemoGraphic2()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 视频播放器播放 flv 报错 Flv: Unsupported codec in video frame: 12
// 原因:主要是因为我们的播放器不支持 H.265 视频编码；
// 解决办法:将设备端的视频编码改为 H.264
const flvUrl = "https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv"

function createVideoDom() {
  videoElement = mars3d.DomUtil.create("video", "", document.body)
  videoElement.setAttribute("muted", "muted")
  videoElement.setAttribute("autoplay", "autoplay")
  videoElement.setAttribute("loop", "loop")
  videoElement.setAttribute("crossorigin", "")
  videoElement.setAttribute("controls", "")
  videoElement.style.display = "none"
  videoElement.muted = true // 设置静音

  if (window.mpegts.isSupported()) {
    const flvPlayer = window.mpegts.createPlayer({
      type: "flv",
      url: flvUrl,
      hasAudio: false // 声音关闭，如果传来的视频流没有声音，就一定要设置这个参数，否则会报错
    })
    flvPlayer.attachMediaElement(videoElement)
    flvPlayer.load()
    flvPlayer.play()

    playVideo()
  } else {
    globalMsg("不支持flv格式视频")
  }

  setTimeout(() => {
    try {
      if (videoElement.paused) {
        globalMsg("当前浏览器已限制自动播放，请单击播放按钮")
        videoElement.play()
      }
    } catch (e) {
      // 规避浏览器权限异常
      globalMsg("当前浏览器已限制自动播放，请单击播放按钮")
    }
  }, 3000)
}

let synchronizer
function playVideo() {
  videoElement.play()

  // 可以使视频元素与Cesium的模拟时钟同步
  if (!synchronizer) {
    synchronizer = new Cesium.VideoSynchronizer({
      clock: map.clock,
      element: videoElement
    })
    map.clock.shouldAnimate = true
  }
}

export function getGraphic(graphicId) {
  videoGraphic = graphicLayer.getGraphicById(graphicId)
  return videoGraphic
}

// 竖立视频
function addDemoGraphic1() {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [119.481299, 28.439988, 140],
      [119.481162, 28.440102, 140],
      [119.481163, 28.440101, 130],
      [119.481296, 28.439986, 130]
    ],
    styleType: "video", // 属性编辑框使用
    style: {
      material: videoElement,
      stRotationDegree: 0 // 视频旋转角度
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)
}

// 地面视频
function addDemoGraphic2() {
  const graphic = new mars3d.graphic.PolygonEntity({
    positions: [
      [119.481749, 28.440171, 130],
      [119.481385, 28.440457, 130],
      [119.481911, 28.44094, 130],
      [119.482254, 28.440653, 130]
    ],
    styleType: "video", // 属性编辑框使用
    style: {
      material: videoElement,
      stRotationDegree: 130 // 视频旋转角度
    },
    attr: { remark: "示例2" }
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

    const pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 0, result.radius)
    const pt2 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 72, result.radius)
    const pt3 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 144, result.radius)
    const pt4 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 216, result.radius)

    const graphic = new mars3d.graphic.PolygonEntity({
      positions: [pt1, pt2, pt3, pt4],
      styleType: "video", // 属性编辑框使用
      style: {
        material: videoElement,
        stRotationDegree: 130, // 视频旋转角度
        clampToGround: true
      },
      attr: { index }
    })
    graphicLayer.addGraphic(graphic)
  }

  graphicLayer.enabledEvent = true // 恢复事件
  return result.points.length
}

export async function startDrawGraphic() {
  const graphic = await graphicLayer.startDraw({
    type: "rectangle",
    styleType: "video", // 属性编辑框使用
    style: {
      material: videoElement,
      clampToGround: true
    }
  })
  graphic.entityGraphic.material = videoElement

  console.log("标绘完成", graphic.toJSON())
}

export async function startDrawGraphic2() {
  const graphic = await graphicLayer.startDraw({
    type: "wall",
    maxPointNum: 2,
    styleType: "video", // 属性编辑框使用
    style: {
      diffHeight: 5,
      material: videoElement
    }
  })
  console.log("标绘完成", graphic.toJSON())
}

// 播放暂停
export function videoPlay() {
  if (synchronizer) {
    map.clock.shouldAnimate = true
  } else {
    videoElement.play()
  }
}
export function videoStop() {
  if (synchronizer) {
    map.clock.shouldAnimate = false
  } else {
    videoElement.pause()
  }
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
