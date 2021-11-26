var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {})

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // smallTooltip是一种简易的tooltip，目前标绘中用到的就是smallTooltip
  // map.smallTooltip.direction = true; //改变方向到左侧显示

  // 关闭tooltip
  map.closeSmallTooltip()

  map.mouseEvent.enabledMoveDelay = false
  map.on(mars3d.EventType.mouseMove, (event) => {
    map.openSmallTooltip(event.windowPosition, "可以放任意html信息")
  })


  // 启用/禁用
  // console.log(map.smallTooltip.enabled)
  // $('#chkEnabled').change(function () {
  //   var enabled = $(this).is(':checked')
  //   map.smallTooltip.enabled = enabled
  // })
}
function enabledSmallTooltip(enabled) {
  map.smallTooltip.enabled = enabled
}
