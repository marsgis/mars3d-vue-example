<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState />
      </a-form-item>
      <a-form-item>
        <dataManage />
      </a-form-item>
    </a-form>
  </PannelBox>
  <LocationTo />
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import dataManage from "@comp/MarsSample/DataManage.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
</script>
