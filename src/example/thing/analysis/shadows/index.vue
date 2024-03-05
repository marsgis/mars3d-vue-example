<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="title-vertical_line">日照效果</div>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="日期选择:">
          <mars-date-picker v-model:value="currDate" valueFormat="YYYY-MM-DD" />
        </a-form-item>
        <a-form-item  label="时间选择:">
          <mars-slider @change="timeChange" v-model:value="timeVal" :min="0" :max="1440" :step="1" />
        </a-form-item>
        <a-form-item  label="当前时间:">
          <span>{{ currDate }} {{ hours }} 时 {{ minutes }}分</span>
        </a-form-item>
        <a-form-item  label="自动播放:">
          <a-space>
            <mars-button class="play_btn" @click="startPlay">播放</mars-button>
            <mars-button class="play_btn" @click="stopPlay">暂停</mars-button>
          </a-space>
        </a-form-item>
    </a-form>

    <div class="title-vertical_line f-mt">阴影率分析</div>
    <a-space>
      <mars-button class="btn" @click="drawArea">绘制面</mars-button>
      <mars-button class="btn" danger @click="clearArea">清除</mars-button>
    </a-space>
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
  width: 219px;
  margin: 0px;
}

.mars-date-picker {
  width: 220px;
}


.btn {
  width: 137px;
  margin-top: 12px;
  &:first-child {
    margin-left: 9px;
  }
}


// 有竖线的标题
.title-vertical_line {
  padding-left: 12px;
  font-family: 思源黑体;
  font-size: 16px;
  font-weight: normal;
  color: var(--mars-control-text);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 2px;
    left: 0;
    width: 4px;
    height: 19px;
    border-radius: 2px;
    background-color: var(--mars-primary-color);
  }
}

.play_btn {
  width: 106px;
}
</style>
