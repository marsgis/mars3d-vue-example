var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 演示3种不同层次的绑定方式，可以按需使用
  bindMapDemo()
  bindLayerDemo()
  bindGraphicDemo()
}

// 1.在map地图上绑定右键菜单
function bindMapDemo() {
  // 内置的默认右键菜单获取方法
  // var defaultContextmenuItems =map.getDefaultContextMenu()
  // 可以删减defaultContextmenuItems数组内值
  // map.bindContextMenu(defaultContextmenuItems)

  // 解除已绑定的右键菜单
  map.unbindContextMenu()

  var mapContextmenuItems = [
    {
      text: "显示此处经纬度",
      iconCls: "fa fa-info-circle",
      show: function (e) {
        return Cesium.defined(e.cartesian)
      },
      callback: function (e) {
        var mpt = mars3d.LatLngPoint.fromCartesian(e.cartesian)
        globalAlert(mpt.toString(), "位置信息")
      }
    },
    {
      text: "查看当前视角",
      iconCls: "fa fa-camera-retro",
      callback: function (e) {
        const mpt = JSON.stringify(map.getCameraView())
        globalAlert(mpt, "当前视角信息")
      }
    },
    {
      text: "开启深度监测",
      iconCls: "fa fa-eye-slash",
      show: function () {
        return !map.scene.globe.depthTestAgainstTerrain
      },
      callback: function (e) {
        map.scene.globe.depthTestAgainstTerrain = true
      }
    },
    {
      text: "关闭深度监测",
      iconCls: "fa fa-eye",
      show: function () {
        return map.scene.globe.depthTestAgainstTerrain
      },
      callback: function (e) {
        map.scene.globe.depthTestAgainstTerrain = false
      }
    },
    {
      text: "视角切换",
      iconCls: "fa fa-street-view",
      children: [
        {
          text: "移动到此处",
          iconCls: "fa fa-send-o",
          show: function (e) {
            return Cesium.defined(e.cartesian)
          },
          callback: function (e) {
            const cameraDistance = Cesium.Cartesian3.distance(e.cartesian, map.camera.positionWC) * 0.1

            map.flyToPoint(e.cartesian, {
              radius: cameraDistance, // 距离目标点的距离
              maximumHeight: map.camera.positionCartographic.height
            })
          }
        }
      ]
    }
  ]
  map.bindContextMenu(mapContextmenuItems)
}

// 2.在layer图层上绑定右键菜单
function bindLayerDemo() {
  var graphicLayer = new mars3d.layer.GeoJsonLayer({
    name: "标绘示例数据",
    url: "//data.mars3d.cn/file/geojson/mars3d-draw.json"
  })
  map.addLayer(graphicLayer)

  // 在layer上绑定右键菜单
  graphicLayer.bindContextMenu([
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        const graphic = e.graphic
        if (graphic) {
          graphicLayer.removeGraphic(graphic)
        }
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        return (
          graphic.type === "polyline" ||
          graphic.type === "curve" ||
          graphic.type === "polylineVolume" ||
          graphic.type === "corridor" ||
          graphic.type === "wall"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的长度为:" + strDis)
      }
    },
    {
      text: "计算周长",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        return graphic.type === "circle" || graphic.type === "rectangle" || graphic.type === "polygon"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strDis = mars3d.MeasureUtil.formatDistance(graphic.distance)
        globalAlert("该对象的周长为:" + strDis)
      }
    },
    {
      text: "计算面积",
      iconCls: "fa fa-reorder",
      show: function (e) {
        const graphic = e.graphic
        return graphic.type === "circle" || graphic.type === "rectangle" || graphic.type === "polygon"
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}

// 3.在graphic数据上绑定右键菜单
function bindGraphicDemo() {
  // 创建矢量数据图层
  const graphicLayer = new mars3d.layer.GraphicLayer()
  map.addLayer(graphicLayer)

  const graphic = new mars3d.graphic.BoxEntity({
    position: new mars3d.LatLngPoint(116.336525, 31.196721, 323.35),
    style: {
      dimensions: new Cesium.Cartesian3(2000.0, 2000.0, 2000.0),
      fill: true,
      color: "#00ff00",
      opacity: 0.9,
      label: {
        text: "graphic绑定的演示",
        font_size: 25,
        font_family: "楷体",
        color: "#003da6",
        outline: true,
        outlineColor: "#bfbfbf",
        outlineWidth: 2,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM
      }
    }
  })

  graphicLayer.addGraphic(graphic)

  // 2.在graphic上绑定右键菜单
  graphic.bindContextMenu([
    {
      text: "删除对象[graphic绑定的]",
      iconCls: "fa fa-trash-o",
      callback: function (e) {
        const graphic = e.graphic
        if (graphic) {
          graphic.remove()
        }
      }
    }
  ])
}
