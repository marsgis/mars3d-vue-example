<template>
  <pannel class="infoView" title="shez" v-show="showClockAnimate" animateClassName="fadeInUp">
    <p class="closePannel f-mb">
      <close-i theme="filled" size="14" fill="#fdfdfd" @click="onClickHiddenTime" />
    </p>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">当前时间：</span>
        <mars-date-picker
          style="width: 160px"
          v-model:value="currrentTime"
          format="YYYY-MM-DD HH:mm:ss"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
          @change="onChangeCurrentTime"
        />
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="pannel-item-label">时间范围：</span>
        <a-range-picker
          v-model:value="nowTimeScope"
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['开始时间', '结束时间']"
          @change="onRangeChange"
        />
      </a-space>
    </div>
  </pannel>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import dayjs, { Dayjs } from "dayjs"
import { Close as CloseI } from "@icon-park/vue-next"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

const showClockAnimate = ref<boolean>(false)
const nowTimeScope = ref<[Dayjs, Dayjs]>()
const currrentTime = ref<Dayjs>()

mapWork.eventTarget.on("clickShowClockAnimate", (e: any) => {
  showClockAnimate.value = !showClockAnimate.value

  nowTimeScope.value = [dayjs(e.startTime), dayjs(e.stopTime)]
  currrentTime.value = dayjs(e.currentTime)
})
const onClickHiddenTime = () => {
  showClockAnimate.value = false
}
const onRangeChange = (value: [Dayjs, Dayjs], dateString: [string, string]) => {
  mapWork.setClockAnimateTime(dateString[0], dateString[1])
}
const onChangeCurrentTime = (value: Dayjs) => {
  mapWork.setCurrentTime(value)
}
</script>

<style lang="less" scoped>
.infoView {
  top: calc(100% - 195px);
  right: calc(100% - 415px);
}
.pannel-item-label {
  width: 60px;
}
.closePannel {
  position: relative;
  left: 95%;
}
:deep(.ant-picker) {
  width: 278px;
}
</style>
