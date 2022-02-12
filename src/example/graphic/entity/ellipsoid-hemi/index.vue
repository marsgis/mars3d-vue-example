<template>
  <mars-pannel class="infoView">
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
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import DataManage from "@/components/mars-sample/data-manage.vue"
import LocationTo from "@/components/mars-sample/location-to.vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
</script>
