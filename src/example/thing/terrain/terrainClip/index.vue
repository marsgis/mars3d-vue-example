<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <div>
      <a-row :gutter="[1, 10]">
        <a-col :span="24">
          <a-form-item>
            <a-space>
              <a-checkbox v-model:checked="formState.enabledWadi" @change="chkClippingPlanes"> 是否挖地 </a-checkbox>
              <a-checkbox v-model:checked="formState.enabledWaiqiege" @change="chkUnionClippingRegions"> 是否外切割
              </a-checkbox>
              <a-checkbox v-model:checked="formState.enabledShendu" @change="chkTestTerrain"> 深度检测 </a-checkbox>
            </a-space>
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item label="开挖深度" :labelCol="labelCol" :labelAlign="labelAlign">
            <mars-input-number v-model:value="formState.txtHeight" @change="changeClipHeight" :step="1" :min="-500"
              :max="999" />
          </a-form-item>
        </a-col>

        <a-col :span="24">
          <a-form-item :labelCol="labelCol" :labelAlign="labelAlign">
            <div class="draw-tools">
              <a-space>
                <mars-button @click="btnDrawExtent">添加矩形</mars-button>
                <mars-button @click="btnDraw">添加多边形</mars-button>
                <mars-button type="primary" danger @click="removeAll">清除</mars-button>
              </a-space>
            </div>
          </a-form-item>
        </a-col>


        <a-col :span="24">
          <mars-table class="mars-noHeader-table" :pagination="false" :row-selection="rowSelection"
            :dataSource="dataSource" :columns="columns" size="small" :showHeader="false" :bordered="false">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'caozuo'">
                <div class="table-tools">
                  <a-space>
                    <mars-icon icon="move-one" color="#f2f2f2" class="icon-vertical-a" @click="flyto(record)" />
                    <mars-icon icon="delete" color="#F96868" class="icon-vertical-a" @click="deleted(record)" />
                  </a-space>
                </div>
              </template>
              <template v-else>
                {{ record.name }}
              </template>
            </template>
          </mars-table>
        </a-col>
      </a-row>
    </div>
  </mars-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"

interface FormState {
  enabledWadi: boolean
  enabledWaiqiege: boolean
  enabledShendu: boolean
  txtHeight: number
}
interface TableItem {
  key: number
  name: string
}

const labelCol = ref({ span: 6 })
const labelAlign = ref("left")

const formState: UnwrapRef<FormState> = reactive({
  enabledWadi: true,
  enabledWaiqiege: false,
  enabledShendu: true,
  txtHeight: 50
})
// 表格数据
const columns = ref([
  {
    title: "开挖区域",
    dataIndex: "name",
    key: "name",
    align: "center"
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    key: "caozuo",
    width: 80,
    align: "center"
  }
])
const dataSource = ref([])

const rowKeys = ref<string[]>([])

const rowSelection = ref({
  hideSelectAll: true,
  hideDefaultSelections: true,
  selectedRowKeys: rowKeys,
  onChange: (selectedRowKeys: string[]) => {
    // 使得点击之后选项改变
    rowKeys.value = selectedRowKeys
  },
  onSelect: (record: TableItem, selected: boolean) => {
    mapWork.showHideArea(record.key, selected)
  }
})

onMounted(() => {
  mapWork.addTerrainClip(formState.txtHeight)
})

mapWork.eventTabel.on("tableObject", function (event: any) {
  if (!event.tableItem) {
    return
  }
  dataSource.value.push(event.tableItem)
  rowKeys.value.push(event.tableItem.key)
})

// 表格的操作
const flyto = (record: any) => {
  mapWork.flyToGraphic(record.key)
}
const deleted = (record: any) => {
  mapWork.deletedGraphic(record.key)
  dataSource.value = dataSource.value.filter((item: any) => item.key !== record.key)
}

// 是否挖地
const chkClippingPlanes = () => {
  mapWork.chkClippingPlanes(formState.enabledWadi)
}
// 是否外切割
const chkUnionClippingRegions = () => {
  mapWork.chkUnionClippingRegions(formState.enabledWaiqiege)
}
// 深度检测
const chkTestTerrain = () => {
  mapWork.chkTestTerrain(formState.enabledShendu)
}

// 重置矢量数据的设置
function resetEnabled() {
  // 是否挖地
  formState.enabledWadi = true
  mapWork.chkClippingPlanes(formState.enabledWadi)

  // 是否外切割
  mapWork.chkUnionClippingRegions(formState.enabledWaiqiege)
}

// 添加矩形
const btnDrawExtent = () => {
  resetEnabled()
  mapWork.btnDrawExtent(formState.enabledWadi)
}
// 添加多边形
const btnDraw = () => {
  resetEnabled()

  mapWork.btnDraw(formState.enabledWadi)
}
// 清除
const removeAll = () => {
  resetEnabled()

  mapWork.removeAll()

  // 清除表格
  dataSource.value = []
}
// 改变切割的深度
const changeClipHeight = () => {
  mapWork.changeClipHeight(formState.txtHeight)
}
</script>
<style scoped lang="less">
.miFont {
  font-size: 15px;
  margin-top: 10px;
  margin-left: -11px;
  color: white;
}

.draw-tools {
  .mars-button {
    width: 94px;
  }
}
</style>
