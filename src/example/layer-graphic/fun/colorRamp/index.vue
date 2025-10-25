<template>
  <div class="legend">
    <img :src="imageData" class="legend-image" />
    <div class="legend-items-container">
      <div v-for="(item, index) in steps" :key="index" class="legend-item">
        <span class="legend-label">{{ item }}</span>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import * as mapWork from "./map.js"
import { onMounted, ref } from "vue"

const steps: any = ref<string[]>()
const imageData: any = ref<any>()

onMounted(() => {
  imageData.value = mapWork.colorRamp.getImage()
  steps.value = [...mapWork.colorRamp.steps].reverse()
})

</script>
<style lang="less" scoped>
.legend {
  position: absolute;
  bottom: 40px;
  right: 10px;
  background: rgba(255, 255, 255, 0.4);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;

  .legend-image {
    height: 250px;
    width: 20px;
    position: absolute;
    /* 绝对定位 */
    top: 10px;
    left: 10px;
    z-index: 1;
    /* 图片层级较低 */
  }

  .legend-items-container {
    position: relative;
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 30px;
    z-index: 2;
    /* 图例项层级较高 */
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    border-radius: 3px;
  }

  .legend-label {
    color: #000000;
    font-size: 12px;
  }
}
</style>
