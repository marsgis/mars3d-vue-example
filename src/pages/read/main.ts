import { createApp } from "vue"
import Application from "./App.vue"
import MarsUI from "@/components/mars-ui"
import { setConfig } from "mars-editor"

// import "ant-design-vue/dist/antd.dark.less"

// https跳转处理
const protocol = window.location.protocol
if (protocol === "https:") {
  window.location.href = window.location.href.replace("https", "http")
}

const app = createApp(Application)

app.use(MarsUI)

document.oncontextmenu = function (e) {
  e.preventDefault()
}

setConfig(app, {
  baseUrl: process.env.BASE_URL,
  resourcePath: process.env.EXAMPLE_SOURCE_PATH,
  configLibs: window.configLibs,
  configSource: `${process.env.BASE_URL}config/example.json`,
  sourceFile: false
})

// 设置自适应高度指令
app.directive("auto-height", {
  mounted(el, binding) {
    const container = document.getElementById("sanbox-warpper")
    const loseHeight = binding.value || 0
    let wapperHeight = container?.clientHeight || 0
    el.style.height = `${wapperHeight - loseHeight}px`

    window.onresize = () => {
      wapperHeight = container?.clientHeight || 0
      const resizeHeight = wapperHeight - loseHeight
      el.style.height = `${resizeHeight}px`
    }
  }
})

app.mount("#app")
