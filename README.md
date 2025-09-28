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


首先建议您学习浏览一遍我们功能示例的源码（源码中会有大量注释），阅读源码时可以结合查阅API文档来理解类及方法的作用和参数说明等。

 

## 项目介绍

 这是一个基于`Vue3.0`开发的 Mars3D 功能示例 演示项目。

 > 如果您不熟悉Vue，也可以阅读：[功能示例原生JS版](http://mars3d.cn/docs/guide/example-es5/) 、[功能示例React版](http://mars3d.cn/docs/guide/example-react/)

 
## 项目特性 
- **最新技术栈**：使用 Vue3/Vite 等前端前沿技术开发
- **TypeScript**: 应用程序级 JavaScript 的语言

## 视频讲解

建议先看一遍视频讲解，再实际操作，您可以[新页面查看高清视频](https://www.bilibili.com/video/BV1PL41177SS/)


## 下载运行项目

### 下载代码
- [Github](https://github.com/marsgis/mars3d-vue-example)

```
git clone git@github.com:marsgis/mars3d-vue-example.git
```

- [Gitee](https://gitee.com/marsgis/mars3d-vue-example)：国内码云，下载速度快些。

```
git clone git@gitee.com:marsgis/mars3d-vue-example.git
```

### 运行环境

- 推荐使用 vscode，安装参考[开发环境搭建教程](/guide/start/env.html)
- 安装 vscode 插件，推荐安装 volar（并禁用 vetur）、ESlint 、 Prettier
- 配置 vscode 参数， setting.json 相关配置

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

- 下载最新lib
建议从[http://mars3d.cn/download.html](http://mars3d.cn/download.html)下载最新mars3d类库后覆盖至`public/lib/`目录下，更新mars3d为最新版本。


### 运行命令
请将机器Node版本升级到v18及以上版本(建议下载安装官网最新稳定版本)

#### 首次运行前安装依赖
```
npm install

//或使用代理
npm i --registry=http://registry.taobao.org
```

#### 启动开发环境
```
npm run serve
```

#### 编译构建

```
npm run build //编译后生成在dist目录，拷贝出去发布即可
npm run serve:dist  //测试dist运行状态

// 或者将dist文件夹发布在自己的服务数据上
```
 

### 运行效果  
 [在线体验](http://mars3d.cn/example.html?type=vue)  

 ![image](http://marsgis.cn/img/project/mars3d-doc/example1.jpg)


 
## 如何反馈问题？
- 发现您发现项目中存在的问题或者需要优化的地方；
- 如果您有一些自己全新编写的示例，希望也开源与大家分享。

提交方式：
- 欢迎在github或gitee上[提交PR](https://www.baidu.com/s?wd=在GitHub上提交PR) 
- 如果对git不熟悉，也可以整理示例代码发送邮件到 wh@marsgis.cn 由我们来整理集成。

 


## 项目架构

### 技术选型
- [Vue3](https://v3.vuejs.org/)：开发框架熟悉
- [Vite](https://cn.vitejs.dev/)：开发环境
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Ant Design Vue](https://next.antdv.com/components/overview-cn/)：UI 控件库 
- [ESlint](https://eslint.bootcss.com/)：代码检查工具 
- [IconPark](https://iconpark.oceanengine.com/official)：UI 图标库 

> 需要有一定的知识储备，包括 vue3.0 中的 composition Api 模式等，建议浏览下[Web前端知识视频讲解](https://www.bilibili.com/video/BV1xr4y1U73r/)



### 主要目录说明
```
mars3d-vue-example
└───src                 主要项目代码
│   └───components      vue组件代码【重要】
│   └───example         示例代码【重要】
│   └───misc            主要存放ts相关的模块定义
│   └───pages           页面入口
│   └───styles          样式文件
│   └───utils           工具方法
└───public              无需编译构建的静态资源【重要】
│   └───config          项目和功能的配置文件
│   └───img             图片资源
│   └───lib             示例依赖资源
│   └───temp            示例的公共基础代码
│───.eslintrc.js        eslint配置文件
│─── package.json       项目配置信息
└─── vite.config.ts     vite 配置文件
└─── index.html         列表页入口
└─── editor-vue.html        编辑器页面入口
```
与示例相关的3个主要目录是：`src\example`、`public`、`src\components`(部分功能依赖)。

#### 示例主目录
 
- 位置 src/example
- 项目中的每一个示例对应了本目录下的一个 map.js 文件，如果包含 ui 面板，需要创建一个 index.vue
- 一些情况下可以将 example 视为 public 下的一个目录


#### 依赖资源

配置的依赖会在html中按配置顺序加载，注意配置时依赖之间的先后顺序。

1. libs 依赖，公共的通用依赖，统一放在`public/lib/`目录下，并由includeLibs.js统一配置。 libs中通常会是一些开源的 js 库，如果示例只依赖 mars3d 相关资源，可省略libs字段。

```json
{
  "name": "天地图地形",
  "main": "terrain/terrainTDT",
  "hasPannel": true,
  "libs": ["mars3d", "mars3d-tdt"],
  "thumbnail": "b10_terrain_tdt.jpg"
}
```

> 通过 includeLibs.js 中的 isLocal 变量，手动控制使用本地资源，还是 CDN 资源

2. resources 依赖，一些个性化的资源,在开发过程中提取封装的文件的依赖资源，比如只是单个示例本身使用的一些js、css文件。
 
```json
{
  "name": "POI兴趣点搜索(Cesium原生)",
  "main": "control/cesium/geocoder",
  "resources": ["cesiumControl.css"],
  "thumbnail": "d10_geocoder.jpg"
}
```
同级目录下只需要配置文件名，不在同级目录的 需配置打包后文件位置的绝对路径如 `/example/graphic/apply/typhoon/Typhoon.js`



## 单个示例的内部结构

每个示例都是一个单独的文件夹，均放在`src\example`示例目录下的子目录，因为示例众多，建议多级目录来管理。

### 示例相关文件
示例目录下，一般有2个文件（地图业务与UI解耦）：

- map.js文件：涉及地图业务的操作均写在 map.js 中；

- index.vue 文件：是一个Vue组件面板，涉及 UI 层面、和地图无关的操作均写在 index.vue 中；

 
### 内部构流程图
示例的内部构造处理流程图：

![image](http://mars3d.cn/dev/img/guide/example-vue-one.jpg)

## 添加新的示例

下面我们以`src\example\map\sample\`为示例说明。

### 1. 配置文件 example.json 中修改配置

在 `public/config/example.json` 中加上对应的配置项，这样就能在示例列表页面看到对应的示例卡片。

```json
{
  "name": "示例名称",
  "main": "map/sample", //示例的相对路径
  "hasPannel": true, // 可选参数，表示是否存在ui面板，默认false
  "libs": [], // 通用依赖项，可选参数 默认 ["mars3d"]
  "resources": ["cesiumControl.css"], // 个性化依赖项, 可选参数，默认 []
  "thumbnail": "thumbnail.jpg" // 缩略图可选, 默认为 thumbnail.jpg
}
```

> 注：上述配置`main`为`src\example`下的相对路径

### 2. 新建示例对应目录

在`src\example`示例目录下新建对应示例的子目录，因为示例众多，建议多级目录来管理，当前我们新建了`src\example\map\sample\`目录。

### 3. 新建 map.js 地图业务文件

在目录下新建`map.js`（文件名固定不可修改）主入口文件 map.js 主要用于处理地图相关业务。
在文件中必须加上 initMap 方法来初始化地球和相关业务,比如：

最简结构如下

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

> 在 map.js 中 存在以下全局方法, 并且已经预先加载了 mar3d 相关依赖

```js
globalMsg(msg, type, ...args) // message
globalAlert(msg, title, ...args) // alert
globalNotify(msg, disc, ...args) // notify
showLoading(type) // 显示loading
hideLoading(type) // 关闭loading
```

完成后我们即可访问 [http://localhost:8080/editor-vue.html?id=map/sample](http://localhost:8080/editor-vue.html?id=map/sample)来查看示例的效果。

### 4. (按需可选)配置其他依赖资源

按示例本身需要来配置 libs 和 resources 依赖。

### 5. (按需可选)新建`index.vue`业务窗口面板

在目录下新增`index.vue`文件，该文件主要是用于 UI 面板相关的业务代码。
创建控件 Vue 面板，可以参考已有示例加上相关业务面板。

同时在 example.json 中的对应示例增加配置`hasPannel:true`

最简模板如下:

```html
<template>
  <mars-dialog> </mars-dialog>
</template>
<script lang="ts" setup></script>
<style scoped lang="less"></style>
```

#### 5.1. `index.vue`面板操作`map.js`内地图相关对象时。

需要在 vue 中加上下面代码进行访问

index.vue 文件中：

```js
// mapWork是map.js内定义的所有对象,目前在示例框架中做好了封装传递过来的。
const mapWork = window.mapWork

// 滑动条修改事件
const onSliderChange = () => {
  mapWork.updateBrightness(formState.brightness)
}
```

map.js 文件中：

```js
// map.js中
function updateBrightness(val) {
  bloomEffect.brightness = val
}
```

#### 5.2. `map.js`地图业务中需要操作`index.vue`面板时。

map.js 文件中：

```js
// 抛出事件
var eventTarget = new mars3d.BaseClass()

//完成操作或取到相关数据后
eventTarget.fire("loadOk", { 需要传递到vue中使用的对象 })
```

index.vue 文件中：

```js
// 取到js中的数据
mapWork.eventTarget.on("loadOk", function (event: any) {})
```

#### 5.3. `map.js`和`index.vue`各自代码业务分离的原则

原则：

- 涉及地图业务的操作均写在 map.js 中
- 涉及 UI 层面、和地图无关的操作均写在 index.vue 中,vue 中不得使用 mars3d 和 Cesium 开头的类(组件中出除外)

**如何区分？**

- 删除 index.vue 时不影响地图本身业务，map.js 需要正常运行 ！！！
- 删除 map.js 时，index.vue 需要正常展示 UI(除 mapWork 相关操作无响应外) ！！！

## 阅读示例源码和调试学习

示例的目的是演示平台的每个功能点，可以按需求或兴趣去学习每一个示例，

- （1）学习中可以查询相关类的 API 文档
- （2）尝试修改源码中参数、方法等，来体验不同的呈现效果。

## 开发中常见问题

### 1. 局域网离线使用时注意事项

平台所有代码层面来说支持离线运行和使用的，但需要注意的是离线时的地图服务的相关处理。

如果局域网内有相关地形、卫星底图服务可以按内网服务类型和 URL 地址替换下`config.json`或`构造Map的代码中`的默认地形和底图。

如果局域网内没有相关服务，可以按下面处理：

- 修改 config.json 中`terrain`配置中，将已有的`"show": true`配置，改为`"show": false`
- 修改 config.json 中`basemaps`数组配置中，将已有的`"show": true`的图层，将该值改为`"show": false` ，并将单张图片或离线地图加上`"show": true`，并修改相关 URL 地址。
- 您也可以参考教程[发布三维数据服务](/guide/data/server.html)进行部署离线地图服务，里面也有一些示例离线数据。


### 2. src\example\中增加的资源访问 404

因为新增静态资源涉及拷贝，需要重启服务 `npm run serve`

## Mars3D 是什么

> `Mars3D平台` 是[火星科技](http://marsgis.cn/)研发的一款基于 WebGL 技术实现的三维客户端开发平台，基于[Cesium](https://cesium.com/cesiumjs/)优化提升与 B/S 架构设计，支持多行业扩展的轻量级高效能 GIS 开发平台，能够免安装、无插件地在浏览器中高效运行，并可快速接入与使用多种 GIS 数据和三维模型，呈现三维空间的可视化，完成平台在不同行业的灵活应用。

> Mars3D 平台可用于构建无插件、跨操作系统、 跨浏览器的三维 GIS 应用程序。平台使用 WebGL 来进行硬件加速图形化，跨平台、跨浏览器来实现真正的动态大数据三维可视化。通过 Mars3D 产品可快速实现浏览器和移动端上美观、流畅的三维地图呈现与空间分析。

### 相关网站

- Mars3D 官网：[http://mars3d.cn](http://mars3d.cn)

- Mars3D 开源项目列表：[https://github.com/marsgis/mars3d](https://github.com/marsgis/mars3d)
