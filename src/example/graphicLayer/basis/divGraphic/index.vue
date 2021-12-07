<template>
  <PannelBox class="infoView">
    <div class="f-mb">
      <LayerState />
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">数据维护:</span>
        <mars-button @click="btnDrawModel">图上标绘</mars-button>
        <a-checkbox v-model:checked="formState.enabledEdit" @change="bindEdit">是否编辑</a-checkbox>
      </a-space>
    </div>
    <dataManage />
  </PannelBox>
  <LocationTo />
</template>

<script setup lang="ts">
import { reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import dataManage from "@comp/MarsSample/DataManage.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
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

const bindEdit = () => {
  mapWork.bindEdit(formState.enabledEdit)
}

const btnDrawModel = () => {
  mapWork.btnDrawModel()
}
</script>
