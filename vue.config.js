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
  lintOnSave: true,
  // 它支持webPack-dev-server的所有选项
  devServer: {
    host: "localhost", // 也可以直接写IP地址这样方便真机测试
    port: 2021, // 端口号
    https: false, // https:{type:Boolean}
    open: true // 配置自动启动浏览器
  },
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
    devServer: {
      historyApiFallback: false
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: [
            {
              // 本地引用loader
              loader: path.resolve("./build/example-vue-loader.js")
            }
          ]
        }
      ]
    },
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

    // 移除 prefetch preload 插件
    config.plugins.delete("preload-editor")
    config.plugins.delete("prefetch-editor")
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
