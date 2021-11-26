<template>
  <PannelBox class="infoView">
    <span>显示对应的数据点:</span>
    <a-switch v-model:checked="enabledUnderground" @change="chkUnderground" />
  </PannelBox>
  <div class="divPanel">
    <img src="img/legend/heatmap.png" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}
const enabledUnderground = ref(false)

const chkUnderground = () => {
  mapWork.chkUnderground(enabledUnderground.value)
}
</script>
<style scoped lang="less">
.divPanel {
  position: absolute;
  bottom: 40px;
  right: 20px;
}
.divPanel img {
  width: 40px;
  height: 180px;
}
</style>
