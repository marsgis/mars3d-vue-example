
var map
var graphic
var waterLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 29.791718, lng: 121.479859, alt: 29, heading: 187, pitch: -14 }
    },
    layers: [
      {
        type: "3dtiles",
        name: "整体模型",
        url: "//data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",
        position: { alt: 15.2 },
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        show: true
      },
      {
        type: "geojson",
        name: "河流(面状)",
        url: "//data.mars3d.cn/file/geojson/hedao-nei.json",
        symbol: {
          type: "waterCombine",
          styleOptions: {
            height: 17, // 水面高度
            normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
            frequency: 8000.0, // 控制波数的数字。
            animationSpeed: 0.02, // 控制水的动画速度的数字。
            amplitude: 5.0, // 控制水波振幅的数字。
            specularIntensity: 0.8, // 控制镜面反射强度的数字。
            baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
            blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
            opacity: 0.4, // 透明度
            clampToGround: false // 是否贴地
          }
        },
        show: true
      }
    ]
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  waterLayer = new mars3d.layer.GeoJsonLayer({
    name: "河流(面状)",
    url: "//data.mars3d.cn/file/geojson/hedao-wai.json",
    symbol: {
      type: "waterCombine",
      styleOptions: {
        height: 16, // 水面高度
        normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
        frequency: 8000.0, // 控制波数的数字。
        animationSpeed: 0.02, // 控制水的动画速度的数字。
        amplitude: 5.0, // 控制水波振幅的数字。
        specularIntensity: 0.8, // 控制镜面反射强度的数字。
        baseWaterColor: "#006ab4", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
        blendColor: "#006ab4", // 从水中混合到非水域时使用的rgba颜色对象。
        opacity: 0.4, // 透明度
        clampToGround: false // 是否贴地
      }
    }
  })
  map.addLayer(waterLayer)


  // 绑定事件
  waterLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  waterLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了", event)
  })

  // 闸门的控制
  graphic = new mars3d.graphic.ModelEntity({
    name: "闸门",
    position: [121.479813, 29.791278, 16],
    style: {
      url: "//data.mars3d.cn/gltf/mars/zhamen.glb",
      heading: 105
    }
  })
  map.graphicLayer.addGraphic(graphic)
}

var minHeight = 16
var timeInv

// 高度更新
function updateHeight(height) {
  graphic.height = height // 阀门高度
  waterLayer.eachGraphic((graphic) => {
    graphic.updateHeight(height) // 水域高度变化
  })
}

// 开启阀门
function openZm(mi, time) {
  var thisHeight = minHeight // 当前高度
  var endHeight = mi + minHeight // 结束高度

  var step = time / 0.1 // 步长
  var stepHeight = (endHeight - thisHeight) / step // 每次阀门、水面上移高度

  // 再次点击"开启"时从当前位置开启
  updateHeight(thisHeight)

  clearInterval(timeInv)
  timeInv = setInterval(() => {
    thisHeight += stepHeight // 上移后的当前高度,相当于时实更新

    if (thisHeight >= endHeight) {
      thisHeight = endHeight
      clearInterval(timeInv) // 清除定时器,当前阀门的高度值等于结束时阀门的高度值时，停止上移，关闭定时器
    }
    updateHeight(thisHeight)
  }, 100)
}

// 关闭阀门
function closeZm(mi, time) {
  var thisHeight = mi + minHeight
  var endHeight = minHeight

  var step = time / 0.1
  var stepHeight = (endHeight - thisHeight) / step

  updateHeight(thisHeight)

  clearInterval(timeInv)
  timeInv = setInterval(() => {
    thisHeight += stepHeight

    if (thisHeight <= endHeight) {
      thisHeight = endHeight
      clearInterval(timeInv)
    }
    updateHeight(thisHeight)
  }, 100)
}
