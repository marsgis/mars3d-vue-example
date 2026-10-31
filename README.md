<p align="center">
<img src="//mars3d.cn/logo.png" width="300px" />
</p>

<p align="center">基于 Vue3.x 的 Mars3D🌎功能示例项目 </p>

<p align="center">
<a target="_black" href="https://github.com/marsgis/mars3d">
<img alt="GitHub stars" src="https://img.shields.io/github/stars/marsgis/mars3d?style=flat&logo=github">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars3d">
<img alt="Npm downloads" src="https://img.shields.io/npm/dt/mars3d?style=flat&logo=npm">
</a>
<a target="_black" href="https://www.npmjs.com/package/mars3d">
<img alt="Npm version" src="https://img.shields.io/npm/v/mars3d.svg?style=flat&logo=npm&label=version"/>
</a>
</p>

功能示例项目，是基于[Mars3D 平台](http://mars3d.cn)做的一个按每个单独功能进行单页面展示、并且支持修改编辑代码实时运行的一个演示功能的系统。
主要用于开发人员学习了解 Mars3D 每个功能的使用、用于业务人员了解体验 Mars3D 具备的功能点。

首先建议您学习浏览一遍我们功能示例的源码（源码中会有大量注释），阅读源码时可以结合查阅 API 文档来理解类及方法的作用和参数说明等。

## 项目定位

这是一个基于 `Vue3` 开发的 Mars3D 功能示例演示项目：把 Mars3D 的每个功能点做成一个独立示例，左侧列表按分类浏览，点开后在一个页面里「地图 + UI 面板」同时运行，既可以直接阅读源码，也可以在编辑模式里改代码即时看到效果。

面向两类人：想学习 Mars3D 每个功能怎么用的开发人员，以及想体验 Mars3D 能力边界的业务人员。

核心闭环：列表页选示例 → 进入编辑 / 只读页 → iframe 内运行该示例的 `map.js` 建地球 → Vue 面板与地图业务通过 `mapWork` 交互 → 切换示例时销毁旧面板、加载新示例。

> 如果您不熟悉 Vue，也可以阅读：[功能示例原生JS版](http://mars3d.cn/docs/guide/example-es5/) 、[功能示例 React 版](http://mars3d.cn/docs/guide/example-react/)

### 项目特性

- **最新技术栈**：使用 Vue3 / Vite 等前端前沿技术开发
- **TypeScript**：应用程序级 JavaScript 的语言
- **示例即文件**：一个示例 = 一个 `src/example` 子目录（`map.js` + 可选 `index.vue`），新增示例不需要改路由

## 视频讲解

建议先看一遍视频讲解，再实际操作，您可以[新页面查看高清视频](https://www.bilibili.com/video/BV1PL41177SS/)

## 运行效果

[在线体验](http://mars3d.cn/example.html?type=vue)

![image](http://marsgis.cn/img/project/mars3d-doc/example1.jpg)

## 技术栈与版本

| 分类 | 技术 | 版本 |
|---|---|---|
| 框架 | Vue | ^3.5.43 |
| 框架 | Vuex | ^4.1.0 |
| 构建 | Vite | ^8.3.5 |
| 构建 | @vitejs/plugin-vue | ^6.0.10 |
| 语言 | TypeScript | ~6.0.3 |
| 语言 | vue-tsc | ^3.3.13 |
| UI 库 | Ant Design Vue | ^4.2.6 |
| UI 图标 | @icon-park/svg | ^1.4.2 |
| 地图 | mars3d | ~3.11.7 |
| 地图 | mars3d-cesium | ~1.145.0 |
| 编辑器 | @marsgis/editor | ^1.5.2 |
| 图表 | echarts | ^6.1.0 |
| 请求 | axios | ^1.20.0 |
| 样式 | less | ^4.9.1 |

- Node.js 要求 `>=22.12.0`，npm 要求 `>=9.0.0`（`package.json#engines`）。
- 包管理器使用 npm。
- 地图能力同时存在两套引入方式：npm 依赖（`mars3d` / `mars3d-cesium`）与 `public/lib/` 下的本地类库（由 `public/lib/includeLibs.js` 统一配置，示例 iframe 内通过 `window.mars3d` 使用）。

## 目录结构与职责

```
mars3d-vue-example
├── src                     项目源码
│   ├── components          Vue 组件
│   │   ├── mars-ui         基础 UI 组件库（按钮、弹窗、图标等）与全局提示方法【公共层，改动影响全部页面】
│   │   ├── mars-work       列表页与工作区组件（顶栏、示例列表、示例容器）
│   │   └── mars-sample     示例常用的公共业务组件（图层状态、图形状态等）
│   ├── example             示例代码【核心，480 个 map.js】
│   ├── misc                TypeScript 模块与全局类型声明
│   ├── pages               页面入口：index 列表页 / editor 编辑页 / read 只读页
│   ├── utils               工具函数（query 参数、示例 id、请求、地图就绪事件）
│   └── widgets             框架级功能控件（图层管理、底图切换、属性编辑等）
├── build                   Vite 自定义插件（开发模式下改写示例 map.js 的模块语法）
├── public                  不参与编译的静态资源【核心】
│   ├── config              示例清单 example.json 等配置
│   ├── font                字体
│   ├── img                 图片资源
│   ├── lib                 示例依赖的第三方类库与 CDN 配置（includeLibs.js）
│   └── temp                iframe 内运行示例的公共脚手架（template.html、common.js）
├── doc                     项目说明文档
├── index.html              列表页入口
├── editor-vue.html         编辑页入口
├── read-vue.html           只读页入口
├── vite.config.mts          构建与开发服务配置
├── tsconfig.json           TypeScript 配置
├── eslint.config.mjs       ESLint 配置
└── package.json            依赖与脚本
```

与示例相关的三个主要目录是 `src/example`、`public`、`src/components`（部分示例依赖其中的公共组件）。

改动时需要特别小心的目录：

- `src/components/mars-ui`、`src/components/mars-work`：被所有页面与示例共用，改动前先确认引用范围。
- `public/temp`：iframe 内示例的启动脚手架，改错会导致所有示例白屏。
- `public/lib/includeLibs.js`：第三方类库的加载顺序与 CDN 开关，顺序错会导致示例报「不是构造函数」。
- `src/widgets`：框架级控件，改动会影响所有带面板的示例。

## 启动与构建

### 前置条件

- Node.js `>=22.12.0`、npm `>=9.0.0`。
- 推荐使用 vscode，安装 volar（并禁用 vetur）、ESLint、Prettier 插件，参考[开发环境搭建教程](/guide/start/env.html)。
- `public/lib/` 下需存在示例依赖的类库；如需更新，可从 [http://mars3d.cn/download.html](http://mars3d.cn/download.html) 下载最新 mars3d 类库覆盖至该目录。

vscode 推荐参数（`setting.json`）：

```json
{
  "eslint.format.enable": true,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 下载代码

- [Github](https://github.com/marsgis/mars3d-vue-example)

```
git clone git@github.com:marsgis/mars3d-vue-example.git
```

- [Gitee](https://gitee.com/marsgis/mars3d-vue-example)：国内码云，下载速度快些。

```
git clone git@gitee.com:marsgis/mars3d-vue-example.git
```

### 安装依赖

```
npm install

// 或使用国内镜像
npm i --registry=https://registry.npmmirror.com
```

### 启动开发环境

```
npm run serve  // 服务启动后访问 http://localhost:3001
```

开发服务固定监听 `localhost:3001`。

### 编译构建

```
npm run build      // 编译后生成在 dist 目录，拷贝出去发布即可（构建前会自动执行 lint 检查）
npm run serve:dist // 本地预览 dist 运行状态
```

### 其他脚本

| 命令 | 作用 |
|---|---|
| `npm run dev` | 启动开发服务（不额外带 `--host`） |
| `npm run preview` | Vite 预览构建产物 |
| `npm run lint` | 类型检查 + ESLint |
| `npm run clean-cache` | 清理 `node_modules/.cache` 与 `node_modules/.vite` |
| `npm run clean-lib` | 删除 `node_modules` |

### 环境变量

变量写在项目根 `.env` / `.env.development` / `.env.production`，通过 `import.meta.env` 之外的 `process.env` 注入方式在代码里读取。

| 名称 | 作用 | 示例 | 是否必填 |
|---|---|---|---|
| `VITE_BASE_URL` | 部署基础路径，同时决定构建输出目录 `dist/<base>` | `/` | 是（`.env` 已给默认值） |
| `VITE_EXAMPLE_SOURCE_PATH` | 示例源码 / 资源根路径，开发与生产取值不同 | 开发 `src/example`、生产 `example` | 是 |
| `VITE_EDITOR_MODE` | 列表页点击示例后打开编辑页还是只读页 | `1` 编辑页、`0` 只读页 | 是 |

- 开发环境默认 `VITE_EDITOR_MODE=0`（点开示例进入只读页），生产环境默认 `1`。
- 未配置开发代理（`vite.config.mts` 无 `server.proxy`）；示例请求直接访问配置里的绝对 URL，跨域需由服务端配置 CORS。

## 页面与访问方式

项目是多页应用，没有前端路由，三个 HTML 入口各自独立打包。

| 路径 | 组件 | 作用 | 需登录 | 需地图 | 备注 |
|---|---|---|---|---|---|
| `/` | `src/pages/index/App.vue` | 示例列表页：按分类展示示例卡片，点击进入示例 | 否 | 否 | 列表本身不含地图；点击后按 `VITE_EDITOR_MODE` 跳转 |
| `/editor-vue.html?id=<示例路径>` | `src/pages/editor/App.vue` | 编辑页：代码编辑 + 地图运行，可改代码即时生效 | 否 | 是（iframe 内） | 可带 `&key=` 参数 |
| `/read-vue.html?id=<示例路径>` | `src/pages/read/App.vue` | 只读页：只运行示例与 UI 面板，不显示代码编辑器 | 否 | 是（iframe 内） | 可带 `&key=` 参数 |

- `id` 取示例在 `src/example` 下的相对路径，例如 `map/create/options`。
- 编辑页和只读页的地图都在 iframe（`#marsgis-mappage`）内运行，面板挂载到 `#mars-ui-root`。
- 项目没有登录、鉴权与路由守卫。

## 公共能力

### 组件

| 模块 | 内容 |
|---|---|
| `src/components/mars-ui` | 17 个基础组件（`mars-button`、`mars-dialog`、`mars-icon`、`mars-slider`、`mars-color-picker` 等），注册入口 `src/components/mars-ui/index.ts`；同时提供全局方法 `$message` / `$alert` / `$notify` / `$showLoading` / `$hideLoading` |
| `src/components/mars-work` | 列表页与工作区：`mars-head`（顶部导航）、`example-list`（示例卡片列表）、`main-operation`（按 `id` 动态加载示例的 `index.vue` 面板） |
| `src/components/mars-sample` | 示例通用业务组件：`layer-state`、`graphic-layer-state` 等，用于示例里的图层状态展示 |

`mars-ui` 同时封装了 Ant Design Vue，安装时会把两者一起注册到应用实例。

### 工具函数

| 位置 | 内容 |
|---|---|
| `src/utils/mars-util.ts` | `getQueryString`、`getExampleId`、`fetchJson`、单例弹窗封装等 |
| `src/utils/map-work.ts` | 地图业务就绪事件：`markMapWorkReady`（框架侧调用）、`onMapWorkReady`（面板侧订阅，返回取消订阅函数） |

### 状态模块

| 位置 | 内容 |
|---|---|
| `src/widgets/common/store/widget.ts` | Vuex `widget` 模块：控件面板的 `activate` / `disable`、`useWidget` 组合式用法 |
| `src/widgets/widget-store.ts` | 控件清单与初始打开项 `openAtStart`（默认 `["tools-button"]`） |

### 接口模块

仓库中没有统一的接口请求模块，示例按需直接调用第三方服务或读取静态 JSON。

## 数据流与接口约定

- 请求实例：没有统一的 axios 实例。`axios` 在 6 个文件里直接 `import` 使用——`src/utils/mars-util.ts` 与 5 个示例面板。
- baseURL 来源：无统一 baseURL；地址来自示例自身写死的服务地址、`public/config/example.json` 中的配置，或示例目录下 `config.json` 的地图配置。
- 鉴权：无 token、无 cookie、无登录态传递。
- 拦截器：未配置请求 / 响应拦截器。
- 错误处理：由调用方 `try/catch` 或 `.catch` 自行处理，提示统一走 `$message` / `$alert` 等全局方法。
- 超时与取消：未统一配置超时；未见 `AbortController` 统一封装。
- mock：仓库内没有 mock 目录与 mock 服务。
- 静态数据：示例清单来自 `public/config/example.json`；地图初始化参数来自各示例目录下的 `config.json`。

跨 iframe 数据流：

1. 框架侧（Vue 页）通过 `@marsgis/editor` 加载示例，把 `map.js` 与 `index.vue` 放入 iframe 运行。
2. iframe 内的 `public/temp/js/common.js` 创建地图后，把地图对象挂到父窗口：`parentGlobal._mapInstance = map`、`parentGlobal.mapWork = window`。
3. 面板（`index.vue`）用 `window.mapWork` 调用 `map.js` 里定义的函数；`map.js` 用 `new mars3d.BaseClass()` 的 `eventTarget.fire(...)` 把结果抛回面板，面板用 `mapWork.eventTarget.on(...)` 接收。
4. 地图业务初始化完成的信号由框架侧 `markMapWorkReady()` 发出，面板用 `onMapWorkReady(cb)` 等待后再访问图层等对象。

## 地图初始化与销毁链路

### 初始化入口

1. `editor-vue.html` / `read-vue.html` 加载 `src/pages/{editor,read}/main.ts`，创建 `MarsgisEditor` 实例（`@marsgis/editor`）。
2. 编辑器打开 `public/temp/template.html` 作为 iframe 内容，并按 `config.json` 组装地图参数。
3. iframe 内执行 `public/temp/js/common.js`：读取 `config/config.json` → `new mars3d.Map("mars3dContainer", options)`。
4. 地图对象挂到 `parentGlobal._mapInstance`，`map.js` 里的全部对象通过 `parentGlobal.mapWork` 暴露给面板。

### viewer 持有方式

- `map.js` 里用普通变量 `var map` 持有地图实例，不放进 `ref` / `reactive` / store。
- 跨 iframe 引用通过 `window._mapInstance` 与 `window.mapWork` 传递，不进入 Vue 响应式系统。

### 图层与数据源管理

- 各示例在 `map.js` 里自行创建与管理图层、图形、数据源，框架不做统一托管。
- 框架级图层管理能力在 `src/widgets/basic/manage-layers`，通过 `widget` store 控制显隐。
- 示例内的图层状态面板可复用 `src/components/mars-sample/layer-state.vue`、`graphic-layer-state.vue`。

### 事件注册与注销

- 地图业务 → 面板：`map.js` 用 `eventTarget.fire("事件名", 数据)`，面板用 `mapWork.eventTarget.on("事件名", cb)` 订阅。
- 面板 → 地图业务：面板直接调用 `window.mapWork` 上的函数。
- 就绪事件：`src/utils/map-work.ts` 的 `onMapWorkReady` 返回取消订阅函数，面板需在 `onBeforeUnmount` 里调用。
- 每个示例的地图事件（`map.on`）、`ScreenSpaceEventHandler`、定时器由示例自身注册与清理。

### 销毁时机

- 切换示例时：`marsEditor.on("loaded")` 先 `destroyUI()`（旧 `vueApp.unmount()`、置空），再 `initUI()` 挂载新面板，避免面板重复挂载（`src/pages/editor/main.ts`、`src/pages/read/main.ts`）。
- 地图实例：随 iframe 重新加载而重建；框架没有对每个示例统一调用 `map.destroy()`。示例 `src/example/map/fun/destroy` 演示了主动销毁地图的写法。
- 面板侧清理责任：`onMapWorkReady` 的取消订阅、`mapWork.eventTarget` 的解绑、示例内定时器与 handler 需在 `onBeforeUnmount` 中成对释放。

## 样式与设计规范

- 样式入口：`src/components/mars-ui/index.less`（全局重置与滚动条），由 `src/components/mars-ui/index.ts` 引入。
- 主题变量：`src/components/mars-ui/themes/dark/index.less`、`themes/light/index.less`，两套共约 71 个 CSS 变量，通过 `themes/index.ts` 一起引入。
- 变量命名：统一 `--mars-<用途>`，例如 `--mars-base-bg`、`--mars-text-color`、`--mars-control-bg`、`--mars-dropdown-bg`、`--mars-font-family`、`--mars-base-shadow`。
- 主题切换：`document.documentElement.dataset.theme` 决定生效变量组，默认 `dark`（`src/components/mars-ui/common.ts`）；浅色主题对应 `data-theme="light"`。
- 全局 less 变量与混入：`src/components/mars-ui/base.less` 已全局注入，可直接使用其中的变量与混入。
- UI 库主题：Ant Design Vue 通过 `ConfigProvider` 注入中文语言包与主题（`src/pages/*/App.vue`），组件样式按需引入。
- 断点：以 `993px` / `992px` 为主断点（`src/components/mars-work/mars-head.vue`），大于为 PC 布局、小于为移动布局；示例面板内部另有各自的窄屏适配。
- 字体：通过变量 `--mars-font-family` 统一设置；`public/font/` 提供字体资源。
- 间距与圆角：面板、弹窗、按钮沿用 `4px` / `2px` 圆角与 `4px` 倍数间距；新增样式优先使用已有变量，不写裸色值与魔法数字。
- 颜色使用约定：禁止在页面里直接写十六进制颜色，统一取 `--mars-*` 变量，新增变量先加到 `themes` 变量文件再使用。

## 单个示例的内部结构

每个示例都是一个单独的文件夹，均放在 `src/example` 示例目录下的子目录，因为示例众多，建议多级目录来管理。

示例目录下一般有 2 个文件（地图业务与 UI 解耦）：

- `map.js`：涉及地图业务的操作均写在这里；
- `index.vue`：Vue 组件面板，涉及 UI 层面、和地图无关的操作均写在这里。

### 依赖资源

配置的依赖会在 html 中按配置顺序加载，注意配置时依赖之间的先后顺序。

1. `libs` 依赖：公共的通用依赖，统一放在 `public/lib/` 目录下，并由 `includeLibs.js` 统一配置。`libs` 中通常是开源 js 库，如果示例只依赖 mars3d 相关资源，可省略该字段。

```json
{
  "name": "天地图地形",
  "main": "terrain/terrainTDT",
  "hasPannel": true,
  "libs": ["mars3d", "mars3d-tdt"],
  "thumbnail": "b10_terrain_tdt.jpg"
}
```

> 通过 `includeLibs.js` 中的 `isLocal` 变量，手动控制使用本地资源还是 CDN 资源。

2. `resources` 依赖：个性化资源，开发过程中提取封装的文件，比如单个示例本身使用的一些 js、css 文件。

```json
{
  "name": "POI兴趣点搜索(Cesium原生)",
  "main": "control/cesium/geocoder",
  "resources": ["cesiumControl.css"],
  "thumbnail": "d10_geocoder.jpg"
}
```

同级目录下只需要配置文件名，不在同级目录的需配置打包后文件位置的绝对路径，如 `/example/graphic/apply/typhoon/Typhoon.js`。

### 内部构造流程图

示例的内部构造处理流程图：

![image](http://mars3d.cn/dev/img/guide/example-vue-one.jpg)

## 添加新的示例

下面以 `src/example/map/sample/` 为例说明。

### 1. 在配置文件 example.json 中修改配置

在 `public/config/example.json` 中加上对应的配置项，这样就能在示例列表页面看到对应的示例卡片。

```json
{
  "name": "示例名称",
  "main": "map/sample", // 示例的相对路径
  "hasPannel": true, // 可选参数，表示是否存在 ui 面板，默认 false
  "libs": [], // 通用依赖项，可选参数，默认 ["mars3d"]
  "resources": ["cesiumControl.css"], // 个性化依赖项，可选参数，默认 []
  "thumbnail": "thumbnail.jpg" // 缩略图可选，默认为 thumbnail.jpg
}
```

> 注：上述配置里的 `main` 为 `src/example` 下的相对路径。

### 2. 新建示例对应目录

在 `src/example` 示例目录下新建对应示例的子目录，因为示例众多，建议多级目录来管理，示例中新建的是 `src/example/map/sample/` 目录。

### 3. 新建 map.js 地图业务文件

在目录下新建 `map.js`（文件名固定不可修改），主入口文件 `map.js` 主要用于处理地图相关业务。文件中必须加上 `initMap` 方法来初始化地球和相关业务，比如：

```js
var map
// 事件对象，用于抛出事件给面板
var eventTarget = new mars3d.BaseClass()

// 构造地图主方法【必须】
function initMap(options) {
  // 创建三维地球场景
  map = new mars3d.Map("mars3dContainer", options)
}
```

> 在 `map.js` 中存在以下全局方法，并且已经预先加载了 mars3d 相关依赖：

```js
globalMsg(msg, type, ...args) // message
globalAlert(msg, title, ...args) // alert
globalNotify(msg, disc, ...args) // notify
showLoading(type) // 显示 loading
hideLoading(type) // 关闭 loading
```

完成后即可访问 [http://localhost:3001/editor-vue.html?id=map/sample](http://localhost:3001/editor-vue.html?id=map/sample) 查看示例效果。

### 4.（按需可选）配置其他依赖资源

按示例本身需要来配置 `libs` 和 `resources` 依赖。

### 5.（按需可选）新建 index.vue 业务窗口面板

在目录下新增 `index.vue` 文件，该文件主要用于 UI 面板相关的业务代码。创建控件 Vue 面板，可以参考已有示例加上相关业务面板。

同时在 `example.json` 中的对应示例增加配置 `hasPannel: true`。

最简模板如下：

```html
<template>
  <mars-dialog> </mars-dialog>
</template>
<script lang="ts" setup></script>
<style scoped lang="less"></style>
```

#### 5.1 index.vue 面板操作 map.js 内地图相关对象

需要在 vue 中加上下面代码进行访问。`mapWork` 是 `map.js` 内定义的所有对象，由示例框架封装传递过来。

`index.vue` 文件中：

```js
const mapWork = window.mapWork

// 滑动条修改事件
const onSliderChange = () => {
  mapWork.updateBrightness(formState.brightness)
}
```

`map.js` 文件中：

```js
function updateBrightness(val) {
  bloomEffect.brightness = val
}
```

> 生命周期注意：`map.js` 的 `onMounted` 与 `index.vue` 的 `onMounted` 之间没有固定先后顺序
> （框架调用 `useLifecycle()` 的时机与面板挂载时机并不绑定）。如果面板要访问 `onMounted` 里才创建的对象
> （如 `graphicLayer`、`map`），请用 `onMapWorkReady` 等待地图业务就绪，否则会出现
> `window.mapWork.<对象> is undefined` 的报错。

`index.vue` 文件中：

```js
import { onMapWorkReady } from "@mars/utils/map-work"

onMounted(() => {
  // 无论 map.js 的 onMounted 先执行还是后执行，回调都只会在图层等对象创建完成后执行一次
  offMapWorkReady = onMapWorkReady(() => {
    mapWork.graphicLayer.flyTo()
  })
})

onBeforeUnmount(() => {
  offMapWorkReady && offMapWorkReady()
})
```

#### 5.2 map.js 地图业务中需要操作 index.vue 面板

`map.js` 文件中：

```js
// 抛出事件
var eventTarget = new mars3d.BaseClass()

// 完成操作或取到相关数据后
eventTarget.fire("loadOk", { 需要传递到vue中使用的对象 })
```

`index.vue` 文件中：

```js
// 取到 js 中的数据
mapWork.eventTarget.on("loadOk", function (event: any) {})
```

#### 5.3 map.js 和 index.vue 各自业务分离的原则

原则：

- 涉及地图业务的操作均写在 `map.js` 中。
- 涉及 UI 层面、和地图无关的操作均写在 `index.vue` 中，vue 中不得使用 mars3d 和 Cesium 开头的类（组件中除外）。

如何区分：

- 删除 `index.vue` 时不影响地图本身业务，`map.js` 需要正常运行。
- 删除 `map.js` 时，`index.vue` 需要正常展示 UI（除 `mapWork` 相关操作无响应外）。

## 阅读示例源码和调试学习

示例的目的是演示平台的每个功能点，可以按需求或兴趣去学习每一个示例：

- 学习中可以查询相关类的 API 文档；
- 尝试修改源码中参数、方法等，来体验不同的呈现效果。

## 开发中常见问题

### 1. 局域网离线使用时注意事项

平台所有代码层面来说支持离线运行和使用，但需要注意离线时的地图服务相关处理。

如果局域网内有相关地形、卫星底图服务，可以按内网服务类型和 URL 地址替换 `config.json` 或构造 Map 代码中的默认地形和底图。

如果局域网内没有相关服务，可以按下面处理：

- 修改 `config.json` 中 `terrain` 配置，将已有的 `"show": true` 改为 `"show": false`。
- 修改 `config.json` 中 `basemaps` 数组配置，将已有的 `"show": true` 的图层改为 `"show": false`，并将单张图片或离线地图设为 `"show": true`，同时修改相关 URL 地址。
- 也可以参考教程[发布三维数据服务](/guide/data/server.html)进行部署离线地图服务，里面也有一些示例离线数据。

### 2. src/example 中增加的资源访问 404

因为新增静态资源涉及拷贝，需要重启服务 `npm run serve`。

### 3. 面板访问 mapWork 报 undefined

面板挂载早于地图业务初始化，改用 `onMapWorkReady` 等待就绪后再访问，见「5.1 index.vue 面板操作 map.js 内地图相关对象」。

## 如何反馈问题

- 发现项目中存在的问题或者需要优化的地方；
- 有一些自己全新编写的示例，希望也开源与大家分享。

提交方式：

- 欢迎在 github 或 gitee 上[提交 PR](https://www.baidu.com/s?wd=在GitHub上提交PR)；
- 如果对 git 不熟悉，也可以整理示例代码发送邮件到 wh@marsgis.cn 由我们来整理集成。

## Mars3D 是什么

> `Mars3D 平台` 是一款基于 WebGL 技术实现的三维客户端开发平台，基于 [Cesium](https://cesium.com/cesiumjs/) 优化提升与 B/S 架构设计，支持多行业扩展的轻量级高效能 GIS 开发平台，能够免安装、无插件地在浏览器中高效运行，并可快速接入与使用多种 GIS 数据和三维模型，呈现三维空间的可视化，完成平台在不同行业的灵活应用。

> Mars3D 平台可用于构建无插件、跨操作系统、跨浏览器的三维 GIS 应用程序。平台使用 WebGL 来进行硬件加速图形化，跨平台、跨浏览器来实现真正的动态大数据三维可视化。通过 Mars3D 产品可快速实现浏览器和移动端上美观、流畅的三维地图呈现与空间分析。

### 相关网站

- Mars3D 官网：[http://mars3d.cn](http://mars3d.cn)
- Mars3D 开源项目列表：[https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)

## 版权说明

### 1. 本项目的授权

**mars3d-vue-example** 的项目源代码（包括但不限于 `src/` 目录下的页面、
组件、路由、状态管理、配置及项目模板代码）基于 **Apache License 2.0**
**完全开源**。在遵守协议的前提下，您可以自由地使用、复制、修改、合并、
发布、分发和再授权，**包括用于商业目的**。

### 2. 请注意：项目与 SDK 是两层相互独立的授权

本项目是 Mars3D SDK 的**示例工程 / 项目模板**，运行时依赖 **Mars3D SDK
核心类库**（`mars3d` 命名空间下的类库文件，通常位于 `public/lib/mars3d/`
目录、通过 `npm install mars3d` 安装，或通过 CDN 引入）。Mars3D SDK 是
独立授权的产品，其授权条款与本项目**相互独立**：

| 对比项 | 本项目（mars3d-vue-example） | Mars3D SDK |
| --- | --- | --- |
| 授权方式 | **Apache License 2.0** | 免费版：Apache-2.0 ＋ 附加条款；商业版：商业授权 |
| 是否开源 | 完全开源 | 以编译后的类库形式分发 |
| 页面 Logo |  | 免费版**必须保留**，不得移除 / 遮挡 / 规避；商业授权版可去除 |
| F12 控制台版权信息 |  | 免费版不得修改；商业授权版替换为被授权方单位名称 |
| 商业用途 | 自由使用 | 免费版可商用（须保留署名）；去除 Logo 需购买商业授权 |
| 协议依据 | 本仓库根目录 `LICENSE` | SDK 随附授权文件，或见 <https://mars3d.cn> |

**特别说明：**

- 本项目源代码的 Apache-2.0 授权**仅覆盖项目自身代码，不覆盖、不改变
  Mars3D SDK 的授权条款**，也不构成对 SDK 附加条款（Logo、F12 控制台
  信息保留义务）的豁免。
- 您基于本项目进行二次开发、打包、部署或对外交付时，只要运行时使用了
  Mars3D SDK，即应同时遵守 SDK 的授权条款。
- 仓库内随附的 SDK 类库文件（如 `public/lib/mars3d/` 目录）**不属于
  本项目的开源代码**，其著作权归 mars3d 团队所有，适用 SDK
  自身的授权协议。

### 3. 购买 SDK 商业授权

如您需要：去除页面周边的 Mars3D Logo；将 F12 控制台版权信息替换为
贵单位 / 项目名称；或在对外商业交付、政企招投标中取得盖章授权文件，
请购买 Mars3D SDK 商业授权👉 <http://mars3d.cn/buy.html>

购买后只需用授权版 SDK 覆盖项目中的类库文件，**项目代码无需任何修改**。
