var map

function initMap(mapOptions) {
  // 方式1：按basemaps配置自动生成
  mapOptions.control = {
    geocoder: true,
    geocoderConfig: {
      key: ["f2fedb9b08ae13d22f1692cd472d345e", "2e6ca4aeb6867fb637a5bee8333e5d3a"] // 高德key
    }
  }

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 查询结果回调方法
  map.viewer.geocoder.viewModel.complete.addEventListener(function (e) {
    var arrdata = map.viewer.geocoder.viewModel.suggestions
    console.log(arrdata)
  })
}
