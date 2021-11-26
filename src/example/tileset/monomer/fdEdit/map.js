var map
var graphicLayerEdit
var geoJsonLayerDTH

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 43.820826, lng: 125.144526, alt: 679, heading: 333, pitch: -32 }
    },
    control: {
      infoBox: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)


  // 三维模型
  var tilesetLayer = new mars3d.layer.TilesetLayer({
    type: "3dtiles",
    name: "校园",
    url: "//data.mars3d.cn/3dtiles/qx-xuexiao/tileset.json",
    position: { alt: 15.8 },
    maximumScreenSpaceError: 1,
    maximumMemoryUsage: 1024
  })
  map.addLayer(tilesetLayer)

  // 单体化图层
  geoJsonLayerDTH = new mars3d.layer.GeoJsonLayer({
    name: "校园-单体化",
    symbol: {
      type: "polygonP",
      styleOptions: {
        // 单体化默认显示样式
        color: "rgba(255, 255, 255, 0.01)",
        clampToGround: true,
        classification: true,
        buffer: 1,
        // 单体化鼠标移入或单击后高亮的样式
        highlight: {
          type: mars3d.EventType.click,
          color: "rgba(255,255,0,0.4)"
        }
      }
    },
    popup: [
      { field: "name", name: "学校场所" },
      { field: "sfkf", name: "是否开放" },
      { field: "remark", name: "备注信息" }
    ]
  })
  map.addLayer(geoJsonLayerDTH)

  graphicLayerEdit = new mars3d.layer.GraphicLayer({
    hasEdit: true,
    isAutoEditing: true, // 绘制完成后是否自动激活编辑
    symbol: {
      type: "polygon",
      styleOptions: {
        color: "rgba(255, 255, 0, 0.4)",
        clampToGround: true
      }
    }
  })
  map.addLayer(graphicLayerEdit)


  queryDthData()
}
// 加载数据
function queryDthData() {
  const configUrl = "//data.mars3d.cn/file/geojson/dth-xuexiao-fd.json"
  mars3d.Resource.fetchJson({ url: configUrl })
    .then(function (result) {
      graphicLayerEdit.loadGeoJSON(result)
    })
    .otherwise(function (error) {
      console.log("加载JSON出错", error)
    })
}

// 切换到预览模式
function toYLMS() {
  var geojson = graphicLayerEdit.toGeoJSON()

  geoJsonLayerDTH.load({ data: geojson })

  graphicLayerEdit.hasEdit = false
  graphicLayerEdit.show = false
  console.log(graphicLayerEdit)

}

// 切换到编辑模式
function toBJMS() {
  geoJsonLayerDTH.clear()
  graphicLayerEdit.hasEdit = true
  graphicLayerEdit.show = true


}

function deleteAll() {
  graphicLayerEdit.clear()
}

function drawPolygon() {
  graphicLayerEdit.startDraw({
    type: "polygon",
    style: {
      color: "#ffff00",
      opacity: 0.3,
      clampToGround: true
    }
  })
}

// 打开保存的文件
function openGeoJSON(file) {
  const fileName = file.name
  const fileType = fileName?.substring(fileName.lastIndexOf(".") + 1, fileName.length).toLowerCase()

  if (fileType == "json" || fileType == "geojson") {
    const reader = new FileReader()
    reader.readAsText(file, "UTF-8")
    reader.onloadend = function (e) {
      const json = this.result
      graphicLayerEdit.loadGeoJSON(json, {
        clear: true,
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

        graphicLayerEdit.loadGeoJSON(geojoson, {
          clear: true,
          flyTo: true
        })
      })
    }
  } else if (fileType == "kmz") {
    // 加载input文件控件的二进制流
    // eslint-disable-next-line no-undef
    kgUtil.toGeoJSON(file).then((geojoson) => {
      console.log("kmz2geojson", geojoson)

      graphicLayerEdit.loadGeoJSON(geojoson, {
        clear: true,
        flyTo: true
      })
    })
  } else {
    globalMsg("暂不支持 " + fileType + " 文件类型的数据！")
  }
}
