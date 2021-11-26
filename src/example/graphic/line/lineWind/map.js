
var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 29.851048, lng: 117.477098, alt: 1294279, heading: 358, pitch: -87 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 加载气象
  mars3d.Resource.fetchJson({ url: "//data.mars3d.cn/file/apidemo/windpoint.json" })
  .then(function (res) {
    showWindLine(res.data)
  })
  .otherwise(function () {
    globalMsg("实时查询气象信息失败，请稍候再试")
  })
}

// 流场线
function showWindLine(arr) {
  // 创建Graphic图层
  var graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  graphicLayer.bindTooltip(function (event) {
    const attr = event.graphic?.attr
    if (!attr) {
      return false
    }
    return mars3d.Util.getTemplateHtml({ title: "线", template: "all", attr: attr })
  })

  var arrData = []
  var radius = 12000
  var lineMaterial = mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
    image: "img/textures/ArrowOpacity.png",
    color: "#00ff00",
    speed: 30
  })
  for (let i = 0, len = arr.length; i < len; i++) {
    const item = arr[i]

    var position = Cesium.Cartesian3.fromDegrees(item.x, item.y, 0)
    var angle = 180 - item.dir

    var pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, angle, radius)
    pt1 = mars3d.PointUtil.setPositionsHeight(pt1, 0)

    arrData.push({
      positions: [position, pt1],
      style: {
        width: 8,
        material: lineMaterial // 动画线材质
      },
      attr: item
    })
  }

  // 多个线对象的合并渲染。
  var primitive = new mars3d.graphic.PolylineCombine({
    instances: arrData
  })
  graphicLayer.addGraphic(primitive)
}

// 按单个线渲染，效率差些
// function showWindLine(arr) {
//   //创建Graphic图层
//   var graphicLayer = new mars3d.layer.GraphicLayer();
//   map.addLayer(graphicLayer);

//   var lineMaterial = mars3d.MaterialUtil.createMaterial(mars3d.MaterialType.LineFlow, {
//     image: "img/textures/ArrowOpacity.png",
//     color: "#00ff00",
//     speed: 30,
//   });

//   var radius = 12000;
//   for (let i = 0, len = arr.length; i < len; i++) {
//     const item = arr[i];

//     var position = Cesium.Cartesian3.fromDegrees(item.x, item.y, 0);
//     var angle = 180 - item.dir;

//     var pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, angle, radius);
//     pt1 = mars3d.PointUtil.setPositionsHeight(pt1, 0);

//     var primitive = new mars3d.graphic.PolylinePrimitive({
//       positions: [position, pt1],
//       style: {
//         width: 8,
//         material: lineMaterial, //动画线材质
//       },
//     });
//     primitive.bindPopup(`${angle}`);
//     graphicLayer.addGraphic(primitive);
//   }
// }
