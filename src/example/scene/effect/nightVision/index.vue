<template>
  <PannelBox class="infoView">
    <a-space>
      <span>启用:</span>
      <a-switch v-model:checked="checked" @change="isChecked" />
    </a-space>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const checked = ref(true)

const isChecked = () => {
  mapWork.chkShowEffect(checked.value)
}
</script>
