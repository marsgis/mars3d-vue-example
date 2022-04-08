<template>
  <mars-pannel :visible="true" right="10" top="10" width="350">
    <div class="contour-line-contain">
      <a-row :gutter="[1, 10]">
        <a-col :span="24">
          <a-form-item label="限定区域:" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-space>
              <mars-button @click="btnDrawExtent">添加矩形</mars-button>
              <mars-button @click="btnDraw">添加多边形</mars-button>
              <mars-button @click="clearAll">清除</mars-button>
            </a-space>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="等高线:" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-space>
              <a-checkbox v-model:checked="formState.chkEnabled" @change="showDengGX">显示</a-checkbox>
            </a-space>
          </a-form-item>
        </a-col>

        <a-col :span="24" v-show="formState.chkEnabled">
          <a-form-item label="颜色" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-color-picker v-model:value="formState.color" @change="changeColor" />
          </a-form-item>
        </a-col>

        <a-col :span="24" v-show="formState.chkEnabled">
          <a-form-item label="间隔" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-space>
              <a-slider v-model:value="formState.txtSpacing" @change="changeSpacing" :min="10.0" :max="500.0" :step="1.0" />
              <span>（米）</span>
            </a-space>
          </a-form-item>
        </a-col>

        <a-col :span="24" v-show="formState.chkEnabled">
          <a-form-item label="线宽" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-space>
              <a-slider v-model:value="formState.txtWidth" @change="changeWidth" :min="1.0" :max="10.0" :step="0.1" />
              <span>（px）</span>
            </a-space>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="地表渲染:" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-radio-group v-model:value="formState.radio" @change="changeShadingType">
              <a-radio value="none">无</a-radio>
              <a-radio value="elevation">高程</a-radio>
              <a-radio value="slope">坡度</a-radio>
              <a-radio value="aspect">坡向</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="状态控制:" :labelCol="labelCol" :labelAlign="labelAlign">
            <a-checkbox v-model:checked="formState.showElse" @change="chkClippingPlanes"> 显示其他区域 </a-checkbox>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-table :pagination="{ pageSize: 5 }" :row-selection="rowSelection" :dataSource="dataSource" :columns="columns" size="small" bordered>
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'caozuo'">
                <mars-button type="link">
                  <mars-icon icon="move-one" color="#f2f2f2" class="icon-vertical-a" @click="flyto(record)" />
                </mars-button>
                <mars-button type="link">
                  <mars-icon icon="delete" color="#f2f2f2" class="icon-vertical-a" @click="deleted(record)" />
                </mars-button>
              </template>
              <template v-else>
                {{ record.name }}
              </template>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </div>
  </mars-pannel>
</template>

<script setup lang="ts">
import { nextTick, reactive, ref } from "vue"

import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  chkEnabled: boolean
  color: string
  txtSpacing: number
  txtWidth: number
  radio: string
  showElse: boolean
}

interface TableItem {
  key: number
  name: string
}

const labelCol = ref({ span: 5 })
const labelAlign = ref("left")

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
    width: 100
  }
])
const dataSource = ref([])
const rowKeys = ref<number[]>([])

const rowSelection = ref({
  hideSelectAll: true,
  hideDefaultSelections: true,
  selectedRowKeys: rowKeys,
  onChange: (selectedRowKeys: number[]) => {
    // 使得点击之后选项改变
    rowKeys.value = selectedRowKeys
  },
  onSelect: (record: TableItem, selected: boolean) => {
    mapWork.showHideArea(record.key, selected)
  }
})

mapWork.eventTabel.on("tableObject", function (event: any) {
  dataSource.value = []
  nextTick(() => {
    dataSource.value = event.table
    rowKeys.value = event.table.map((item: any) => item.key)
  })
})

// 定位和删除
const flyto = (record: any) => {
  mapWork.flyToGraphic(record.key)
}
const deleted = (record: any) => {
  mapWork.deletedGraphic(record.key)
  dataSource.value = dataSource.value.filter((item: any) => item.key !== record.key)

  mapWork.changeTable(dataSource.value)
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
.ant-slider {
  width: 140px;
}
.miFont {
  margin-top: 6px;
  margin-left: -11px;
}
.contour-line-contain {
  width: 326px;
}
</style>
