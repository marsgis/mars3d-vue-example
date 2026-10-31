import fs from "fs"
import path from "path"
import type { Plugin } from "vite"

/**
 * 发布包裁剪：`public/lib` 中的第三方 sourcemap 与调试副本会被原样复制进 outDir，
 * 暴露第三方实现并增大体积（I041 / D033）。
 *
 * 构建结束（closeBundle）时删除 lib 目录下的 .map、*-debug.js、*-src.js，
 * 并去掉保留的 js 末尾指向已删除 map 的 `sourceMappingURL` 注释，避免浏览器额外请求 404。
 * 只作用于构建产物：`public/lib` 源文件与 `npm run serve` 下的调试能力（`includeLibs.js`
 * 的 `muyao-debugger` 开关）保持不变。
 */
export default function pruneLibDebugAssets(): Plugin {
  let libDir = ""
  return {
    name: "mars3d:prune-lib-debug-assets",
    apply: "build",
    configResolved(config) {
      libDir = path.resolve(config.root, config.build.outDir, "lib")
    },
    closeBundle() {
      if (!libDir || !fs.existsSync(libDir)) {
        return
      }
      const removed: string[] = []
      for (const file of walk(libDir)) {
        if (/\.map$|-debug\.js$|-src\.js$/.test(file)) {
          fs.rmSync(file)
          removed.push(path.relative(libDir, file))
        } else if (file.endsWith(".js")) {
          stripSourceMappingUrl(file)
        }
      }
      if (removed.length > 0) {
        console.log(`[prune-lib] 已从发布包移除 ${removed.length} 个第三方调试产物：`)
        for (const file of removed) {
          console.log(`  - lib/${file}`)
        }
      }
    }
  }
}

function walk(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    return entry.isDirectory() ? walk(fullPath) : [fullPath]
  })
}

const SOURCE_MAPPING_URL = /(?:\/\/[#@][ \t]*sourceMappingURL=[^\r\n]*\s*|\/\*[#@][ \t]*sourceMappingURL=[\s\S]*?\*\/\s*)$/

function stripSourceMappingUrl(file: string) {
  const source = fs.readFileSync(file, "utf8")
  const stripped = source.replace(SOURCE_MAPPING_URL, "")
  if (stripped !== source) {
    fs.writeFileSync(file, stripped)
  }
}
