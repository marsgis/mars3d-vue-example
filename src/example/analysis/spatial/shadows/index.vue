<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-space>
          <span class="pannel-item-label">日期选择:</span>
          <mars-date-picker v-model:value="currDate" valueFormat="YYYY-MM-DD" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">时间选择:</span>
          <a-slider @change="timeChange" v-model:value="timeVal" :min="0" :max="1440" :step="1" />
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">当前时间:</span>
          <span>{{ currDate }} {{ hours }} 时 {{ minutes }}分</span>
        </a-space>
      </a-form-item>

      <a-form-item>
        <a-space>
          <span class="pannel-item-label">自动播放:</span>
          <mars-button @click="startPlay">播放</mars-button>
          <mars-button @click="stopPlay">暂停</mars-button>
        </a-space>
      </a-form-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { computed, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import dayjs from "dayjs"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const timeVal = ref<number>(420)

const currDate = ref<string>(dayjs().format("YYYY-MM-DD"))
const currTime = ref(0)

const hours = computed(() => Math.floor(currTime.value / 60))
const minutes = computed(() => Math.floor(currTime.value % 60))

mapWork.eventTarget.on("loadOk", function (event: any) {
  const date = event.shadowTime

  currTime.value = date.getHours() * 60 + date.getMinutes()

  timeVal.value = currTime.value
})

const timeChange = () => {
  mapWork.setShadows(timeVal.value, currDate.value)
  currTime.value = timeVal.value
}

timeChange()

const startPlay = () => {
  mapWork.startPlay(timeVal.value, currDate.value)
}
const stopPlay = () => {
  mapWork.stopPlay()
}
</script>
<style scoped lang="less">
.pannel-item-label {
  width: 55px;
}
.ant-slider {
  width: 160px;
}
</style>
