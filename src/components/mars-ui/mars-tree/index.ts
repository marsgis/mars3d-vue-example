import { Tree } from "ant-design-vue"
import { App, defineComponent, h } from "vue"
import { Icon } from "@iconify/vue"
import "./tree.less"

/**
 * 树控件
 * @copyright 火星科技 mars3d.cn
 * @author 火星吴彦祖 2021-11-01
 */
const MarsTree = defineComponent({
  name: "mars-tree",
  inheritAttrs: false,
  setup(props, context) {
    const icon = (isLeaf: boolean, expanded: boolean) => {
      if (isLeaf) {
        return [h(Icon, { icon: "gis:layer-stack", width: "18", color: "#4db3ff" })]
      } else if (expanded) {
        return [h(Icon, { icon: "ant-design:folder-open-filled", width: "20", color: "#db9829" })]
      } else if (!expanded) {
        return [h(Icon, { icon: "ant-design:folder-filled", width: "14", color: "#db9829", class: "icon-vertical-a" })]
      }
    }
    return () =>
      h(
        Tree,
        {
          showIcon: true,
          showLine: true,
          ...context.attrs,
          ...props
        },
        {
          icon: ({ isLeaf, expanded }: any) => h("span", null, icon(isLeaf, expanded)),
          ...context.slots
        }
      )
  }
})

export function install(app: App): App {
  app.component(MarsTree.name, MarsTree)
  return app
}
export default MarsTree
