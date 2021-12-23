import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 11.198697, lng: 110.678752, alt: 5006616, heading: 0, pitch: -66 }
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
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加演示数据
  addGraphicDemo01(graphicLayer)
  addGraphicDemo02(graphicLayer)
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

function addGraphicDemo01(graphicLayer) {
  const lat = 31.95
  const lng = 117.141
  const height = 1200000

  // 加个模型
  const modelEntity = new mars3d.graphic.ModelEntity({
    name: "卫星模型",
    position: [lng, lat, height],
    style: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 150
    }
  })
  graphicLayer.addGraphic(modelEntity)

  // 加圆锥效果
  const primitive = new mars3d.graphic.CylinderPrimitive({
    position: [lng, lat, height * 0.5],
    style: {
      length: height,
      topRadius: 0.0,
      bottomRadius: 300000,
      // 自定义扩散波纹纹理
      material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.CircleWave, {
        color: "#02ff00",
        count: 1, // 圆圈数量
        speed: 10
      }),
      faceForward: false, // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
      closed: true // 是否为封闭体，实际上执行的是 是否进行背面裁剪
    }
  })
  graphicLayer.addGraphic(primitive)
}

function addGraphicDemo02(graphicLayer) {
  const lat = 31.95
  const lng = 103.856335
  const height = 1200000

  // 加个模型
  const modelEntity = new mars3d.graphic.ModelEntity({
    name: "卫星模型",
    position: [lng, lat, height],
    style: {
      url: "//data.mars3d.cn/gltf/mars/weixin.gltf",
      scale: 1,
      minimumPixelSize: 150,
      heading: 90
    }
  })
  graphicLayer.addGraphic(modelEntity)

  // 加圆锥效果
  const primitive = new mars3d.graphic.CylinderPrimitive({
    position: [lng, lat, height * 0.5],
    style: {
      length: height,
      topRadius: 0.0,
      bottomRadius: 200000,
      // 自定义扩散波纹纹理
      material: new mars3d.material.CylinderWaveMaterial({
        color: "rgba(255,255,0,0.7)",
        repeat: 30.0
      }),
      faceForward: false, // 当绘制的三角面片法向不能朝向视点时，自动翻转法向，从而避免法向计算后发黑等问题
      closed: true // 是否为封闭体，实际上执行的是 是否进行背面裁剪
    }
  })
  graphicLayer.addGraphic(primitive) // primitive.addTo(graphicLayer)  //另外一种写法
}
