<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <layer-state />

    <mars-button class="f-push-10-t" href="editor-vue.html?id=graphic/primitive/addDynamicPosition-tileset"
      target="_blank">动态贴模型示例</mars-button>
  </mars-dialog>
</template>

<script lang="ts" setup>
import LayerState from "@mars/components/mars-sample/layer-state.vue"
</script>
