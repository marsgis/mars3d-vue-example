
var map
var cameraHistory

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  cameraHistory = new mars3d.thing.CameraHistory()
  map.addThing(cameraHistory)


}

// 上一条视角
function lastView() {
  var result = cameraHistory.goLast()

    if (!result) {
      globalMsg("当前已是第一条记录了")
    }
}
// 下一条视角
function nextView() {
  var result = cameraHistory.goNext()
    if (!result) {
      globalMsg("当前已是最后一条记录了")
    }
}
// 回到当前视角
function lastOneView() {
  var result = cameraHistory.goNow()
  if (!result) {
    globalMsg("当前已是最后一条记录了")
  }
}
