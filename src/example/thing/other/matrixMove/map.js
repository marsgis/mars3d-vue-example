import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
export let graphicLayer // 矢量图层对象
export const eventTarget = new mars3d.BaseClass()

export const mapOptions = {
  scene: {
    center: { lat: 30.964699, lng: 116.339778, alt: 2793, heading: 309.3, pitch: -33.7 }
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

  // 加一些演示数据
  addDemoGraphic1(graphicLayer)
  addDemoGraphic2(graphicLayer)
  addDemoTilesetLayer()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null

  graphicLayer.remove()
  graphicLayer = null
}

function addDemoGraphic1(graphicLayer) {
  const graphic = new mars3d.graphic.PointEntity({
    position: new mars3d.LngLatPoint(116.329102, 30.977955, 1548.6),
    style: {
      color: "#0000ff",
      pixelSize: 10,
      outlineColor: "#ffffff",
      outlineWidth: 2
    },
    attr: { remark: "示例1" }
  })
  graphicLayer.addGraphic(graphic)

  const matrixMove = new mars3d.thing.MatrixMove({
    position: graphic.position
  })
  map.addThing(matrixMove)

  matrixMove.on(mars3d.EventType.change, (event) => {
    graphic.position = event.position
  })
}

function addDemoGraphic2(graphicLayer) {
  const graphic = new mars3d.graphic.ModelEntity({
    name: "警车",
    position: new mars3d.LngLatPoint(116.317108, 30.974377, 1528.3),
    style: {
      url: "https://data.mars3d.cn/gltf/mars/jingche/jingche.gltf",
      scale: 10,
      heading: 100,
      pitch: -40
    },
    attr: { remark: "示例3" }
  })
  graphicLayer.addGraphic(graphic)

  const matrixMove = new mars3d.thing.MatrixMove({
    position: graphic.position,
    scale: 10,
    heading: 100,
    pitch: -40,
    translateEnabled: true,
    rotateEnabled: true,
    scaleEnabled: true
  })
  map.addThing(matrixMove)

  matrixMove.on(mars3d.EventType.change, (event) => {
    console.log("change", event)

    switch (event.editType) {
      case "translate": {
        graphic.position = event.position
        break
      }
      case "rotate": {
        graphic.style.heading = event.heading
        graphic.style.pitch = event.pitch
        graphic.style.roll = event.roll
        graphic.updateOrientation()
        break
      }
      case "scale":
        graphic.setStyle({ scale: event.scale })
        break
    }
  })
}

async function addDemoTilesetLayer() {
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: "https://data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",
    position: { lng: 116.310854, lat: 30.999688, alt: 1288 }
  })
  map.addLayer(tiles3dLayer)

  await tiles3dLayer.readyPromise

  const matrixMove = new mars3d.thing.MatrixMove({
    position: tiles3dLayer.position,
    scale: tiles3dLayer.scale,
    roll: tiles3dLayer.rotation_x,
    pitch: tiles3dLayer.rotation_y,
    heading: tiles3dLayer.rotation_z,
    radius: tiles3dLayer.radius,
    translateEnabled: true,
    rotateEnabled: true,
    scaleEnabled: true,
    originOffset: new Cesium.Cartesian3(0, 0, 30)
  })
  map.addThing(matrixMove)

  matrixMove.on(mars3d.EventType.change, (event) => {
    console.log("change", event)

    switch (event.editType) {
      case "translate": {
        tiles3dLayer.position = event.position
        break
      }
      case "rotate": {
        tiles3dLayer.rotation = {
          x: event.roll,
          y: 360 - event.pitch,
          z: event.heading
        }
        break
      }
      case "scale":
        tiles3dLayer.scale = event.scale
        break
    }
  })
}
