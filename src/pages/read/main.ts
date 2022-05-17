import { createApp } from "vue"
import Application from "./App.vue"
import MarsUIInstall from "@mars/components/mars-ui"
import { getQueryString } from "@mars/utils/mars-util"
import { injectState, key } from "@mars/widgets/common/store/widget"
import { Editor as MarsgisEditor } from "@marsgis/editor"
import store from "@mars/widgets/widget-store"

const marsEditor = new MarsgisEditor({
  baseUrl: process.env.BASE_URL,
  code: getQueryString("code"),
  configLibs: window.configLibs,
  resourcePublicPath: process.env.EXAMPLE_SOURCE_PATH,
  thumbnailPublicPath: "/config/",
  libPublicPath: "/lib/",
  configSourceUrl: `${process.env.BASE_URL}config/example.json`,
  UIFile: "{main}/index.vue"
})
window.marsEditor = marsEditor

// https跳转处理
const protocol = window.location.protocol
if (protocol === "https:") {
  window.location.href = window.location.href.replace("https", "http")
}

const app = createApp(Application)

MarsUIInstall(app, {
  dialog: {
    position: {
      left: 50,
      bottom: 50
    }
  }
})
app.use(injectState(store), key)

document.oncontextmenu = function (e) {
  e.preventDefault()
}

// 设置自适应高度指令
app.directive("auto-height", {
  mounted(el, binding) {
    const container = document.getElementById("mars-main-view")
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
