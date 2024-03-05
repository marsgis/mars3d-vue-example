<template>
  <mars-dialog :visible="true" width="330" right="10" top="10">
    <mars-gui :options="options" :labelCol="4"></mars-gui>
  </mars-dialog>
</template>

<script lang="ts" setup>
import * as mapWork from "./map.js"
import type { GuiItem } from "@mars/components/mars-ui/mars-gui"

const options: GuiItem[] = [
  {
    type: "radio",
    field: "type",
    label: "单选",
    value: "xyz",
    show(data) {
      return data.speed !== "2"
    },
    data: [
      {
        label: "无地形",
        value: "none"
      },
      {
        label: "标准服务",
        value: "xyz"
      },
      {
        label: "lon在线服务",
        value: "ion"
      },
      {
        label: "ArcGIS服务",
        value: "arcgis"
      }
    ],
    change(value) {
      mapWork.radioTerrain(value)
    }
  },
  {
    type: "checkbox",
    field: "type",
    label: "调试",
    value: ["1"],
    data: [
      {
        label: "开启地形",
        value: "1"
      },
      {
        label: "地形三角网",
        value: "2"
      }
    ],
    change(value) {
      mapWork.enabledTerrain(
        value.find((item) => {
          return item === "1"
        })
      )
      mapWork.enabledTerrainSJW(
        value.find((item) => {
          return item === "2"
        })
      )
    }
  }
]
</script>

<style lang="less" scoped>
:deep(.ant-form) {
  padding: 12px 0;
}

:deep(.ant-form-item:first-child  .ant-form-item-label >label) {
  height: 0px
}

:deep(.ant-radio-group) {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
:deep(.ant-radio-wrapper-in-form-item) {
  width:110px;
}
</style>
