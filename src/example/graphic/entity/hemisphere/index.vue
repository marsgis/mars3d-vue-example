<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <LayerState />
      </a-form-item>

      <a-form-item>
        <dataManage />
      </a-form-item>
    </a-form>
  </PannelBox>
  <LocationTo />
</template>

<script setup lang="ts">
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import dataManage from "@comp/MarsSample/DataManage.vue"
import LocationTo from "@comp/MarsSample/LocationTo.vue"
import LayerState from "@comp/MarsSample/LayerState.vue"
// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
</script>
