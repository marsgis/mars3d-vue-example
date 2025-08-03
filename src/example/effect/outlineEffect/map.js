import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 31.653633, lng: 117.075814, alt: 310, heading: 33, pitch: -29 }
  }
}

let outlineEffect

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map

  // 加模型
  const tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "石化工厂",
    url: "https://data.mars3d.cn/3dtiles/max-shihua/tileset.json",
    position: { lng: 117.077158, lat: 31.659116, alt: -2.0 },
    maximumScreenSpaceError: 1,
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  // 矢量图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 加gltf模型
  const graphicModel = new mars3d.graphic.ModelPrimitive({
    name: "汽车",
    position: Cesium.Cartesian3.fromDegrees(117.074035, 31.660459, 40),
    style: {
      url: "https://data.mars3d.cn/gltf/mars/qiche.gltf",
      scale: 1,
      minimumPixelSize: 50
    }
  })
  graphicLayer.addGraphic(graphicModel)

  // 加矢量数据
  const graphicBox1 = new mars3d.graphic.BoxPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.071033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: "#ff0000"
    }
  })
  graphicLayer.addGraphic(graphicBox1)

  const graphic1 = new mars3d.graphic.EllipsoidPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.071423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: "#ff0000"
    }
  })
  graphicLayer.addGraphic(graphic1)

  const graphicBox2 = new mars3d.graphic.BoxPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.074033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: Cesium.Color.GREY
    }
  })
  graphicLayer.addGraphic(graphicBox2)

  const graphic2 = new mars3d.graphic.EllipsoidPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.074423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: Cesium.Color.GREY
    }
  })
  graphicLayer.addGraphic(graphic2)

  const graphicBox3 = new mars3d.graphic.BoxPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.076033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: "#3388ff"
    }
  })
  graphicLayer.addGraphic(graphicBox3)

  const graphic3 = new mars3d.graphic.EllipsoidPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.076423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: "#3388ff"
    }
  })
  graphicLayer.addGraphic(graphic3)

  const graphicBox4 = new mars3d.graphic.BoxPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.078033, 31.663258, 31.3),
    style: {
      dimensions: new Cesium.Cartesian3(100.0, 100.0, 100.0),
      color: "#00ffff"
    }
  })
  graphicLayer.addGraphic(graphicBox4)

  const graphic4 = new mars3d.graphic.EllipsoidPrimitive({
    position: Cesium.Cartesian3.fromDegrees(117.078423, 31.664305, 30.8),
    style: {
      radii: new Cesium.Cartesian3(50.0, 50.0, 50.0),
      color: "#00ffff"
    }
  })
  graphicLayer.addGraphic(graphic4)

  // 添加特效
  outlineEffect = new mars3d.effect.Outline({
    color: "#FFFF00",
    width: 4,
    eventType: mars3d.EventType.click,
    closeOnClick: true
  })
  map.addEffect(outlineEffect)

  outlineEffect.on(mars3d.EventType.click, function (event) {
    console.log("点击了高亮了对象", event)
  })

  setTimeout(() => {
    // 指定高亮Primitive
    outlineEffect.selected = [graphicBox1, graphic1]
  }, 1000)

  // 从模型读取指定构件 加到 特效
  // tiles3dLayer.readyPromise.then(function (e) {
  //   addTileToTargetEffect(tiles3dLayer, outlineEffect)
  // })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}

// 从模型读取指定构件 加到 特效
function addTileToTargetEffect(tiles3dLayer, effect) {
  const listGJ = new mars3d.MarsArray()
  tiles3dLayer.tileset.tileLoad.addEventListener(function (tile) {
    processTileFeatures(tile, function (feature) {
      const attr = mars3d.Util.get3DTileFeatureAttr(feature) // 取属性

      // 根据条件判断，将feature记录
      if (attr.id === "4734ba6f3de83d861c3176a6273cac6d") {
        listGJ.set(feature.featureId, feature.pickId)
        effect.selected = listGJ.values
      }
    })
  })

  tiles3dLayer.tileset.tileUnload.addEventListener(function (tile) {
    processTileFeatures(tile, function (feature) {
      if (listGJ.contains(feature.featureId)) {
        listGJ.remove(feature.featureId)
        effect.selected = listGJ.values
      }
    })
  })
}

function processContentFeatures(content, callback) {
  const featuresLength = content.featuresLength
  for (let i = 0; i < featuresLength; ++i) {
    const feature = content.getFeature(i)
    callback(feature)
  }
}

function processTileFeatures(tile, callback) {
  const content = tile.content
  const innerContents = content.innerContents
  if (Cesium.defined(innerContents)) {
    const length = innerContents.length
    for (let i = 0; i < length; ++i) {
      processContentFeatures(innerContents[i], callback)
    }
  } else {
    processContentFeatures(content, callback)
  }
}

export function changeState(val) {
  outlineEffect.enabled = val
}
export function changeWidth(val) {
  outlineEffect.width = val
}

export function changeColor(val) {
  outlineEffect.color = val
}

export function changeColorHidden(val) {
  outlineEffect.colorHidden = val
}

export function changeShowPlane(val) {
  outlineEffect.showPlane = val
}

export function changePlaneAngle(val) {
  outlineEffect.planeAngle = val
}

export function changeGlow(val) {
  outlineEffect.glow = val
}
export function changeGlowPower(val) {
  outlineEffect.glowPower = val
}

export function changeGlowStrength(val) {
  outlineEffect.glowStrength = val
}
