import * as mars3d from "mars3d"

let map // mars3d.Map三维地图对象

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 30.402686, lng: 116.303632, alt: 48692, heading: 3, pitch: -43 }
  }
}

/**
 * 初始化地图业务，生命周期钩子函数（必须）
 * 框架在地图初始化完成后自动调用该函数
 * @param {mars3d.Map} mapInstance 地图对象
 * @returns {void} 无
 */
export function onMounted(mapInstance) {
  map = mapInstance // 记录首次创建的map
  showDraw()
}

/**
 * 释放当前地图业务的生命周期函数
 * @returns {void} 无
 */
export function onUnmounted() {
  map = null
}

let geoJsonLayer
function removeLayer() {
  if (geoJsonLayer) {
    map.removeLayer(geoJsonLayer, true)
    geoJsonLayer = null
  }
}

/**
 * 平台通过draw标绘后保存的geojosn数据（已经内置style了，无需配置symbol）
 *
 * @export showDraw
 * @param {boolean} isFlyTo 布尔值
 * @returns {void}
 */
export function showDraw(isFlyTo) {
  removeLayer()

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "标绘示例数据",
    url: "//data.mars3d.cn/file/geojson/mars3d-draw.json",
    popup: "{type} {name}",
    queryParameters: {
      token: "mars3d" // 可以传自定义url参数，如token等
    },
    symbol: {
      merge: true,
      styleOptions: {
        // 高亮时的样式
        highlight: {
          type: "click",
          opacity: 0.9
        }
      }
    },
    flyTo: isFlyTo
  })
  map.addLayer(geoJsonLayer)


  // load事件,必须在load完成前绑定才能监听
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    if (event.layer) {
      console.log("数据加载完成", event)
    }
  })

  setTimeout(() => {
    // readyPromise是可以load加载数据完成后去获取
    geoJsonLayer.readyPromise.then(function (layer) {
      console.log("readyPromise:数据加载完成", layer)
    })
  }, 5000)

  // 单击事件
  geoJsonLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

/**
 * 点数据
 *
 * @export showPoint
 * @returns {void}
 */
export function showPoint() {
  removeLayer()

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "体育设施点",
    url: "//data.mars3d.cn/file/geojson/hfty-point.json",
    symbol: {
      styleOptions: {
        image: "img/marker/mark1.png",
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        scale: 1,
        scaleByDistance: true,
        scaleByDistance_far: 20000,
        scaleByDistance_farValue: 0.5,
        scaleByDistance_near: 1000,
        scaleByDistance_nearValue: 1,
        // setHeight: 5000, //指定高度
        label: {
          text: "{项目名称}",
          font_size: 25,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          pixelOffsetY: -25,
          scaleByDistance: true,
          scaleByDistance_far: 80000,
          scaleByDistance_farValue: 0.5,
          scaleByDistance_near: 1000,
          scaleByDistance_nearValue: 1,
          distanceDisplayCondition: true,
          distanceDisplayCondition_far: 80000,
          distanceDisplayCondition_near: 0
        }
      }
    },
    popup: [
      { field: "项目名称", name: "项目名称" },
      { field: "建设性质", name: "建设性质" },
      { field: "设施级别", name: "设施级别" },
      { field: "所属区县", name: "所属区县" },
      { field: "建筑内容及", name: "建筑内容" },
      { field: "新增用地（", name: "新增用地" },
      { field: "开工", name: "开工" },
      { field: "总投资（万", name: "总投资" },
      { field: "资金来源", name: "资金来源" },
      { field: "初步选址", name: "初步选址" },
      { field: "设施类型", name: "设施类型" },
      { field: "设施等级", name: "设施等级" },
      { field: "所在区县", name: "所在区县" },
      { field: "具体位置", name: "具体位置" },
      { field: "建设内容（", name: "建设内容" },
      { field: "用地面积（", name: "用地面积", format: "mars3d.MeasureUtil.formatArea" },
      { field: "设施规模（", name: "设施规模" },
      { field: "举办者类型", name: "举办者类型" },
      { field: "开工时间", name: "开工时间" },
      { field: "总投资额（", name: "总投资额", unit: "亿元" },
      { field: "项目推进主", name: "项目推进主体" },
      { field: "项目进度", name: "项目进度" },
      { field: "项目来源", name: "项目来源" },
      { field: "备注", name: "备注" }
    ],
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  geoJsonLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

/**
 * 显示线数据
 *
 * @export showChinaLine
 * @returns {void}
 */
export function showChinaLine() {
  removeLayer()

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "全国省界",
    url: "//data.mars3d.cn/file/geojson/areas/100000_full.json",
    symbol: {
      type: "polylineCombine",
      styleOptions: {
        width: 2,
        material: mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
          color: "#00ffff",
          image: "img/textures/fenceline.png",
          speed: 10,
          repeat_x: 10
        }),
        label: {
          text: "{name}",
          font_size: 30,
          color: "#ffffff",
          outline: true,
          outlineColor: "#000000",
          scaleByDistance: true,
          scaleByDistance_far: 60000000,
          scaleByDistance_farValue: 0.2,
          scaleByDistance_near: 1000000,
          scaleByDistance_nearValue: 1,
          distanceDisplayCondition: true,
          distanceDisplayCondition_far: 12000000,
          distanceDisplayCondition_near: 0,

          position: "{center}", // 省会位置center
          setHeight: 10000
        }
      }
    },
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
}

