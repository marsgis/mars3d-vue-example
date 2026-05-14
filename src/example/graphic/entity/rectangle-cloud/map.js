import { clamp } from "lodash-es"
import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 12.845055, lng: 112.931363, alt: 24286797, heading: 3, pitch: -90 },
    cameraController: {
      zoomFactor: 3.0,
      minimumZoomDistance: 1000,
      maximumZoomDistance: 300000000,
      constrainedAxis: false // 解除在南北极区域鼠标操作限制
    }
  }
}

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  addDemoGraphic1(map.graphicLayer)
  addDemoGraphic2(map.graphicLayer)
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

function addDemoGraphic1(graphicLayer) {
  const graphic = new mars3d.graphic.RectangleEntity({
    coordinates: Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
    style: {
      height: 6000,
      materialType: mars3d.MaterialType.RectSlide,
      materialOptions: {
        image: "https://data.mars3d.cn/img/map/world/cloud.png",
        color: Cesium.Color.WHITE.withAlpha(0.6),
        speed: 0.5,
        pure: true
      },
      distanceDisplayCondition: new Cesium.DistanceDisplayCondition(3000000, 100000000)
    }
  })
  graphicLayer.addGraphic(graphic)
}

function addDemoGraphic2(graphicLayer) {
  const graphic = new mars3d.graphic.RectangleEntity({
    coordinates: Cesium.Rectangle.fromDegrees(-180.0, -90.0, 180.0, 90.0),
    style: {
      materialType: mars3d.MaterialType.Water,
      materialOptions: {
        specularMap: "https://data.mars3d.cn/img/textures/water-specularMap.jpg",
        normalMap: "https://data.mars3d.cn/img/textures/waterNormals.jpg", // 水正常扰动的法线图
        frequency: 1000.0, // 控制波数的数字。
        animationSpeed: 0.01, // 控制水的动画速度的数字。
        amplitude: 10, // 控制水波振幅的数字。
        specularIntensity: 0.5, // 控制镜面反射强度的数字。
        baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
        blendColor: "#006ab4" // 从水中混合到非水域时使用的rgba颜色对象。
      },
      clampToGround: true
    }
  })
  graphicLayer.addGraphic(graphic)
}
