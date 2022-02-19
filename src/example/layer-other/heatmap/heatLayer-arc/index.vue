<template>
  <mars-pannel :visible="true" right="10" top="10">
    <span>显示对应的数据点:</span>
    <a-switch v-model:checked="enabledUnderground" @change="chkUnderground" />
  </mars-pannel>
  <div class="divPanel">
    <img src="/img/legend/heatmap.png" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const enabledUnderground = ref(false)

const chkUnderground = () => {
  mapWork.chkUnderground(enabledUnderground.value)
}
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
