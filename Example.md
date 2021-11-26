## 新增修改示例说明

## 创建一个新的示例

下面我们已`src\example\map\ui\`为示例说明

### 1. 新建示例对应目录

在`src\example`示例目录下新建对应示例的子目录，因为示例众多，建议多级目录来管理，当前我们新建了`src\example\map\ui\`目录。

### 2. 新建 map.js 地图业务文件

在目录下新建`map.js`（文件名固定不可修改）主入口文件 map.js 主要用于处理地图相关业务。
在文件中必须加上 initMap 方法来初始化地球和相关业务,比如：

```js
var map
function initMap() {
  // 创建三维地球场景
  var map = new mars3d.Map("mars3dContainer", {})
}
```

完成后我们即可访问 [http://localhost:8080/example.html?id=map/ui](http://localhost:8080/example.html?id=map/ui)来查看示例的效果。

### 2.1 其他依赖资源

本项目中依赖分为内部依赖和外部依赖

- 外部依赖：该功能需要依赖的一些开源代码，如 mars3d cesium 等，外部依赖在 public/lib/includeLibs.js 中统一管理，通过libs字段配置，依赖会在html中按配置顺序加载，注意依赖之间的先后关系

```json
{
  "name": "天地图地形",
  "main": "terrain/terrainTDT",
  "usePannel": true,
  "libs": ["mars3d", "mars3d-tdt"],
  "thumbnail": "b10_terrain_tdt.jpg"
}
```
如果示例只依赖 mars3d 相关资源，可省略libs字段

- 内部依赖：在开发过程中提取封装的文件的依赖资源，通过 resources 字段配置
```json
{
  "name": "POI兴趣点搜索(Cesium原生)",
  "main": "control/cesium/geocoder",
  "resources": ["cesiumControl.css"],
  "thumbnail": "d10_geocoder.jpg"
}
```
同级目录下只需要配置文件名，不在同级目录的 需配置打包后文件位置的绝对路径如 `/example/graphic/line/typhoon/Typhoon.js`

### 3. (按需可选)新建`index.vue`业务窗口面板

在目录下新增`index.vue`文件，该文件主要是用于 UI 面板相关的业务代码。
创建控件 Vue 面板，可以参考已有示例加上相关业务面板。

### 3.1. `index.vue`面板操作`map.js`内地图相关对象时。

需要在 vue 中加上下面代码进行访问

```js
// mapWork是map.js内定义的所有对象,目前在示例框架中做好了封装传递过来的。
const mapWork = window.mapWork
```

### 3.2. `map.js`地图业务中需要操作`index.vue`面板时。

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

### 3.3. `map.js`和`index.vue`各自代码业务分离的原则

原则：

- 涉及地图业务的操作均写在 map.js 中
- 涉及 UI 层面、和地图无关的操作均写在 index.vue 中,vue 中不得使用 mars3d 和 ceium 开头的类

**如何区分？**

- 删除 index.vue 时不影响地图本身业务，map.js 需要正常运行 ！！！
- 删除 map.js 时，index.vue 需要正常展示 UI(除 mapWork 相关操作无响应外) ！！！

### 4. 在 `public/config/example.json` 中加上对应的配置项，即可在示例列表页面看到对应的示例。

```json
{
  "name": "UI控件模板",
  "main": "map/sample",
  "usePannel": true // 如果使用业务窗口面板，usePannel需要配置为true
}
```

> 注：上述配置`main`为`src\example`下的相对路径

## 注意事项

……

## 常见问题

### 1.src\example\中增加的资源访问 404

因为新增静态资源涉及拷贝，需要重启服务 `npm run serve`
