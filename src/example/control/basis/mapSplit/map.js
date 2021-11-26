var map

function initMap(mapOptions) {
  // 方便演示，移除默认配置的control
  delete mapOptions.control

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)
  map.basemap = null

  const _alllayers = this.map.getTileLayers()

  console.log(_alllayers)
  var mapSplit = new mars3d.control.MapSplit({
    rightLayer: _alllayers[0],
    leftLayer: _alllayers[1]
  })
  map.addControl(mapSplit)
}
