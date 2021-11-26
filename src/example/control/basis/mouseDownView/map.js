var map

function initMap(mapOptions) {
  // 方便演示，移除默认配置的control
  delete mapOptions.control

  // 方式1：在创建地球前的传参中配置control参数
  // mapOptions.control = {
  //   mouseDownView: true,
  // };

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 方式2：在创建地球后按需调用addControl添加(直接new对应type类型的控件)
  var mouseDownView = new mars3d.control.MouseDownView()
  map.addControl(mouseDownView)
}
