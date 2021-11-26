<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span>启用:</span>
          <a-switch v-model:checked="checked" @change="isChecked" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span>渐变:</span>
          <a-slider @change="gradations" v-model:value="gradationsValue" :min="1" :max="10" step="0.01" />
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const gradationsValue = ref<number>(4)

const checked = ref(true)

// 亮度
const gradations = () => {
  mapWork.gradations(gradationsValue.value)
}

const isChecked = () => {
  mapWork.chkShowEffect(checked.value)
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 110px;
  margin-left: -1px;
}
</style>
