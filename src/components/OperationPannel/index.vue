<template>
  <PannelComponent v-if="loaded" @vnode-mounted="onChildMounted" />
</template>
<script lang="ts">
/**
 * 操作面板入口
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { defineAsyncComponent, defineComponent, h, ref } from "vue"
import { getQueryString } from "@/utils/index"

let componentName: string | null = ""

export default defineComponent({
  components: {
    PannelComponent: defineAsyncComponent({
      loader: () => import(`@exmp/${componentName}/index.vue`),
      errorComponent: {
        render() {
          return h("")
        }
      }
    })
  },
  emits: ["childMounted"],
  setup(props, context) {
    const loaded = ref(false)
    const exampleId = getQueryString("id")
    if (exampleId) {
      componentName = exampleId
      loaded.value = true
    }
    const onChildMounted = () => {
      context.emit("childMounted")
    }
    return {
      loaded,
      onChildMounted
    }
  }
})
</script>

<style scoped lang="less"></style>
