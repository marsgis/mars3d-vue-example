<template>
  <mars-dialog :visible="true" right="10" top="10" width="290">
    <div class="f-mb">
      <a-space>
        <mars-button @click="showAddDataPannel = true">新增</mars-button>
      </a-space>
    </div>

    <mars-table :pagination="false" :columns="columns" :data-source="tableData">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'option'">
          <a-space>
            <mars-icon icon="aiming" color="#f2f2f2" class="icon-vertical-a" title="定位" @click.stop="flyToHouse(record)" />
            <mars-icon icon="edit" color="#f2f2f2" class="icon-vertical-a" title="编辑" @click.stop="editHouseType(record)" />
            <mars-icon icon="delete" color="#f2f2f2" class="icon-vertical-a" title="删除" @click.stop="deleteHouseType(record)" />
          </a-space>
        </template>
      </template>
    </mars-table>
  </mars-dialog>

  <mars-dialog :visible="showAddDataPannel" right="10" top="320" width="290">
    <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="边界">
        <a-row :gutter="5">
          <a-col :span="6">
            <span>{{ pointsArr && pointsArr.length > 0 ? "已绘制" : "无" }}</span>
          </a-col>
          <a-col :span="14">
            <mars-button @click="drawArea" :disabled="isEditing">绘制</mars-button>
            <mars-button :disabled="isEditing" @click="quitDraw">清除</mars-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="最低高" name="minHeight">
        <a-row :gutter="5">
          <a-col :span="15">
            <mars-input-number v-model:value="minHeight"></mars-input-number>
          </a-col>
          <a-col :span="5">
            <a-space size="small">
              <mars-button class="small-btn" @click="getMinHeight">拾取</mars-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="最高高" name="maxHeight">
        <a-row :gutter="5">
          <a-col :span="15">
            <mars-input-number v-model:value="maxHeight"></mars-input-number>
          </a-col>
          <a-col :span="5">
            <a-space size="small">
              <mars-button class="small-btn" @click="getMaxHeight">拾取</mars-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="层数" name="floorCount">
        <a-row :gutter="5">
          <a-col :span="15">
            <mars-input-number v-model:value="floorCount" @change="getInt"></mars-input-number>
          </a-col>
        </a-row>
      </a-form-item>
      <div class="f-tac">
        <a-space>
          <mars-button @click="produceData">生成</mars-button>
          <mars-button @click="closePanle">退出</mars-button>
        </a-space>
      </div>
    </a-form>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"
import { $message } from "@mars/components/mars-ui/index"

const showAddDataPannel = ref(false)
const columns = [
  {
    title: "户型",
    dataIndex: "houseType"
  },
  {
    title: "总层数",
    dataIndex: "floorCount"
  },
  {
    title: "操作",
    dataIndex: "option"
  }
]

const floorCount = ref(1) // 总的层数
const tableData = ref([])

const minHeight = ref(0) // 底部高度
const maxHeight = ref(0) // 顶部高度
const houseTypeCount = ref(0) // 已经生成的房型数
const currentHouseType = ref(0) // 当前操作的房型
const pointsArr = ref([]) // 绘制的四个点
const isEditing = ref(false) // 正在编辑
const hasDraw = ref(false)
const drawGraphic = ref() // 画出来的数据

const produce = () => {
  const produceObj = mapWork.produceData(pointsArr.value, floorCount.value, minHeight.value, maxHeight.value)
  console.log("生成的数据produceObj", produceObj)

  houseTypeCount.value++
  tableData.value.push({
    houseType: houseTypeCount.value + "号户型",
    floorCount: produceObj.floorCount,
    floorHeight: produceObj.floorHeight,
    minHeight: produceObj.minHeight,
    maxHeight: produceObj.maxHeight,
    position: pointsArr.value,
    lastGraphicArr: produceObj.lastGraphicArr
  })

  clearPannelData()
  showAddDataPannel.value = false
  console.log("生成的数据", produceObj)
}

