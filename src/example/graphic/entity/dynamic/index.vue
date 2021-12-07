<template>
  <PannelBox class="infoView">
    <LayerState />
    <mars-button href="editor.html?id=graphic/entity/dynamic3Dtiles" target="_blank">动态贴模型示例</mars-button>
  </PannelBox>
  <LocationTo />
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
</script>
