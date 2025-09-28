import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.649617, lng: 117.081721, alt: 444, heading: 348, pitch: -25 }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 加载石化工厂模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "石化工厂",
    url: "http://data.mars3d.cn/3dtiles/max-shihua/tileset.json",
    position: { lng: 117.077158, lat: 31.659116, alt: -2.0 },
    maximumScreenSpaceError: 1,
    popup: "all"
  })
  map.addLayer(tiles3dLayer)

  // 创建DIV数据图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("您单击了", event)
  })

  // 在layer上绑定右键菜单
  graphicLayer.bindContextMenu(
    [
      {
        text: "查看摄像头",
        icon: "fa fa-trash-o",
        callback: (e) => {
          const graphic = e.graphic

          globalMsg("右键菜单示例")
        }
      }
    ],
    { offsetY: -170 }
  )

  // 添加数据
  addRandomGraphicByCount(graphicLayer, [117.080571, 31.657898, 50.2])
  addRandomGraphicByCount(graphicLayer, [117.078006, 31.65649, 49.4])
  addRandomGraphicByCount(graphicLayer, [117.078331, 31.660016, 47.2])
  addRandomGraphicByCount(graphicLayer, [117.080397, 31.656139, 33.3]).openPopup()

  // console.log("导出数据测试", graphicLayer.toJSON())
  // const layer = mars3d.LayerUtil.create(json)

  graphicLayer.on(mars3d.EventType.popupOpen, function (event) {
    const container = event.container // popup对应的DOM
    console.log("图层上打开了popup", container)

    const video = container.querySelector("video")
    video.addEventListener("error", () => {
      console.log("播放错误:", video.error)
      // 尝试恢复播放
      if (video.paused) {
        video.play().catch((err) => console.log("恢复失败:", err))
      }
    })
  })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// function addRandomGraphicByCount(graphicLayer, position) {
//   const graphicImg = new mars3d.graphic.DivGraphic({
//     position,
//     style: {
//       html: ` <div class="mars3d-divCameraPoint-content">
//                       <img class="mars3d-divCameraPoint-img" src="https://data.mars3d.cn/img/marker/svg/camera.svg" >
//                     </div>
//                     <div class="mars3d-divCameraPoint-line" ></div>
//                     <div class="mars3d-divCameraPoint-point"></div>
//                   `,
//       offsetX: -16,
//       distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000)
//     },
//     popup: `<video preload="auto" controls autoplay muted width="500">
//       <source src="http://data.mars3d.cn/file/video/lukou.mp4" type="video/mp4">
//     </video>`,
//     popupOptions: {
//       useGraphicPostion: true,
//       offsetY: -170, // 显示Popup的偏移值，是DivGraphic本身的像素高度值
//       template: `<div class="marsBlackPanel animation-spaceInDown">
//                         <div class="marsBlackPanel-text">{content}</div>
//                         <span class="mars3d-popup-close-button closeButton" >×</span>
//                       </div>`,
//       horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
//       verticalOrigin: Cesium.VerticalOrigin.CENTER
//     }
//   })
//   graphicLayer.addGraphic(graphicImg)

//   return graphicImg
// }

function addRandomGraphicByCount(graphicLayer, position) {
  const graphicImg = new mars3d.graphic.DivGraphic({
    position,
    style: {
      html: ` <div class="mars3d-divCameraPoint-content">
                      <img class="mars3d-divCameraPoint-img" src="https://data.mars3d.cn/img/marker/svg/camera.svg" >
                    </div>
                    <div class="mars3d-divCameraPoint-line" ></div>
                    <div class="mars3d-divCameraPoint-point"></div>
                  `,
      offsetX: -16,
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 100000)
    },
    popup: {
      type: "iframe",
      url: `http://player.bilibili.com/player.html?isOutside=true&aid=464541155&bvid=BV1PL41177SS&from={id}`,
      width: 600,
      height: 400
    },
    popupOptions: {
      useGraphicPostion: true,
      offsetY: -170, // 显示Popup的偏移值，是DivGraphic本身的像素高度值
      template: `<div class="marsBlackPanel animation-spaceInDown">
                        <div class="marsBlackPanel-text">{content}</div>
                        <span class="mars3d-popup-close-button closeButton" >×</span>
                      </div>`,
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.CENTER
    }
  })
  graphicLayer.addGraphic(graphicImg)

  return graphicImg
}
