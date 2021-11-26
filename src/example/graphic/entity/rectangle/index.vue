<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState/>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">数据维护:</span>
          <mars-button @click="btnDrawModel">绘制矩形</mars-button>
          <mars-button @click="btnDrawModelExtruded">立体矩形</mars-button>
          <a-checkbox
            v-model:checked="enabledEdit"
            @change="bindEdit"
            >是否编辑</a-checkbox
          >
        </a-space>
      </a-form-item>

      <a-form-item>
        <dataManage />
      </a-form-item>
    </a-form>
  </PannelBox>
  <LocationTo/>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import dataManage from "@comp/MarsSample/DataManage.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const enabledEdit = ref(false)

const bindEdit = () => {
  mapWork.bindEdit(enabledEdit.value)
}

const btnDrawModel = () => {
  mapWork.btnDrawModel()
}
const btnDrawModelExtruded = () => {
  mapWork.btnDrawModelExtruded()
}
</script>
