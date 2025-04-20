import * as mars3d from "mars3d"

export let map

// 初始化地图业务，生命周期钩子函数（必须）,框架在地图初始化完成后自动调用该函数
export async function onMounted(mapInstance) {
  map = mapInstance // 记录map
}

export async function loadLayer(url, token) {
  let layerOptions = await mars3d.Util.fetchJson({ url: url + "?token=" + token })
  layerOptions = replaceUrlTemplateStr(layerOptions, token)
  layerOptions.show = true // 避免默认隐藏
  layerOptions.flyTo = true

  const layer = mars3d.LayerUtil.create(layerOptions) // 根据图层参数创建图层
  map.addLayer(layer) // 添加到地图中

  console.log("mars3d的layer图层构造完成", layer)
}

const studio_data = "https://studio-api.mars3d.cn/api/files" // 服务器文件位置地址
const mars3d_data = "https://data.mars3d.cn" // mars3d数据地址
function replaceUrlTemplateStr(oldStr, token) {
  if (!oldStr || oldStr === "") {
    return oldStr
  }

  const newStr = JSON.stringify(oldStr).replaceAll("{studio_data}", studio_data).replaceAll("{mars3d_data}", mars3d_data).replaceAll("{token}", token)
  const options = JSON.parse(newStr)
  if (options.url) {
    options.url = getFullUrl(options.url, token)
  }
  return options
}

// 对url前缀做统一处理
export function getFullUrl(oldUrl, token) {
  if (!oldUrl) {
    return
  }

  if (oldUrl.startsWith("http") || oldUrl.startsWith("//")) {
    return mars3d.Util.buildUrl(oldUrl, { token: token })
  }

  const newUrl = studio_data + oldUrl.replaceAll("//", "/")
  return mars3d.Util.buildUrl(newUrl, { token: token })
}
