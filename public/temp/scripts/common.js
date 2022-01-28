"use script"

const vueGlobal = window.parent || window

// 判断webgl支持
if (!mars3d.Util.webglreport()) {
  mars3d.Util.webglerror()
}

// 读取 config.json 配置文件
// 读取 config.json 配置文件
mars3d.Resource.fetchJson({ url: "config/config.json" })
  .then(function (json) {
    console.log("读取 config.json 配置文件完成", json) // 打印测试信息

    // 构建地图
    vueGlobal._map = initMap(json.map3d)
    vueGlobal.mapWork = window // 这句话是将当前js对象绑定赋予给index.vue内进行调用

    window.map = vueGlobal._map // 这句话 只是为了方便F12调试使用
  })
  .otherwise(function (error) {
    console.log("加载JSON出错", error)
    globalAlert(error ? error.message : "加载JSON出错")
  })

// 构造地图主方法【必须】
function initMap(options) {
  if (window.mapOptions) {
    if (typeof window.mapOptions === "function") {
      options = window.mapOptions(options)
    } else {
      window.mapOptions = options = mars3d.Util.merge(options, window.mapOptions)
    }
  }

  // 创建三维地球场景
  return new mars3d.Map("mars3dContainer", options)
}

// 调用vue的消息提示（自动消失）
function globalMsg(msg, type, ...args) {
  return vueGlobal.$message(msg, type, ...args)
}

// 调用vue的弹窗提示（手动单击确定关闭窗口）
function globalAlert(msg, title, ...args) {
  return vueGlobal.$alert(msg, title, ...args)
}

// 调用vue的右上角信息提示（可关闭）
function globalNotify(msg, disc, ...args) {
  return vueGlobal.$notify(msg, disc, ...args)
}

function showLoading(type) {
  vueGlobal.$showLoading(type)
}

function hideLoading(type) {
  vueGlobal.$hideLoading(type)
}
