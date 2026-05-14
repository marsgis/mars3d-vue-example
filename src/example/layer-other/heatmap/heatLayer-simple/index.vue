<template>
  <div class="divPanel">
    <img src="https://data.mars3d.cn/img/busines/legend-heatmap.png" />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import * as mapWork from "./map.js"

</script>

<style scoped lang="less">
.divPanel {
  position: absolute;
  bottom: 40px;
  right: 20px;
}

.divPanel img {
  width: 40px;
  height: 180px;
}
</style>
