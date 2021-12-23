import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象
let satelliteSensor
let modelGraphic
let graphicLayer
const reverse = true // z轴方向，true朝向空中，false朝向地心
const converter = Cesium.Transforms.eastNorthUpToFixedFrame
// const converter = Cesium.Transforms.localFrameToFixedFrameGenerator('east', 'south')

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 0.072832, lng: 151.409367, alt: 29330818, heading: 10, pitch: -90 }
  },
  cameraController: {
    maximumZoomDistance: 9000000000,
    constrainedAxis: false // 解除在南北极区域鼠标操作限制
  }
}

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到vue中

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

  eventTarget.fire("loadOk")
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

/**
 * 初始化创建一个卫星视锥体
 *
 * @export
 * @param {number} x 经度
 * @param {number} y 纬度
 * @param {number} z 高度
 * @param {number} heading 轨迹方向
 * @param {number} pitch 前后侧摆
 * @param {number} roll 左右侧摆
 * @param {number} angle1 夹角1
 * @param {number} angle2 夹角2
 * @returns {void}
 */
export function addModelGraphic(x, y, z, heading, pitch, roll, angle1, angle2) {
  const position = Cesium.Cartesian3.fromDegrees(x, y, z)
  // 加个模型
  modelGraphic = new mars3d.graphic.ModelEntity({
    name: "卫星模型",
    position: position,
    style: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 150,
      heading: heading,
      pitch: pitch,
      roll: roll
    }
  })
  graphicLayer.addGraphic(modelGraphic)

  // 打开3个轴进行显示对比
  modelGraphic.debugAxis = true

  // 视锥体
  satelliteSensor = new mars3d.graphic.SatelliteSensor({
    position: position,
    style: {
      sensorType: mars3d.graphic.SatelliteSensor.Type.Rect,
      angle1: angle1,
      angle2: angle2,
      heading: heading,
      pitch: pitch,
      roll: roll,
      color: "rgba(0,255,255,0.7)"
    },
    fixedFrameTransform: converter,
    reverse: reverse
  })
  graphicLayer.addGraphic(satelliteSensor)
}

/**
 *
 * @export
 * @param {*} x 经度
 * @param {*} y 纬度
 * @param {*} z 高度
 * @returns {void}
 */
export function updatePosition(x, y, z) {
  const position = Cesium.Cartesian3.fromDegrees(x, y, z)
  modelGraphic.position = position
  satelliteSensor.position = position
}

export function locate() {
  map.flyToGraphic(modelGraphic, { radius: modelGraphic.height * 2 })
}

// 方向角改变
export function headingChange(value) {
  modelGraphic.heading = value
  satelliteSensor.heading = value
}

// 俯仰角
export function pitchChange(value) {
  modelGraphic.pitch = value
  satelliteSensor.pitch = value
}

// 左右角
export function rollChange(value) {
  modelGraphic.roll = value
  satelliteSensor.roll = value
}

// 夹角1
export function angle1(value) {
  satelliteSensor.angle1 = value
}

// 夹角2
export function angle2(value) {
  satelliteSensor.angle2 = value
}

// 参考轴系显示与隐藏
export function chkShowModelMatrix(val) {
  modelGraphic.debugAxis = val
}

// 视椎体状态
export function sensorShowHide(val) {
  satelliteSensor.show = val
}
// 是否与地球相交
export function chkUnderground(val) {
  satelliteSensor.rayEllipsoid = val
}

// 类型选择
export function chkSensorType(value) {
  if (value === "1") {
    satelliteSensor.sensorType = mars3d.graphic.SatelliteSensor.Type.Conic
  } else {
    satelliteSensor.sensorType = mars3d.graphic.SatelliteSensor.Type.Rect
  }
}

export function lengthChange(value) {
  modelGraphic.debugAxisLength = value * 1000
}

export function clearAll() {
  map.graphicLayer.clear()
}

// 获取边界值
export function getRegion() {
  map.graphicLayer.clear()

  const coords = satelliteSensor.getAreaCoords() // 导出成像区边界坐标
  if (!coords || coords.length == 0) {
    globalMsg("当前与地球无成像区边")
    return
  }
  // 显示边界点，测试
  map.graphicLayer.clear()

  coords.forEach((position) => {
    const primitive = new mars3d.graphic.PointPrimitive({
      position: position,
      style: {
        color: "#ff0000",
        pixelSize: 8,
        outline: true,
        outlineColor: "#ffffff",
        outlineWidth: 2,
        clampToGround: true
      }
    })
    map.graphicLayer.addGraphic(primitive)
  })

}

export function getCenter() {
  map.graphicLayer.clear()

  const groundPosition = satelliteSensor.groundPosition
  if (!groundPosition) {
    globalMsg("当前与地球无交点")
    return
  }

  const primitive = new mars3d.graphic.PointPrimitive({
    position: groundPosition,
    style: {
      color: "#ff0000",
      pixelSize: 8,
      outline: true,
      outlineColor: "#ffffff",
      outlineWidth: 2,
      clampToGround: true
    }
  })
  map.graphicLayer.addGraphic(primitive)

  const point = mars3d.LatLngPoint.fromCartesian(groundPosition)
  globalMsg(point.toString())
}
