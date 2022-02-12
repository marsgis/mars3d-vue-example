import fs from "fs"
export default function examplePlugin(mode: string) {
  return {
    name: "transform-example",
    load(id: string) {
      // 填坑：在transform中处理的是编译后的文件内容，导致了一些bug
      if (id.endsWith(".vue")) {
        const data = fs.readFileSync(id)
        let source = data.toString()

        if (source.indexOf(`from "./map.js"`) !== -1) {
          source = source.replace(/import \* as (\S*) from \"\.\/map\.js\"/g, "const $1 = window.mapWork")
          return source
        }
      }
    },
    transform(source: string, id: string) {
      let code = source
      if (/example\/.*\/map.js/.test(id) && mode === "development") {
        // 替换let const
        code = code.replace(new RegExp("export let ", "gm"), "var ")
        code = code.replace(new RegExp("export const ", "gm"), "var ")
        // 浏览器中运行时，删除"export "
        code = code.replace(new RegExp("export ", "gm"), "")
        // 删除const Cesium = mars3d.Cesium
        code = code.replace("const Cesium = mars3d.Cesium", "")
        code = code.replace(new RegExp("import ", "gm"), "// import ")
      }
      return {
        code
      }
    }
  }
}
