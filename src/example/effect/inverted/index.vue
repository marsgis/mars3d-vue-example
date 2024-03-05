<template>
  <mars-dialog :visible="true" right="10" top="10" width="330">
    <a-space><a-checkbox v-model:checked="enabled" @change="onChangeState"/>开启/禁用</a-space>
  </mars-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import * as mapWork from "./map.js"

const enabled = ref(true)

const onChangeState = () => {
  mapWork.changeState(enabled.value)
}
</script>
