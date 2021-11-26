/**
 * 统一定义ts模块类型
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */

declare module "*.vue" {
  import { DefineComponent } from "vue"
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "nprogress" {
  export default any
}

declare module "*.less" {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module "mars-editor" {
  export default any
}
