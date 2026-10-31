import path from "path"
import { fileURLToPath } from "url"
import { defineConfig } from "vitest/config"
import vue from "@vitejs/plugin-vue"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * 模块 04 · 单元测试配置
 * - 只覆盖 tests/unit；不改变 vite.config.ts 的构建与 dev server 行为
 * - 组件测试需要 Vue 单文件编译能力，第二批加入 plugin-vue
 * - 第4步（D025）：接入 @vitest/coverage-v8，覆盖率分母＝入口页 + 公共层
 *   （src/pages、src/components、src/utils、src/widgets），src/example 作为
 *   示例工程单列不计入并写明理由（见任务单 D025 回执）。
 * - 门槛：入口页行/分支 100%，全仓业务源码行 ≥90%。
 */
export default defineConfig({
  plugins: [
    vue({
      template: {
        // 测试环境下 @vitejs/plugin-vue 默认 includeAbsolute:true，
        // 会把 <img src="/img/..."> 转成 import，导致 createRequire 解析失败。
        transformAssetUrls: { includeAbsolute: false }
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@mars": path.resolve(__dirname, "src")
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/unit/setup.ts"],
    include: ["tests/unit/**/*.spec.ts"],
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json", "lcov"],
      reportsDirectory: "coverage",
      include: [
        "src/pages/**",
        "src/components/**",
        "src/utils/**",
        "src/widgets/**"
      ],
      exclude: [
        "src/example/**",
        "**/*.d.ts",
        "**/assets/**",
        "**/*.less",
        "**/*.css",
        "**/*.json",
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.md",
        "tests/**",
        // 纯数据配置文件：超大对象字面量，v8 无法逐行插桩，且无业务逻辑
        "src/widgets/basic/graphic-options/config/style.js",
        "src/widgets/basic/graphic-options/config/material.js"
      ],
      thresholds: {
        lines: 90,
        "src/pages/**": {
          lines: 100,
          branches: 100
        }
      }
    }
  }
})
