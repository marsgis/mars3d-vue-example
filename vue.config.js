const path = require("path")
const { getThemeVariables } = require("ant-design-vue/dist/theme")
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.BASE_URL,
  outputDir: "dist/",
  assetsDir: "static",
  productionSourceMap: false,
  pages: {
    index: {
      entry: "src/pages/index/main.ts",
      template: "public/index.html",
      filename: "index.html",
      title: "Mars3D功能列表",
      chunks: ["chunk-vendors", "chunk-common", "index"]
    },
    editor: {
      entry: "src/pages/editor/main.ts",
      template: "public/index.html",
      filename: "editor.html",
      title: "Mars3D示例",
      chunks: ["chunk-vendors", "chunk-common", "editor"]
    }
  },
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/example/**/*",
            to: path.join(__dirname, "dist"),
            transformPath(targetPath) {
              return path.join("example", targetPath.split("example")[1])
            }
          },
          {
            from: "src/components/**/*.vue",
            to: path.join(__dirname, "dist"),
            transformPath(targetPath) {
              return path.join("vue", targetPath.split("components")[1])
            }
          }
        ]
      })
    ]
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("src")).set("@comp", resolve("src/components")).set("@exmp", resolve("src/example"))

    config.plugin("monaco-editor").use(MonacoWebpackPlugin)
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          ...getThemeVariables({
            dark: true
          }),
          "border-color-base": "#cde1de",
          "primary-color": "#4db3ff",
          "body-background": "#1c222b",
          "font-size-base": "12px"
        },
        javascriptEnabled: true
      }
    }
  }
}

// 发布编译时去掉index
if (process.env.NOINDEX) {
  delete module.exports.pages.index
}
