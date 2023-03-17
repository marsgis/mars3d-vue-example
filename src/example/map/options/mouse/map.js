import * as mars3d from "mars3d"

function initMap() {
  // 因为代码是在ceisum底层ScreenSpaceCameraController类中，暂未找到修改处
  globalNotify("已知问题提示", `中键滚动缩放时还是基于缩放前原点，存在偏差。`)

  const map = new mars3d.Map("mars3dContainer", {
    scene: {
      center: { lat: 30.526361, lng: 116.335987, alt: 45187, heading: 0, pitch: -45 }
    },
    mouse: {
      transform: function (position) {
        return new mars3d.Cesium.Cartesian2(position.x / 2, position.y / 2)
      }
    },
    control: {
      baseLayerPicker: true, // basemaps底图切换按钮
      homeButton: true, // 视角复位按钮
      sceneModePicker: true, // 二三维切换按钮
      navigationHelpButton: true, // 帮助按钮
      fullscreenButton: true, // 全屏按钮
      contextmenu: { hasDefault: true } // 右键菜单
    },
    basemaps: [
      {
        name: "天地图影像",
        icon: "/img/basemaps/tdt_img.png",
        type: "group",
        layers: [
          { name: "底图", type: "tdt", layer: "img_d" },
          { name: "注记", type: "tdt", layer: "img_z" }
        ],
        show: true
      }
    ]
  })

  const layer = new mars3d.layer.GraphicLayer()
  map.addLayer(layer)

  const point = new mars3d.graphic.PointPrimitive({
    position: [16.336541, 30.852874, 10],
    popup: "这是一个点",
    style: {
      pixelSize: 12,
      color: "#ff0000",
      label: {
        text: "请点击",
        font_size: 14,
        horizontalOrigin: mars3d.Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: mars3d.Cesium.VerticalOrigin.CENTER,
        pixelOffsetX: 16
      }
    }
  })
  layer.addGraphic(point)
}
