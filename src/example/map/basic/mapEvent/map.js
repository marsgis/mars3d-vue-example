function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  var map = new mars3d.Map("mars3dContainer", mapOptions)

  // on绑定事件
  map.on(mars3d.EventType.cameraChanged, this.map_cameraChangedHandler, this)
  map.on(mars3d.EventType.click, this.map_clickHandler, this)
  map.on(mars3d.EventType.dblClick, this.map_dblClickHandler, this)

  // off移除事件
  // map.off(mars3d.EventType.cameraChanged, this.map_cameraChangedHandler, this)
}

var clickTimeId // 双击会触发两次单击事件的解决
function map_clickHandler(event) {
  clearTimeout(clickTimeId)
  clickTimeId = setTimeout(function () {
    console.log("鼠标单击", event)
  }, 250)
}

function map_dblClickHandler(event) {
  clearTimeout(clickTimeId)
  console.log("鼠标双击地图", event)
}

function map_cameraChangedHandler(event) {
  console.log("相机位置完成", event)
}
