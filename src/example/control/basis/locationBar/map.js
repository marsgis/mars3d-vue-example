var map

function initMap(mapOptions) {
  // 方便演示，移除默认配置的control
  delete mapOptions.control

  // 方式1：在创建地球前的传参中配置control参数
  // mapOptions.control = {
  //   locationBar: {
  //     fps: true,
  //     template: '<div>经度:{lng}</div><div>纬度:{lat}</div> <div>海拔：{alt}米</div> <div>层级：{level}</div><div>方向：{heading}度</div> <div>俯仰角：{pitch}度</div><div>视高：{cameraHeight}米</div>'
  //   }
  // }

  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", mapOptions)

  // 方式2：在创建地球后按需调用addControl添加(直接new对应type类型的控件)
  var locationBar = new mars3d.control.LocationBar({
    fps: true,
    template:
      "<div>经度:{lng}</div><div>纬度:{lat}</div> <div>海拔：{alt}米</div> <div>层级：{level}</div><div>方向：{heading}度</div> <div>俯仰角：{pitch}度</div><div>视高：{cameraHeight}米</div>"
    // template: function (locationData) {
    //   var pitch
    //   if (locationData.pitch < 0) {
    //     pitch = '俯视:' + -locationData.pitch
    //   } else {
    //     pitch = '仰视:' + locationData.pitch
    //   }

    //   var dfmX = mars3d.Util.formatDegree(locationData.lng)
    //   var dfmY = mars3d.Util.formatDegree(locationData.lat)

    //   return ` <div>经度:${locationData.lat} , ${dfmX}</div>
    //           <div>纬度:${locationData.lng} , ${dfmY}</div>
    //           <div>海拔：${locationData.alt}米</div>
    //           <div>方向：${locationData.heading}度</div>
    //           <div>${pitch}度</div>
    //           <div>视高：${locationData.cameraHeight}米</div>`
    // },
  })
  map.addControl(locationBar)
}
