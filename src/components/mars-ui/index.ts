/**
 * 统一导出公共组件, 按需初始化ant-design-vue
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { App } from "vue"
import MarsSelect from "./mars-select/index.vue"
import MarsButton from "./mars-button/index.vue"
import MarsInput from "./mars-input/index.vue"
import MarsInputNumber from "./mars-input-number/index.vue"
import MarsDatePicker from "./mars-date-picker/index.vue"
import MarsRangePicker from "./mars-range-picker/index.vue"
import MarsColorPicker from "./mars-color-picker"
import MarsDropDown from "./mars-dropdown"
import MarsMessage, { $message as marsMessage } from "./mars-message"
import MarsAlert, { $alert as marsAlert } from "./mars-alert/"
import MarsNotify, { $notify as marsNotify } from "./mars-notify"
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
  DatePicker,
  Row,
  Select,
  Slider,
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
  Image
} from "ant-design-vue"

import "./mars-echarts"

import "./index.less"
import "./function.less"

export const $alert = window.$alert = marsAlert
export const $notify = window.$notify = marsNotify
export const $message = window.$message = marsMessage

const components = [MarsSelect, MarsButton, MarsInput, MarsInputNumber, MarsDatePicker, MarsRangePicker, MarsColorPicker, MarsTree, MarsDropDown]

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
    app.use(DatePicker)
    app.use(Switch)
    app.use(Space)
    app.use(Select)
    app.use(Slider)
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

    components.forEach((comp) => {
      app.component(comp.name, comp)
    })
    MarsMessage(app)
    MarsAlert(app)
    MarsNotify(app)
    return app
  }
}
