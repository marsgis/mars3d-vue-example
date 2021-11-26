<template>
  <PannelBox class="infoView">
    <a-row :gutter="[10, 10]">
      <a-col :span="22">
        <a-form-item label="限定区域:" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-space>
            <mars-button @click="btnDrawExtent">添加矩形</mars-button>
            <mars-button @click="btnDraw">添加多边形</mars-button>
            <mars-button @click="clearAll">清除</mars-button>
          </a-space>
        </a-form-item>
      </a-col>

      <a-col :span="22">
        <a-form-item label="等高线:" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-space>
            <a-checkbox v-model:checked="formState.chkEnabled" @change="showDengGX">显示</a-checkbox>
            <mars-color-picker v-model:value="formState.color" @change="changeColor" />
          </a-space>
        </a-form-item>
      </a-col>

      <a-col :span="15">
        <a-form-item label="间隔" :labelCol="smallCol" labelAlign="right">
          <a-slider v-model:value="formState.txtSpacing" @change="changeSpacing" :min="10.0" :max="500.0" :step="1.0" />
        </a-form-item>
      </a-col>
      <a-col :span="4" class="miFont">（米）</a-col>

      <a-col :span="15">
        <a-form-item label="线宽" :labelCol="smallCol" labelAlign="right">
          <a-slider v-model:value="formState.txtWidth" @change="changeWidth" :min="1.0" :max="10.0" :step="0.1" />
        </a-form-item>
      </a-col>
      <a-col :span="4" class="miFont">（px）</a-col>

      <a-col :span="22">
        <a-form-item label="地表渲染:" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-radio-group v-model:value="formState.radio" @change="changeShadingType">
            <a-radio value="none">无</a-radio>
            <a-radio value="elevation">高程</a-radio>
            <a-radio value="slope">坡度</a-radio>
            <a-radio value="aspect">坡向</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-col>

      <a-col :span="22">
        <a-form-item label="状态控制:" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-checkbox v-model:checked="formState.showElse" @change="chkClippingPlanes"> 显示其他区域 </a-checkbox>
        </a-form-item>
      </a-col>

      <a-col :span="22">
        <a-table :pagination="false" :dataSource="dataSource" :columns="columns" size="small" bordered="true">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'caozuo'">
              <mars-button type="link">
                <icon-move-one fill="#FFF" @click="flyto(record)" />
              </mars-button>
              <mars-button type="link">
                <icon-delete fill="#FFF" @click="deleted(record)" />
              </mars-button>
            </template>
            <template v-else>
              {{ record.name }}
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </PannelBox>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  chkEnabled: boolean
  color: string
  txtSpacing: number
  txtWidth: number
  radio: string
  showElse: boolean
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const labelCol = ref({ span: 5 })
const labelAlign = ref("left")
const smallCol = ref({ span: 12 })

const formState: UnwrapRef<FormState> = reactive({
  chkEnabled: true,
  color: "red",
  txtSpacing: 100,
  txtWidth: 1.5,
  radio: "none",
  showElse: true
})

// 表格数据
const columns = ref([
  {
    title: "开挖区域",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    key: "caozuo",
    width: 80
  }
])
const dataSource = ref([])

onMounted(() => {
  dataSource.value = mapWork.table
  mapWork.eventTabel.on("tableObject", function (event: any) {
    dataSource.value = []
    nextTick(() => {
      dataSource.value = event.table
    })
  })
})

// 表格操作
const flyto = (record: any) => {
  mapWork.flyToGraphic(record.graphicId)
}
const deleted = (record: any) => {
  mapWork.deletedGraphic(record.graphicId)
  dataSource.value = dataSource.value.filter((item: any) => item.key !== record.key)
  mapWork.table = dataSource.value
}

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent()
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw()
}
// 清除
const clearAll = () => {
  mapWork.clearAll()

  formState.showElse = true
  // 清除表格
  dataSource.value = []
}

// 滑动条控制
const changeWidth = () => {
  mapWork.changeWidth(formState.txtWidth)
}
const changeSpacing = () => {
  mapWork.changeSpacing(formState.txtSpacing)
}

// 改变颜色
const changeColor = () => {
  mapWork.changeColor(formState.color)
}

// 等高线控制
const showDengGX = () => {
  mapWork.showDengGX(formState.chkEnabled)
}
// 状态控制
const chkClippingPlanes = () => {
  mapWork.chkClippingPlanes(formState.showElse)
}

// 改变阴影
const changeShadingType = () => {
  mapWork.changeShadingType(formState.radio)
}
</script>
<style scoped lang="less">
.infoView {
  width: 380px;
}
.miFont {
  font-size: 15px;
  margin-top: 10px;
  margin-left: -11px;
  color: white;
}
</style>
