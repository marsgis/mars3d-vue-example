<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <graphic-layer-state />

    <mars-button class="f-push-10-t" href="/editor-vue.html?id=graphic/entity/addDynamicPosition-tileset"
      target="_blank">动态贴模型示例</mars-button>
    </mars-dialog>
  <location-to />
</template>

<script setup lang="ts">
import GraphicLayerState from "@mars/components/mars-sample/graphic-layer-state.vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
</script>
