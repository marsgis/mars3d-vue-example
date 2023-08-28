<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel key="1" :showArrow="false" header="时序列表">
      <a-space class="f-mb">
        <mars-button title="添加显示矢量对象的时间段" @click="addAvailability">添加</mars-button>
        <mars-button title="矢量对象一直显示" @click="removeAvailability">清除</mars-button>
      </a-space>
      <template v-for="(item, i) in availability" :key="i">
        <p class="position-title" :span="24">
          <span>第 {{ i + 1 }} 个时间段</span>
          <a-space class="position-title__subfix">
            <mars-icon icon="add-one" width="16" @click="addItem(item, i)"></mars-icon>
            <mars-icon icon="delete" width="16" @click="deleteItem(i)"></mars-icon>
          </a-space>
        </p>
        <table class="mars-primary-table" border="1" bordercolor="#ffffff" cellspacing="0" cellpadding="0">
          <tr>
            <td>开始时间</td>
            <td>
              <mars-date-picker
                v-model:value="item.start"
                format="YYYY-MM-DD HH:mm:ss"
                :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
                @change="availabilityChange()"
              />
            </td>
          </tr>
          <tr>
            <td>结束时间</td>
            <td>
              <mars-date-picker
                v-model:value="item.stop"
                format="YYYY-MM-DD HH:mm:ss"
                :show-time="{ defaultValue: dayjs('00:00:00', 'HH:mm:ss') }"
                @change="availabilityChange()"
              />
            </td>
          </tr>
        </table>
      </template>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import dayjs, { Dayjs } from "dayjs"
import _ from "lodash"
import * as mars3d from "mars3d"

const Cesium = mars3d.Cesium

const activeKey = ref(["1", "2"])

const props = defineProps<{
  availability: any | null
}>()

const availability = ref<any[]>([])

watch(
  props,
  () => {
    if (!props.availability) {
      return
    }
    let data = props.availability
    if (!Array.isArray(props.availability)) {
      data = props.availability._intervals
    }
    availability.value =
      data?.map((julianObj) => {
        const timeObj = {}
        for (const key in julianObj) {
          const isJulianDate = typeof julianObj[key] !== "string"

          let value = null

          if (julianObj[key]) {
            value = isJulianDate ? dayjs(Cesium.JulianDate.toDate(julianObj[key])) : dayjs(julianObj[key])
          }

          timeObj[key] = value
        }

        return timeObj
      }) || []
  },
  {
    immediate: true
  }
)

const emits = defineEmits(["availabilityChange"])

const deleteItem = (index: number) => {
  availability.value.splice(index, 1)
  availabilityChange()
}

function addItem(item: any, index: number) {
  availability.value.splice(index, 0, _.cloneDeep(item))
  availabilityChange()
}

const addAvailability = () => {
  availability.value.push({ start: null, stop: null })
  availabilityChange()
}
const removeAvailability = () => {
  availability.value = []
  availabilityChange()
}

const availabilityChange = () => {
  const time =
    availability.value?.map((dayjsDate) => {
      const timeObj = {}
      for (const key in dayjsDate) {
        timeObj[key] = dayjsDate[key] ? dayjs(dayjsDate[key]).format("YYYY-MM-DD HH:mm:ss") : null
      }

      return timeObj
    }) || []

  emits("availabilityChange", time)
}
</script>

<style lang="less" scoped>
.position-title {
  border-left: 2px solid #ffffff;
  background-color: rgba(32, 42, 68, 0.5);
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  .position-title__subfix {
    float: right;
    :deep(.mars-icon) {
      cursor: pointer;
    }
  }
}
</style>
