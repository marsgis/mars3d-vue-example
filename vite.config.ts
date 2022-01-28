import type { ConfigEnv } from "vite"
import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import examplePlugin from "./build/vite-example-plugin"
import copyPlugin from "rollup-plugin-copy"
import path from "path"
import monacoEditorPlugin from "vite-plugin-monaco-editor"
import eslintPlugin from "vite-plugin-eslint"
// import MonacoEditorNlsPlugin, { esbuildPluginMonacoEditorNls, Languages } from "vite-plugin-monaco-editor-nls"
const { getThemeVariables } = require("ant-design-vue/dist/theme")

export default ({ mode }: ConfigEnv) => {
  const root = process.cwd()

  const ENV = loadEnv(mode, root)
  // console.log(`当前环境信息：`, mode)
  // console.log(`ENV：`, ENV)

  return defineConfig({
    base: ENV.VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@comp": path.resolve(__dirname, "src/components"),
        "@exmp": path.resolve(__dirname, "src/exmp")
      }
    },
    server: {
      host: "localhost",
      https: false,
      port: 2002
    },
    build: {
      assetsDir: "example/assets",
      rollupOptions: {
        input: {
          // index: path.resolve(__dirname, "index.html"),
          editor: path.resolve(__dirname, "editor.html")
          // read: path.resolve(__dirname, "read.html")
        }
      }
    },
    define: {
      "process.env": {
        mode: mode,
        BASE_URL: ENV.VITE_PUBLIC_PATH,
        EXAMPLE_SOURCE_PATH: ENV.VITE_EXAMPLE_SOURCE_PATH,
        EXAMPLE_MODE: ENV.VITE_EXAMPLE_MODE
      }
    },
    plugins: [
      vue(),
      eslintPlugin({
        cache: false
      }),
      examplePlugin(mode),
      monacoEditorPlugin({ publicPath: "example/assets" }),
      // MonacoEditorNlsPlugin({ locale: Languages.zh_hans }),
      {
        ...copyPlugin({
          hook: "closeBundle",
          targets: [
            {
              src: "src/components/**/*.vue",
              dest: "dist/vue",
              rename: (_name, _extension, fullPath) => {
                return fullPath.split("components")[1]
              }
            },
            {
              src: "src/example/**/*.*",
              dest: "dist/example",
              rename: (_name, _extension, fullPath) => {
                return fullPath.split("example")[1]
              }
            }
          ]
        })
      }
    ],
    optimizeDeps: {
      exclude: ["mars3d"],
      esbuildOptions: {
        plugins: [
          // esbuildPluginMonacoEditorNls({
          //   locale: Languages.zh_hans
          // })
        ]
      }
    },
    css: {
      preprocessorOptions: {
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
  })
}
