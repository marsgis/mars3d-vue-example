<template>
  <mars-dialog :visible="true" right="10" top="10" >
    <div >
      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">自动切换:</span>
          <mars-switch v-model:checked="formState.enabled" @change="mapWork.changePlay(formState.enabled)" />
        </a-space>
      </div>
      <div class="f-mb">
        <a-space>
          <span class="mars-pannel-item-label">线框扫描:</span>
          <mars-switch v-model:checked="formState.outline" @change="mapWork.changeOutline(formState.outline)" />
        </a-space>
      </div>

      <div>
        <a-space>
          <span class="mars-pannel-item-label">外观过渡:</span>
          <mars-slider @change="mapWork.changeHeight(formState.height)" v-model:value="formState.height" :min="-100" :max="200" />
        </a-space>
      </div>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { reactive } from "vue"
import * as mapWork from "./map.js"

const formState = reactive({
  enabled: true,
  outline: true,
  height: 1
})

</script>
<style scoped lang="less">
.ant-slider {
  width: 120px;
}
</style>
