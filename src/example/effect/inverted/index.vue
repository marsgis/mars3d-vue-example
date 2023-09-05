<template>
  <mars-dialog :visible="true" right="10" top="10">
    <div class="f-mb">
      <a-space> 开启:<mars-switch v-model:checked="enabled" @change="onChangeState" /> </a-space>
    </div>
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
