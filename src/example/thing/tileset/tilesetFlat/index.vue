<template>
  <mars-pannel class="infoView">
    <a-row :gutter="[5, 10]">
      <a-col :span="5">
        <a-form-item label="开挖区域"></a-form-item>
      </a-col>
      <a-col :span="19">
        <a-space>
          <mars-button @click="btnDrawExtent">绘制矩形</mars-button>
          <mars-button @click="btnDraw">绘制多边行</mars-button>
          <mars-button @click="removeAll">清除</mars-button>
        </a-space>
      </a-col>

      <a-col :span="5">
        <a-form-item label="压平区高度:"> </a-form-item>
      </a-col>
      <a-col :span="16">
        <mars-input-number v-model:value="formState.flatHeight" @change="changeFlatHeight" :step="0.1" />
      </a-col>
      <a-col :span="3" class="miFont">
        <p>（米）</p>
      </a-col>

      <a-col :span="21">
        <a-form-item>
          <a-checkbox v-model:checked="formState.enabledBianJieXian" @change="chkShowLine"> 显示测试边界线 </a-checkbox>
        </a-form-item>
      </a-col>

      <a-col :span="24">
        <a-table :pagination="{ pageSize: 5 }" :row-selection="rowSelection" :dataSource="dataSource" :columns="columns" size="small" bordered>
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'caozuo'">
              <a-space>
                <mars-button type="link">
                  <Icon icon="icon-park-outline:move-one" color="#f2f2f2" class="icon-vertical-a" @click="flyto(record)" />
                </mars-button>
                <mars-button type="link">
                  <Icon icon="ep:delete" color="#f2f2f2" class="icon-vertical-a" @click="deleted(record)" />
                </mars-button>
              </a-space>
            </template>
            <template v-else>
              {{ record.name }}
            </template>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </mars-pannel>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { Icon } from "@iconify/vue"
import MarsPannel from "@/components/mars-work/mars-pannel.vue"
import type { UnwrapRef } from "vue"
import * as mapWork from "./map.js"
import { $notify } from "@/components/mars-ui/index"

onMounted(() => {
  $notify(
    "已知问题提示",
    `（1）对3dtiles数据有要求，仅适用于无自带着色器的纹理格式模型。
    （2）目前不支持所有3dtile数据，请替换url进行自测`,
    { duration: null }
  )
})
interface FormState {
  enabledBianJieXian: boolean
  flatHeight: number
}

interface TableItem {
  key: number
  name: string
}

const formState: UnwrapRef<FormState> = reactive({
  enabledBianJieXian: true,
  flatHeight: 0
})
// 表格数据
const columns = [
  {
    title: "压平区",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "操作",
    dataIndex: "caozuo",
    key: "caozuo",
    width: 100
  }
]
const dataSource = ref<TableItem[]>([])
// 默认的选项
const rowKeys = ref<string[]>([])

const rowSelection = {
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
}

mapWork.eventTarget.on("dataLoaded", function (event: any) {
  dataSource.value = event.list.map((item: any) => ({ key: item.id, name: "压平区" + item.id }))
  rowKeys.value = event.list.map((item: any) => item.id)
})

mapWork.eventTarget.on("addItem", function (event: any) {
  const item = event.item
  dataSource.value.push({ key: item.id, name: "压平区" + item.id })
  rowKeys.value.push(item.id)
})

// 飞向对应的矢量数据
const flyto = (record: TableItem) => {
  mapWork.flyToGraphic(record.key)
}
// 移除对应的表格数据
const deleted = (record: TableItem) => {
  mapWork.deletedGraphic(record.key)

  dataSource.value = dataSource.value.filter((item: any) => item.key !== record.key)
}

// 是否显示测试边界线
const chkShowLine = () => {
  mapWork.chkShowLine(formState.enabledBianJieXian)
}

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent(formState.enabledBianJieXian)
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw(formState.enabledBianJieXian)
}
// 清除
const removeAll = () => {
  mapWork.removeAll()
  // 清除表格
  dataSource.value = []
}
// 改变压平的高度
const changeFlatHeight = () => {
  mapWork.changeFlatHeight(formState.flatHeight)
}
</script>
<style scoped lang="less">
.infoView {
  width: 350px;
}
.miFont {
  font-size: 15px;
  margin-top: 10px;
  margin-left: -11px;
  color: white;
}
</style>
