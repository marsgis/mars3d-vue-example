<template>
  <a-collapse v-model:activeKey="activeKey">
    <a-collapse-panel v-if="showAssist" key="1" :showArrow="false" header="批量修改高程（辅助功能）">
      <a-row :gutter="[5, 10]">
        <a-col :span="labelWidth">在原值上增加</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="elevationAdder" :step="1" @change="increase"></a-input-number>
        </a-col>
        <a-col :span="labelWidth">全部修改为</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="elevationValue" :step="1" @change="coverLonlats"></a-input-number>
        </a-col>
      </a-row>
    </a-collapse-panel>
    <a-collapse-panel key="2" :showArrow="false" header="坐标列表">
      <a-row v-for="(item, i) in lonlats" :gutter="[5, 10]" :key="i">
        <a-col class="col-title" :span="24">第 {{ i + 1 }} 点</a-col>
        <a-col :span="labelWidth">经度</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="item[0]" :step="0.000001" @change="pointChange(props.lonlats)"></a-input-number>
        </a-col>
        <a-col :span="labelWidth">纬度</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="item[1]" :step="0.000001" @change="pointChange(props.lonlats)"></a-input-number>
        </a-col>
        <a-col :span="labelWidth">高程</a-col>
        <a-col :span="24 - labelWidth">
          <a-input-number size="small" v-model:value="item[2]" :step="0.1" @change="pointChange(props.lonlats)"></a-input-number>
        </a-col>
      </a-row>
    </a-collapse-panel>
  </a-collapse>
</template>

<script lang="ts" setup>
/**
 * 模型编辑组件 位置
 * @copyright 火星科技 mars3d.cn
 * @author 木遥 2021-11-01
 */
import { computed, onBeforeMount, ref } from "vue"
import _ from "lodash"

const props = defineProps<{
  labelWidth: number
  lonlats: any[]
}>()

let originLonlats: any[] = []
onBeforeMount(() => {
  originLonlats = props.lonlats
})

const activeKey = ref(["1", "2"])

const showAssist = computed(() => props.lonlats.length > 1 && props.lonlats[1].length >= 3)

const elevationAdder = ref(0)
const elevationValue = ref(0)

const emit = defineEmits(["pointChange"])

function pointChange(lonlats: any[]) {
  emit("pointChange", lonlats)
}

function increase() {
  const lonlats = _.cloneDeep(originLonlats)
  lonlats.forEach((item) => {
    item[2] += elevationAdder.value
  })
  pointChange(lonlats)
}
function coverLonlats() {
  const lonlats = _.cloneDeep(originLonlats)
  lonlats.forEach((item) => {
    item[2] = elevationValue.value
  })
  pointChange(lonlats)
}
</script>

<style lang="less" scoped></style>
