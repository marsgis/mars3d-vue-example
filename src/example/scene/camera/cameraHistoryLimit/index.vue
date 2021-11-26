<template>
  <PannelBox class="infoView">
    <a-form>
      <a-form-item>
        <a-checkbox v-model:checked="formState.chkUnderground" @change="chkUnderground"> 显示限定范围 </a-checkbox>
      </a-form-item>

      <a-for-item>
        <p>当前共有{{ formState.allLength }}条视角记录</p>
      </a-for-item>
    </a-form>
  </PannelBox>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import PannelBox from "@comp/OperationPannel/PannelBox.vue"

// mapWork是map.js内定义的所有对象， 在项目中使用时可以改为import方式使用:  import * as mapWork from './map.js'
const mapWork = window.mapWork || {}

const formState = reactive({
  allLength: 0,
  chkUnderground: true
})
onMounted(() => {
  // 触发自定义事件，接收数据
  mapWork.eventTarget.on("changeCamera", function (event: any) {
    formState.allLength = event.count
  })
})

const chkUnderground = () => {
  mapWork.chkUnderground(formState.chkUnderground)
}
</script>
<style scoped lang="less"></style>
