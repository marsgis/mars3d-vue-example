<template>
  <mars-pannel :visible="true" right="10" top="10">
    <div class="f-mb">
      <layer-state />
    </div>
    <div class="f-mb">
      <data-manage />
    </div>
  </mars-pannel>
  <location-to />
</template>

<script setup lang="ts">
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
</script>