// 根据楼高生成每层
const produceData = () => {
  if (!hasDraw.value) {
    return $message("请先绘制区域")
  }
  if (floorCount.value === 0) {
    return $message("楼层数不能为0")
  }
  if (maxHeight.value === 0) {
    return $message("最大高度不能为0")
  }
  if (minHeight.value === 0) {
    return $message("最小高度不能为0")
  }

  if (isEditing.value) {
    return editProduceData()
  }

  if (tableData.value.length !== 0) {
    let item
    for (let i = 0; i < tableData.value.length; i++) {
      item = tableData.value[i]
      console.log("item", item, item.position[0][0], currentHouseType.value)

      if (item.position[0][0] === currentHouseType.value) {
        console.log("编辑之后", floorCount.value)
        item.floorCount = floorCount.value
        const resultData = mapWork.produceData(item.position, floorCount.value, minHeight.value, maxHeight.value, item.lastGraphicArr)
        item.lastGraphicArr = resultData.lastGraphicArr
        showAddDataPannel.value = false
        clearPannelData()
        break
      }
    }
    produce()
  } else {
    produce()
  }
}

// 编辑中的生成
const editProduceData = () => {
  tableData.value.forEach((item) => {
    if (item.position[0][0] === currentHouseType.value) {
      console.log("item", item, item.position[0][0], currentHouseType.value)
      console.log("编辑之后", floorCount.value)
      item.floorCount = floorCount.value
      const resultData = mapWork.produceData(item.position, floorCount.value, minHeight.value, maxHeight.value, item.lastGraphicArr)
      item.lastGraphicArr = resultData.lastGraphicArr
      showAddDataPannel.value = false
      clearPannelData()
    }
  })
}

// 绘制区域
const drawArea = () => {
  clearPannelData()
  mapWork.addData().then((data) => {
    drawGraphic.value = data.id
    pointsArr.value = []
    data.points.forEach((item) => {
      pointsArr.value.push([item.lng, item.lat])
    })
    currentHouseType.value = pointsArr.value[0][0]
    hasDraw.value = true
    console.log("绘制的区域", pointsArr.value)
  })
}

const clearPannelData = () => {
  maxHeight.value = 0
  minHeight.value = 0
  floorCount.value = 1
  isEditing.value = false
}

// 拾取底部高度
const getMinHeight = () => {
  mapWork.getBuildingHeight().then((data) => {
    minHeight.value = data.height
  })
}

// 拾取顶部高度
const getMaxHeight = () => {
  mapWork.getBuildingHeight().then((data) => {
    maxHeight.value = data.height
  })
}

// 编辑房型
const editHouseType = (data) => {
  isEditing.value = true
  maxHeight.value = data.maxHeight
  minHeight.value = data.minHeight
  floorCount.value = data.floorCount
  showAddDataPannel.value = true
  pointsArr.value = data.position
  currentHouseType.value = pointsArr.value[0][0]
}

// 定位房型
const flyToHouse = (data) => {
  console.log(data.position)
  mapWork.map.flyToPositions(data.position)
}

// 取消绘制
const quitDraw = () => {
  if (drawGraphic.value) {
    mapWork.quitDraw(drawGraphic.value)
  }
}

// 退出
const closePanle = () => {
  clearPannelData()
  mapWork.quitDraw(drawGraphic.value)
  showAddDataPannel.value = false
}

// 删除房型
const deleteHouseType = (data) => {
  console.log("删除房型", data, tableData.value)

  // 删除表格中的数据
  tableData.value = tableData.value.filter((item) => {
    if (item.position[0][0] !== data.position[0][0]) {
      return true
    } else {
      // 删除图层数据
      item.lastGraphicArr.forEach((ele) => {
        mapWork.quitDraw(ele)
      })
      return false
    }
  })
}

const getInt = () => {
  floorCount.value = parseInt(floorCount.value + "")
}
</script>
