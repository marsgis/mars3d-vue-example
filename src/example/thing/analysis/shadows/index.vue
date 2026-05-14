<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="title-vertical_line">日照效果</div>
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="日期选择:">
        <mars-date-picker v-model:value="currDate" valueFormat="YYYY-MM-DD" />
      </a-form-item>
      <a-form-item label="时间选择:">
        <mars-slider @change="timeChange" v-model:value="timeVal" :min="0" :max="1440" :step="1" />
      </a-form-item>
      <a-form-item label="当前时间:">
        <span>{{ currDate }} {{ hours }} 时 {{ minutes }}分</span>
      </a-form-item>
      <a-form-item label="自动播放:">
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

  <div class="legend">
    <img :src="imageData" class="legend-image" />
    <div class="legend-items-container">
      <div v-for="(item, index) in stepsData" :key="index" class="legend-item">
        <!-- <div class="color-block" :style="{ backgroundColor: item.color }"></div> -->
        <span class="legend-label">{{ item }}</span>
      </div>
    </div>
  </div>
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

const stepsData: any = ref<string[]>()
const imageData: any = ref<any>()

onMounted(() => {
  const { image, steps } = mapWork.getColorRampInfo()
  imageData.value = image
  stepsData.value = steps

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

.legend {
  position: absolute;
  bottom: 40px;
  right: 10px;
  background: rgba(255, 255, 255, 0.4);
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;

  .legend-image {
    height: 160px;
    width: 20px;
    position: absolute; /* 绝对定位 */
    top: 10px;
    left: 10px;
    z-index: 1; /* 图片层级较低 */
  }

  .legend-items-container {
    position: relative;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 30px;
    z-index: 2; /* 图例项层级较高 */
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    border-radius: 3px;
  }

  .legend-label {
    color: #000000;
  }

  .color-block {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border: 1px solid #ccc;
  }
}
</style>
