var map

function initMap(options) {
  // 合并属性参数，可覆盖config.json中的对应配置
  var mapOptions = mars3d.Util.merge(options, {
    control: {
      homeButton: true, // 回到默认视域按钮
      navigationHelpButton: false, // 是否显示帮助信息控件
      fullscreenButton: false, // 右下角全屏按钮
      geocoder: false,
      sceneModePicker: false,
      vrButton: false
    }
  })

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  const toolButton = new mars3d.control.ToolButton({
    title: "示例按钮1",
    icon: "img/icon/bookmark-one.svg",
    insertIndex: 1, // 插入的位置顺序, 1是home按钮后面
    click: (event) => {
      globalMsg("单击了控件1按钮，回调中想干啥就干啥~")
    }
  })
  map.addControl(toolButton)

  const toolButton2 = new mars3d.control.ToolButton({
    title: "示例按钮2",
    icon: "img/icon/good.svg",
    insertIndex: 0, // 插入的位置顺序
    click: (event) => {
      globalMsg("单击了控件2按钮，回调中想干啥就干啥~")
    }
  })
  map.addControl(toolButton2)

  const toolButton3 = new mars3d.control.ToolButton({
    title: "示例按钮3",
    icon: "img/icon/chinese.svg",
    click: (event) => {
      globalMsg("单击了控件3按钮，回调中想干啥就干啥~")
    }
  })
  map.addControl(toolButton3)
}
