<template>
  <mars-dialog :visible="true" right="10">
    <a-space>
      <a-checkbox v-model:checked="item.checkFlag" v-for="(item, index) in dataArr" :key="index"
        @change="item.click(item.checkFlag)">{{ item.label }}</a-checkbox>
    </a-space>
  </mars-dialog>

  <div class="legend-container">
      <div
        class="cursor-pointer legend-item"
        v-for="item of items"
        :key="item.text"
        @click="handleLegendClick(item)"
      >
        <div
          class="legend-item-color"
          :style="{ background: item.active ? item.color : 'gray' }"
        ></div>
        <div class="legend-item-text">{{ item.text }}</div>
      </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue"
import * as mapWork from "./map.js"

const dataArr = ref()

onMounted(() => {
  const data = [
    {
      label: "在线终端",
      checkFlag: true,
      click: (checked) => {
        mapWork.onlineEndLayer.show = checked
      },
      show: () => {
        return mapWork.onlineEndLayer.getGraphics().length > 0
      }
    },
    {
      label: "离线终端",
      checkFlag: true,
      click: (checked) => {
        mapWork.offlineEndLayer.show = checked
      },
      show: () => {
        return mapWork.offlineEndLayer.getGraphics().length > 0
      }
    },
    {
      label: "信关",
      checkFlag: true,
      click: (checked) => {
        mapWork.signalStationLayer.show = checked
      }
    },
    {
      label: "运控中心",
      checkFlag: true,
      click: (checked) => {
        mapWork.controlCenterLayer.show = checked
      }
    },
    {
      label: "近极轨",
      checkFlag: true,
      click: (checked) => {
        mapWork.switchSatellites(checked, "近极轨")
      }
    },
    {
      label: "倾斜轨",
      checkFlag: true,
      click: (checked) => {
        mapWork.switchSatellites(checked, "倾斜轨")
      }
    },
    {
      label: "卫星",
      checkFlag: true,
      click: (checked) => {
        mapWork.satelliteGraphicLayer.show = checked
      }
    }
  ].filter(item => {
    if (item.show) {
      return item.show()
    } else {
      return true
    }
  })
  dataArr.value = data
})


const items = ref([
    { color: "#15c8dd", text: "在线终端", active: true },
    { color: "#ea948d", text: "离线终端", active: true },
    { color: "#ffde25", text: "信关站", active: true },
    { color: "#4c66d7", text: "运控中心", active: true },
    { color: "#FFFFFF", text: "近极轨", active: true },
    { color: "#80B0FE", text: "倾斜轨", active: true },
    { color: "#FFBB70", text: "高轨", active: true }
  ])
function handleLegendClick(item) {
    // if (item.text === "高轨") {
    //   switchHighSatellites(item.active, "高轨")
    // }
    // if (item.text === "近极轨") {
    //   mapWork.switchSatellites(item.active, "近极轨")
    // } else if (item.text === "倾斜轨") {
    //   mapWork.switchSatellites(item.active, "倾斜轨")
    // } else if (item.text === "先导星") {
    //   mapWork.switchSatellites(item.active, "先导")
    // } else if (item.text === "高轨") {
    //   mapWork.switchHeightSatellite(item.active)
    // } else if (item.text === "在线终端") {
    //   mapWork.switchOnlineLocationPoints(item.active)
    // } else if (item.text === "离线终端") {
    //   mapWork.switchOutlineLocationPoints(item.active)
    // } else if (item.text === "信关站") {
    //   mapWork.switchReceivers(item.active)
    // } else if (item.text === "运控中心") {
    //   mapWork.switchOcCenters(item.active)
    // }
    // items.value = items.value.map((i) => {
    //   if (i.text === item.text) {
    //     return { ...item, ...{ active: !item.active } }
    //   }
    //   return i
    // })
  }
</script>
<style scoped>

.legend-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    gap: 6px;
    bottom: 60px;
    right: 20px;
    z-index: 999;
}
.legend-item {
  display: flex;
  align-items: center;
}
.legend-item-color {
  width: 14px;
  height: 14px;
}
.legend-item-text {
  color: #fff;
  font-size: 14px;
  margin-left: 10px;
}
</style>
