<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <layer-state />
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">数据维护:</span>
        <mars-button @click="onClickStartDraw">图上标绘</mars-button>
        <a-checkbox v-model:checked="formState.enabledEdit" @change="onChangeHasEdit">是否编辑</a-checkbox>
      </a-space>
    </div>
    <data-manage />
  </mars-pannel>
  <location-to />
</template>

<script setup lang="ts">
import { reactive } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import DataManage from "@/components/mars-sample/data-manage.vue"
import LocationTo from "@/components/mars-sample/location-to.vue"
import LayerState from "@/components/mars-sample/layer-state.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"
interface FormState {
  enabledShowHide: boolean
  enabledPopup: boolean
  enabledTooltip: boolean
  enabledRightMenu: boolean
  enabledEdit: boolean
}

const formState: UnwrapRef<FormState> = reactive({
  enabledShowHide: true,
  enabledPopup: true,
  enabledTooltip: false,
  enabledRightMenu: true,
  enabledEdit: false
})

const onChangeHasEdit = () => {
  mapWork.updateLayerHasEdit(formState.enabledEdit)
}

const onClickStartDraw = () => {
  mapWork.startDrawGraphic()
}
</script>