/**
 * 显示合肥区域面
 *
 * @export showRegion
 * @returns {void}
 */
export function showRegion() {
  removeLayer()

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "合肥市",
    url: "//data.mars3d.cn/file/geojson/areas/340100_full.json",
    symbol: {
      styleOptions: {
        fill: true,
        randomColor: true, // 随机色
        opacity: 0.3,
        outline: true,
        outlineStyle: {
          color: "#FED976",
          width: 3,
          opacity: 1
        },
        // 高亮时的样式
        highlight: {
          opacity: 0.9
        },
        label: {
          // 面中心点，显示文字的配置
          text: "{name}", // 对应的属性名称
          opacity: 1,
          font_size: 40,
          color: "#ffffff",

          font_family: "楷体",
          outline: true,
          outlineColor: "#000000",
          outlineWidth: 3,

          background: false,
          backgroundColor: "#000000",
          backgroundOpacity: 0.1,

          font_weight: "normal",
          font_style: "normal",

          scaleByDistance: true,
          scaleByDistance_far: 20000000,
          scaleByDistance_farValue: 0.1,
          scaleByDistance_near: 1000,
          scaleByDistance_nearValue: 1,

          distanceDisplayCondition: false,
          distanceDisplayCondition_far: 10000,
          distanceDisplayCondition_near: 0,
          visibleDepth: false
        }
      }
    },
    popup: "{name}",
    // "tooltip": "{name}",
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  geoJsonLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

/**
 * 立体建筑物
 *
 * @export showBuilding
 * @returns {void}
 */
export function showBuilding() {
  removeLayer()

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "建筑物面",
    url: "//data.mars3d.cn/file/geojson/buildings-demo.json",
    symbol: {
      styleOptions: {
        color: "#0d3685",
        outlineColor: "#0d3685",
        opacity: 0.8
      },
      callback: function (attr, styleOpt) {
        const diffHeight = Number(attr.floors || 1) * Number(attr.flo_height)
        return { height: 0, diffHeight: diffHeight }
      }
    },
    center: { lat: 31.928659, lng: 120.420654, alt: 838, heading: 344, pitch: -42 },
    popup: "all",
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
}

/**
 *  分层分户立体建筑物
 *
 * @export showFloor
 * @returns {void}
 */
export function showFloor() {
  removeLayer()

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "分层分户建筑物面",
    url: "//data.mars3d.cn/file/geojson/huxing.json",
    symbol: {
      styleOptions: {
        color: "#ffffff",
        opacity: 0.2,
        outline: true,
        outlineColor: "#63AEFF",
        outlineOpacity: 0.3,

        highlight: {
          type: "click",
          color: "#00ffff",
          opacity: 0.6
        }
      },
      callback: function (attr, styleOpt) {
        const flrH = attr.floorh || 0 // 底面高度
        const lyrH = attr.layerh || 0 // 楼层高度

        return { height: flrH, diffHeight: lyrH }
      }
    },
    // popup: "all",
    center: { lat: 31.821524, lng: 117.179329, alt: 255, heading: 25, pitch: -48 },
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
}

/**
 * 显示面数据（安徽行政区划），鼠标高亮处理
 *
 * @export showPlanningSurface
 * @returns {void}
 */
export function showPlanningSurface() {
  removeLayer()

  map.setCameraView({ lat: 31.591382, lng: 120.718945, alt: 784, heading: 279, pitch: -67 })

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    id: 1987,
    name: "用地规划",
    url: "//data.mars3d.cn/file/geojson/guihua.json",
    symbol: {
      type: "polygonCombine",
      styleOptions: {
        opacity: 0.6,
        color: "#0000FF"
      },
      styleField: "类型",
      styleFieldOptions: {
        一类居住用地: { color: "#FFDF7F" },
        二类居住用地: { color: "#FFFF00" },
        社区服务用地: { color: "#FF6A38" },
        幼托用地: { color: "#FF6A38" },
        商住混合用地: { color: "#FF850A" },
        行政办公用地: { color: "#FF00FF" },
        文化设施用地: { color: "#FF00FF" },
        小学用地: { color: "#FF7FFF" },
        初中用地: { color: "#FF7FFF" },
        体育场用地: { color: "#00A57C" },
        医院用地: { color: "#A5527C" },
        社会福利用地: { color: "#FF7F9F" },
        商业用地: { color: "#FF0000" },
        商务用地: { color: "#7F0000" },
        营业网点用地: { color: "#FF7F7F" },
        一类工业用地: { color: "#A57C52" },
        社会停车场用地: { color: "#C0C0C0" },
        通信用地: { color: "#007CA5" },
        排水用地: { color: "#00BFFF" },
        公园绿地: { color: "#00FF00" },
        防护绿地: { color: "#007F00" },
        河流水域: { color: "#7FFFFF" },
        配建停车场: { color: "#ffffff" },
        道路用地: { color: "#ffffff" }
      }
    },
    popup: "类型:{类型}"
    // flyTo: true,
  })
  map.addLayer(geoJsonLayer)

  // 下面代码演示如果再config.json中配置的图层，如何绑定额外事件方法
  // 绑定config.json中对应图层配置的"id"值图层的单击事件（比如下面是id:1987对应图层）
  const layerTest = map.getLayer(1987, "id")
  // 绑定事件
  layerTest.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })

  layerTest.on(mars3d.EventType.click, function (event) {
    // 单击事件
    console.log("单击了图层", event)
  })
}

