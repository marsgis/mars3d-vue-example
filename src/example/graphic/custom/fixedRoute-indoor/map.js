import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
let fixedRoute

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.843773, lng: 117.251509, alt: 34, heading: 270, pitch: -11 },
    cameraController: {
      inertiaTranslate: 0.1 // 一个取值范围在<code>[0, 1)</code>内的参数，用于确定由于惯性，相机将继续平移多长时间。
    }
  },
  control: {
    clockAnimate: true, // 时钟动画控制(左下角)
    timeline: true, // 是否显示时间线控件
    infoBox: false
  },
  thing: {
    keyboardRoam: {
      moveStep: 0.1, // 平移步长 (米)。
      dirStep: 50, // 相机原地旋转步长，值越大步长越小。
      rotateStep: 0.3, // 相机围绕目标点旋转速率，0.3-2.0
      minPitch: 0.1, // 最小仰角  0-1
      maxPitch: 0.95 // 最大仰角  0-1
    }
  },
  layers: [
    {
      name: "教学楼",
      type: "3dtiles",
      url: "https://data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
      position: { lng: 117.251229, lat: 31.844015, alt: 31.2 },
      maximumScreenSpaceError: 8,
      maxMemory: 1024, // 最大缓存内存大小(MB)
      enableCollision: false,
      show: true
    }
  ]
}
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  addGraphicLayer()
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function addGraphicLayer() {
  // 创建矢量数据图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  fixedRoute = new mars3d.graphic.FixedRoute({
    name: "室内路线",
    position: {
      type: "time", // 时序动态坐标
      speed: 5,
      offsetHeight: 1.6,
      list: [
        [117.25164, 31.843773, 32.0],
        [117.251042, 31.843772, 32.0],
        [117.250613, 31.844058, 32.0],
        [117.250677, 31.844146, 32.0],
        [117.250696, 31.844134, 32.0],
        [117.250657, 31.844098, 36.0],
        [117.250611, 31.84406, 36.0],
        [117.251039, 31.843773, 36.0]
      ]
    },
    camera: {
      type: "dy",
      followedX: 1,
      followedZ: 0.2
    }
  })
  graphicLayer.addGraphic(fixedRoute)
  fixedRoute.on(mars3d.EventType.start, function (event) {
    console.log("漫游开始start")
  })
  fixedRoute.on(mars3d.EventType.end, function (event) {
    console.log("漫游结束end")
  })

  fixedRoute.start() // 启动漫游
}

export function startFly() {
  fixedRoute.start() // 启动漫游
}

export function stopFly() {
  fixedRoute.stop()
  globalMsg("请鼠标单击地图任意区域后，您再可以键盘按A S D W Q E键控制前后左右, 上下左右键控制旋转, 进行手动漫游。")
}

export function centerAtDX1() {
  stopFly()
  map.setCameraView({ lat: 31.843703, lng: 117.251038, alt: 33, heading: 50, pitch: -6 })
}

export function centerAtDX2() {
  stopFly()
  map.setCameraView({ lat: 31.843816, lng: 117.250978, alt: 34, heading: 308, pitch: -8 })
}

export function centerAtDX3() {
  stopFly()
  map.setCameraView({ lat: 31.843789, lng: 117.251188, alt: 42, heading: 6, pitch: -31 })
}
