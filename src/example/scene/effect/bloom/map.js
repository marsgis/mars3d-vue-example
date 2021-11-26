var map
var bloomEffect

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.825314, lng: 117.242517, alt: 3195, heading: 29, pitch: -39 }
    },
    layers: [
      {
        type: "geojson",
        name: "道路线",
        url: "//data.mars3d.cn/file/geojson/hefei-road.json",
        symbol: {
          styleOptions: {
            materialType: "PolylineGlow",
            glowPower: 0.2,
            color: "#FF4500",
            width: 12,
            opacity: 0.8
          }
        },
        popup: "{name}",
        show: true
      },
      {
        type: "geojson",
        name: "河流(面状)",
        url: "//data.mars3d.cn/file/geojson/hefei-water.json",
        symbol: {
          type: "waterCombine",
          styleOptions: {
            normalMap: "img/textures/waterNormals.jpg", // 水正常扰动的法线图
            frequency: 5000.0, // 控制波数的数字。
            animationSpeed: 0.05, // 控制水的动画速度的数字。
            amplitude: 9.0, // 控制水波振幅的数字。
            specularIntensity: 0.8, // 控制镜面反射强度的数字。
            baseWaterColor: "#00baff", // rgba颜色对象基础颜色的水。#00ffff,#00baff,#006ab4
            blendColor: "#00baff" // 从水中混合到非水域时使用的rgba颜色对象。
            // clampToGround: true,
          }
        },
        popup: "{name}",
        show: true
      }
    ]
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  map.basemap = 2017 // 切换至蓝色底图

  // 添加参考三维模型
  var tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "合肥市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    marsJzwStyle: true, // 打开建筑物特效（内置Shader代码）
    highlight: { type: "click", color: "#FFFF00" },
    popup: [
      { field: "objectid", name: "编号" },
      { field: "name", name: "名称" },
      { field: "height", name: "楼高", unit: "米" }
    ]
  })
  map.addLayer(tiles3dLayer)

  // 构造效果
  bloomEffect = new mars3d.effect.BloomEffect()
  map.addEffect(bloomEffect)
}

// 是否开始泛光效果
function bindShowEffect(val) {
  bloomEffect.enabled = val
}
// 修改对应参数
function txt_contrast(val) {
  if (val) {
    bloomEffect.contrast = val
  }
}
function txt_brightness(val) {
  if (val) {
    bloomEffect.brightness = val
  }
}
function txt_delta(val) {
  if (val) {
    bloomEffect.delta = val
  }
}
function txt_stepSize(val) {
  if (val) {
    bloomEffect.stepSize = val
  }
}
function txt_sigma(val) {
  if (val) {
    bloomEffect.sigma = val
  }
}
