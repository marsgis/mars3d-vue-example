var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      // 此处参数会覆盖config.json中的对应配置
      center: { lat: 31.688428, lng: 117.118323, alt: 10375, heading: 29, pitch: -30 }
    },
    control: {
      animation: true, // 是否创建动画小器件，左下角仪表
      timeline: true, // 是否显示时间线控件
      compass: { top: "10px", left: "5px" }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 因为animation面板遮盖，修改底部bottom值
  const toolbar = document.getElementsByClassName("cesium-viewer-toolbar")[0]
  toolbar.style.bottom = "110px"
  map.clock.multiplier = 1

  // 创建矢量数据图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 绑定点击事件
  graphicLayer.on(mars3d.EventType.click, (event, position) => {
    console.log("单击了漫游路线", event)
  })

  var arrLine = [
    {
      id: "1",
      name: "A01",
      speed: 100,
      positions: [
        [117.298794, 31.882442, 500],
        [117.249731, 31.88091, 600]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "cylinder",
          color: "#ff0000"
        }
      ]
    },
    {
      id: "2",
      name: "A02",
      speed: 100,
      positions: [
        [117.244308, 31.876828, 900],
        [117.246598, 31.815902, 900]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "wall"
        }
      ]
    },
    {
      id: "3",
      name: "A03",
      speed: 100,
      positions: [
        [117.160928, 31.82166, 400],
        [117.18824, 31.811822, 400],
        [117.227675, 31.790077, 400],
        [117.279938, 31.797397, 400]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "cylinder"
        }
      ]
    },
    {
      id: "4",
      name: "A04",
      speed: 100,
      positions: [
        [117.24595, 31.843448, 800],
        [117.184863, 31.841885, 800]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "wall",
          color: "#a8009d"
        }
      ]
    },
    {
      id: "5",
      name: "A05",
      speed: 100,
      positions: [
        [117.281458, 31.873736, 1000],
        [117.280849, 31.679814, 1000]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "cylinder",
          color: "#ffff00"
        }
      ]
    },
    {
      id: "6",
      name: "A06",
      speed: 100,
      positions: [
        [117.259156, 31.831094, 600],
        [117.22723, 31.791011, 700],
        [117.190839, 31.751602, 1000]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "wall",
          color: "#ffff00"
        }
      ]
    },
    {
      id: "7",
      name: "A07",
      speed: 100,
      positions: [
        [117.224735, 31.868128, 500],
        [117.226971, 31.810324, 500]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "cylinder",
          color: "#0047d4"
        }
      ]
    },
    {
      id: "8",
      name: "A08",
      speed: 100,
      positions: [
        [117.169828, 31.83365, 900],
        [117.189117, 31.83417, 900],
        [117.211684, 31.83573, 900],
        [117.232588, 31.833755, 900]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "wall",
          color: "#d9d900"
        }
      ]
    },
    {
      id: "9",
      name: "A09",
      positions: [
        [117.189192, 31.856163, 100],
        [117.188899, 31.818951, 100]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/zhanji.glb",
        scale: 0.01,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "cylinder",
          color: "#00b0cf"
        }
      ]
    },
    {
      id: "10",
      name: "A10",
      speed: 200,
      positions: [
        [117.163332, 31.853159, 1000],
        [117.181507, 31.853928, 1000],
        [117.210678, 31.858777, 1000],
        [117.232448, 31.853065, 1000]
      ],
      model: {
        show: true,
        url: "//data.mars3d.cn/gltf/mars/MQ-9-Predator.glb",
        scale: 1,
        minimumPixelSize: 60
      },
      path: {
        show: true,
        color: "#ffff00",
        opacity: 0.5,
        width: 1,
        isAll: false
      },
      shadow: [
        {
          show: true,
          type: "wall",
          color: "#ff0000"
        }
      ]
    }
  ]

  for (var i = 0, len = arrLine.length; i < len; i++) {
    var flydata = arrLine[i]

    flydata.label = {
      show: true,
      font_size: 20,
      pixelOffsetX: 0,
      pixelOffsetY: -20,
      scaleByDistance: true,
      scaleByDistance_far: 80000,
      scaleByDistance_farValue: 0.4,
      distanceDisplayCondition: true,
      distanceDisplayCondition_far: 80000
    }
    flydata.model = {
      ...flydata.model,
      distanceDisplayCondition: true,
      distanceDisplayCondition_near: 0,
      distanceDisplayCondition_far: 80000
    }
    // 当视角距离超过80000米(distanceDisplayCondition_far定义的) 后显示为点对象的样式
    flydata.point = {
      show: true,
      color: "#ffff00",
      pixelSize: 5,
      distanceDisplayCondition: true,
      distanceDisplayCondition_near: 80000,
      distanceDisplayCondition_far: Number.MAX_VALUE
    }
    // flydata.forwardExtrapolationType = Cesium.ExtrapolationType.NONE;

    var roamLine = new mars3d.graphic.RoamLine(flydata)
    graphicLayer.addGraphic(roamLine)

    // 启动漫游
    roamLine.start()
  }
}
