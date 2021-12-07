<template>
  <PannelBox class="infoView">
    <mars-select
      ref="select"
      v-model:value="value1"
      style="width: 200px"
      :options="selectOptions"
      @focus="focus"
      @change="handleChange"
    ></mars-select>

    <div v-for="rg in state" :key="rg.name">
      <a-space>
        <span>{{ rg.name }}</span>
        <a-slider :min="rg.minimum" :max="rg.maximum" :step="0.1" v-model:value="rg.current" />
      </a-space>
    </div>
  </PannelBox>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import * as mapWork from "./map.js"

const value1 = ref<string>("火箭整体")

const selectOptions = ref<any[]>([])

const dataList = ref<any[]>([])

const state = ref<any[]>([])

mapWork.eventTarget.on("loadOk", function (event: any) {
  const modelData = event.articulations
  dataList.value = modelData
  for (let i = 0; i < modelData.length; i++) {
    const data = modelData[i]
    selectOptions.value.push({
      value: data.name,
      lable: data.name,
      states: data.stages
    })
  }
})

const handleChange = (value: any, option: any) => {
  state.value = option.states
}
</script>
<style scoped lang="less">
.ant-slider {
  width: 160px;
}
.infoView {
  width: 300px;
}
</style>
