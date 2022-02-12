<template>
  <mars-pannel class="infoView">
    <div class="f-mb">
      <a-space>
        <span>日期选择:</span>
        <mars-date-picker v-model:value="currDate" valueFormat="YYYY-MM-DD" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>时间选择:</span>
        <a-slider @change="timeChange" v-model:value="timeVal" :min="0" :max="1440" :step="1" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>当前时间:</span>
        <span>{{ currDate }} {{ hours }} 时 {{ minutes }}分</span>
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span>自动播放:</span>
        <mars-button @click="startPlay">播放</mars-button>
        <mars-button @click="stopPlay">暂停</mars-button>
      </a-space>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import dayjs from "dayjs"
import * as mapWork from "./map.js"

const timeVal = ref<number>(420)

const currDate = ref<string>(dayjs().format("YYYY-MM-DD"))
const currTime = ref(0)

const hours = computed(() => Math.floor(currTime.value / 60))
const minutes = computed(() => Math.floor(currTime.value % 60))

mapWork.eventTarget.on("loadOk", (event: any) => {
  const date = event.shadowTime

  currTime.value = date.getHours() * 60 + date.getMinutes()

  timeVal.value = currTime.value
})

mapWork.eventTarget.on("shadows", () => {
  timeChange()
})

const timeChange = () => {
  mapWork.setShadows(timeVal.value, currDate.value)
  currTime.value = timeVal.value
}

const startPlay = () => {
  mapWork.startPlay(timeVal.value, currDate.value)
}
const stopPlay = () => {
  mapWork.stopPlay()
}
</script>
<style scoped lang="less">
.mars-pannel-item-label {
  width: 55px;
}
.ant-slider {
  width: 128px;
}
</style>
