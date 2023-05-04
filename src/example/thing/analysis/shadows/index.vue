<template>
  <mars-dialog :visible="true" right="10" top="10">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="日照效果:">
        <div class="f-mb">
          <a-space>
            <span>日期选择:</span>
            <mars-date-picker v-model:value="currDate" valueFormat="YYYY-MM-DD" />
          </a-space>
        </div>

        <div class="f-mb">
          <a-space>
            <span>时间选择:</span>
            <mars-slider @change="timeChange" v-model:value="timeVal" :min="0" :max="1440" :step="1" />
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
      </a-collapse-panel>
      <a-collapse-panel key="2" header="阴影率分析:" class="cameraView">
        <a-space>
          <mars-button @click="drawArea">绘制面</mars-button>
          <mars-button @click="clearArea">清除</mars-button>
        </a-space>
      </a-collapse-panel>
    </a-collapse>
  </mars-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import dayjs from "dayjs"
import * as mapWork from "./map.js"

const activeKey = ref(["1", "2"])

const currDate = ref<string>(dayjs().format("YYYY-MM-DD"))
const timeVal = ref<number>(420)

const hours = computed(() => Math.floor(timeVal.value / 60))
const minutes = computed(() => Math.floor(timeVal.value % 60))

mapWork.eventTarget.on("changeShadows", (event: any) => {
  const date = event.shadowTime
  timeVal.value = date.getHours() * 60 + date.getMinutes()
})

onMounted(() => {
  timeChange()
})

const timeChange = () => {
  mapWork.setShadows(currDate.value, hours.value, minutes.value)
}
const drawArea = () => {
  mapWork.drawArea(currDate.value)
}

const clearArea = () => {
  mapWork.clearArea()
}

const startPlay = () => {
  mapWork.startPlay(currDate.value, hours.value, minutes.value)
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
