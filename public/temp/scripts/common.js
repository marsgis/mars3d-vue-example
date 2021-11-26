// eslint-disable-next-line @typescript-eslint/no-unused-vars
var vueGlobal = parent

// 判断webgl支持
if (!mars3d.Util.webglreport()) {
  mars3d.Util.webglerror()
}

// 读取 config.json 配置文件
const configUrl = "config/config.json"
fetch(configUrl)
  .then(function (response) {
    if (!response.ok) {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    } else {
      return response.json()
    }
  })
  .then((json) => {
    // 重写initMap方法
    var initFunc = window.initMap
    window.initMap = function () {
      initFunc(json.map3d)
    }
    vueGlobal.mapWork = window // 这句话是将当前js对象绑定赋予给index.vue内进行调用
  })
  .catch(function (error) {
    console.log("加载JSON出错", error)
    alert(error?.message)
  })

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
