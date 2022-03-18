<template>
  <mars-pannel :visible="true" right="10" top="10" height="46">
    <layer-state />
  </mars-pannel>
  <location-to />
</template>

<script setup lang="ts">
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
</script>
