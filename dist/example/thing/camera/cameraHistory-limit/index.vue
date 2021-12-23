<template>
  <pannel class="infoView">
    <div class="f-mb">
      <a-checkbox v-model:checked="formState.chkUnderground" @change="chkUnderground"> 显示限定范围 </a-checkbox>
    </div>

    <div>
      <p>当前共有{{ formState.allLength }}条视角记录</p>
    </div>
  </pannel>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import Pannel from "@/components/marsgis/pannel.vue"
import * as mapWork from "./map.js"

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
