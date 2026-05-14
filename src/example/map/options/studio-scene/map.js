import * as mars3d from "mars3d"

export let map

// 需要覆盖config.json中地图属性参数（当前示例框架中自动处理合并）
export const mapOptions = {
  scene: {
    clock: {
      shouldAnimate: false
    }
  },
  basemaps: [],
  layers: []
}



// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export async function onMounted(mapInstance) {
  map = mapInstance // 记录map
}

export async function loadScene(url, token) {
  let mapOptions = await mars3d.Util.fetchJson({ url: url + "?token=" + token })
  mapOptions = replaceUrlTemplateStr(mapOptions)
  console.log("场景参数", mapOptions)

  map.setOptions(mapOptions, { merge: false })

  autoAddTimeControl()
}

const studio_data = "https://studio-api.mars3d.cn/api/files" // 服务器文件位置地址
const mars3d_data = "https://data.mars3d.cn" // mars3d数据地址

function replaceUrlTemplateStr(oldStr, token) {
  if (!oldStr || oldStr === "") {
    return oldStr
  }

  const newStr = JSON.stringify(oldStr).replaceAll("{studio_data}", studio_data).replaceAll("{mars3d_data}", mars3d_data).replaceAll("{token}", token)
  const options = JSON.parse(newStr)
  return options
}



function autoAddTimeControl() {
  map.availabilityEnabled = true

  const taskResult = map.getTimeTaskList()
  if (taskResult.duration > 0 && taskResult.list?.length > 0) {
    console.log(`当前地图所有时序相关任务清单`, taskResult)

    // 停止，手动开始
    // map.clock.shouldAnimate = false
    globalMsg(`5秒后自动开始播放，如需暂停可单击"左下角"按钮。`)
    setTimeout(() => {
      map.clock.shouldAnimate = true
    }, 5000)

    // 修改时间
    const startTime = map.clock.startTime
    map.clock.currentTime = map.clock.startTime // 设置当前时间 = 开始时间

    const stopTime = Cesium.JulianDate.addSeconds(startTime, taskResult.duration, new Cesium.JulianDate())
    map.clock.stopTime = stopTime

    // 添加控件
    if (!map.control.timeline) {
      const clockAnimate = new mars3d.control.ClockAnimate({
        format: "duration"
      })
      map.addControl(clockAnimate)
    }

    if (map.control.timeline) {
      map.control.timeline.zoomTo(startTime, stopTime)
    } else {
      const timeline = new mars3d.control.Timeline({
        format: "duration"
      })
      map.addControl(timeline)
    }
  }
}