/**
 * 行政区划 ，转为wall显示
 *
 * @export  showBoundaryWall
 * @returns {void}
 */
export function showBoundaryWall() {
  removeLayer()

  map.setCameraView({ lat: 30.561661, lng: 117.663884, alt: 113078, heading: 346, pitch: -43 })

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "合肥市",
    url: "//data.mars3d.cn/file/geojson/areas/340100_full.json",
    symbol: {
      type: "wall",
      styleOptions: {
        diffHeight: 5000, // 墙高
        materialType: mars3d.MaterialType.LineFlow,
        speed: 10, // 速度
        image: "img/textures/fence.png", // 图片
        repeatX: 1, // 重复数量
        axisY: true, // 竖直方向
        color: "#00ffff", // 颜色
        opacity: 0.6, // 透明度
        // 高亮时的样式
        highlight: {
          type: "click",
          color: "#ffff00"
        }
      }
    },
    popup: "{name}"
    // "tooltip": "{name}",
    // flyTo: true,
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  geoJsonLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}

/**
 * 显示特殊面数据（单体化）
 *
 * @export showMonomer
 * @returns {void}
 */
let tilesetLayer
export function showMonomer() {
  removeLayer()

  // 三维模型
  if (!tilesetLayer) {
    tilesetLayer = new mars3d.layer.TilesetLayer({
      name: "文庙",
      type: "3dtiles",
      url: "//data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
      position: { alt: 80.6 },
      maximumScreenSpaceError: 1,
      maximumMemoryUsage: 1024,
      show: true
    })
    map.addLayer(tilesetLayer)
  }

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "文庙-单体化",
    url: " //data.mars3d.cn/file/geojson/dth-wm.json",
    symbol: {
      type: "polygonP",
      styleOptions: {
        // 单体化默认显示样式
        color: "rgba(255, 255, 255, 0.01)",
        clampToGround: true,
        classification: true,
        // 单体化鼠标移入或单击后高亮的样式
        highlight: {
          // type: mars3d.EventType.click,
          color: "rgba(255,255,0,0.4)"
        }
      }
    },
    popup: [
      { field: "name", name: "房屋名称" },
      { field: "jznf", name: "建造年份" },
      { field: "ssdw", name: "所属单位" },
      { field: "remark", name: "备注信息" }
    ],
    center: { lat: 33.589442, lng: 119.031613, alt: 254, heading: 5, pitch: -37 },
    flyTo: true
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
}

/**
 * 显示世界各国
 *
 * @export showWorld
 * @returns {void}
 */
export function showWorld() {
  removeLayer()

  map.setCameraView({ lat: 22.564341, lng: 89.44688, alt: 10817167, heading: 356, pitch: -87 })

  geoJsonLayer = new mars3d.layer.GeoJsonLayer({
    name: "国界线",
    url: "//data.mars3d.cn/file/geojson/world.json",
    symbol: {
      type: "polygonP",
      styleOptions: {
        fill: true,
        // color: '#ffffff',
        // opacity: 0.01,
        randomColor: true,
        opacity: 0.5,

        // 高亮时的样式
        highlight: {
          type: "click",
          color: "#ffff00"
        }
      },
      styleField: "name",
      styleFieldOptions: {
        Russia: { clampToGround: true }
      }
    },
    popup: "{name} {name_cn}"
  })
  map.addLayer(geoJsonLayer)

  // 绑定事件
  geoJsonLayer.on(mars3d.EventType.load, function (event) {
    console.log("数据加载完成", event)
  })
  geoJsonLayer.on(mars3d.EventType.click, function (event) {
    console.log("单击了图层", event)
  })
}
