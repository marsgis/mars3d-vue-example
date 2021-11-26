<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item label="范围">
        <a-radio-group v-model:value="radioFanwei">
          <a-radio value="1">指定城市</a-radio>
          <a-radio value="2">当前视域</a-radio>
          <a-radio value="3">指定范围</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="城市" v-show="radioFanwei === '1'">
        <a-cascader v-model:value="value" :options="options" @change="onChange">
          <a href="#">{{ citySheng }} / {{ cityShi }}</a>
        </a-cascader>
      </a-form-item>

      <a-form-item label="关键字">
        <mars-input v-model:value="serverName" placeholder="查询名称和地址"></mars-input>
      </a-form-item>

      <a-form-item label="" v-show="radioFanwei === '3'">
        <a-space>
          <mars-button @click="drawRectangle">框选范围</mars-button>
          <mars-button @click="drawCircle">圆形范围</mars-button>
          <mars-button @click="drawPolygon">多边形范围</mars-button>
        </a-space>
      </a-form-item>

      <a-form-item class="f-tac">
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
import { onBeforeMount, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import any from "nprogress"
import axios from "axios"

interface DataItem {
  key: number
  name: string
  age: number
  address: string
  graphic: any
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const radioFanwei = ref("1")
const serverName = ref("")
const citySheng = ref("安徽省")
const cityShi = ref("合肥市")
const show = ref(false)

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
        window.$message(record.name + " 无经纬度坐标信息！")
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
  mapWork.clearAll(radioFanwei.value == "3")
  mapWork.bootstrapList = []
  switch (radioFanwei.value) {
    default:
      // 按城市
      var dnnm = citySheng.value
      var dmmc = cityShi.value

      loadData({
        page: 0,
        city: dmmc,
        citylimit: true
      })
      break
    case "2": // 当前视角范围
      var extent = mapWork.map.getExtent()
      loadData({
        page: 0,
        polygon: [
          [extent.xmin, extent.ymin],
          [extent.xmax, extent.ymax]
        ],
        limit: true
      })
      break
    case "3": // 按范围
      if (!mapWork.drawGraphic) {
        window.$message("请绘制限定范围！")
        return
      }
      loadData({
        page: 0,
        graphic: mapWork.drawGraphic,
        limit: true
      })
      break
  }
}

function loadData(queryOptions: any) {
  if (serverName.value.length == 0) {
    window.$message("请输入 名称 关键字筛选数据！")
    return
  }
  mapWork.showLoading()

  mapWork.lastQueryOptions = {
    ...queryOptions,
    count: 25, // count 每页数量
    text: serverName.value,
    success: function (res: any) {
      show.value = true
      var data = res.list
      mapWork.bootstrapList = mapWork.bootstrapList.concat(data)

      mapWork.addGraphics(data)
      table(data)
      mapWork.hideLoading()
    },
    error: function (msg: any, error: any) {
      mapWork.globalAlert(msg)
      mapWork.hideLoading()
    }
  }
  mapWork.queryGaodePOI.query(mapWork.lastQueryOptions)
}

// 城市的数据
interface Option {
  value: string
  label: string
  children?: Option[]
}
const value = ref<string[]>([])
const options = ref<Option[]>([])
// 读取JSON数据
function fetchAttrJson() {
  return axios.get(`${process.env.BASE_URL}config/city.json`)
}
onBeforeMount(async () => {
  const { data }: any = await fetchAttrJson()
  options.value = data
})

// 改变选择的城市
const onChange = (value: string, selectedOptions: Option[]) => {
  citySheng.value = selectedOptions[0].label
  cityShi.value = selectedOptions[1].label
}

// 表格数据
const dataSource = ref([any])
function table(data: any) {
  show.value = true
  dataSource.value = []
  data.forEach((item: any, index: number) => {
    dataSource.value.push({ key: index, name: item.name, type: item.type, address: item.address, graphic: item.graphic })
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
  width: 330px;
  max-height: 93%;
}
</style>
