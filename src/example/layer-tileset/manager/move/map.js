import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象
let tiles3dLayer

export const eventTarget = new mars3d.BaseClass() // 事件对象，用于抛出事件到面板中

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance // 记录map
  map.fixedLight = true // 固定光照，避免gltf模型随时间存在亮度不一致。

  // 如果模型地址内有“+”符号，可以加下面方法进行自定义处理
  Cesium.Resource.ReplaceUrl = function (url) {
    if (url.endsWith(".json") || url.endsWith(".b3dm")) {
      return url.replace(/\+/gm, "%2B") // 将3dtiles中的“+”符号转义下
    } else {
      return url
    }
  }


  // modelMove = new mars3d.thing.MatrixMove({
  //   position: tiles3dLayer.center
  // })
  // map.addThing(modelMove)

  // // 记录初始位置
  // const local = new mars3d.LocalWorldTransform(modelMove.position)
  // const pt1 = local.worldToLocal(modelMove.position)
  // modelMove.on(mars3d.EventType.change, (event) => {
  //   // 计算偏差
  //   const pt2 = local.worldToLocal(event.position)
  //   const deviation = Cesium.Cartesian3.subtract(pt1, pt2, new Cesium.Cartesian3())
  //   console.log("偏差:", deviation)
  // })
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
  removeLayer()
}

function removeLayer() {
  if (tiles3dLayer) {
    map.basemap = 2021 // 切换到默认卫星底图

    map.removeLayer(tiles3dLayer, true)
    tiles3dLayer = null
  }
}

// 是否有地形
export function chkHasTerrain(isStkTerrain) {
  map.hasTerrain = isStkTerrain
}

// 深度检测
export function chkTestTerrain(val) {
  map.scene.globe.depthTestAgainstTerrain = val
}

// 当前页面业务相关
export function showModel(modelUrl) {
  removeLayer()
  if (!modelUrl) {
    return
  }

  tiles3dLayer = new mars3d.layer.TilesetLayer({
    url: modelUrl,
    maximumScreenSpaceError: 1,

    // 高亮时的样式
    highlight: {
      type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
      color: "#00FF00"
    },
    popup: "all",
    flyTo: true
  })
  map.addLayer(tiles3dLayer)

  // 加载完成事件
  tiles3dLayer.on(mars3d.EventType.load, function (event) {
    console.log("模型加载完成", event)
  })
}

export function setTranslation(x, y, z) {
  const translation = Cesium.Cartesian3.fromArray([x, y, z])
  const modelMatrix = Cesium.Matrix4.fromTranslation(translation)
  tiles3dLayer.tileset.modelMatrix = modelMatrix

  // 打印值
  const position = mars3d.PointUtil.getPositionByHprAndOffset(tiles3dLayer.position, new Cesium.Cartesian3(x, y, z))
  const point = mars3d.LngLatPoint.parse(position)
  console.log("新坐标为", point)
}



// const tilesetLayer2 = new mars3d.layer.TilesetLayer({
//   url: "",
//   updateMatrix: updateMatrix,
//   translation: { x: 0, y: 0, z: 0 },
//   rotation: { x: 0, y: 0, z: 0 }
// })
// map.addLayer(tilesetLayer2)

// 自定义设置模型的矩阵
// function updateMatrix(position, tilesetLayer) {
//   const tileset = tilesetLayer._tileset // 原生cesium对象
//   const options = tilesetLayer.options // 图层设置的参数

//   if (!tilesetLayer._transform_orgin) {
//     tilesetLayer._transform_orgin = tileset._root.transform.clone()
//   }
//   // const matrix = Cesium.Transforms.eastNorthUpToFixedFrame(position) // 如果设置模型位置，需要用这个
//   let matrix = tilesetLayer._transform_orgin // 取模型中原始矩阵

//   // 创建一个新的平移向量
//   const translation = new Cesium.Cartesian3(options.translation.x, options.translation.y, options.translation.z) // x, y, z是你想要的平移量

//   // 从平移向量创建一个变换矩阵
//   const translationMatrix = Cesium.Matrix4.fromTranslation(translation)

//   // 将平移应用到原变换矩阵（这会替换整个变换矩阵）
//   matrix = Cesium.Matrix4.multiplyTransformation(matrix, translationMatrix, new Cesium.Matrix4())


//   // 旋转模型
//   const mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(options.rotation.x))
//   const my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(options.rotation.y))
//   const mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(options.rotation.z))
//   const rotationX = Cesium.Matrix4.fromRotationTranslation(mx)
//   const rotationY = Cesium.Matrix4.fromRotationTranslation(my)
//   const rotationZ = Cesium.Matrix4.fromRotationTranslation(mz)
//   Cesium.Matrix4.multiply(matrix, rotationX, matrix)
//   Cesium.Matrix4.multiply(matrix, rotationY, matrix)
//   Cesium.Matrix4.multiply(matrix, rotationZ, matrix)

//   tileset._root.transform = matrix
// }
