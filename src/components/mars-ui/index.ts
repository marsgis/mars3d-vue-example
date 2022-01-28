/**
 * 统一导出公共组件, 按需初始化ant-design-vue
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2021-11-01
 */
import { App } from "vue"
import MarsSelect from "./mars-select"
import MarsButton from "./mars-button"
import MarsInput from "./mars-input"
import MarsInputNumber from "./mars-input-number"
import MarsDatePicker from "./mars-date-picker"
import MarsColorPicker from "./mars-color-picker"
import MarsMessage from "./mars-message"
import MarsAlert from "./mars-alert"
import MarsNotify from "./mars-notify"
import MarsTree from "./mars-tree"

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Collapse,
  Divider,
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
  Pagination,
  Row,
  Slider,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tabs,
  Tooltip,
  Tree,
  Typography,
  Upload,
  Card,
  Image,
  DatePicker,
  Dropdown
} from "ant-design-vue"
import "ant-design-vue/lib/style/index.less"

importStyle()

const components = [MarsSelect, MarsButton, MarsInput, MarsInputNumber, MarsDatePicker, MarsColorPicker, MarsTree]

export default {
  install(app: App): App {
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
    app.use(Select)
    app.use(Table)
    app.use(Tree)
    app.use(Upload)
    app.use(Progress)
    app.use(PageHeader)
    app.use(Menu)
    app.use(Popover)
    app.use(Spin)
    app.use(Modal)
    app.use(Typography)
    app.use(Tabs)
    app.use(Tooltip)
    app.use(Divider)
    app.use(Card)
    app.use(Image)
    app.use(DatePicker)
    app.use(Dropdown)
    app.use(Pagination)

    components.forEach((comp) => {
      app.component(comp.name, comp)
    })
    MarsMessage(app)
    MarsAlert(app)
    MarsNotify(app)
    return app
  }
}

function importStyle() {
  const antSource: any[] = []
  const sourceId = [
    "Auto-Complete",
    "Button",
    "Cascader",
    "Checkbox",
    "Collapse",
    "Divider",
    "Form",
    "Input",
    "Grid",
    "Input-Number",
    "List",
    "Menu",
    "Modal",
    "Page-Header",
    "Popover",
    "Progress",
    "Radio",
    "Slider",
    "Space",
    "Select",
    "Spin",
    "Switch",
    "Table",
    "Tabs",
    "Tooltip",
    "Tree",
    "Typography",
    "Upload",
    "Card",
    "Image",
    "Date-Picker",
    "Dropdown",
    "Notification",
    "Message",
    "Alert",
    "Spin",
    "Pagination"
  ]
  sourceId.forEach((comp) => {
    antSource.push(import(`../../../node_modules/ant-design-vue/lib/${comp.toLowerCase()}/style/index.less`))
  })
  Promise.all(antSource).then(() => {
    import("./index.less")
    import("./base.less")
  })
}
