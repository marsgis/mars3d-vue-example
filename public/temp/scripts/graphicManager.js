// entity示例中的图层通用js

// 在图层级处理一些事物
function initLayerManager(graphicLayer) {
  // 在layer上绑定监听事件
  graphicLayer.on(mars3d.EventType.click, function (event) {
    console.log("监听layer，单击了矢量对象", event)
  })
  // graphicLayer.on(mars3d.EventType.mouseOver, function(event) {
  //   console.log('监听layer，鼠标移入了矢量对象', event)
  // })
  // graphicLayer.on(mars3d.EventType.mouseOut, function(event) {
  //   console.log('监听layer，鼠标移出了矢量对象', event)
  // })

  // 可在图层上绑定popup,对所有加到这个图层的矢量数据都生效
  bindLayerPopup(graphicLayer)

  // 可在图层绑定右键菜单,对所有加到这个图层的矢量数据都生效
  bindLayerContextMenu(graphicLayer)
}

// 绑定图层的弹窗
function bindLayerPopup(graphicLayer) {
  graphicLayer.bindPopup(function (event) {
    const attr = event.graphic?.attr || {}
    attr.test1 = "测试属性"
    // attr["视频"] = `<video src='http://data.mars3d.cn/file/video/lukou.mp4' controls autoplay style="width: 300px;" ></video>`;

    return mars3d.Util.getTemplateHtml({ title: "layer上绑定的Popup", template: "all", attr: attr })
  })
}

// 绑定右键菜单
function bindLayerContextMenu(graphicLayer) {
  graphicLayer.bindContextMenu([
    {
      text: "开始编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic || !graphic.startEditing) {
          return false
        }
        return !graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.startEditing(graphic)
        }
      }
    },
    {
      text: "停止编辑对象",
      iconCls: "fa fa-edit",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return graphic.isEditing
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        if (graphic) {
          graphicLayer.stopEditing(graphic)
        }
      }
    },
    {
      text: "删除对象",
      iconCls: "fa fa-trash-o",
      show: (event) => {
        const graphic = event.graphic
        if (!graphic || graphic.isDestroy) {
          return false
        } else {
          return true
        }
      },
      callback: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return
        }
        graphicLayer.removeGraphic(graphic)
      }
    },
    {
      text: "计算长度",
      iconCls: "fa fa-medium",
      show: function (e) {
        const graphic = e.graphic
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "polyline" ||
          graphic.type === "polylineP" ||
          graphic.type === "curve" ||
          graphic.type === "curveP" ||
          graphic.type === "polylineVolume" ||
          graphic.type === "polylineVolumeP" ||
          graphic.type === "corridor" ||
          graphic.type === "corridorP" ||
          graphic.type === "wall" ||
          graphic.type === "wallP"
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
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP"
        )
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
        if (!graphic) {
          return false
        }
        return (
          graphic.type === "circle" ||
          graphic.type === "circleP" ||
          graphic.type === "rectangle" ||
          graphic.type === "rectangleP" ||
          graphic.type === "polygon" ||
          graphic.type === "polygonP" ||
          graphic.type === "scrollWall" ||
          graphic.type === "water"
        )
      },
      callback: function (e) {
        const graphic = e.graphic
        const strArea = mars3d.MeasureUtil.formatArea(graphic.area)
        globalAlert("该对象的面积为:" + strArea)
      }
    }
  ])
}

// 保存GeoJSON
function expFile(graphicLayer) {
  if (graphicLayer.length === 0) {
    globalMsg("当前没有标注任何数据，无需保存！")
    return
  }
  const geojson = graphicLayer.toGeoJSON()
  mars3d.Util.downloadFile("我的标注.json", JSON.stringify(geojson))
}


// 打开保存的文件
function impFile(graphicLayer, file) {
  const fileName = file.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()
  if (fileType != "json") {
    globalMsg("文件类型不合法,请选择json格式标注文件！")
    return
  }

  if (fileType == "json" || fileType == "geojson") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const json = this.result
      graphicLayer.loadGeoJSON(json, {
        flyTo: true
      })
    }
  } else if (fileType == "kml") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const strkml = this.result
      // eslint-disable-next-line no-undef
      kgUtil.toGeoJSON(strkml).then((geojoson) => {
        console.log("kml2geojson", geojoson)

        graphicLayer.loadGeoJSON(geojoson, {
          flyTo: true
          // symbol: function (attr, style, featue) {
          //   let geoType = featue.geometry?.type
          //   if (geoType == 'Point') {
          //     return {
          //       image: 'img/marker/di3.png',
          //       verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          //       scale: 0.4,
          //       label: {
          //         text: attr.name,
          //         font_size: 18,
          //         color: '#ffffff',
          //         outline: true,
          //         outlineColor: '#000000',
          //         pixelOffsetY: -50,
          //         scaleByDistance: true,
          //         scaleByDistance_far: 990000,
          //         scaleByDistance_farValue: 0.3,
          //         scaleByDistance_near: 10000,
          //         scaleByDistance_nearValue: 1,
          //       },
          //     }
          //   }
          //   return style
          // },
        })
      })
    }
  } else if (fileType == "kmz") {
    // 加载input文件控件的二进制流
    // eslint-disable-next-line no-undef
    kgUtil.toGeoJSON(file).then((geojoson) => {
      console.log("kmz2geojson", geojoson)

      graphicLayer.loadGeoJSON(geojoson, {
        flyTo: true
      })
    })
  } else {
    globalMsg("暂不支持 " + fileType + " 文件类型的数据！")
  }
}

// 也可以在单个Graphic上做个性化管理及绑定操作
function initGraphicManager(graphic) {
  // 3.在graphic上绑定监听事件
  // graphic.on(mars3d.EventType.click, function(event) {
  //   console.log('监听graphic，单击了矢量对象', event)
  // })
  // graphic.on(mars3d.EventType.mouseOver, function(event) {
  //   console.log('监听graphic，鼠标移入了矢量对象', event)
  // })
  // graphic.on(mars3d.EventType.mouseOut, function(event) {
  //   console.log('监听graphic，鼠标移出了矢量对象', event)
  // })

  // 绑定Tooltip
  // graphic.bindTooltip('我是graphic上绑定的Tooltip') //.openTooltip()

  // 绑定Popup

  var inthtml = `<table style="width: auto;">
            <tr>
              <th scope="col" colspan="2" style="text-align:center;font-size:15px;">我是graphic上绑定的Popup </th>
            </tr>
            <tr>
              <td>提示：</td>
              <td>这只是测试信息，可以任意html</td>
            </tr>
          </table>`
  graphic.bindPopup(inthtml).openPopup()

  // 绑定右键菜单
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

  // 测试 颜色闪烁
  if (graphic.startFlicker) {
    graphic.startFlicker({
      time: 20, // 闪烁时长（秒）
      maxAlpha: 0.5,
      color: Cesium.Color.YELLOW,
      onEnd: function () {
        // 结束后回调
      }
    })
  }
}

// 取区域内的随机图标
function randomPoint() {
  var jd = random(116.1 * 1000, 116.6 * 1000) / 1000
  var wd = random(30.8 * 1000, 31.1 * 1000) / 1000
  var height = random(1000, 9000)
  return new mars3d.LatLngPoint(jd, wd, height)
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
