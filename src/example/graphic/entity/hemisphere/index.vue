<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <LayerState />
    </div>
    <div class="f-mb">
      <dataManage />
    </div>
  </PannelBox>
  <LocationTo />
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import dataManage from "@comp/MarsSample/DataManage.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
</script>
