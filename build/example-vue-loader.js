/**
 * 自定义loader 用于处理mapWork的加载方式
 * @param {String} source vue源代码
 * @return {String} 返回处理后的vue代码
 * @author 火星吴彦祖
 */
module.exports = function (source) {
  if (source.indexOf(`from "./map.js"`) !== -1) {
    source = source.replace(/import \* as (\S*) from \"\.\/map\.js\"/g, "const $1 = window.mapWork")
  }
  return source
}
