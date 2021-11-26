var map

// API文档，参考lib\mars3d\thirdParty\weiVectorTile\Document.rar（解压Document.rar）

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    scene: {
      center: { lat: 31.221078, lng: 117.305076, alt: 136530, heading: 10, pitch: -68 }
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // shp 国界线
  Cesium.when.all(
    [
      Cesium.Resource.fetchBlob("//data.mars3d.cn/file/shp/hefei_xz.shp"),
      Cesium.Resource.fetchBlob("//data.mars3d.cn/file/shp/hefei_xz.dbf"),
      Cesium.Resource.fetchBlob("//data.mars3d.cn/file/shp/hefei_xz.prj")
    ],
    function (files) {
      files[0].name = "hefei_xz.shp"
      files[1].name = "hefei_xz.dbf"
      files[2].name = "hefei_xz.prj"

      var tileLayer = new mars3d.layer.WeiVectorTileLayer({
        source: files,
        removeDuplicate: false,
        zIndex: 2,
        defaultStyle: {
          // 参考api文档的Cesium.VectorStyle类
          tileCacheSize: 200,

          fill: true, // 是否填充，仅面数据有效。
          fillColor: "rgba(255,255,255,0.01)",

          outline: true, // 是否显示边，仅面数据有效。
          outlineColor: "rgba(209,204,226,1)",
          // lineDash: [3, 10],
          lineWidth: 2,

          showMaker: false,
          showCenterLabel: false
          // showCenterLabel: true, //是否显示文本，仅对线和面数据有效
          // centerLabelPropertyName: 'NAME',
          // fontColor: 'rgba(255,255,255,1)',
          // fontSize: 23,
          // fontFamily: '楷体',
          // labelOffsetX: -10,
          // labelOffsetY: -5,
        },
        maximumLevel: 20,
        minimumLevel: 1,
        simplify: false,
        allowPick: true, // 允许单击
        // 以下为mars3d参数,API参考http://mars3d.cn/api/BaseTileLayer.html#.ConstructorOptions
        popup: "{NAME}"
      })
      map.addLayer(tileLayer)
    }
  )
}
