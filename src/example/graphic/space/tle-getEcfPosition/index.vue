<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">过境区域:</span>
        <mars-button @click="drawRectangle">框选</mars-button>
        <mars-button @click="drawCircle">圆形</mars-button>
        <mars-button @click="drawPolygon">多边形</mars-button>
        <mars-button @click="drawClear" danger>清除</mars-button>
      </a-space>
    </div>
    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">开始时间:</span>
        <mars-date-picker v-model:value="startTime" format="YYYY-MM-DD HH:mm:ss"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <span class="mars-pannel-item-label">结束时间:</span>
        <mars-date-picker v-model:value="endTime" format="YYYY-MM-DD HH:mm:ss"
          :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }" />
      </a-space>
    </div>

    <div class="f-mb">
      <a-space>
        <mars-button class="bottom-btn" @click="startFX">开始分析</mars-button>
        <mars-button class="bottom-btn" @click="clearResult" danger>清除</mars-button>
      </a-space>
    </div>

  </mars-dialog>

  <mars-dialog :visible="pathData.length > 0" right="10" top="216" width="330">

    <div class="satellite" v-for="(item, i) in paginatedData" :key="i">
      <div class="satellite-name">{{ item.name }}</div>
      <div class="satellite-msg">
        <div class="f-mb">
          <a-space>
            <span class="mars-text">进入时间：</span>
            <span>{{ item.inTime }}</span>
          </a-space>
        </div>

        <div class="f-mb">
          <a-space>
            <span class="mars-text">飞出时间：</span>
            <span>{{ item.outTime }}</span>
          </a-space>

        </div>

        <div class="f-mb">
          <a-space>
            <span class="mars-text">飞行时长：</span>
            <span>{{ item.often }}</span>
          </a-space>

        </div>

        <div class="f-mb">
          <a-space>
            <span class="mars-text">飞行距离：</span>
            <span>{{ item.distance }}</span>
          </a-space>

        </div>

      </div>
    </div>
    <a-pagination v-model:current="currentPage" simple :pageSize="2" :total="pathData.length" @change="pageChange" />
  </mars-dialog>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"
import dayjs, { Dayjs } from "dayjs"
import * as mapWork from "./map.js"


const startTime = ref<Dayjs>(dayjs())
const endTime = ref<Dayjs>(dayjs().add(60, "minute"))
const pathData = ref([])


mapWork.eventTarget.on("dataList", (e: any) => {
  pathData.value = e.tableList
})

const currentPage = ref(1)
const pageSize = 2

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return pathData.value.slice(start, end)
})


const pageChange = (page, pageSize) => {
  currentPage.value = page
}

// 框选查询 矩形
const drawRectangle = () => {
  mapWork.drawRectangle()
}
// 框选查询   多边
const drawPolygon = () => {
  mapWork.drawPolygon()
}
// 框选查询   圆
const drawCircle = () => {
  mapWork.drawCircle()
}

const drawClear = () => {
  mapWork.drawClear()
}

const clearResult = () => {
  pathData.value = []
  mapWork.clearResult()
}

const startFX = () => {
  const startTimes = dayjs(startTime.value).valueOf()
  const endTimes = dayjs(endTime.value).valueOf()
  mapWork.startFX(startTimes, endTimes)
}
</script>


<style lang="less" scoped>
.mars-date-picker {
  width: 232px;
}

.ant-pagination {
  float: right;
}

.bottom-btn {
  width: 146px;
}

.mars-text {
  color: rgba(234, 242, 255, 0.8) !important;
}

.satellite {
  margin-bottom: 10px;

  .satellite-name {
    width: 302px;
    height: 32px;
    line-height: 32px;
    padding-left: 10px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 3px 8px 0px rgba(0, 0, 0, 0.24);
    border-radius: 2px 2px 0px 0px;
  }

  .satellite-msg {
    width: 302px;
    height: 120px;
    padding: 10px;
    border-radius: 0px 0px 2px 2px;
    background: rgba(255, 255, 255, 0.1);
    color: #EAF2FF;
  }
}
</style>
