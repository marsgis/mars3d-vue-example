// 需要将下面的  data.mars3d.cn 改为本地实际发布的IP地址,如 192.168.0.115/mars3d-data

import * as mars3d from "mars3d"

export let map // mars3d.Map三维地图对象

// 表示缩小和放大瓦片数据的过滤方式。默认值为LINEAR线性结构，大部分地图调整为最近方式过滤能够有效提升地图清晰度。
// Cesium.ImageryLayer.DEFAULT_MINIFICATION_FILTER = Cesium.TextureMinificationFilter.NEAREST
// Cesium.ImageryLayer.DEFAULT_MAGNIFICATION_FILTER = Cesium.TextureMinificationFilter.NEAREST

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    center: { lat: 25.598554, lng: 101.908933, alt: 16767550.2, heading: 357.4, pitch: -89 },
    mapProjection: "EPSG:3857", // 2D模式下避免瓦片拉伸
    fxaa: true, // 是否开启抗锯齿
    resolutionScale: 2.0, // 提示注记层清晰度
    highDynamicRange: false // 避免瓦片太暗
  },
  terrain: {
    url: "https://data.mars3d.cn/terrain",
    show: true
  },
  basemaps: [
    { id: 10, name: "地图底图", type: "group" },
    {
      pid: 10,
      name: "影像地图",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_img.png",
      type: "xyz",
      url: "https://data.mars3d.cn/tile/img/{z}/{x}/{y}.jpg",
      chinaCRS: mars3d.ChinaCRS.GCJ02,
      minimumLevel: 0,
      maximumLevel: 13,
      show: true
    },
    {
      pid: 10,
      name: "电子地图",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_vec.png",
      type: "xyz",
      url: "https://data.mars3d.cn/tile/vec/{z}/{x}/{y}.png",
      chinaCRS: "GCJ02",
      minimumLevel: 0,
      maximumLevel: 13
    },
    {
      name: "蓝色底图",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/my_blue.png",
      type: "xyz",
      url: "https://data.mars3d.cn/tile/vec/{z}/{x}/{y}.png",
      chinaCRS: "GCJ02",
      invertColor: true,
      filterColor: "#4e70a6",
      brightness: 0.6,
      contrast: 1.8,
      gamma: 0.3,
      hue: 1,
      saturation: 0
    },
    {
      pid: 10,
      name: "单张图片",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/offline.png",
      type: "image",
      url: "https://data.mars3d.cn/img/map/world/world.jpg"
    },
    {
      id: 2023,
      pid: 10,
      name: "无底图",
      icon: "https://data.mars3d.cn/img/thumbnail/basemap/null.png",
      type: "grid",
      color: "#ffffff",
      alpha: 0.03,
      cells: 2
    }
  ],
  layers: [
    { id: 50, name: "辅助图层", type: "group" },
    { pid: 50, type: "graticule", name: "经纬网" },

    { id: 40, name: "栅格数据", type: "group" },
    { id: 4030, pid: 40, name: "ArcGIS 瓦片", type: "group" },
    {
      pid: 4030,
      name: "合肥规划图",
      type: "arcgis_cache",
      url: "https://data.mars3d.cn/arcgis_cache/hfgh/_alllayers/{z}/{y}/{x}.png",
      minimumLevel: 1,
      maximumLevel: 17,
      minimumTerrainLevel: 1,
      maximumTerrainLevel: 17,
      rectangle: { xmin: 116.846, xmax: 117.642, ymin: 31.533, ymax: 32.185 }
    },

    { id: 30, name: "矢量数据", type: "group" },
    { id: 3030, pid: 30, name: "GeoJSON数据", type: "group" },
    {
      id: 303011,
      pid: 3030,
      type: "geojson",
      name: "平台标绘",
      url: "https://data.mars3d.cn/file/geojson/mars3d-draw.json",
      popup: "{type}{name}",
      show: false,
      flyTo: true
    },
    {
      pid: 3030,
      type: "geojson",
      name: "用地规划",
      url: "https://data.mars3d.cn/file/geojson/guihua.json",
      symbol: {
        styleOptions: { opacity: 0.6, color: "#0000FF", width: 3, clampToGround: true },
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
      popup: "{类型}",
      show: false,
      flyTo: true
    },
    {
      pid: 3030,
      type: "geojson",
      name: "建筑物面",
      url: "https://data.mars3d.cn/file/geojson/buildings-demo.json",
      symbol: { styleOptions: { color: "#0d3685", outlineColor: "#0d3685", opacity: 0.8 } },
      buildings: { cloumn: "floors", height: "flo_height" },
      popup: "all",
      flyTo: true,
      flyToOptions: { minHeight: 2000 }
    },
    {
      pid: 3030,
      type: "geojson",
      name: "安徽各市",
      url: "https://data.mars3d.cn/file/geojson/areas/340000_full.json",
      symbol: {
        type: "polygon",
        styleOptions: {
          materialType: "PolyGradient",
          materialOptions: {
            color: "rgb(15,176,255)",
            opacity: 0.7,
            alphaPower: 1.3
          },
          label: {
            text: "{name}",
            opacity: 1,
            font_size: 25,
            color: "#ffffff",
            outline: true,
            outlineColor: "#000000",
            outlineWidth: 3,
            scaleByDistance: true,
            scaleByDistance_far: 2743804,
            scaleByDistance_farValue: 0.3,
            scaleByDistance_near: 10000,
            scaleByDistance_nearValue: 1,
            distanceDisplayCondition: true,
            distanceDisplayCondition_far: 2743804,
            distanceDisplayCondition_near: 0
          }
        }
      },
      popup: "{name}",
      show: false,
      flyTo: true
    },
    {
      pid: 3030,
      type: "geojson",
      name: "中国省界",
      url: "https://data.mars3d.cn/file/geojson/areas/100000_full.json",
      symbol: {
        type: "polylineP",
        styleOptions: {
          color: "#ffffff",
          width: 2,
          opacity: 0.8,
          label: {
            text: "{name}",
            position: "center",
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
            distanceDisplayCondition_near: 0
          }
        }
      },
      show: false,
      flyTo: true
    },
    {
      pid: 3030,
      type: "geojson",
      name: "西藏垭口",
      url: "https://data.mars3d.cn/file/geojson/xizangyakou.json",
      symbol: {
        styleOptions: {
          image: "https://data.mars3d.cn/img/marker/mark-red.png",
          scaleByDistance: true,
          scaleByDistance_far: 5000000,
          scaleByDistance_farValue: 0.5,
          scaleByDistance_near: 1000,
          scaleByDistance_nearValue: 1,
          verticalOrigin: 1,
          horizontalOrigin: 0,
          clampToGround: true,
          label: {
            text: "{NAME}",
            font_size: 25,
            color: "#ffff00",
            font_family: "微软雅黑",
            outline: true,
            outlineColor: "#000000",
            pixelOffsetY: -40,
            scaleByDistance: true,
            scaleByDistance_far: 1000000,
            scaleByDistance_farValue: 0.5,
            scaleByDistance_near: 1000,
            scaleByDistance_nearValue: 1,
            distanceDisplayCondition: true,
            distanceDisplayCondition_far: 1000000,
            distanceDisplayCondition_near: 0,
            visibleDepth: true
          }
        }
      },
      popup: [
        { field: "NAME", name: "名称" },
        { type: "details", callback: "showPopupDetails", field: "图片", className: "mars3d-popup-btn-custom" }
      ],
      show: false,
      flyTo: true
    },
    {
      pid: 3030,
      type: "geojson",
      name: "体育设施点",
      url: "https://data.mars3d.cn/file/geojson/hfty-point.json",
      symbol: {
        styleOptions: {
          image: "https://data.mars3d.cn/img/marker/mark-red.png",
          scale: 1,
          scaleByDistance: true,
          scaleByDistance_far: 20000,
          scaleByDistance_farValue: 0.5,
          scaleByDistance_near: 1000,
          scaleByDistance_nearValue: 1,
          verticalOrigin: 1,
          horizontalOrigin: 0,
          clampToGround: true,
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
      show: false,
      flyTo: true
    },

    { id: 3060, pid: 30, name: "CZML数据", type: "group" },
    {
      id: 306010,
      pid: 3060,
      type: "czml",
      name: "汽车",
      url: "https://data.mars3d.cn/file/czml/car.czml",
      center: { lat: 40.894745, lng: 121.920252, alt: 904, heading: 64, pitch: -67 },
      radio: true,
      flyTo: true
    },
    {
      id: 306011,
      pid: 3060,
      type: "czml",
      name: "卫星轨道",
      url: "https://data.mars3d.cn/file/czml/satellite-simple.czml",
      popup: "all",
      radio: true,
      flyTo: true
    },
    { id: 3050, pid: 30, name: "KML数据", type: "group" },
    { pid: 3050, type: "kml", name: "海上安全警告", url: "https://data.mars3d.cn/file/kml/NAVWARN.kmz", popup: "all" },
    {
      pid: 3050,
      type: "kml",
      name: "国境线",
      url: "https://data.mars3d.cn/file/kml/countryboundary.kml",
      symbol: { styleOptions: { color: "#FED976", width: 2 } }
    },
    {
      pid: 3050,
      type: "kml",
      name: "省界线",
      url: "https://data.mars3d.cn/file/kml/province.kml",
      symbol: { styleOptions: { color: "#00FF00", width: 2 } }
    },
    { id: 20, name: "三维模型", type: "group" },
    { id: 2010, pid: 20, name: "gltf模型", type: "group" },
    {
      pid: 2010,
      type: "graphic",
      name: "风力发电机",
      data: [
        {
          type: "modelP",
          position: [117.219071, 31.828783, 39.87],
          style: {
            url: "https://data.mars3d.cn/gltf/mars/fengche.gltf",
            scale: 50,
            heading: -93
          }
        }
      ],
      popup: "示例信息，这是一个风力发电机",
      center: { lat: 31.821083, lng: 117.21832, alt: 832.64, heading: 2.3, pitch: -39.2 }
    },
    {
      pid: 2010,
      type: "graphic",
      name: "警车",
      data: [
        {
          type: "modelP",
          position: [117.217458, 31.815349, 35.03],
          style: {
            url: "https://data.mars3d.cn/gltf/mars/jingche/jingche.gltf",
            scale: 2,
            heading: -95,
            clampToGround: true
          }
        }
      ],
      center: { lat: 31.815363, lng: 117.215958, alt: 107.35, heading: 90.7, pitch: -26.1 }
    },
    { id: 2040, pid: 20, name: "城市白模", type: "group" },
    {
      id: 204011,
      pid: 2040,
      type: "3dtiles",
      name: "合肥市区",
      url: "https://data.mars3d.cn/3dtiles/jzw-hefei/tileset.json",
      maximumScreenSpaceError: 1,
      style: {
        color: {
          conditions: [["true", "color('rgba(42, 160, 224, 1)')"]]
        }
      },
      marsJzwStyle: true,
      highlight: { type: "click", color: "#FFFF00" },
      popup: [
        { field: "objectid", name: "编号" },
        { field: "name", name: "名称" },
        { field: "height", name: "楼高", unit: "米" }
      ],
      center: { lat: 31.786281, lng: 117.223716, alt: 3718, heading: 2, pitch: -45 }
    },
    {
      pid: 2040,
      type: "3dtiles",
      name: "合肥市区-带贴图",
      url: "https://data.mars3d.cn/3dtiles/jzw-hefei-cz/tileset.json",
      maximumScreenSpaceError: 1,
      marsJzwStyle: true,
      highlight: { type: "click", color: "#FFFF00" },
      popup: [
        { field: "objectid", name: "编号" },
        { field: "remark", name: "名称" },
        { field: "height", name: "楼高", unit: "米" }
      ],
      center: { lat: 31.786281, lng: 117.223716, alt: 3718, heading: 2, pitch: -45 }
    },
    {
      id: 204012,
      pid: 2040,
      type: "3dtiles",
      name: "上海市区",
      url: "https://data.mars3d.cn/3dtiles/jzw-shanghai/tileset.json",
      maximumScreenSpaceError: 4,
      style: {
        color: {
          conditions: [
            ["${floor} >= 200", "rgba(45, 0, 75, 0.5)"],
            ["${floor} >= 100", "rgb(170, 162, 204)"],
            ["${floor} >= 50", "rgb(224, 226, 238)"],
            ["${floor} >= 25", "rgb(252, 230, 200)"],
            ["${floor} >= 10", "rgb(248, 176, 87)"],
            ["${floor} >= 5", "rgb(198, 106, 11)"],
            ["true", "rgb(127, 59, 8)"]
          ]
        }
      },
      highlight: { type: "click", color: "#FFFF00" },
      popup: [
        { field: "name", name: "名称" },
        { field: "floor", name: "楼层" }
      ],
      center: { lat: 31.257341, lng: 121.466139, alt: 2170.8, heading: 122.2, pitch: -31.8 }
    },

    { id: 2050, pid: 20, name: "点云", type: "group" },
    {
      id: 202016,
      pid: 2050,
      type: "3dtiles",
      name: "高压线塔杆",
      url: "https://data.mars3d.cn/3dtiles/pnts-ganta/tileset.json",
      maximumScreenSpaceError: 1,
      position: { alt: 31 },
      style: {
        color: {
          conditions: [
            ["(${Classification} >= 4) && (${Classification} < 5) ", "color('#DC143C')"],
            ["(${Classification} >= 7) && (${Classification} < 8)  ", "color('#7B68EE')"],
            ["(${Classification} >= 16) && (${Classification} < 17)  ", "color('#00CED1')"],
            ["(${Classification} >= 17) && (${Classification} < 18)  ", "color('#3CB371')"],
            ["(${Classification} >= 18) && (${Classification} < 19)  ", "color('#FFFF00')"],
            ["(${Classification} >= 19) && (${Classification} < 20)  ", "color('#FFA500')"],
            ["(${Classification} >= 20) && (${Classification} < 21)  ", "color('#FF6347')"]
          ]
        }
      },
      hasOpacity: false,
      center: { lat: 31.504746, lng: 118.264278, alt: 580, heading: 29, pitch: -49 }
    },
    { id: 2060, pid: 20, name: "BIM模型", type: "group" },
    {
      id: 20601121,
      pid: 2060,
      type: "3dtiles",
      name: "大学教学楼",
      url: "https://data.mars3d.cn/3dtiles/bim-daxue/tileset.json",
      position: { lng: 117.251229, lat: 31.844015, alt: 31.2 },
      highlight: { type: "click", color: "#FFFF00" },
      popup: "all",
      scenetree: "scenetree.json",
      center: { lat: 31.842516, lng: 117.25107, alt: 145, heading: 8, pitch: -39 }
    },
    {
      pid: 2060,
      type: "3dtiles",
      name: "轻轨地铁站",
      url: "https://data.mars3d.cn/3dtiles/bim-ditiezhan/tileset.json",
      position: { lng: 117.203994, lat: 31.857999, alt: 28.9 },
      rotation: { z: 168.1 },
      highlight: { type: "click", color: "#00FF00" },
      popup: "all",
      scenetree: "scenetree.json",
      center: { lat: 31.856125, lng: 117.204513, alt: 155, heading: 350, pitch: -31 }
    },
    {
      id: 206012,
      pid: 2060,
      type: "3dtiles",
      name: "桥梁",
      url: "https://data.mars3d.cn/3dtiles/bim-qiaoliang/tileset.json",
      position: { lng: 117.096906, lat: 31.851564, alt: 45 },
      rotation: { z: 17.5 },
      maximumScreenSpaceError: 16,
      skipLevelOfDetail: true,
      loadSiblings: true,
      cullRequestsWhileMoving: true,
      cullRequestsWhileMovingMultiplier: 10,
      preferLeaves: true,
      progressiveResolutionHeightFraction: 0.5,
      dynamicScreenSpaceError: true,
      preloadWhenHidden: true,
      center: { lat: 31.849357, lng: 117.099194, alt: 306.2, heading: 327.1, pitch: -30.9 },
      scenetree: "scenetree.json",
      highlight: { type: "click", color: "#00FF00" },
      popup: "all"
    },
    { id: 2020, pid: 20, name: "人工建模", type: "group" },
    {
      id: 202013,
      pid: 2020,
      type: "3dtiles",
      name: "地下管网",
      url: "https://data.mars3d.cn/3dtiles/max-piping/tileset.json",
      position: { lng: 117.215457, lat: 31.843363, alt: -3.6 },
      rotation: { z: 336.7 },
      maximumScreenSpaceError: 2,
      highlight: { type: "click", color: "#00FF00" },
      popup: "all",
      center: { lat: 31.838821, lng: 117.216402, alt: 461, heading: 0, pitch: -46 },
      msg: "演示数据，地下数据拖动时会在地面漂移"
    },
    {
      id: 202012,
      pid: 2020,
      type: "3dtiles",
      name: "石化工厂",
      url: "https://data.mars3d.cn/3dtiles/max-shihua/tileset.json",
      position: { lng: 117.077158, lat: 31.659116, alt: -2.0 },
      maximumScreenSpaceError: 1,
      highlight: { type: "click", color: "#00FF00" },
      popup: "all",
      scenetree: "scenetree.json",
      center: { lat: 31.654916, lng: 117.08278, alt: 279, heading: 316, pitch: -29 }
    },
    {
      id: 202030,
      pid: 2020,
      name: "水利闸门",
      type: "group",
      center: { lat: 29.794301, lng: 121.47998, alt: 262, heading: 191, pitch: -35 }
    },
    {
      pid: 202030,
      name: "闸门",
      type: "graphic",
      data: [
        {
          type: "modelP",
          position: [121.479813, 29.791278, 16],
          style: {
            url: "https://data.mars3d.cn/gltf/mars/zhamen.glb",
            heading: 105
          }
        }
      ],
      center: { lat: 29.791607, lng: 121.479925, alt: 27, heading: 198, pitch: -18 }
    },
    {
      id: 202011,
      pid: 202030,
      type: "3dtiles",
      name: "整体",
      url: "https://data.mars3d.cn/3dtiles/max-fsdzm/tileset.json",
      position: { alt: 15.2 },
      maximumScreenSpaceError: 1,
      center: { lat: 29.792675, lng: 121.480207, alt: 190.8, heading: 196.1, pitch: -49 }
    },
    { id: 2030, pid: 20, name: "倾斜摄影", type: "group" },
    {
      pid: 2030,
      type: "3dtiles",
      name: "大雁塔",
      url: "https://data.mars3d.cn/3dtiles/qx-dyt/tileset.json",
      position: { alt: -27 },
      maximumScreenSpaceError: 1,
      center: { lat: 34.215516, lng: 108.960251, alt: 834, heading: 4, pitch: -48 },
      flat: {
        enabled: true,
        editHeight: -24
      },
      flyTo: false,
      show: false
    },
    {
      pid: 2030,
      name: "校园(含单体)",
      type: "group",
      hasOpacity: true,
      center: { lat: 43.821193, lng: 125.143124, alt: 990, heading: 342, pitch: -50 },
      layers: [
        {
          type: "geojson",
          name: "校园-单体化",
          url: "https://data.mars3d.cn/file/geojson/dth-xuexiao-fd.json",
          symbol: {
            type: "polygonP",
            styleOptions: {
              color: "rgba(255, 255, 255, 0.01)",
              clampToGround: true,
              classification: true,
              buffer: 1,
              highlight: {
                type: "click",
                color: "rgba(255,255,0,0.4)"
              }
            }
          },
          popup: [
            { field: "name", name: "学校场所" },
            { field: "sfkf", name: "是否开放" },
            { field: "remark", name: "备注信息" }
          ]
        },
        {
          pid: 2030,
          type: "3dtiles",
          name: "校园",
          url: "https://data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",
          position: { alt: 279.0 },
          maximumScreenSpaceError: 1
        }
      ]
    },
    {
      id: 203014,
      pid: 2030,
      type: "3dtiles",
      name: "县城社区",
      url: "https://data.mars3d.cn/3dtiles/qx-shequ/tileset.json",
      position: { alt: 148.2 },
      maximumScreenSpaceError: 2,
      dynamicScreenSpaceError: true,
      cullWithChildrenBounds: false,
      center: { lat: 28.440864, lng: 119.486477, alt: 588.23, heading: 268.6, pitch: -37.8 },
      show: false,
      flyTo: false
    },
    {
      id: 203015,
      pid: 2030,
      name: "合肥天鹅湖",
      type: "3dtiles",
      url: "https://data.mars3d.cn/3dtiles/qx-teh/tileset.json",
      position: { lng: 117.218434, lat: 31.81807, alt: 163 },
      maximumScreenSpaceError: 16,
      maxMemory: 2048, // 最大缓存内存大小(MB)
      dynamicScreenSpaceError: true,
      cullWithChildrenBounds: false,
      skipLevelOfDetail: true,
      preferLeaves: true,
      center: { lat: 31.795308, lng: 117.21948, alt: 1820, heading: 0, pitch: -39 }
    },
    {
      id: 203013,
      pid: 2030,
      type: "geojson",
      name: "文庙-单体化",
      url: " //data.mars3d.cn/file/geojson/dth-wm.json",
      symbol: {
        type: "polygonP",
        styleOptions: {
          color: "rgba(255, 255, 255, 0.01)",
          clampToGround: true,
          classification: true,
          buffer: 1,
          highlight: {
            color: "rgba(255,255,0,0.4)"
          }
        }
      },
      popup: [
        { field: "name", name: "房屋名称" },
        { field: "jznf", name: "建造年份" },
        { field: "ssdw", name: "所属单位" },
        { field: "remark", name: "备注信息" }
      ]
    },
    {
      id: 203012,
      pid: 2030,
      type: "3dtiles",
      name: "文庙",
      url: "https://data.mars3d.cn/3dtiles/qx-simiao/tileset.json",
      position: { alt: 38.8 },
      maximumScreenSpaceError: 2,
      dynamicScreenSpaceError: true,
      cullWithChildrenBounds: false,
      skipLevelOfDetail: true,
      preferLeaves: true,
      center: { lat: 33.589536, lng: 119.032216, alt: 145.08, heading: 3.1, pitch: -22.9 }
    },
    { id: 99, name: "数据图层", type: "group" }
  ]
}
// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export function onMounted(mapInstance) {
  map = mapInstance
}

// 释放当前地图业务的生命周期函数,具体项目中时必须写onMounted的反向操作（如解绑事件、对象销毁、变量置空）
export function onUnmounted() {
  map = null
}
