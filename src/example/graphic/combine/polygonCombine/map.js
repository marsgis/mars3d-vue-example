var map
var graphicLayer
function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.806147, lng: 117.236965, alt: 3307, heading: 359, pitch: -54 }
    },
    terrain: {
      show: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 创建Graphic图层
  graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    const pickedItem = event.pickedObject?.data
    // let attr = event.graphic.attr
    console.log("单击了合并对象中的单个值为", pickedItem)
  })

  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr
    if (!attr) {
      return false
    }
    return mars3d.Util.getTemplateHtml({ title: "建筑物", template: "all", attr: attr })
  })

  // 加一些演示数据
  addGraphic_a1(graphicLayer)
}

function addData(count) {
  graphicLayer.clear()

  showLoading()
  var startTime = new Date().getTime()
  count = count * 10000

  var arrData = []
  for (var j = 0; j < count; ++j) {
    var position = randomPoint()
    var pt1 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 45, 500)
    var pt2 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 135, 500)
    var pt3 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 225, 500)
    var pt4 = mars3d.PointUtil.getPositionByDirectionAndLen(position, 315, 500)

    arrData.push({
      positions: [pt1, pt2, pt3, pt4, pt1],
      style: {
        height: random(30, 9000),
        color: Cesium.Color.fromRandom(),
        opacity: 0.6
      },
      attr: {
        name: "第" + j + "个"
      }
    })
  }

  // 多个面对象的合并渲染。
  var primitive = new mars3d.graphic.PolygonCombine({
    instances: arrData,

    // 高亮时的样式
    highlight: {
      type: mars3d.EventType.click,
      color: Cesium.Color.YELLOW.withAlpha(0.9)
    }
  })
  graphicLayer.addGraphic(primitive)

  hideLoading()
  var endTime = new Date().getTime()
  // 两个时间戳相差的毫秒数
  var usedTime = (endTime - startTime) / 1000
  console.log(usedTime)

  globalMsg("共耗时" + usedTime.toFixed(2) + "秒")
}

function clearLayer() {
  graphicLayer.clear()
}

function addGraphic_a1(graphicLayer) {
  // 加一些演示数据
  mars3d.Resource.fetchJson({
    url: "//data.mars3d.cn/file/geojson/buildings-hf.json"
  })
    .then((data) => {
      const arr = mars3d.Util.geoJsonToGraphics(data, {
        symbol: {
          callback: function (attr, styleOpt) {
            const diffHeight = (attr.floor || 1) * 5

            return {
              height: 0,
              diffHeight: diffHeight,
              color: Cesium.Color.fromRandom({ alpha: 0.4 }) // 随机色
            }
          }
        }
      })

      globalMsg("共加载" + arr.length + "个面")

      // 多个面对象的合并渲染。
      var primitive = new mars3d.graphic.PolygonCombine({
        instances: arr,
        // 公共样式
        style: {
          outline: true,
          outlineColor: "#ffffff"
        },

        // 高亮时的样式
        highlight: {
          type: mars3d.EventType.click,
          color: Cesium.Color.YELLOW.withAlpha(0.9)
        }
      })
      graphicLayer.addGraphic(primitive)
    })
    .otherwise(function (error) {
      console.log("服务出错", error)
    })
}

// 适用于其他Geometry类型的数据，可以完全自定义
// function addGraphic_a2(graphicLayer) {
//   //加一些演示数据
//   Cesium.Resource.fetchJson({
//     url: "//data.mars3d.cn/file/geojson/buildings-hf.json",
//   })
//     .then((data) => {
//       let arr = mars3d.Util.geoJsonToGraphics(data);

//       globalMsg("共加载" + arr.length + "个面");

//       //多个面对象的合并渲染。
//       const instances = [];
//       for (let i = 0; i < arr.length; i++) {
//         const item = arr[i];
//         let itemColor = Cesium.Color.fromRandom();

//         const instance = new Cesium.GeometryInstance({
//           //其他Geometry类型的数据，按Cesium语法修改下面的geometry
//           geometry: new Cesium.RectangleGeometry({
//             rectangle: Cesium.Rectangle.fromCartesianArray(mars3d.LatLngArray.toCartesians(item.positions)),
//             vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
//             height: 0,
//             extrudedHeight: (item.attr.floor || 1) * 5,
//           }),
//           attributes: {
//             color: Cesium.ColorGeometryInstanceAttribute.fromColor(itemColor),
//           },
//         });
//         instance.attr = item.attr; //重要：绑定相关属性
//         instances.push(instance);
//       }

//       //多个对象的合并渲染。
//       var primitive = new mars3d.graphic.BaseCombine({
//         instances: instances,
//       });
//       graphicLayer.addGraphic(primitive);
//     })
//     .otherwise(function (error) {
//       globalAlert("服务出错", error);
//     });
// }

// 取区域内的随机图标
function randomPoint() {
  var jd = random(115.955684 * 1000, 117.474003 * 1000) / 1000
  var wd = random(30.7576 * 1000, 32.008782 * 1000) / 1000
  return Cesium.Cartesian3.fromDegrees(jd, wd)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
