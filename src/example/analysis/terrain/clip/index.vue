<template>
  <PannelBox class="infoView">
    <a-row :gutter="[10, 10]">
      <a-col :span="22">
        <a-form-item>
          <a-space>
            <a-checkbox v-model:checked="formState.enabledWadi" @change="chkClippingPlanes"> 是否挖地 </a-checkbox>
            <a-checkbox v-model:checked="formState.enabledWaiqiege" @change="chkUnionClippingRegions"> 是否外切割 </a-checkbox>
            <a-checkbox v-model:checked="formState.enabledShendu" @change="chkTestTerrain"> 深度检测 </a-checkbox>
          </a-space>
        </a-form-item>
      </a-col>

      <a-col :span="22">
        <a-form-item label="开挖区域" :labelCol="labelCol" :labelAlign="labelAlign">
          <a-space>
            <mars-button @click="btnDrawExtent">添加矩形</mars-button>
            <mars-button @click="btnDraw">添加多边行</mars-button>
            <mars-button @click="removeAll">清除</mars-button>
          </a-space>
        </a-form-item>
      </a-col>

      <a-col :span="22">
        <a-form-item label="开挖深度" :labelCol="labelCol" :labelAlign="labelAlign">
          <mars-input-number v-model:value="formState.txtHeight" @change="changeClipHeight" :step="1" :min="-500" :max="999" />
          <span>（米）</span>
        </a-form-item>
      </a-col>

      <a-col :span="22">
        <a-table :pagination="false" :dataSource="dataSource" :columns="columns" size="small" bordered="true">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'caozuo'">
              <a-space>
                <mars-button type="link">
                  <icon-move-one fill="#FFF" @click="flyto(record)" />
                </mars-button>
                <mars-button type="link">
                  <icon-delete fill="#FFF" @click="deleted(record)" />
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
  </PannelBox>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"
import type { UnwrapRef } from "vue"

interface FormState {
  enabledWadi: boolean
  enabledWaiqiege: boolean
  enabledShendu: boolean
  txtHeight: number
}

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

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
  mapWork.terrainClip.diffHeight = formState.txtHeight

  window.$notify("已知问题提示", "（1）开挖区域内矢量对象无法穿透进行拾取。（2）多个开挖区域距离太远时会存在误差")

  dataSource.value = mapWork.table
  mapWork.eventTabel.on("tableObject", function (event: any) {
    dataSource.value = []
    nextTick(() => {
      dataSource.value = event.table
    })
  })
})

// 表格的操作
const flyto = (record: any) => {
  mapWork.flyToGraphic(record.graphicId)
}
const deleted = (record: any) => {
  mapWork.deletedGraphic(record.graphicId)
  dataSource.value = dataSource.value.filter((item: any) => item.key !== record.key)
  mapWork.table = dataSource.value
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

// 添加矩形
const btnDrawExtent = () => {
  mapWork.btnDrawExtent()
}
// 添加多边形
const btnDraw = () => {
  mapWork.btnDraw()
}
// 清除
const removeAll = () => {
  mapWork.removeAll()

  // 是否挖地和外切割
  formState.enabledWaiqiege = false
  formState.enabledWadi = true
  // 清除表格
  dataSource.value = []
}
// 改变切割的深度
const changeClipHeight = () => {
  mapWork.changeClipHeight(formState.txtHeight)
}
</script>
<style scoped lang="less">
.infoView {
  width: 400px;
}
.miFont {
  font-size: 15px;
  margin-top: 10px;
  margin-left: -11px;
  color: white;
}
</style>
