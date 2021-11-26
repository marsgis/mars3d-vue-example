
      var map

      function initMap(options) {
        // 合并属性参数，可覆盖config.json中的对应配置
        var mapOptions = mars3d.Util.merge(options, {
          scene: {
            center: { lat: 31.820474, lng: 117.178655, alt: 326, heading: 24, pitch: -45 }
          }
        })

        // 创建三维地球场景
        map = new mars3d.Map("mars3dContainer", mapOptions)

        // HuxingLayer类定义在./js/HuxingLayer.js
        // eslint-disable-next-line no-undef
        const layer = new HuxingLayer({
          url: "//data.mars3d.cn/file/geojson/huxing.json"
        })
        map.addLayer(layer)

        // 可以绑定Popup弹窗，回调方法中任意处理
        // layer.bindPopup(function (event) {
        //   let item = event.graphic?.attr;
        //   if (!item) {
        //     return false;
        //   }
        //   return mars3d.Util.getTemplateHtml({
        //     title: "楼栋",
        //     attr: item,
        //     template: [
        //       { field: "CH", name: "层号" },
        //       { field: "DYH", name: "单元" },
        //       { field: "FH", name: "房号" },
        //       { field: "WZ", name: "位置" },
        //     ],
        //   });
        // });
      }
