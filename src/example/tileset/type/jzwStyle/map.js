var map
var tiles3dLayer
var brightnessEffect
var bloomEffect
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.868646, lng: 117.249678, alt: 1485, heading: 110, pitch: -40 }
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
            // clampToGround: true,
          }
        },
        popup: "{name}",
        zIndex: 20,
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
        zIndex: 10,
        show: true
      }
    ]
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  map.basemap = 2017 // 切换到蓝色底图

  map.scene.light = new Cesium.DirectionalLight({
    direction: map.scene.camera.direction
  })
  map.on(mars3d.EventType.cameraMoveEnd, function (event) {
    map.scene.light.direction = map.scene.camera.direction
  })

  bloomEffect = new mars3d.effect.BloomEffect({
    enabled: false
  })
  map.addEffect(bloomEffect)

  setStyle2()
}

function addbrightnessEffect(brightness) {
  brightnessEffect = new mars3d.effect.BrightnessEffect({
    enabled: true,
    brightness: brightness
  })
  map.addEffect(brightnessEffect)
}

function setStyle1() {
  if (tiles3dLayer) {
    tiles3dLayer.remove()
  }

  // 模型
  tiles3dLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "合肥市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    popup: [
      { field: "objectid", name: "编号" },
      { field: "name", name: "名称" },
      { field: "height", name: "楼高", unit: "米" }
    ]
  })
  map.addLayer(tiles3dLayer)
}

function setStyle2() {
  if (tiles3dLayer) {
    tiles3dLayer.remove()
  }

  // 自定义特效 Shader
  var fragmentShader = `
          // 注意shader中写浮点数是，一定要带小数点，否则会报错，比如0需要写成0.0，1要写成1.0
          float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
          float _heightRange = 80.0; // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange)
          float _glowRange = 100.0; // 光环的移动范围(高度)

          // 建筑基础色
          float mars_height = marsJzwHeight - _baseHeight;
          float mars_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
          float mars_a12 = mars_height / _heightRange + sin(mars_a11) * 0.1;
          gl_FragColor *= vec4(vec3(mars_a12), 1.0);// 渐变

          // 动态光环
          float time = fract(czm_frameNumber / 360.0);
          time = abs(time - 0.5) * 2.0;
          float mars_h = clamp(mars_height / _glowRange, 0.0, 1.0);
          float mars_diff = step(0.005, abs(mars_h - time));
          gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - mars_diff);
       `

  tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "合肥市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    // marsJzwStyle: true, //打开建筑物特效（内置Shader代码）
    marsJzwStyle: fragmentShader, // 字符串值时，表示使用该字符串定义的自定义Shader
    popup: [
      { field: "objectid", name: "编号" },
      { field: "name", name: "名称" },
      { field: "height", name: "楼高", unit: "米" }
    ]
  })
  map.addLayer(tiles3dLayer)
}

// 不改动cesium源码版本的建筑物样式
function setStyle3() {
  if (tiles3dLayer) {
    tiles3dLayer.remove()
  }

  const fsShader = `
              void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material)
              {
                vec4 position = czm_inverseModelView * vec4(fsInput.attributes.positionEC,1); // 位置

                // 注意shader中写浮点数是，一定要带小数点，否则会报错，比如0需要写成0.0，1要写成1.0
                float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
                float _heightRange = 80.0; // 高亮的范围(_baseHeight ~ _baseHeight + _heightRange)
                float _glowRange = 100.0; // 光环的移动范围(高度)

                // 建筑基础色
                float mars_height = position.z - _baseHeight;
                float mars_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                float mars_a12 = mars_height / _heightRange + sin(mars_a11) * 0.1;
                material.diffuse = vec3(0.0, 0.0, 1.0); // 颜色
                material.diffuse *= vec3(mars_a12);// 渐变

                // 动态光环
                float time = fract(czm_frameNumber / 360.0);
                time = abs(time - 0.5) * 2.0;
                float mars_h = clamp(mars_height / _glowRange, 0.0, 1.0);
                float mars_diff = step(0.005, abs(mars_h - time));
                material.diffuse += material.diffuse * (1.0 - mars_diff);
              } `

  tiles3dLayer = new mars3d.layer.TilesetLayer({
    name: "合肥市建筑物",
    url: "//data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024,
    customShader: new Cesium.CustomShader({
      lightingModel: Cesium.LightingModel.UNLIT,
      fragmentShaderText: fsShader
    }),
    popup: "all"
  })
  map.addLayer(tiles3dLayer)
}
// 颜色改变
function changeColor(color) {
  tiles3dLayer.style = new Cesium.Cesium3DTileStyle({
    color: {
      conditions: [["true", `color("${color}")`]]
    }
  })
}

// 开启泛光
function chkBloom(val) {
  bloomEffect.enabled = val
}

// 开启光照
function chkShadows(val) {
  map.viewer.shadows = val
  if (val) {
    setTimeout(function () {
      // 光照沿着相机方向
      map.scene.shadowMap._lightCamera = map.scene.camera
    }, 500)
  }
}

function chkBrightness(val) {
  brightnessEffect.enabled = val
}

function alphaChange(value) {
  brightnessEffect.brightness = value
}
