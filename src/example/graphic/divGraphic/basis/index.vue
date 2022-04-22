<template>
  <mars-pannel :visible="true" right="10" top="10">
    <layer-state />
    <div class="f-mb f-pt">
      <a-space>
        <span class="mars-pannel-item-label">数据维护:</span>
        <mars-button @click="onClickStartDraw">图上标绘</mars-button>
        <a-checkbox v-model:checked="enabledEdit" @change="onChangeHasEdit">是否编辑</a-checkbox>
      </a-space>
    </div>

    <data-manage />
  </mars-pannel>

  <location-to />
</template>

<script setup lang="ts">
import { ref } from "vue"
import DataManage from "@mars/components/mars-sample/data-manage.vue"
import LocationTo from "@mars/components/mars-sample/location-to.vue"
import LayerState from "@mars/components/mars-sample/layer-state.vue"
import * as mapWork from "./map.js"

const enabledEdit = ref(false)

const onChangeHasEdit = () => {
  mapWork.updateLayerHasEdit(enabledEdit.value)
}

const onClickStartDraw = () => {
  mapWork.startDrawGraphic()
}
</script>
