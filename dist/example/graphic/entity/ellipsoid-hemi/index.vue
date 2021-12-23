<template>
  <pannel class="infoView">
    <div class="f-mb">
      <layer-state />
    </div>
    <div class="f-mb">
      <data-manage />
    </div>
  </pannel>
  <location-to />
</template>

<script setup lang="ts">
import Pannel from "@/components/marsgis/pannel.vue"
import DataManage from "@comp/mars-sample/data-manage.vue"
import LocationTo from "@comp/mars-sample/location-to.vue"
import LayerState from "@comp/mars-sample/layer-state.vue"
</script>
