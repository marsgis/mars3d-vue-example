<template>
  <div id="legend">
    <div v-for="(item, index) in legendList" :key="index" class="legend-item">
      <div class="color-block" :style="{ backgroundColor: item.color }"></div>
      <span class="legend-label">{{ item.label }}</span>
    </div>
  </div>
</template>


<script setup lang="ts">
import * as mapWork from "./map.js"
import { computed, onMounted, ref } from "vue"

const legendList:any = ref<[]>([])

onMounted(() => {
  const breaks = mapWork.breaks
  const colors = mapWork.colors
  for (let i = breaks.length - 1; i >= 0; i--) {
    legendList.value.push({
      color: colors[i],
      label: (breaks[i] || "min") + "-" + (breaks[i + 1] || "max")
    })
  }

})

</script>
<style lang="less" scoped>
#legend {
  position: absolute;
  bottom: 40px;
  right: 10px;
  background: rgba(255, 255, 255, 0.4);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}
.legend-label{
  color:#000000;
}

.color-block {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border: 1px solid #ccc;
}
</style>
