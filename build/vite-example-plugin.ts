export default function examplePlugin(mode:string) {
  return {
    name: "transform-example",

    transform(source: string, id: string) {
      let code = source
      if (code.indexOf(`from "./map.js"`) !== -1 && id.endsWith(".vue")) {
        code = code.replace(/import \* as (\S*) from \"\.\/map\.js\"/g, "const $1 = window.mapWork")
      }
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
