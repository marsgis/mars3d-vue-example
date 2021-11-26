<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="名称">
        <mars-input class="inputServe" v-model:value="serverName" placeholder="请输入查询关键字"></mars-input>
      </a-form-item>

      <a-form-item label="范围">
        <a-space>
          <mars-button @click="drawRectangle">框选范围</mars-button>
          <mars-button @click="drawCircle">圆形范围</mars-button>
          <mars-button @click="drawPolygon">多边形范围</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item label="范围">
        <a-space>
          <mars-button @click="query">查询</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
        </a-space>
      </a-form-item>

      <div v-show="show">
        <a-form-item>
          <a-table
            :pagination="true"
            :dataSource="dataSource"
            :columns="columns"
            :custom-row="customRow"
            size="small"
            bordered="true"
            :scroll="{ y: 400 }"
          />
        </a-form-item>
      </div>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import any from "nprogress"

interface DataItem {
  key: number
  name: string
  age: number
  address: string
  graphic: any
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const serverName = ref("")
const show = ref(false)

// 表格数据
const dataSource = ref([any])
onMounted(() => {
  mapWork.eventTarget.on("befortUI", function (event: any) {
    show.value = true
    dataSource.value = []
    event.list.forEach((item: any, index: number) => {
      dataSource.value.push({ key: index, name: item["项目名称"], type: item["设施类型"], address: item["具体位置"], graphic: item.graphic })
    })
  })
})

const columns = ref([
  {
    title: "名称",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address"
  }
])
const rowSelection = ref({
  hideSelectAll: true,
  hideDefaultSelections: true,
  onSelect: (record: DataItem, selected: boolean) => {
    if (record.graphic == null) {
      mapWork.globalMsg(record.name + " 无经纬度坐标信息！")
      return
    }
    if (selected) {
      record.graphic.openHighlight()
      record.graphic.flyTo({
        radius: 1000, // 点数据：radius控制视距距离
        scale: 1.5, // 线面数据：scale控制边界的放大比例
        complete: () => {
          record.graphic.openPopup()
        }
      })
    } else {
      record.graphic.closeHighlight()
    }
  }
})
const customRow = (record: DataItem) => {
  return {
    onClick: () => {
      if (record.graphic == null) {
        mapWork.globalMsg(record.name + " 无经纬度坐标信息！")
        return
      }
      record.graphic.openHighlight()
      record.graphic.flyTo({
        radius: 1000, // 点数据：radius控制视距距离
        scale: 1.5, // 线面数据：scale控制边界的放大比例
        complete: () => {
          record.graphic.openPopup()
        }
      })
    }
  }
}

// 绘制范围
const drawRectangle = () => {
  show.value = false
  mapWork.drawRectangle()
}
const drawCircle = () => {
  show.value = false
  mapWork.drawCircle()
}
const drawPolygon = () => {
  show.value = false
  mapWork.drawPolygon()
}
// 查询数据
const query = () => {
  show.value = false
  mapWork.clearAll(true)
  mapWork.queryMapserver.query({
    column: "项目名称",
    text: serverName.value,
    graphic: mapWork.drawGraphic,
    success: (result: any) => {
      if (result.count == 0) {
        mapWork.globalMsg("未查询到相关记录！")
        return
      } else {
        mapWork.globalMsg("共查询到 " + result.count + " 条记录！")
      }
      mapWork.geoJsonLayer.load({ data: result.geojson })
    },
    error: (error: any, msg: any) => {
      console.log("服务访问错误", error)
      mapWork.globalAlert(msg, "服务访问错误")
    }
  })
}
// 清除数据
const removeAll = () => {
  show.value = false
  dataSource.value = []
  mapWork.removeAll()
}
</script>
<style scoped lang="less">
.infoView {
  width: 400px;
}
.inputServe {
  width: 280px;
}
</style>
