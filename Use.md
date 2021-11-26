## 项目介绍

- 基于 Vue3.0 开发的 mars3d 示例项目 [前去体验](https://mars3d.cn/example)
- 老的示例项目将会保留到 2021-12-31，之后将废弃 [前去体验](https://mars3d.cn/example-old)

### 示例样板

- 用来演示一些常用组件的使用，便于开发查找对应控件，不会涉及太多 mars3d 的使用

### 功能示例

1. 只包含地图的示例，用来演示地图或者模型的渲染
2. 包含 ui 控件的示例，演示地图与控件之间如何交互

## 下载运行

### 下载

- [github](https://github.com/marsgis/mars3d-vue-example)
- [gitee](https://gitee.com/marsgis/mars3d-vue-example)

### 运行

- 推荐使用 vscode
- 安装依赖

```
npm i

使用代理
npm i --registry=http://registry.taobao.org

使用nrm
npm i -g nrm
nrm ls
nrm use taobao
```

- vscode 相关插件，推荐安装 volar（并禁用 vetur）、ESlint 、 Prettier

```json
// setting.json相关配置
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

- 运行项目 npm ru serve

### 问题或优化

- 发现项目中存在的问题或者需要优化的地方，欢迎提交pr
- 也可以发送邮件到 wh@marsgis.cn
