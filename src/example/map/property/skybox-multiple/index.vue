<template>
  <mars-dialog :visible="true" right="10" top="10" :width="330">
    <a-form :labelCol="{ span:4 }">
      <a-form-item label="融合值:">
        <mars-slider @change="onChangeSceneVal" v-model:value="select" :min="0" :max="2" :step="0.1" />
      </a-form-item>
    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const select = ref<number>(0)


// 亮度
const onChangeSceneVal = () => {
  mapWork.onChangeSceneVal(select.value)
}

</script>
<style lang="less" scoped>
</style>
