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
            :pagination="false"
            :dataSource="dataSource"
            :columns="columns"
            :custom-row="customRow"
            size="small" bordered="true" />
        </a-form-item>
        <a-form-item>
          <div>找到{{allLength}}条结果</div>
          <div class="querybar-fr">
            {{nowPage}}/{{allPage}}页
            <a-space>
              <mars-button class="button" @click="showFirstPage">首页</mars-button>
              <mars-button class="button" @click="showPretPage">&lt;</mars-button>
              <mars-button class="button" @click="showNextPage">&gt;</mars-button>
            </a-space>
          </div>
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
  graphic:any
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const serverName = ref("")
const allLength = ref(0)
const nowPage = ref(0)
const allPage = ref(0)
const show = ref(false)

// 表格数据
const dataSource = ref([any])
onMounted(() => {
  mapWork.geoJsonLayer.on(mapWork.mars3d.EventType.load, function(event:any) {
    show.value = true
    dataSource.value = []
    event.list.forEach((item:any, index:number) => {
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
  mapWork.queryMapserver.query({
    column: "项目名称",
    text: serverName.value,
    graphic: mapWork.drawGraphic,
    success: (result:any) => {
      if (result.count == 0) {
        mapWork.globalMsg("未查询到相关记录！")
        return
      }
      allLength.value = result.allCount
      allPage.value = result.allPage
      nowPage.value = result.pageIndex

      mapWork.geoJsonLayer.load({ data: result.geojson })
    },
    error: (error:any, msg:any) => {
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

// 操作查询的数据
const showFirstPage = () => {
  mapWork.showFirstPage()
}
const showPretPage = () => {
  mapWork.showPretPage()
}
const showNextPage = () => {
  mapWork.showNextPage()
}
</script>
<style scoped lang="less">
.infoView{
  width: 400px;
}
.inputServe{
  width: 280px;
}
.querybar-fr{
  position: absolute;
  right: 5px;
  top: -2px;
}
</style>
