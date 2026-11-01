import { createApp, defineComponent, h, type App } from "vue"
import Application from "./App.vue"
import MarsUIInstall from "@mars/components/mars-ui"
import { injectState, key } from "@mars/widgets/common/store/widget"
import { getQueryString, normalizeExampleId, renderExampleEmptyState } from "@mars/utils/mars-util"
import store from "@mars/widgets/widget-store"
import { Editor as MarsgisEditor, Util as MarsgisEditorUtil } from "@marsgis/editor"
import "@marsgis/editor/dist/editor.css"
import "@mars/components/mars-ui/common"

// 禁用浏览器右键菜单（地图场景需要右键进行漫游等操作）
document.oncontextmenu = function (e) {
  e.preventDefault()
}

const marsEditor = new MarsgisEditor({
  baseUrl: process.env.BASE_URL,
  code: getQueryString("code") ?? undefined,
  fullScreen: getQueryString("full") ?? undefined,
  configLibs: window.configLibs,
  resourcePublicPath: process.env.EXAMPLE_SOURCE_PATH,
  thumbnailPublicPath: "/config/",
  libPublicPath: "/lib/",
  framework: "vue",
  configSourceUrl: `${process.env.BASE_URL}config/example.json`,
  UIFile: "{main}/index.vue"
})
window.marsEditor = marsEditor

let inited = false
marsEditor.on("loaded", (exampleConfig) => {
  // 切换示例时销毁旧的UI实例，避免重复挂载
  if (inited) {
    destroyUI()
  }
  initUI(!exampleConfig.hasPannel)
  inited = true
})

let vueApp: App | null = null

function initUI(simple: boolean) {
  if (simple) {
    vueApp = createApp(
      defineComponent({
        render: () => h("div")
      })
    )
  } else {
    vueApp = createApp(Application)

    vueApp.use(injectState(store), key)
  }

  MarsUIInstall(vueApp, {
    dialog: {
      position: {
        left: 50,
        bottom: 50
      },
      warpper: "#mars-main-view"
    }
  })

  vueApp.mount("#mars-ui-root")
}

function destroyUI() {
  vueApp?.unmount()
  vueApp = null
}

// 非法/缺失 ?id= 时渲染空态提示并中止，避免面板空白无任何用户可读信息（I019）
async function bootstrap() {
  const rawId = getQueryString("id")
  if (!rawId) {
    renderExampleEmptyState(null)
    return
  }
  const exampleId = normalizeExampleId(rawId)
  const exampleKey = getQueryString("key") || undefined

  // 预校验示例配置是否存在，避免 editor 内部 alert 后渲染出空白面板
  const exampleConfig = await MarsgisEditorUtil.getCompConfig(exampleId, exampleKey)
  if (!exampleConfig) {
    renderExampleEmptyState(exampleId)
    return
  }

  marsEditor.render({
    container: document.getElementById("root")!,
    exampleId,
    exampleKey
  })
}
bootstrap()
