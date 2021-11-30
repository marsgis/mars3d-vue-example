import { createApp } from "vue"
import Application from "./App.vue"
import { install as iconInstall } from "@icon-park/vue-next/es/all"
import { getQueryString } from "@/utils/index"
import marsEditorInstall from "mars-editor"
import MarsUI from "@comp/MarsUI"

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  Dropdown,
  Form,
  Input,
  InputNumber,
  List,
  Menu,
  Modal,
  PageHeader,
  Popover,
  Progress,
  Radio,
  Row,
  Slider,
  Space,
  Spin,
  Switch,
  Table,
  Tabs,
  Tooltip,
  Tree,
  Typography,
  Upload
} from "ant-design-vue"

// 加载全局样式
import "@/styles/index.less"

const app = createApp(Application)

app.use(AutoComplete)
app.use(Row)
app.use(Cascader)
app.use(Col)
app.use(Collapse)
app.use(Button)
app.use(List)
app.use(Form)
app.use(Input)
app.use(InputNumber)
app.use(Checkbox)
app.use(Radio)
app.use(Switch)
app.use(Space)
app.use(Slider)
app.use(Table)
app.use(Tree)
app.use(Upload)
app.use(Progress)
app.use(PageHeader)
app.use(Menu)
app.use(Dropdown)
app.use(Popover)
app.use(Spin)
app.use(Modal)
app.use(Typography)
app.use(Tabs)
app.use(Tooltip)

app.use(MarsUI)

iconInstall(app)

marsEditorInstall(app, {
  baseUrl: process.env.BASE_URL,
  code: getQueryString("code") || "0",
  fullScreen: getQueryString("full") || "0",
  configLibs: window.configLibs,
  homepage: "http://mars3d.cn/example",
  configSource: `${process.env.BASE_URL}config/example.json`
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
