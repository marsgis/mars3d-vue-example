<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState />
        <mars-button href="editor.html?id=graphic/entity/dynamic3Dtiles" target="_blank">动态贴模型示例</mars-button>
      </a-form-item>
    </a-form>
  </PannelBox>
  <LocationTo />
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
</script>
